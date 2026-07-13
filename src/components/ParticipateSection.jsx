import { useState } from 'react'
import { Icon } from '@iconify/react'
import Section from './ui/Section'

// Day별 일정 (참견 대상 계획)
const DAYS = [
  { day: 'Day 1', date: '월 6일', places: ['협재해수욕장', '애월 카페거리'] },
  { day: 'Day 2', date: '화 7일', places: ['한림공원', '한담 해안산책로'] },
  { day: 'Day 3', date: '수 8일', places: ['협재 흑돼지거리'] },
  { day: 'Day 4', date: '목 9일', places: ['공항 이동', '기념품 쇼핑'] },
]

const QUICK = ['동선이 좋아요 👍', '여기도 가보세요 📍', '시간이 촉박해보여요 ⏱️']

export default function ParticipateSection() {
  const [text, setText] = useState('')

  return (
    <Section as="section" id="participate" className="py-14 sm:py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-bold text-slate-900">다른 여행자의 계획에 직접 <span className="text-brand font-extrabold">참견</span>해보세요</h2>
        <button className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3.5 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Icon icon="solar:refresh-linear" width={14} /> 다른 계획 보기
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* 왼쪽: Day별 일정 */}
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-extrabold text-slate-900">제주 서쪽 감성 로드</div>
              <div className="text-[11px] text-slate-400 mt-0.5">7월 6일(월) ~ 7월 9일(목)</div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center" aria-label="이전">
                <Icon icon="solar:alt-arrow-left-linear" width={13} color="#94A3B8" />
              </button>
              <button className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center" aria-label="다음">
                <Icon icon="solar:alt-arrow-right-linear" width={13} color="#94A3B8" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DAYS.map((d) => (
              <div key={d.day} className="bg-white border border-slate-100 rounded-2xl p-2.5">
                <div className="text-[9.5px] font-bold text-slate-400">{d.day}</div>
                <div className="text-[12px] font-bold text-slate-700 mb-2">{d.date}</div>
                <div className="flex flex-col gap-1">
                  {d.places.map((p) => (
                    <div key={p} className="flex items-center gap-1 bg-[#007ADB] rounded-md px-1.5 py-1">
                      <Icon icon="solar:map-point-bold" width={10} color="white" className="shrink-0" />
                      <span className="text-[10.5px] font-bold text-white truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 참견 입력 */}
        <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] font-extrabold text-slate-900">제주 서쪽 감성 로드</div>
              <div className="text-[11.5px] text-slate-400 mt-0.5">3박 4일 · 15개 장소</div>
            </div>
            <span className="flex items-center gap-1 text-[#F43F5E] text-[10.6px] font-bold">
              <Icon icon="solar:heart-bold" width={13} /> 342
            </span>
          </div>

          <div className="mt-3 text-[13px] font-bold text-[#334155]">이 계획, 어떻게 생각하세요?</div>

          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => setText((t) => (t ? t + ' ' : '') + q)}
                className="bg-white border border-slate-200 rounded-full px-3 py-1.5 text-[11.8px] font-semibold text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="직접 참견을 남겨보세요"
            rows={3}
            className="mt-4 w-full resize-none bg-white border border-slate-200 rounded-2xl p-3 text-[13px] text-slate-700 placeholder-slate-400 outline-none focus:border-[#2563EB] transition-all"
          />

          <button className="mt-3 self-end bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12.5px] font-bold rounded-xl px-5 py-2.5 transition-all">
            참견 남기기
          </button>
        </div>
      </div>
    </Section>
  )
}
