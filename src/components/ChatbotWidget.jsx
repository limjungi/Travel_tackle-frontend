import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import IconBadge from './ui/IconBadge'
import Button from './ui/Button'
import { sendChatMessage } from '../api/chat'
import { useLanguage } from '../i18n'

const GREETING = { from: 'bot', text: '안녕하세요! 트레블봇이에요 😊 여행 계획 짜는 거 도와드릴까요?' }

function createConversationId() {
  return globalThis.crypto?.randomUUID?.() || `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function ChatbotWidget() {
  // UI 문구는 한국어 고정 — 선택 언어는 챗봇 답변 언어(API language 파라미터)에만 쓴다
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const conversationId = useRef(createConversationId())
  const abortRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || sending) return

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setError('')
    setSending(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await sendChatMessage(
        {
          message: text,
          conversationId: conversationId.current,
          language,
        },
        { signal: controller.signal }
      )
      setMessages((prev) => [...prev, { from: 'bot', text: response.reply }])
    } catch (err) {
      // 새 대화로 넘어가며 중단된 요청 — 새 대화 상태를 건드리지 않는다.
      if (controller.signal.aborted) return
      if (err.response?.status === 401) {
        setError('로그인 후 트레블봇을 이용할 수 있어요.')
      } else if (err.response?.status === 429) {
        setError('요청이 많아요. 잠시 후 다시 시도해주세요.')
      } else {
        setError('답변을 불러오지 못했어요. 잠시 후 다시 시도해주세요.')
      }
    } finally {
      if (!controller.signal.aborted) setSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSend()
  }

  const handleNewConversation = () => {
    abortRef.current?.abort()
    conversationId.current = createConversationId()
    setMessages([GREETING])
    setInput('')
    setError('')
    setSending(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup — floating chat window. 닫혀 있을 때 레이아웃 공간을 차지하지 않도록 absolute로 배치
          (relative + flex 흐름 안에 있으면 opacity-0/pointer-events-none이어도 투명한 히트박스가 남아
          좁은 화면에서 피드 카드 우하단 클릭/드래그를 가로채는 문제가 있었음) */}
      <div
        className={`absolute bottom-full right-0 mb-4 origin-bottom-right transition-all duration-200 ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
        }`}
      >
        {/* Soft blurred contact shadow, for the floating feel */}
        <div className="absolute -bottom-4 left-6 right-6 h-9 bg-slate-900/25 blur-2xl rounded-full -z-10" />

        <div className="w-[300px] h-[480px] bg-white rounded-[28px] ring-1 ring-black/5 shadow-popup overflow-hidden flex flex-col">
          {/* Header */}
          <div className="shrink-0 bg-brand pt-5 pb-3 px-4 flex items-center gap-2.5">
            <IconBadge className="w-8 h-8 rounded-full bg-white/20 shrink-0">
              <Icon icon="solar:chat-round-dots-bold" width={16} color="white" />
            </IconBadge>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-white leading-tight">트레블봇</div>
              <div className="flex items-center gap-1 text-[10.5px] text-blue-50/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                온라인
              </div>
            </div>
            <IconBadge
              as="button"
              onClick={handleNewConversation}
              className="w-7 h-7 rounded-full text-white/80 hover:bg-white/10 transition-all shrink-0"
              aria-label="새 대화"
            >
              <Icon icon="solar:restart-linear" width={17} />
            </IconBadge>
            <IconBadge
              as="button"
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full text-white/80 hover:bg-white/10 transition-all shrink-0"
              aria-label="챗봇 닫기"
            >
              <Icon icon="solar:close-circle-linear" width={18} />
            </IconBadge>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50 px-3 py-3 space-y-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'bot' && (
                  <IconBadge className="w-6 h-6 rounded-full bg-brand-light shrink-0 mr-1.5 mt-auto">
                    <Icon icon="solar:chat-round-dots-bold" width={12} color="#2563EB" />
                  </IconBadge>
                )}
                <div
                  className={`max-w-[76%] whitespace-pre-wrap px-3 py-2 text-[12.5px] leading-snug ${
                    m.from === 'user'
                      ? 'bg-brand text-white rounded-2xl rounded-tr-sm'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start" aria-label="답변 작성 중">
                <IconBadge className="w-6 h-6 rounded-full bg-brand-light shrink-0 mr-1.5 mt-auto">
                  <Icon icon="solar:chat-round-dots-bold" width={12} color="#2563EB" />
                </IconBadge>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-3 py-3">
                  {[0, 1, 2].map((dot) => (
                    <span key={dot} className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300" style={{ animationDelay: `${dot * 140}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-slate-100 bg-white p-2.5">
            {error && <p className="mb-2 px-1 text-[11px] text-rose-500" role="alert">{error}</p>}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
                disabled={sending}
                className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-[12.5px] outline-none focus:border-brand/40 transition-all disabled:opacity-60"
              />
              <Button
                onClick={handleSend}
                disabled={sending || !input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="전송"
              >
                <Icon icon="solar:plain-2-bold" width={14} color="white" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <Button
        onClick={() => setOpen((v) => !v)}
        className={`w-14 h-14 rounded-full border-[3px] border-white shadow-float flex items-center justify-center hover:scale-105 hover:shadow-float-hover ${
          open ? '' : 'animate-float'
        }`}
        aria-label={open ? '챗봇 닫기' : '챗봇 열기'}
      >
        <Icon icon={open ? 'solar:close-circle-bold' : 'solar:chat-round-dots-bold'} width={24} />
      </Button>
    </div>
  )
}
