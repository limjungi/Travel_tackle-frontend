import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import OnboardingHeader from '../../components/onboarding/OnboardingHeader'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import logoIcon from '../../assets/logo-icon.svg'

const CHECKLIST = ['여행 취향 저장 완료', '맞춤 추천 준비 완료', '언제든 설정 변경 가능']

export default function CompletePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <OnboardingHeader>
      <div className="flex flex-col items-center text-center py-16 sm:py-24">
        <img src={logoIcon} alt="" className="w-28 h-28 sm:w-32 sm:h-32 mb-9 animate-float" />
        <p className="text-[16px] font-bold text-brand-dark mb-2">준비 완료</p>
        <h1 className="text-[36px] sm:text-[44px] leading-[1.2] font-extrabold tracking-tight text-slate-900 mb-4">
          모든 준비가 끝났어요! ✈️
        </h1>
        <p className="text-[17px] sm:text-[18px] text-slate-500 leading-relaxed mb-8">
          {user?.name}님만의 여행을
          <br />
          Travel참견이 함께 만들어드릴게요.
        </p>
        <ul className="flex flex-col items-start gap-2 mb-12">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[14.5px] text-slate-500">
              <Icon icon="solar:check-circle-bold" width={17} className="text-brand shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Button onClick={() => navigate('/')} className="h-14 px-12 rounded-xl font-bold text-[17px]">
          여행 시작하기
        </Button>
      </div>
    </OnboardingHeader>
  )
}
