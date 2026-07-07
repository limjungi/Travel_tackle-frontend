import { Icon } from '@iconify/react'
import Section from './ui/Section'
import Card from './ui/Card'
import IconBadge from './ui/IconBadge'

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
    <Section className="pt-4 pb-14">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {categories.map((c) => (
          <Card
            key={c.label}
            as="a"
            href="#"
            shadow
            className="flex flex-col items-center gap-2.5 py-6 transition-all"
          >
            <IconBadge className={`w-12 h-12 rounded-full ${c.bg}`}>
              <Icon icon={c.icon} width={22} color={c.color} />
            </IconBadge>
            <span className="text-[12.5px] font-semibold text-slate-700">{c.label}</span>
          </Card>
        ))}
      </div>
    </Section>
  )
}
