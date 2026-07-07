import { Icon } from '@iconify/react'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import Card from './ui/Card'

const plans = [
  { seed: 'plan-jeju', user: 'user1', name: '여행에니아', title: '제주 서쪽 감성 로드', meta: '3박 4일 · 15개 장소', likes: 342 },
  { seed: 'plan-gyeongju', user: 'user2', name: 'trip_lover', title: '경주 역사&맛집 코스', meta: '2박 3일 · 12개 장소', likes: 298 },
  { seed: 'plan-busan', user: 'user3', name: 'busan_hero', title: '부산 바다뷰 힐링 여행', meta: '2박 3일 · 10개 장소', likes: 276 },
  { seed: 'plan-gangneung', user: 'user4', name: 'plan_master', title: '강릉 카페 투어 코스', meta: '1박 2일 · 8개 장소', likes: 231 },
  { seed: 'plan-jeonju', user: 'user5', name: '어행하는123', title: '전주 감성 골목 투어', meta: '1박 2일 · 9개 장소', likes: 198 },
]

export default function PopularPlans() {
  return (
    <Section className="pb-14">
      <SectionHeader title="인기 계획" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {plans.map((p) => (
          <Card key={p.seed} as="a" href="#" className="block overflow-hidden">
            <img src={`https://picsum.photos/seed/${p.seed}/320/220`} className="w-full h-[120px] object-cover" alt={p.title} />
            <div className="p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <img src={`https://picsum.photos/seed/${p.user}/40/40`} className="w-5 h-5 rounded-full object-cover" alt={p.name} />
                <span className="text-[11px] font-semibold text-slate-500">{p.name}</span>
              </div>
              <div className="text-[13px] font-bold text-slate-900">{p.title}</div>
              <div className="text-[11px] text-slate-400 mt-1">{p.meta}</div>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-rose-500 font-semibold">
                <Icon icon="solar:heart-bold" width={11} />
                {p.likes}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
