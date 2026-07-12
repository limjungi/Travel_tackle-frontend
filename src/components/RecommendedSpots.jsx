import { useEffect, useState } from 'react'
import client from '../api/client'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import Card from './ui/Card'
import Chip from './ui/Chip'

export default function RecommendedSpots() {
  const [spots, setSpots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .get('/tour/recommended')
      .then((res) => {
        const sections = res.data?.sections || []
        const items = sections.flatMap((s) => s.items || []).slice(0, 5)
        setSpots(items)
      })
      .catch(() => setSpots([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Section className="pb-14">
      <SectionHeader title="추천 관광지" />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-white animate-pulse">
              <div className="w-full h-[130px] bg-slate-100" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-2/3 bg-slate-100 rounded" />
                <div className="h-2.5 w-1/2 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : spots.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-[13px] text-slate-400">
          로그인하면 취향에 맞는 추천 관광지를 보여드려요.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {spots.map((s) => (
            <Card key={s.contentId} as="a" href="#" className="block overflow-hidden">
              <div className="relative">
                {s.imageUrl ? (
                  <img src={s.imageUrl} className="w-full h-[130px] object-cover" alt={s.title} loading="lazy" />
                ) : (
                  <div className="w-full h-[130px] bg-slate-100 flex items-center justify-center text-[11px] text-slate-400">
                    이미지 준비 중
                  </div>
                )}
                {s.address && (
                  <Chip className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-white/90 text-slate-700">
                    {s.address.split(' ')[0]}
                  </Chip>
                )}
              </div>
              <div className="p-3">
                <div className="text-[13px] font-bold text-slate-900">{s.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.address || ' '}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  )
}
