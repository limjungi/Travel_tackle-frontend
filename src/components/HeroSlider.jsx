import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import Section from './ui/Section'

const STEPS = [
  {
    tag: 'STEP 1 · 계획',
    title: '가고 싶은 여행을 계획해요',
    desc: '관심 지역과 취향을 고르면 날짜별 일정을 쉽게 만들 수 있어요.',
    icon: 'solar:map-linear',
    bg: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)',
    color: '#2563EB',
  },
  {
    tag: 'STEP 2 · 참견',
    title: '다른 여행자에게 참견받아요',
    desc: '현지인과 여행 고수의 솔직한 참견으로 일정을 더 탄탄하게 다듬어요.',
    icon: 'solar:chat-round-dots-linear',
    bg: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)',
    color: '#4F46E5',
  },
  {
    tag: 'STEP 3 · 완성',
    title: '나만의 여행을 완성해요',
    desc: '검증된 코스로 여행을 떠나고, 기록으로 남겨 다음 여행자에게 이어줘요.',
    icon: 'solar:check-circle-linear',
    bg: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
    color: '#0F766E',
  },
]

export default function HeroSlider() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timer = useRef(null)
  const total = STEPS.length
  const go = (distance) => setIdx((current) => (current + distance + total) % total)

  useEffect(() => {
    if (!playing) return undefined
    timer.current = setInterval(() => setIdx((current) => (current + 1) % total), 4500)
    return () => clearInterval(timer.current)
  }, [playing, total])

  const previous = STEPS[(idx - 1 + total) % total]
  const current = STEPS[idx]
  const next = STEPS[(idx + 1) % total]

  const SideCard = ({ step }) => (
    <div className="hidden lg:flex w-[190px] xl:w-[220px] h-[360px] shrink-0 rounded-2xl border border-slate-100 bg-slate-50/80 flex-col items-center justify-center px-6 text-center opacity-70">
      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
        <Icon icon={step.icon} width={21} color={step.color} />
      </div>
      <p className="text-[11px] font-extrabold" style={{ color: step.color }}>{step.tag}</p>
      <p className="mt-2 text-[14px] leading-snug font-bold text-slate-500">{step.title}</p>
    </div>
  )

  return (
    <section className="bg-white">
      <Section as="div" className="pt-8 pb-10">
        <h1 className="text-center text-[26px] sm:text-[30px] font-extrabold tracking-tight text-slate-900">
          <span className="text-brand">계획</span>하고, <span className="text-brand">참견</span>받고, 여행을 <span className="text-brand">완성</span>하세요
        </h1>

        <div className="mt-6 flex items-stretch justify-center gap-4 xl:gap-5">
          <SideCard step={previous} />

          <div className="relative w-full max-w-[760px] h-[360px] rounded-[22px] border border-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.09)] overflow-hidden">
            <button onClick={() => go(-1)} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-sm transition-colors" aria-label="이전">
              <Icon icon="solar:alt-arrow-left-linear" width={19} className="text-slate-400" />
            </button>
            <button onClick={() => go(1)} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-sm transition-colors" aria-label="다음">
              <Icon icon="solar:alt-arrow-right-linear" width={19} className="text-slate-400" />
            </button>

            <div className="h-full flex flex-col justify-center px-14 sm:px-16" style={{ background: current.bg }}>
              <div className="w-14 h-14 rounded-2xl bg-white/75 flex items-center justify-center mb-4 shadow-sm">
                <Icon icon={current.icon} width={27} color={current.color} />
              </div>
              <p className="text-[12px] font-extrabold" style={{ color: current.color }}>{current.tag}</p>
              <h2 className="mt-2 text-[23px] sm:text-[27px] font-extrabold text-slate-800">{current.title}</h2>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-slate-600 max-w-md">{current.desc}</p>
            </div>

            <div className="absolute bottom-5 right-6 flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500">{idx + 1} / {total}</span>
              <button onClick={() => setPlaying((value) => !value)} className="w-6 h-6 rounded-full bg-white/70 hover:bg-white flex items-center justify-center transition-colors" aria-label={playing ? '일시정지' : '재생'}>
                <Icon icon={playing ? 'solar:pause-bold' : 'solar:play-bold'} width={9} className="text-slate-700" />
              </button>
            </div>
          </div>

          <SideCard step={next} />
        </div>

        <div className="mt-5 flex justify-center gap-1.5">
          {STEPS.map((step, index) => (
            <button key={step.tag} onClick={() => setIdx(index)} className={`h-1.5 rounded-full transition-all ${index === idx ? 'w-5 bg-brand' : 'w-1.5 bg-slate-300'}`} aria-label={`스텝 ${index + 1}`} />
          ))}
        </div>
      </Section>
    </section>
  )
}
