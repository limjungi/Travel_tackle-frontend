import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingHeader from '../../components/onboarding/OnboardingHeader'
import OptionCard from '../../components/onboarding/OptionCard'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import * as preferencesApi from '../../api/preferences'
import { INTEREST_TAGS, TRAVEL_STYLES, BUDGET_LEVELS, PREFERRED_REGIONS } from '../../data/preferenceOptions'

const STEPS = [
  {
    key: 'interestTags',
    multiple: true,
    title: '이번 여행에서 가장 끌리는 것은 무엇인가요?',
    options: INTEREST_TAGS,
    grid: 'grid-cols-2 sm:grid-cols-3',
  },
  {
    key: 'travelStyle',
    multiple: false,
    title: '여행할 때 어떤 스타일에 가까우신가요?',
    options: TRAVEL_STYLES,
    grid: 'grid-cols-1',
  },
  {
    key: 'budgetLevel',
    multiple: false,
    title: '여행에서 소비하는 편은 어느 쪽인가요?',
    subtitle: '숙박비/항공권 제외',
    options: BUDGET_LEVELS,
    grid: 'grid-cols-1 sm:grid-cols-2',
  },
  {
    key: 'preferredRegions',
    multiple: true,
    title: '가고 싶은 지역이 있으신가요?',
    options: PREFERRED_REGIONS,
    grid: 'grid-cols-2 sm:grid-cols-3',
  },
]

export default function PreferenceWizard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({
    interestTags: new Set(),
    travelStyle: null,
    budgetLevel: null,
    preferredRegions: new Set(),
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const step = STEPS[stepIndex]
  const value = answers[step.key]
  const isAnswered = step.multiple ? value.size > 0 : value != null

  const toggleOption = (optionValue) => {
    setAnswers((prev) => {
      if (step.multiple) {
        const next = new Set(prev[step.key])
        if (next.has(optionValue)) {
          next.delete(optionValue)
        } else {
          next.add(optionValue)
        }
        return { ...prev, [step.key]: next }
      }
      return { ...prev, [step.key]: optionValue }
    })
  }

  const handleSkip = () => {
    if (window.confirm('선호도 설정을 건너뛸까요? 나중에 마이페이지에서 언제든 설정할 수 있어요.')) {
      navigate('/')
    }
  }

  const handlePrev = () => {
    if (stepIndex === 0) {
      navigate('/onboarding/welcome')
    } else {
      setStepIndex((i) => i - 1)
    }
  }

  const handleNext = async () => {
    if (!isAnswered) return
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1)
      return
    }

    setError('')
    setSubmitting(true)
    try {
      await preferencesApi.createPreferences({
        interestTags: Array.from(answers.interestTags),
        travelStyle: answers.travelStyle,
        budgetLevel: answers.budgetLevel,
        preferredRegions: Array.from(answers.preferredRegions),
      })
      navigate('/onboarding/complete')
    } catch {
      setError('선호도 저장에 실패했어요. 잠시 후 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <OnboardingHeader>
      <div className="max-w-[560px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[22px] sm:text-[26px] leading-[1.25] font-extrabold tracking-tight text-slate-900">
            {user?.name}님의 여행 취향을 알려주세요 ✈️
          </h1>
          <p className="text-[13.5px] text-slate-500 mt-2">더 정확한 여행 추천을 위해 필요해요</p>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-slate-400">
            {stepIndex + 1}/{STEPS.length}
          </span>
          <button
            type="button"
            onClick={handleSkip}
            className="text-[12px] font-medium text-slate-300 hover:text-slate-500 transition-all"
          >
            skip
          </button>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 mb-5 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 sm:p-6">
          <div className="text-center mb-5">
            <h2 className="text-[17px] sm:text-[19px] font-bold text-slate-800">
              Q{stepIndex + 1}. {step.title}
            </h2>
            {step.subtitle && <p className="text-[12px] text-slate-400 mt-1.5">{step.subtitle}</p>}
            {step.multiple && <p className="text-[12px] text-brand-dark font-semibold mt-1.5">중복 선택 가능</p>}
          </div>

          <div className={`grid ${step.grid} gap-2.5`}>
            {step.options.map((option) => (
              <OptionCard
                key={option.value}
                option={option}
                multiple={step.multiple}
                selected={step.multiple ? value.has(option.value) : value === option.value}
                onClick={() => toggleOption(option.value)}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-[12px] text-rose-500 text-center mt-4">{error}</p>}

        <div className="flex items-center justify-between mt-5">
          <Button variant="light" onClick={handlePrev} className="h-10 px-5 rounded-xl font-bold text-[13px]">
            이전
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered || submitting}
            className="h-10 px-5 rounded-xl font-bold text-[13px] disabled:opacity-40"
          >
            {submitting ? '저장 중...' : stepIndex === STEPS.length - 1 ? '완료' : '다음'}
          </Button>
        </div>
      </div>
    </OnboardingHeader>
  )
}
