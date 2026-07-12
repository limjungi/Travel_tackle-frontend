import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import Card from './ui/Card'

const records = [
  { seed: 'rec-jeju-sunset', user: 'user6', name: 'wanderlust', title: '제주 일몰 드라이브' },
  { seed: 'rec-gangneung-solo', user: 'user7', name: '여행하는누나', title: '강릉 혼자 여행' },
  { seed: 'rec-busan-window', user: 'user8', name: '힐링한여행', title: '부산 2박 3일 기록' },
  { seed: 'rec-gyeongju-field', user: 'user9', name: 'green_day', title: '경주 감성 산책' },
  { seed: 'rec-jeonju-spring', user: 'user10', name: '사진작가', title: '전주 봄날의 기록' },
]

export default function PopularRecords() {
  return (
    <Section className="pb-16">
      <SectionHeader title="인기 기록" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {records.map((r) => (
          <Card key={r.seed} as="a" href="#" className="block overflow-hidden">
            <img src={`https://picsum.photos/seed/${r.seed}/320/220`} className="w-full h-[150px] object-cover" alt={r.title} />
            <div className="p-3">
              <div className="flex items-center gap-1.5">
                <img src={`https://picsum.photos/seed/${r.user}/40/40`} className="w-5 h-5 rounded-full object-cover" alt={r.name} />
                <span className="text-[11px] font-semibold text-slate-500">{r.name}</span>
              </div>
              <div className="text-[13px] font-bold text-slate-900 mt-1.5">{r.title}</div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
