import { useState } from 'react'
import { Icon } from '@iconify/react'
import Card from '../ui/Card'

export default function TourCard({ spot, onOpen, onAddToCart }) {
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleQuickAdd(e) {
    e.stopPropagation()
    if (added || loading) return
    setLoading(true)
    const ok = await onAddToCart(spot.contentId)
    setLoading(false)
    if (ok) setAdded(true)
  }

  return (
    <Card
      as="div"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(spot)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(spot)
      }}
      className="relative block w-full cursor-pointer overflow-hidden text-left"
    >
      <div className="relative">
        {spot.imageUrl ? (
          <img src={spot.imageUrl} className="h-[150px] w-full object-cover" alt={spot.title} loading="lazy" />
        ) : (
          <div className="h-[150px] w-full bg-gradient-to-br from-slate-200 to-slate-300" />
        )}
        <button
          onClick={handleQuickAdd}
          disabled={loading}
          aria-label="카트에 담기"
          className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-card transition-colors ${
            added ? 'text-brand' : 'text-slate-600 hover:text-brand'
          }`}
        >
          <Icon icon={added ? 'solar:cart-check-bold' : 'solar:cart-large-2-linear'} width={16} />
        </button>
      </div>
      <div className="p-3">
        <div className="truncate text-[13px] font-bold text-slate-900">{spot.title}</div>
        <div className="mt-0.5 truncate text-[11px] text-slate-400">{spot.address || ' '}</div>
      </div>
    </Card>
  )
}
