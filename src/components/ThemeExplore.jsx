import Section from './ui/Section'
import Chip from './ui/Chip'

const themes = ['맛집 코스', '인생샷 명소', '부모님 효도여행', '커플 여행', '반려동물 동반', '축제/행사']

export default function ThemeExplore() {
  return (
    <Section className="py-14 text-center">
      <h2 className="text-[20px] font-bold text-slate-900">테마별 찾아보기</h2>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {themes.map((t) => (
          <Chip
            key={t}
            as="button"
            className="px-4 py-2 text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-brand hover:text-brand-dark transition-all"
          >
            {t}
          </Chip>
        ))}
      </div>
    </Section>
  )
}
