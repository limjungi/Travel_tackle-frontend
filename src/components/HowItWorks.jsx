import { Icon } from '@iconify/react'

const steps = [
  {
    num: '01',
    icon: 'solar:users-group-rounded-bold-duotone',
    title: '커뮤니티 참여하기',
    desc: '다른 여행자들의 경험과 노하우를 자유롭게 나눠보세요.',
  },
  {
    num: '02',
    icon: 'solar:notebook-bold-duotone',
    title: '초안 일정 짜보기',
    desc: '가고 싶은 장소를 담아 나만의 여행 초안을 만들어보세요.',
  },
  {
    num: '03',
    icon: 'solar:chat-round-dots-bold-duotone',
    title: '현지인의 참견받기',
    desc: '현지인과 여행자들의 참견을 더해 완성도 높은 일정을 완성하세요.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#EFFBF9] py-16">
      <div className="max-w-[1180px] mx-auto px-6 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold text-brand-dark bg-white border border-brand/20">
          HOW IT WORKS
        </span>
        <h2 className="mt-4 text-[26px] font-extrabold tracking-tight text-slate-900">
          세 단계, 현지인이 봐주는 일정 완성
        </h2>
        <p className="mt-2 text-[14px] text-slate-500">
          복잡한 여행 준비, 현지인의 참견을 더해 3단계로 간단하게 완성하세요.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="lift bg-white border border-slate-100 rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center">
                  <Icon icon={s.icon} width={22} color="#0D9488" />
                </div>
                <span className="text-[22px] font-extrabold text-slate-200">{s.num}</span>
              </div>
              <div className="mt-4 text-[15px] font-bold text-slate-900">{s.title}</div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
