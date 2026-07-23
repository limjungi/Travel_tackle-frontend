import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import Card from '../ui/Card'

export default function PopularPlansTop5({ plans, onOpen }) {
  return (
    <Card className="p-4">
      <div className="mb-3 text-[13px] font-bold text-slate-900">이번 주 인기 계획 Top 5</div>
      <div className="flex flex-col gap-1">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onOpen(p)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50"
          >
            <span className="w-4 shrink-0 text-[12px] font-bold text-slate-400">{p.rank}</span>
            <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-200" />
            <div className="min-w-0 flex-1">
              <ScrollingTitle text={p.title} />
              <div className="truncate text-[10.5px] text-slate-400">{p.user.nickname}</div>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-rose-500">
              <Icon icon="mdi:heart" width={11} />
              {p.likeCount}
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}

// 제목이 길어 넘칠 때만, 그 행에 마우스를 올렸을 때만 좌우로 스크롤해 전체를 보여줌.
// 평소엔 가만히 있다가(정신 사납지 않게) hover 시에만 넘친 만큼 부드럽게 슬라이드.
function ScrollingTitle({ text }) {
  const textRef = useRef(null)
  const [overflow, setOverflow] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = textRef.current
    if (!el || !el.parentElement) return
    setOverflow(Math.max(0, el.scrollWidth - el.parentElement.clientWidth))
  }, [text])

  const scrolling = hovered && overflow > 0

  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        ref={textRef}
        className="inline-block text-[12px] font-bold text-slate-900"
        style={{
          transform: scrolling ? `translateX(-${overflow}px)` : 'translateX(0)',
          transitionProperty: 'transform',
          transitionDuration: scrolling ? `${Math.max(1.2, overflow / 30)}s` : '250ms',
          transitionTimingFunction: scrolling ? 'linear' : 'ease',
        }}
      >
        {text}
      </span>
    </div>
  )
}
