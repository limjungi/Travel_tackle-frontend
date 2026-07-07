import { useState } from 'react'
import { Icon } from '@iconify/react'
import Section from './ui/Section'
import IconBadge from './ui/IconBadge'
import logoHorizontal from '../assets/logo-horizontal.svg'

const navLinks = [
  { label: '탐색', active: true },
  { label: '계획' },
  { label: '피드' },
  { label: '기록' },
  { label: '마이페이지' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
      <Section as="div" padding="px-4 sm:px-6" className="flex items-center gap-6 h-16">
        <div className="flex items-center shrink-0">
          <img src={logoHorizontal} alt="트레블 참견" className="h-[35px] w-auto" />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              className={`px-3.5 py-2 rounded-lg text-[13.5px] transition-all whitespace-nowrap ${
                l.active
                  ? 'font-semibold text-slate-800 hover:bg-slate-50'
                  : 'font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <IconBadge as="button" className="relative w-9 h-9 rounded-full text-slate-400 hover:bg-slate-50 transition-all shrink-0">
            <Icon icon="solar:bell-linear" width={19} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
          </IconBadge>

          <button className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 transition-all shrink-0">
            <IconBadge className="w-7 h-7 rounded-full bg-brand-light shrink-0">
              <Icon icon="solar:user-bold" width={14} color="#0D9488" />
            </IconBadge>
            <span className="text-[12.5px] font-bold text-slate-700">123</span>
            <Icon icon="solar:alt-arrow-down-linear" width={12} color="#94A3B8" />
          </button>

          {/* Mobile menu toggle */}
          <IconBadge
            as="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full text-slate-500 hover:bg-slate-50 transition-all shrink-0"
            aria-label="메뉴 열기"
          >
            <Icon icon={menuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} width={20} />
          </IconBadge>
        </div>
      </Section>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-2">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              className={`block px-2 py-2.5 rounded-lg text-[14px] transition-all ${
                l.active ? 'font-semibold text-slate-800' : 'font-medium text-slate-500'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
