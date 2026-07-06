const records = [
  { seed: 'rec-jeju-sunset', user: 'user6', name: 'wanderlust', title: '제주 일몰 드라이브' },
  { seed: 'rec-gangneung-solo', user: 'user7', name: '여행하는누나', title: '강릉 혼자 여행' },
  { seed: 'rec-busan-window', user: 'user8', name: '힐링한여행', title: '부산 2박 3일 기록' },
  { seed: 'rec-gyeongju-field', user: 'user9', name: 'green_day', title: '경주 감성 산책' },
  { seed: 'rec-jeonju-spring', user: 'user10', name: '사진작가', title: '전주 봄날의 기록' },
]

export default function PopularRecords() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 pb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[19px] font-bold text-slate-900">인기 기록</h2>
        <a href="#" className="text-[12.5px] font-semibold text-slate-400 hover:text-slate-700 transition-all">더보기 &gt;</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {records.map((r) => (
          <a key={r.seed} href="#" className="lift block rounded-2xl overflow-hidden border border-slate-100 bg-white">
            <img src={`https://picsum.photos/seed/${r.seed}/320/220`} className="w-full h-[150px] object-cover" alt={r.title} />
            <div className="p-3">
              <div className="flex items-center gap-1.5">
                <img src={`https://picsum.photos/seed/${r.user}/40/40`} className="w-5 h-5 rounded-full object-cover" alt={r.name} />
                <span className="text-[11px] font-semibold text-slate-500">{r.name}</span>
              </div>
              <div className="text-[13px] font-bold text-slate-900 mt-1.5">{r.title}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
