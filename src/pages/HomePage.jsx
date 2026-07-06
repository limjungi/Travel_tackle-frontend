import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CategoryQuickLinks from '../components/CategoryQuickLinks'
import InProgressPlans from '../components/InProgressPlans'
import RecommendedSpots from '../components/RecommendedSpots'
import PopularPlans from '../components/PopularPlans'
import PopularRecords from '../components/PopularRecords'
import HowItWorks from '../components/HowItWorks'
import ThemeExplore from '../components/ThemeExplore'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'
import ChatbotWidget from '../components/ChatbotWidget'

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <Hero />
      <CategoryQuickLinks />
      <InProgressPlans />
      <RecommendedSpots />
      <PopularPlans />
      <PopularRecords />
      <HowItWorks />
      <ThemeExplore />
      <CtaBanner />
      <Footer />
      <ChatbotWidget />
    </div>
  )
}
