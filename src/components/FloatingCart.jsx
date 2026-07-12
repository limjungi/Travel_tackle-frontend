import { Icon } from '@iconify/react'

// 챗봇 버튼(bottom-6) 위에 위치하는 장바구니 플로팅 버튼
export default function FloatingCart() {
  return (
    <button
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-brand border-[3px] border-white shadow-float flex items-center justify-center text-white hover:bg-brand-dark hover:scale-105 hover:shadow-float-hover transition-all"
      aria-label="장바구니"
    >
      <Icon icon="solar:cart-large-2-bold" width={24} />
    </button>
  )
}
