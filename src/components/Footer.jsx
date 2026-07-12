import Section from './ui/Section'
import logoHorizontal from '../assets/logo-horizontal.svg'

const FOOTER_GROUPS = [
  {
    title: '서비스',
    links: ['서비스 소개', '관광지 탐색', '여행자 피드', '나의 여행'],
  },
  {
    title: '고객지원',
    links: ['자주 묻는 질문', '이용약관', '개인정보처리방침'],
  },
  {
    title: 'Contact',
    links: ['Instagram', 'GitHub', 'Email'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-[#F4F7FA]">
      <Section as="div" className="grid gap-9 py-9 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(3,0.7fr)] lg:gap-14">
        <div>
          <img src={logoHorizontal} alt="트레블 참견" className="h-8 w-auto" />
          <p className="mt-2 text-[11.5px] text-slate-400">함께 만드는 더 좋은 여행</p>
          <p className="mt-6 text-[10.5px] text-slate-300">© 2026 Travel Tackle. All rights reserved.</p>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-[11.5px] font-bold text-slate-700">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[10.5px] text-slate-400 transition-colors hover:text-slate-700">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </footer>
  )
}
