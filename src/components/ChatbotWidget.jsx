import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import IconBadge from './ui/IconBadge'
import Button from './ui/Button'

const INITIAL_MESSAGES = [
  { from: 'bot', text: '안녕하세요! 트레블봇이에요 😊 여행 계획 짜는 거 도와드릴까요?' },
  { from: 'user', text: '네! 이번 주말에 갈만한 근교 여행지 추천해주세요' },
  { from: 'bot', text: '좋아요! 강릉이나 속초 쪽 바다 여행 어떠세요? 당일치기로도 좋아요 🌊' },
]

const CANNED_REPLIES = [
  '네, 어떤 여행지를 찾고 계세요?',
  '제주도, 부산, 강릉 중에 관심 있는 곳 있으세요?',
  '원하시는 예산이나 기간을 알려주시면 코스를 추천해드릴게요!',
  '좋아요! 관련된 인기 계획도 같이 찾아볼게요.',
]

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const replyIndex = useRef(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')

    const reply = CANNED_REPLIES[replyIndex.current % CANNED_REPLIES.length]
    replyIndex.current += 1
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup — floating chat window */}
      <div
        className={`relative mb-4 origin-bottom-right transition-all duration-200 ${
          open ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
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
                  className={`max-w-[76%] px-3 py-2 text-[12.5px] leading-snug ${
                    m.from === 'user'
                      ? 'bg-brand text-white rounded-2xl rounded-tr-sm'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-slate-100 p-2.5 flex items-center gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-[12.5px] outline-none focus:border-brand/40 transition-all"
            />
            <Button
              onClick={handleSend}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              aria-label="전송"
            >
              <Icon icon="solar:plain-2-bold" width={14} color="white" />
            </Button>
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
