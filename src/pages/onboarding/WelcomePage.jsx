import { useNavigate } from 'react-router-dom'
import OnboardingHeader from '../../components/onboarding/OnboardingHeader'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import logoIcon from '../../assets/logo-icon.svg'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <OnboardingHeader>
      <div className="flex flex-col items-center text-center py-16 sm:py-24">
        <img src={logoIcon} alt="" className="w-28 h-28 sm:w-32 sm:h-32 mb-9 animate-float" />
        <p className="text-[16px] font-bold text-brand-dark mb-2">환영해요</p>
        <h1 className="text-[36px] sm:text-[44px] leading-[1.2] font-extrabold tracking-tight text-slate-900 mb-4">
          반가워요 {user?.name}님!
        </h1>
        <p className="text-[17px] sm:text-[18px] text-slate-500 leading-relaxed mb-12">
          나에게 맞는 여행을 위한
          <br />
          간단한 취향 설정을 시작해볼까요?
        </p>
        <Button
          onClick={() => navigate('/onboarding/preferences')}
          className="h-14 px-12 rounded-xl font-bold text-[17px]"
        >
          시작하기
        </Button>
      </div>
    </OnboardingHeader>
  )
}
