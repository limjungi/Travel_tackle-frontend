import { useEffect, useState } from 'react'
import client from '../api/client'

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
    <section className="max-w-[1180px] mx-auto px-6 pb-14">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[19px] font-bold text-slate-900">추천 관광지</h2>
        <a href="#" className="text-[12.5px] font-semibold text-slate-400 hover:text-slate-700 transition-all">더보기 &gt;</a>
      </div>

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
            <a key={s.contentId} href="#" className="lift block rounded-2xl overflow-hidden border border-slate-100 bg-white">
              <div className="relative">
                {s.imageUrl ? (
                  <img src={s.imageUrl} className="w-full h-[130px] object-cover" alt={s.title} loading="lazy" />
                ) : (
                  <div className="w-full h-[130px] bg-slate-100 flex items-center justify-center text-[11px] text-slate-400">
                    이미지 준비 중
                  </div>
                )}
                {s.address && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-700">
                    {s.address.split(' ')[0]}
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="text-[13px] font-bold text-slate-900">{s.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.address || ' '}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
