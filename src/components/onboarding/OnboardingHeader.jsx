import Navbar from '../Navbar'

export default function OnboardingHeader({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[720px]">{children}</div>
      </main>
    </div>
  )
}
