import { useState } from 'react'
import { Icon } from '@iconify/react'
import Section from './ui/Section'

// 뱃지 스타일: 여행 계획 / 여행 피드백 / 여행 기록
const BADGE = {
  '여행 계획': 'bg-[#EFF6FF] text-[#2563EB]',
  '여행 피드백': 'bg-[#FFFBEB] text-[#D97706]',
  '여행 기록': 'bg-[#F0FDFA] text-[#0F766E]',
}

const CARDS = [
  { kind: '여행 계획', title: '제주 3박 4일 힐링 코스, 이렇게 짜보세요', desc: '협재부터 애월까지, 이동시간을 최소화한 동선으로 짠 실제 여행자의 코스예요.', meta: '여행에니아 · 2026.07.06' },
  { kind: '여행 피드백', title: '부산 여행자 342명이 남긴 솔직 후기', desc: '"바다뷰 카페 순서까지 정리되어 있어서 사진 찍기 좋은 시간대까지 알 수 있었어요."', meta: 'busan_hero · 2026.07.05' },
  { kind: '여행 기록', title: '강릉 카페 투어, 사진으로 기록했어요', desc: '바다가 보이는 카페 5곳을 하루에 돌아본 기록, 동선과 웨이팅 팁까지 담았어요.', meta: '여행하는누나 · 2026.07.04' },
  { kind: '여행 계획', title: '경주 역사&맛집 코스, 동선까지 완벽 정리', desc: '대기시간까지 고려해서 짜준 동선이라 시간 낭비 없이 다녀올 수 있는 코스예요.', meta: 'trip_lover · 2026.07.03' },
  { kind: '여행 피드백', title: '전주 한옥마을, 실제 방문자 평가는?', desc: '골목 순서와 사진 찍기 좋은 시간대까지, 방문자들의 생생한 후기를 모았어요.', meta: '사진작가 · 2026.07.02' },
  { kind: '여행 기록', title: '제주 일몰 드라이브, 그 순간의 기록', desc: '서쪽 해안도로를 따라 달리며 만난 노을, 차 안에서 담은 순간들을 기록했어요.', meta: 'wanderlust · 2026.07.01' },
]

export default function AiSummaryFeed() {
  const [page, setPage] = useState(2) // 디자인상 3번째 도트 활성

  return (
    <section id="community" className="bg-white">
      <Section as="div" className="py-14 sm:py-16">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400">
          <span className="absolute left-5 top-0 bg-sky-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-b-lg">모아보기</span>
          <div className="flex items-center justify-between pl-20 pr-5 sm:pr-6 py-5 gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white font-bold text-[14px] sm:text-[15px] truncate">
                AI가 지금 뜨는 여행 계획 및 피드백 · 사용자 후기를 요약했어요
              </span>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white"><Icon icon="solar:magic-stick-3-bold" width={18} /></span>
          </div>
        </div>

        {/* 6장 카드 그리드 */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((c) => (
            <a key={c.title} href="#" className="lift block bg-white border border-slate-100 rounded-2xl p-4 pt-[18px]">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-[10.5px] font-bold ${BADGE[c.kind]}`}>{c.kind}</span>
              <div className="mt-2 text-[14px] font-bold text-slate-900 leading-snug">{c.title}</div>
              <p className="mt-1.5 text-[12px] leading-[1.65] text-slate-500 line-clamp-2">{c.desc}</p>
              <div className="mt-2 text-[11.5px] text-slate-400">{c.meta}</div>
            </a>
          ))}
        </div>

        {/* 도트 */}
        <div className="mt-6 flex justify-center gap-2.5">
          {[0, 1, 2].map((i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-3.5 h-3.5 rounded-full transition-all ${i === page ? 'bg-[#2563EB]' : 'bg-[#D9D9D9]'}`} aria-label={`페이지 ${i + 1}`} />
          ))}
        </div>
      </Section>
    </section>
  )
}
