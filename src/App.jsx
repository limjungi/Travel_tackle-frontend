import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import TourExplorePage from './pages/TourExplorePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OAuthCallback from './pages/OAuthCallback'
import WelcomePage from './pages/onboarding/WelcomePage'
import PreferenceWizard from './pages/onboarding/PreferenceWizard'
import CompletePage from './pages/onboarding/CompletePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<TourExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route
            path="/onboarding/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/preferences"
            element={
              <ProtectedRoute>
                <PreferenceWizard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding/complete"
            element={
              <ProtectedRoute>
                <CompletePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
