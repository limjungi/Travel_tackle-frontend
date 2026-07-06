const themes = ['맛집 코스', '인생샷 명소', '부모님 효도여행', '커플 여행', '반려동물 동반', '축제/행사']

export default function ThemeExplore() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 py-14 text-center">
      <h2 className="text-[20px] font-bold text-slate-900">테마별 찾아보기</h2>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {themes.map((t) => (
          <button
            key={t}
            className="px-4 py-2 rounded-full text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-brand hover:text-brand-dark transition-all"
          >
            {t}
          </button>
        ))}
      </div>
    </section>
  )
}
