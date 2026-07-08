import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import AuthLayout from '../components/auth/AuthLayout'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import { COUNTRIES } from '../data/countries'
import { useAuth } from '../context/AuthContext'
import * as authApi from '../api/auth'

const RESEND_COOLDOWN = 60
const inputClass =
  'w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand transition-all disabled:bg-slate-50 disabled:text-slate-400'

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [step, setStep] = useState('email')

  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')
  const [codeVerified, setCodeVerified] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nationality, setNationality] = useState('KR')

  const [emailError, setEmailError] = useState('')
  const [codeError, setCodeError] = useState('')
  const [formError, setFormError] = useState('')
  const [sendingCode, setSendingCode] = useState(false)
  const [verifyingCode, setVerifyingCode] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const timerRef = useRef(null)

  useEffect(() => {
    if (cooldown <= 0) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [cooldown])

  const handleSendCode = async () => {
    setEmailError('')
    setSendingCode(true)
    try {
      await authApi.requestEmailCode(email)
      setCodeSent(true)
      setCooldown(RESEND_COOLDOWN)
    } catch (err) {
      if (err.response?.status === 429) {
        setEmailError('요청이 너무 많아요. 잠시 후 다시 시도해주세요.')
      } else if (err.response?.status === 409) {
        setEmailError('이미 가입된 이메일이에요.')
      } else {
        setEmailError('인증번호 전송에 실패했어요.')
      }
    } finally {
      setSendingCode(false)
    }
  }

  const handleVerifyCode = async () => {
    setCodeError('')
    setVerifyingCode(true)
    try {
      await authApi.confirmEmailCode(email, code)
      setCodeVerified(true)
      setStep('info')
    } catch {
      setCodeError('인증번호가 올바르지 않거나 만료됐어요.')
    } finally {
      setVerifyingCode(false)
    }
  }

  const handleChangeEmail = () => {
    clearInterval(timerRef.current)
    setCodeSent(false)
    setCodeVerified(false)
    setCode('')
    setCooldown(0)
    setCodeError('')
    setStep('email')
  }

  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword
  const canSubmit =
    codeVerified && name.trim() && password.length >= 8 && password === confirmPassword && nationality

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setFormError('')
    setSubmitting(true)
    try {
      await authApi.signup({ email, password, name, nationality })
      await login({ email, password })
      navigate('/onboarding/welcome')
    } catch (err) {
      if (err.response?.status === 409) {
        setFormError('이미 가입된 이메일이에요.')
      } else {
        setFormError('회원가입에 실패했어요. 잠시 후 다시 시도해주세요.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-[13px] font-semibold text-brand-dark mb-1">시작하기</h1>
      <p className="text-[22px] font-extrabold text-slate-800 mb-1">회원가입하고 여행을 계획해보세요</p>
      <p className="text-[13px] text-slate-400 mb-7">{step === 'email' ? '1/2 · 이메일 인증' : '2/2 · 회원 정보 입력'}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === 'email' && (
          <>
            <div>
              <span className="block text-[13px] font-semibold text-slate-600 mb-1.5">이메일</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="test@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                  autoComplete="email"
                  autoFocus
                />
                <Button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!email || sendingCode || cooldown > 0}
                  variant="light"
                  className="shrink-0 h-12 px-5 rounded-xl font-bold text-[13.5px] whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
                >
                  {cooldown > 0
                    ? `재전송 (${cooldown}초)`
                    : codeSent
                      ? '코드 재전송'
                      : sendingCode
                        ? '전송 중...'
                        : '코드 받기'}
                </Button>
              </div>
              {emailError && <p className="mt-1.5 text-[12px] text-rose-500">{emailError}</p>}
            </div>

            {codeSent && (
              <div>
                <span className="block text-[13px] font-semibold text-slate-600 mb-1.5">인증번호</span>
                <div className="flex gap-2">
                  <input
                    inputMode="numeric"
                    placeholder="ex) 123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    className={inputClass}
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={code.length !== 6 || verifyingCode}
                    className="shrink-0 h-12 px-5 rounded-xl font-bold text-[13.5px] whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {verifyingCode ? '확인 중...' : '인증 하기'}
                  </Button>
                </div>
                {codeError && <p className="mt-1.5 text-[12px] text-rose-500">{codeError}</p>}
              </div>
            )}
          </>
        )}

        {step === 'info' && (
          <>
            <div className="flex items-center gap-1.5 -mt-1 mb-1 text-[12.5px] font-semibold text-brand-dark">
              <Icon icon="solar:check-circle-bold" width={15} className="shrink-0" />
              <span className="truncate">{email}</span>
              <button
                type="button"
                onClick={handleChangeEmail}
                className="ml-auto shrink-0 text-slate-400 hover:text-slate-600 font-medium transition-all"
              >
                이메일 변경
              </button>
            </div>

            <FormField
              label="이름"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />

            <FormField
              label="비밀번호"
              type="password"
              placeholder="8~72자로 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
              required
            />

            <FormField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={passwordMismatch ? '비밀번호가 일치하지 않아요.' : ''}
              autoComplete="new-password"
              required
            />

            <label className="block">
              <span className="block text-[13px] font-semibold text-slate-600 mb-1.5">국적</span>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-900 outline-none focus:border-brand transition-all"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            {formError && <p className="text-[12.5px] text-rose-500 -mt-1">{formError}</p>}

            <Button
              type="submit"
              disabled={!canSubmit || submitting}
              className="h-12 rounded-xl font-bold text-[15px] disabled:opacity-50 mt-1"
            >
              {submitting ? '가입 중...' : '가입하기'}
            </Button>
          </>
        )}
      </form>

      <p className="text-center text-[13px] text-slate-500 mt-7">
        계정이 있으신가요?{' '}
        <Link to="/login" className="font-bold text-brand-dark">
          로그인
        </Link>
      </p>
    </AuthLayout>
  )
}
