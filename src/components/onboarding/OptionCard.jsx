import { Icon } from '@iconify/react'

export default function OptionCard({ option, selected, multiple, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full flex items-center gap-2.5 rounded-xl border-2 px-4 py-3 text-left transition-all ${
        selected ? 'border-brand bg-brand-light' : 'border-slate-100 bg-slate-50 hover:border-slate-200'
      }`}
    >
      <span className="text-[20px] leading-none shrink-0">{option.icon}</span>
      <span className="flex-1 min-w-0">
        <span className={`block text-[14px] font-bold ${selected ? 'text-brand-dark' : 'text-slate-800'}`}>
          {option.label}
        </span>
        {option.description && (
          <span className="block text-[12px] text-slate-500 mt-0.5">{option.description}</span>
        )}
      </span>
      <span
        className={`w-4 h-4 shrink-0 flex items-center justify-center border-2 transition-all ${
          multiple ? 'rounded-md' : 'rounded-full'
        } ${selected ? 'bg-brand border-brand' : 'border-slate-300 bg-white'}`}
      >
        {selected && <Icon icon="solar:check-bold" width={10} color="white" />}
      </span>
    </button>
  )
}
