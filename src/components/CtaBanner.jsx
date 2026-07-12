import { Icon } from '@iconify/react'
import Section from './ui/Section'
import Button from './ui/Button'

export default function CtaBanner() {
  return (
    <Section className="pb-16">
      <div
        className="rounded-3xl px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ background: 'linear-gradient(120deg,#0D9488,#0F766E)' }}
      >
        <div className="text-center md:text-left">
          <h2 className="text-[22px] font-extrabold text-white">지금 바로 첫 일정을 만들어보세요</h2>
          <p className="mt-2 text-[13.5px] text-teal-50/80">지금 시작하고, 다양한 여행지를 참고해보세요.</p>
        </div>
        <Button variant="invert" className="shrink-0 flex items-center gap-1.5 px-6 py-3 rounded-xl text-[13.5px] font-bold">
          지금 시작하기
          <Icon icon="solar:arrow-right-linear" width={16} />
        </Button>
      </div>
    </Section>
  )
}
