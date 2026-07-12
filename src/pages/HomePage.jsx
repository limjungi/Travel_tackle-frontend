import Navbar from '../components/Navbar'
import HeroSlider from '../components/HeroSlider'
import AiSummaryFeed from '../components/AiSummaryFeed'
import ParticipateSection from '../components/ParticipateSection'
import ExploreSection from '../components/ExploreSection'
import Footer from '../components/Footer'
import ChatbotWidget from '../components/ChatbotWidget'
import FloatingCart from '../components/FloatingCart'

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <HeroSlider />
      <AiSummaryFeed />
      <ParticipateSection />
      <ExploreSection />
      <Footer />
      <ChatbotWidget />
      <FloatingCart />
    </div>
  )
}
