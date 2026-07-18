import { useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Icon } from '@iconify/react'
import Button from '../ui/Button'
import { MOCK_TOP5_PLANS } from '../../data/feed'
import { getCroppedImg } from './cropImage'

const MAX_COMMENT = 500

// RecordFeedCard.jsx에서 이미 쓰는 세로(4:5)/가로(4:3) 비율을 그대로 사용 — 새 비율을 만들지 않음
const ORIENTATIONS = [
  { value: 'portrait', label: '세로', ratio: '4:5', aspect: 4 / 5, icon: 'mdi:crop-portrait' },
  { value: 'landscape', label: '가로', ratio: '4:3', aspect: 4 / 3, icon: 'mdi:crop-landscape' },
]

export default function RecordUploadModal({ open, onClose }) {
  const [step, setStep] = useState('form') // 'form' | 'crop' | 'confirmClose'
  const [sessionOrientation, setSessionOrientation] = useState(null) // 첫 사진 확정 후 잠기는 값
  const [cropOrientation, setCropOrientation] = useState('portrait') // 크롭 화면에서 현재 선택된 값
  const [pendingFileUrl, setPendingFileUrl] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const [planId, setPlanId] = useState('')
  const [planListOpen, setPlanListOpen] = useState(false)
  const [photos, setPhotos] = useState([])
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  // 사진을 브라우저 창 안으로 드래그해 들어오는 순간부터(작은 타일 위가 아니어도) 드롭존이 활성화되도록
  // window 레벨에서 감지 — dragenter/dragleave는 자식 요소를 오갈 때마다 중복 발생하므로 카운터로 방지
  useEffect(() => {
    if (!open || step !== 'form') return
    let depth = 0

    function hasFiles(e) {
      return e.dataTransfer?.types.includes('Files')
    }
    function onDragEnter(e) {
      if (!hasFiles(e)) return
      e.preventDefault()
      depth += 1
      setDragActive(true)
    }
    function onDragOver(e) {
      if (!hasFiles(e)) return
      e.preventDefault()
    }
    function onDragLeave(e) {
      if (!hasFiles(e)) return
      depth = Math.max(0, depth - 1)
      if (depth === 0) setDragActive(false)
    }
    function onDrop(e) {
      if (!hasFiles(e)) return
      e.preventDefault()
      depth = 0
      setDragActive(false)
      const file = [...(e.dataTransfer.files || [])].find((f) => f.type.startsWith('image/'))
      openFileForCrop(file)
    }

    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('drop', onDrop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step, sessionOrientation])

  // Esc로도 현재 단계에 보이는 뒤로가기/취소 버튼과 동일하게 동작
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key !== 'Escape') return
      if (step === 'crop') handleCancelCrop()
      else if (step === 'confirmClose') setStep('form') // Esc는 안전하게 "계속 작성" 취급
      else handleCloseRequest()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // handleCancelCrop/handleCloseRequest는 매 렌더 새로 만들어지며 title/comment/photos/planId를
    // 참조하므로, 그 값들이 바뀔 때마다 리스너를 다시 구독해 최신 값을 보게 함(stale closure 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step, title, comment, photos, planId])

  if (!open) return null

  const selectedPlan = MOCK_TOP5_PLANS.find((p) => p.id === planId)
  const hasDraftContent = Boolean(title || comment || photos.length > 0 || planId)
  const orientationLocked = sessionOrientation !== null
  const activeAspect = ORIENTATIONS.find((o) => o.value === cropOrientation)?.aspect ?? ORIENTATIONS[0].aspect

  function openFileForCrop(file) {
    if (!file) return
    setPendingFileUrl(URL.createObjectURL(file))
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCropOrientation(sessionOrientation || 'portrait')
    setStep('crop')
  }

  function handleFiles(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    openFileForCrop(file)
  }

  // 잠기지 않은 첫 사진일 때만 이미지의 실제 가로/세로 비율로 기본 선택값을 맞춤
  function handleMediaLoaded(mediaSize) {
    if (orientationLocked) return
    setCropOrientation(mediaSize.naturalHeight >= mediaSize.naturalWidth ? 'portrait' : 'landscape')
  }

  function handleChangeOrientation(value) {
    if (orientationLocked) return
    setCropOrientation(value)
  }

  function handleCancelCrop() {
    if (pendingFileUrl) URL.revokeObjectURL(pendingFileUrl)
    setPendingFileUrl(null)
    setStep('form')
  }

  async function handleConfirmCrop() {
    if (!croppedAreaPixels || !pendingFileUrl) return
    const cropped = await getCroppedImg(pendingFileUrl, croppedAreaPixels)
    setPhotos((prev) => [...prev, cropped])
    if (!orientationLocked) setSessionOrientation(cropOrientation)
    URL.revokeObjectURL(pendingFileUrl) // 크롭 원본은 결과물이 나온 뒤로는 더 이상 필요 없음
    setPendingFileUrl(null)
    setStep('form')
  }

  function handleRemovePhoto(index) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index])
      const next = prev.filter((_, i) => i !== index)
      if (next.length === 0) setSessionOrientation(null)
      return next
    })
  }

  function resetAll() {
    photos.forEach((src) => URL.revokeObjectURL(src))
    if (pendingFileUrl) URL.revokeObjectURL(pendingFileUrl)
    setPlanId('')
    setPlanListOpen(false)
    setPhotos([])
    setTitle('')
    setComment('')
    setSessionOrientation(null)
    setPendingFileUrl(null)
    setStep('form')
  }

  function handleCloseRequest() {
    if (hasDraftContent) {
      setStep('confirmClose')
    } else {
      resetAll()
      onClose()
    }
  }

  function handleConfirmDiscard() {
    resetAll()
    onClose()
  }

  function handleSubmit() {
    resetAll()
    onClose()
  }

  return (
    <>
      {/* 바깥 클릭으로는 닫히지 않음 — 상단 "<" 버튼으로만 닫을 수 있음 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
        <div className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-white shadow-popup">
          {step === 'crop' ? (
            <CropStep
              imageUrl={pendingFileUrl}
              aspect={activeAspect}
              orientation={cropOrientation}
              locked={orientationLocked}
              onChangeOrientation={handleChangeOrientation}
              onMediaLoaded={handleMediaLoaded}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              onCancel={handleCancelCrop}
              onConfirm={handleConfirmCrop}
            />
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <button
                  onClick={handleCloseRequest}
                  aria-label="닫기"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <Icon icon="mdi:chevron-left" width={20} />
                </button>
                <h2 className="text-[15px] font-bold text-slate-900">새 기록 만들기</h2>
                <Button onClick={handleSubmit} className="rounded-full px-4 py-1.5 text-[12.5px] font-bold">
                  업로드
                </Button>
              </div>

              <div className="p-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPlanListOpen((v) => !v)}
                    className="flex w-full items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-500"
                  >
                    <Icon icon="mdi:format-list-bulleted" width={16} />
                    <span className={selectedPlan ? 'font-semibold text-slate-900' : ''}>
                      {selectedPlan ? selectedPlan.title : '여행 계획을 선택하세요'}
                    </span>
                    <Icon icon="mdi:chevron-down" width={16} className={`ml-auto transition-transform ${planListOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {planListOpen && (
                    <ul className="absolute left-0 right-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-2xl border border-slate-100 bg-white py-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
                      {MOCK_TOP5_PLANS.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => { setPlanId(p.id); setPlanListOpen(false) }}
                            className="w-full px-3.5 py-2 text-left text-[12.5px] text-slate-600 hover:bg-slate-50"
                          >
                            {p.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {photos.map((src, i) => (
                    <div key={i} className="relative">
                      <img src={src} alt="" className="h-24 w-full rounded-xl object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(i)}
                        aria-label="사진 삭제"
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/70 text-white transition-colors hover:bg-slate-900"
                      >
                        <Icon icon="mdi:close" width={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex h-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-slate-400 transition-colors hover:border-brand hover:text-brand ${
                      dragActive ? 'border-brand bg-brand-light text-brand' : 'border-slate-300'
                    }`}
                  >
                    <Icon icon="mdi:image-plus-outline" width={20} />
                    <span className="text-center text-[10px] leading-tight">
                      {dragActive ? '여기에 놓으세요' : <>여기를 눌러<br />사진을 추가하세요</>}
                    </span>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFiles} />
                </div>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해주세요"
                  className="mt-4 w-full border-b border-slate-200 py-2 text-[14px] font-semibold text-slate-900 placeholder:text-slate-300 focus:border-brand focus:outline-none"
                />

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))}
                  placeholder="여행 후기를 남겨주세요"
                  rows={6}
                  className="mt-3 w-full resize-none text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none"
                />
                <div className="text-right text-[11px] text-slate-300">{comment.length}/{MAX_COMMENT}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {step === 'confirmClose' && (
        <ConfirmDiscardDialog onKeepEditing={() => setStep('form')} onDiscard={handleConfirmDiscard} />
      )}
    </>
  )
}

function CropStep({
  imageUrl,
  aspect,
  orientation,
  locked,
  onChangeOrientation,
  onMediaLoaded,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onCancel,
  onConfirm,
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <button
          onClick={onCancel}
          aria-label="취소"
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <Icon icon="mdi:chevron-left" width={20} />
        </button>
        <h2 className="text-[15px] font-bold text-slate-900">사진 자르기</h2>
        <Button onClick={onConfirm} className="rounded-full px-4 py-1.5 text-[12.5px] font-bold">
          완료
        </Button>
      </div>

      {/* 방향 선택 아이콘 — 잠기지 않았을 때만(이 기록의 첫 사진일 때만) 변경 가능 */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-100 p-3">
        {ORIENTATIONS.map((o) => {
          const active = orientation === o.value
          const disabled = locked && !active
          return (
            <button
              key={o.value}
              type="button"
              disabled={locked}
              onClick={() => onChangeOrientation(o.value)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors ${
                active ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'
              } ${disabled ? 'opacity-40' : ''} ${locked ? '' : 'hover:bg-slate-200'} ${active && !locked ? 'hover:bg-brand-dark' : ''}`}
            >
              <Icon icon={o.icon} width={15} />
              {o.label}
            </button>
          )
        })}
        {locked && <span className="ml-1 text-[11px] text-slate-400">(이 기록은 방향이 고정돼요)</span>}
      </div>

      <div className="relative h-[360px] w-full bg-slate-900">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
          onMediaLoaded={onMediaLoaded}
        />
      </div>

      <div className="flex items-center gap-3 p-4">
        <Icon icon="mdi:image-size-select-small" width={16} className="shrink-0 text-slate-400" />
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <Icon icon="mdi:image-size-select-large" width={20} className="shrink-0 text-slate-400" />
      </div>
    </div>
  )
}

function ConfirmDiscardDialog({ onKeepEditing, onDiscard }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-[320px] rounded-2xl bg-white p-5 shadow-popup">
        <h3 className="text-[15px] font-bold text-slate-900">작성 중인 내용이 있어요</h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
          지금 나가면 작성 중인 내용이 사라져요. 정말 나가시겠어요?
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onKeepEditing}
            className="flex-1 rounded-full border border-slate-200 py-2 text-[12.5px] font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            계속 작성
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="flex-1 rounded-full bg-rose-500 py-2 text-[12.5px] font-bold text-white transition-colors hover:bg-rose-600"
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  )
}
