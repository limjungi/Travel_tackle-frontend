import { Icon } from '@iconify/react'
import Section from './ui/Section'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#F0F7FD] to-white">
      <Section as="div" className="pt-16 pb-32 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-[38px] leading-[1.25] font-extrabold tracking-tight text-slate-900">
            여행의 시작부터 완성까지,
            <br />
            우리의 <span className="text-brand">참견</span>이 여행이 됩니다
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-500">
            다른 사람의 경험과 의견을 더해
            <br />
            더 나은 여행 계획을 만들어보세요.
          </p>

          <div
            className="mt-8 flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                       focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand/10 transition-all max-w-lg"
          >
            <Icon icon="solar:magnifer-linear" width={19} color="#94A3B8" className="shrink-0 ml-2.5" />
            <input
              type="text"
              placeholder="여행지, 키워드, 트래블태그로 검색해보세요"
              className="bg-transparent border-none outline-none text-[14px] text-slate-900 placeholder-slate-400 flex-1 min-w-0"
            />
            <Button className="shrink-0 px-5 py-2.5 rounded-xl text-[13.5px] font-bold">
              검색하기
            </Button>
          </div>
        </div>

        {/* Illustration: two overlapping phones — one giving feedback, one receiving it */}
        <div className="relative h-[420px] flex items-center justify-center">
          <div className="absolute w-[320px] h-[320px] rounded-full bg-brand-light" />

          {/* Floating "이 코스 추천해요!" card — two speech bubbles conversing */}
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 z-30 flex items-center gap-3 bg-white rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.16)] pl-3 pr-4 py-2.5 border border-slate-100">
            <div className="relative w-9 h-8 shrink-0">
              <div
                className="absolute left-0 bottom-0 w-7 h-[22px] bg-sky-500"
                style={{ borderRadius: '10px 10px 10px 2px' }}
              />
              <div
                className="absolute right-0 top-0 w-[22px] h-[18px] bg-brand"
                style={{ borderRadius: '9px 9px 2px 9px' }}
              />
            </div>
            <span className="text-[12px] font-semibold text-slate-700 whitespace-nowrap">이 코스 추천해요!</span>
          </div>

          {/* Back phone — receiving feedback (itinerary map + incoming notification) */}
          <div
            className="absolute z-10"
            style={{ transform: 'rotate(-11deg) translate(-56px, -6px)' }}
          >
            {/* Black phone frame */}
            <div className="w-[196px] h-[306px] bg-slate-900 rounded-[38px] p-[6px] shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
              <div className="relative w-full h-full bg-white rounded-[30px] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-slate-900 rounded-b-xl z-30" />

                <div className="flex items-center justify-between px-3.5 pt-2.5 text-[9px] font-semibold text-slate-700">
                  <span>9:41</span>
                  <span className="flex gap-1">
                    <Icon icon="lucide:wifi" width={10} />
                    <Icon icon="lucide:battery" width={12} />
                  </span>
                </div>
                <div
                  className="relative mx-3 mt-2.5 h-[248px] rounded-2xl overflow-hidden"
                  style={{ background: 'linear-gradient(160deg,#CCFBF1,#A7F3D0 60%,#FDE68A)' }}
                >
                  <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full">
                    <path
                      d="M 36 224 C 64 180, 26 152, 54 116 S 128 80, 108 44 S 144 26 136 16"
                      fill="none"
                      stroke="#0D9488"
                      strokeWidth="3"
                      strokeDasharray="1 8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute" style={{ left: 26, top: 206 }}>
                    <Icon icon="solar:map-point-bold" width={22} color="#0D9488" />
                  </div>
                  <div className="absolute" style={{ left: 44, top: 98 }}>
                    <Icon icon="solar:map-point-bold" width={19} color="#0F766E" />
                  </div>
                  <div className="absolute" style={{ left: 98, top: 28 }}>
                    <Icon icon="solar:map-point-bold" width={22} color="#0D9488" />
                  </div>
                </div>

                {/* Incoming feedback toast, peeking off the top edge */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[160px] flex items-center gap-2 bg-white rounded-xl shadow-[0_10px_24px_rgba(15,23,42,0.16)] px-2.5 py-2 border border-slate-100 z-20">
                  <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
                    <Icon icon="solar:chat-round-dots-bold" width={12} color="white" />
                  </div>
                  <span className="text-[9.5px] font-bold text-slate-700 leading-tight">새 참견이 도착했어요!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Front phone — giving feedback (comment composer) */}
          <div
            className="absolute z-20"
            style={{ transform: 'rotate(8deg) translate(60px, 26px)' }}
          >
            {/* Black phone frame */}
            <div className="w-[212px] h-[326px] bg-slate-900 rounded-[40px] p-[6px] shadow-[0_28px_64px_rgba(15,23,42,0.24)]">
              <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-b-xl z-30" />

                <div className="flex items-center justify-between px-4 pt-2.5 text-[9px] font-semibold text-slate-700">
                  <span>9:41</span>
                  <span className="flex gap-1">
                    <Icon icon="lucide:wifi" width={10} />
                    <Icon icon="lucide:battery" width={12} />
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-4 mt-2">
                  <Icon icon="solar:alt-arrow-left-linear" width={13} color="#94A3B8" />
                  <span className="text-[11px] font-bold text-slate-800">성산일출봉 코스</span>
                </div>

                <div className="mt-4 px-3.5 space-y-2.5">
                  <div className="flex items-start gap-1.5">
                    <img src="https://picsum.photos/seed/hero-peer/40/40" className="w-6 h-6 rounded-full object-cover shrink-0" alt="" />
                    <div className="bg-slate-100 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[140px]">
                      <p className="text-[10px] leading-snug text-slate-600">여기 뷰 완전 미쳤어요, 꼭 가보세요 🌊</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 flex-row-reverse">
                    <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                      <Icon icon="solar:user-bold" width={12} color="#0D9488" />
                    </div>
                    <div className="bg-brand rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[140px]">
                      <p className="text-[10px] leading-snug text-white">오 저장할게요! 감사해요 :)</p>
                    </div>
                  </div>
                </div>

                {/* Composer input */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full pl-3 pr-1 py-1">
                  <span className="flex-1 text-[10px] text-slate-400">참견 남기기...</span>
                  <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
                    <Icon icon="solar:plain-2-bold" width={12} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  )
}
