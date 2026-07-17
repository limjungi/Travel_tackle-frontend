import { useEffect, useRef } from 'react'
import TourCard from './TourCard'

export default function TourCardGrid({ spots, loading, loadingMore, hasMore, onLoadMore, onOpen, onAddToCart }) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!hasMore || loading) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore()
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-white animate-pulse">
            <div className="h-[150px] bg-slate-100" />
            <div className="p-3 space-y-2">
              <div className="h-3 w-2/3 bg-slate-100 rounded" />
              <div className="h-2.5 w-1/2 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (spots.length === 0) {
    return <div className="py-20 text-center text-[13px] text-slate-400">해당하는 관광지가 없어요.</div>
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {spots.map((spot) => (
          <TourCard key={spot.contentId} spot={spot} onOpen={onOpen} onAddToCart={onAddToCart} />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          {loadingMore && <span className="text-[12px] text-slate-300">다음 페이지 불러오는 중...</span>}
        </div>
      )}
    </div>
  )
}
