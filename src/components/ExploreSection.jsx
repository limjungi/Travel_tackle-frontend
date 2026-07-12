import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Section from './ui/Section'
import client from '../api/client'

const TABS = [
  { label: '관광지 탐색', icon: 'solar:map-point-linear' },
  { label: '계획', icon: 'solar:document-text-linear' },
  { label: '기록', icon: 'solar:camera-linear' },
]
const REGIONS = ['전체', '서울', '부산', '제주', '강릉', '경주', '전주', '여수', '속초', '통영']

// 디자인 기본 데이터 (API 실패 시 폴백)
const FALLBACK = [
  { contentId: 'f1', title: '섭지코지', address: '제주 서귀포시', region: '제주', likes: 213 },
  { contentId: 'f2', title: '황리단길', address: '경북 경주시', region: '경주', likes: 185 },
  { contentId: 'f3', title: '흰여울문화마을', address: '부산 영도구', region: '부산', likes: 176 },
  { contentId: 'f4', title: '안목해변', address: '강원 강릉시', region: '강릉', likes: 162 },
  { contentId: 'f5', title: '전주한옥마을', address: '전북 전주시', region: '전주', likes: 148 },
  { contentId: 'f6', title: '남산서울타워', address: '서울 용산구', region: '서울', likes: 231 },
  { contentId: 'f7', title: '해운대해수욕장', address: '부산 해운대구', region: '부산', likes: 267 },
  { contentId: 'f8', title: '경복궁', address: '서울 종로구', region: '서울', likes: 289 },
  { contentId: 'f9', title: '전주 은행로', address: '전북 전주시', region: '전주', likes: 121 },
]

export default function ExploreSection() {
  const [tab, setTab] = useState('관광지 탐색')
  const [region, setRegion] = useState('전체')
  const [items, setItems] = useState(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    client
      .get('/tour/contents', { params: { contentTypeId: '12', arrange: 'A', size: 9, page: 1 } })
      .then((res) => {
        const list = res.data?.content || []
        if (!ignore && list.length) {
          setItems(list.map((s) => ({
            contentId: s.contentId,
            title: s.title,
            address: s.address || '',
            region: s.address ? s.address.split(' ')[0] : '',
            likes: Number((s.contentId || '').replace(/\D/g, '').slice(-3)) % 300 || 120,
          })))
        }
      })
      .catch(() => { /* 폴백 유지 */ })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [])

  return (
    <Section as="section" id="explore" className="py-14 sm:py-16">
      <h2 className="text-[22px] font-medium text-slate-900">좋은 여행은 좋은 참견에서 시작됩니다.</h2>

      {/* 주요 콘텐츠 탭 — 전체 너비에 균등 배치 */}
      <div className="mt-6 grid grid-cols-3 border-b border-slate-100">
        {TABS.map((t) => {
          const active = tab === t.label
          return (
            <button
              key={t.label}
              onClick={() => setTab(t.label)}
              aria-pressed={active}
              className="relative flex min-w-0 flex-col items-center gap-1.5 py-4 transition-colors"
            >
              <Icon icon={t.icon} width={19} color={active ? '#007ADB' : '#C4DAF0'} />
              <span className={`text-[12.5px] font-bold ${active ? 'text-[#2563EB]' : 'text-[#C4DAF0]'}`}>{t.label}</span>
              {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#2563EB]" />}
            </button>
          )
        })}
      </div>

      {/* 지역 칩 + 전체보기 */}
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-bold border transition-all ${
                region === r ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-[13px] font-bold text-slate-500 hover:bg-slate-50 transition-all">
          전체보기 <Icon icon="solar:magnifer-linear" width={16} />
        </button>
      </div>

      {/* 관광지 카드 그리드 */}
      {loading ? (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-white animate-pulse">
              <div className="w-full h-[130px] bg-slate-100" />
              <div className="p-3 space-y-2"><div className="h-3 w-2/3 bg-slate-100 rounded" /><div className="h-2.5 w-1/2 bg-slate-100 rounded" /></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((s) => (
            <a key={s.contentId} href="#" className="lift block rounded-2xl overflow-hidden border border-slate-100 bg-white">
              <div className="relative">
                {s.imageUrl ? (
                  <img src={s.imageUrl} className="w-full h-[130px] object-cover" alt={s.title} loading="lazy" />
                ) : (
                  <div className="w-full h-[130px] bg-gradient-to-br from-slate-100 to-slate-200" />
                )}
                {s.region && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#334155]">{s.region}</span>
                )}
              </div>
              <div className="p-3">
                <div className="text-[13px] font-bold text-slate-900 truncate">{s.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">{s.address || ' '}</div>
                <div className="mt-1.5 flex items-center gap-1 text-[#F43F5E]">
                  <Icon icon="solar:heart-bold" width={12} />
                  <span className="text-[11px] font-bold">{s.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}
