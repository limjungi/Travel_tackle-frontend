import { Icon } from '@iconify/react'

const categories = [
  { label: '관광지 탐색', icon: 'solar:compass-linear', bg: 'bg-brand-light', color: '#0D9488' },
  { label: '맛집', icon: 'mdi:cupcake', bg: 'bg-amber-50', color: '#D97706' },
  { label: '카페', icon: 'solar:cup-hot-linear', bg: 'bg-orange-50', color: '#EA580C' },
  { label: '숙소', icon: 'solar:home-2-linear', bg: 'bg-indigo-50', color: '#4F46E5' },
  { label: '축제/행사', icon: 'solar:ticket-linear', bg: 'bg-rose-50', color: '#E11D48' },
  { label: '전체보기', icon: 'solar:magnifer-linear', bg: 'bg-emerald-50', color: '#059669' },
]

export default function CategoryQuickLinks() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 pt-4 pb-14">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {categories.map((c) => (
          <a
            key={c.label}
            href="#"
            className="lift flex flex-col items-center gap-2.5 bg-white border border-slate-100 rounded-2xl py-6 shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all"
          >
            <div className={`w-12 h-12 rounded-full ${c.bg} flex items-center justify-center`}>
              <Icon icon={c.icon} width={22} color={c.color} />
            </div>
            <span className="text-[12.5px] font-semibold text-slate-700">{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
