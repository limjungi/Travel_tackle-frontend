import { Icon } from '@iconify/react'
import Section from './ui/Section'
import IconBadge from './ui/IconBadge'
import Button from './ui/Button'
import logoHorizontal from '../assets/logo-horizontal.svg'

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-14 pb-8">
      <Section as="div" className="grid md:grid-cols-5 gap-8">

        <div className="md:col-span-1">
          <div className="flex items-center">
            <img src={logoHorizontal} alt="트레블 참견" className="h-[35px] w-auto" />
          </div>
          <p className="mt-3 text-[12px] text-slate-400 leading-relaxed">
            함께 만드는 더 좋은 여행
            <br />
            여러분의 참견이 여행을 더 특별하게 만듭니다.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <IconBadge className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400">
              <Icon icon="mdi:instagram" width={15} />
            </IconBadge>
            <IconBadge className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400">
              <Icon icon="mdi:youtube" width={15} />
            </IconBadge>
            <IconBadge className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400">
              <Icon icon="mdi:facebook" width={15} />
            </IconBadge>
            <IconBadge className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400">
              <Icon icon="ion:logo-buffer" width={15} />
            </IconBadge>
          </div>
        </div>

        <div>
          <div className="text-[12.5px] font-bold text-slate-800 mb-3">서비스</div>
          <ul className="space-y-2 text-[12px] text-slate-400">
            <li><a href="#" className="hover:text-slate-700">탐색</a></li>
            <li><a href="#" className="hover:text-slate-700">계획</a></li>
            <li><a href="#" className="hover:text-slate-700">피드</a></li>
            <li><a href="#" className="hover:text-slate-700">기록</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[12.5px] font-bold text-slate-800 mb-3">고객지원</div>
          <ul className="space-y-2 text-[12px] text-slate-400">
            <li><a href="#" className="hover:text-slate-700">도움말</a></li>
            <li><a href="#" className="hover:text-slate-700">문의하기</a></li>
            <li><a href="#" className="hover:text-slate-700">이용약관</a></li>
            <li><a href="#" className="hover:text-slate-700">개인정보처리방침</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[12.5px] font-bold text-slate-800 mb-3">회사</div>
          <ul className="space-y-2 text-[12px] text-slate-400">
            <li><a href="#" className="hover:text-slate-700">회사소개</a></li>
            <li><a href="#" className="hover:text-slate-700">블로그</a></li>
            <li><a href="#" className="hover:text-slate-700">제휴문의</a></li>
          </ul>
        </div>

        <div>
          <div className="text-[12.5px] font-bold text-slate-800 mb-3">뉴스레터 구독</div>
          <p className="text-[12px] text-slate-400 mb-3">여행 팁과 새로운 기능 소식을 받아보세요</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="이메일 주소 입력"
              className="flex-1 min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-brand/40"
            />
            <Button className="shrink-0 px-3.5 py-2 rounded-lg text-[12px] font-semibold">
              구독하기
            </Button>
          </div>
        </div>

      </Section>

      <Section as="div" className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
        <span className="text-[11.5px] text-slate-400">&copy; 2026 Travel Tackle. All rights reserved.</span>
        <IconBadge
          as="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 transition-all"
        >
          <Icon icon="solar:arrow-up-linear" width={14} />
        </IconBadge>
      </Section>
    </footer>
  )
}
