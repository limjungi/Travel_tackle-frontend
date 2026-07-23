export default function RegionChipRow({ regions, active, onSelect, layout = 'scroll', title }) {
  const containerClass =
    layout === 'grid'
      ? 'flex flex-wrap gap-2'
      : 'flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

  const chips = regions.map((r) => {
    const isActive = active === r
    return (
      <button
        key={r}
        type="button"
        onClick={() => onSelect(isActive ? null : r)}
        aria-pressed={isActive}
        className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all ${
          isActive ? 'border-brand bg-brand text-white' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
        }`}
      >
        {r}
      </button>
    )
  })

  // scroll 레이아웃(갤러리형 상단 고정 행)은 타이틀을 좌측에 나란히, grid 레이아웃(리스트뷰 사이드바)은 위에 쌓아서 표시
  if (layout === 'scroll' && title) {
    return (
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-[13px] font-bold text-slate-900">{title}</span>
        <div className={containerClass}>{chips}</div>
      </div>
    )
  }

  return (
    <div>
      {title && <div className="mb-2 text-[13px] font-bold text-slate-900">{title}</div>}
      <div className={containerClass}>{chips}</div>
    </div>
  )
}
