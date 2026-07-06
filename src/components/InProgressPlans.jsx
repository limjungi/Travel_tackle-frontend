import { Icon } from '@iconify/react'

const plans = [
  { title: '제주도 3박 4일 힐링 여행', date: '2026.07.06 ~ 2026.07.09', progress: 60 },
  { title: '부산 2박 3일 맛집 투어', date: '2026.07.10 ~ 2026.07.12', progress: 35 },
  { title: '강릉 감성 여행', date: '2026.07.15 ~ 2026.07.17', progress: 20 },
  { title: '전주 한옥 감성 여행', date: '2026.07.20 ~ 2026.07.21', progress: 40 },
]

export default function InProgressPlans() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 pb-14">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[19px] font-bold text-slate-900">작성 중인 계획</h2>
        <a href="#" className="text-[12.5px] font-semibold text-slate-400 hover:text-slate-700 transition-all">더보기 &gt;</a>
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div key={p.title} className="lift bg-white border border-slate-100 rounded-2xl p-4">
              <Icon icon="solar:map-point-bold-duotone" width={20} color="#0D9488" />
              <div className="mt-2 text-[14.5px] font-bold text-slate-900 leading-snug">{p.title}</div>
              <div className="text-[11px] text-slate-400 mt-1">{p.date}</div>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-brand-mid to-brand rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-[10.5px] font-semibold text-slate-400">{p.progress}%</span>
              </div>
              <button className="mt-3 w-full py-2 rounded-lg text-[12px] font-semibold text-brand-dark bg-brand-light hover:bg-teal-100 transition-all">
                이어하기
              </button>
            </div>
          ))}
        </div>

        <button className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 items-center justify-center hover:bg-slate-50 transition-all">
          <Icon icon="solar:alt-arrow-right-linear" width={16} color="#64748B" />
        </button>
      </div>
    </section>
  )
}
