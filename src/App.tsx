import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, Component, type ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import RouteTransition from './components/RouteTransition'
import HomePage from './pages/HomePage'
import './App.css'

const BookingPage = lazy(() => import('./pages/BookingPage'))
const BackstageGalleryPage = lazy(() => import('./pages/BackstageGalleryPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const MembersPage = lazy(() => import('./pages/MembersPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const PreviousShowsPage = lazy(() => import('./pages/PreviousShowsPage'))
const ShowsPage = lazy(() => import('./pages/ShowsPage'))
const SupportFeedbackPage = lazy(() => import('./pages/SupportFeedbackPage'))
const WorkshopsGalleryPage = lazy(() => import('./pages/WorkshopsGalleryPage'))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'))
const SupportUsPage = lazy(() => import('./pages/SupportUsPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'))
const ReturnPolicyPage = lazy(() => import('./pages/ReturnPolicyPage'))
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'))

// Global error boundary to prevent crashes
class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App crashed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-serif text-white mb-4">Something went wrong</h1>
            <p className="text-white/60 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#ff6a1a] text-white rounded-full font-semibold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function PageFallback() {
  return <div className="mx-auto max-w-6xl px-4 pt-10 text-sm text-white/70">Loading…</div>
}

function WrapRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteTransition>
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
    </RouteTransition>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<RouteTransition><HomePage /></RouteTransition>} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/shows" element={<WrapRoute><ShowsPage /></WrapRoute>} />
          <Route path="/book" element={<WrapRoute><BookingPage /></WrapRoute>} />
          <Route path="/gallery" element={<WrapRoute><GalleryPage /></WrapRoute>} />
          <Route path="/gallery/backstage" element={<WrapRoute><BackstageGalleryPage /></WrapRoute>} />
          <Route path="/gallery/workshops" element={<WrapRoute><WorkshopsGalleryPage /></WrapRoute>} />
          <Route path="/support-us" element={<WrapRoute><SupportUsPage /></WrapRoute>} />
          <Route path="/feedback" element={<WrapRoute><FeedbackPage /></WrapRoute>} />
          <Route path="/previous-shows" element={<WrapRoute><PreviousShowsPage /></WrapRoute>} />
          <Route path="/contact" element={<WrapRoute><ContactPage /></WrapRoute>} />
          <Route path="/members" element={<WrapRoute><MembersPage /></WrapRoute>} />
          <Route path="/support-feedback" element={<WrapRoute><SupportFeedbackPage /></WrapRoute>} />
          <Route path="/terms" element={<WrapRoute><TermsPage /></WrapRoute>} />
          <Route path="/privacy" element={<WrapRoute><PrivacyPolicyPage /></WrapRoute>} />
          <Route path="/refund" element={<WrapRoute><RefundPolicyPage /></WrapRoute>} />
          <Route path="/return-policy" element={<WrapRoute><ReturnPolicyPage /></WrapRoute>} />
          <Route path="/shipping-policy" element={<WrapRoute><ShippingPolicyPage /></WrapRoute>} />
          <Route path="*" element={<WrapRoute><NotFoundPage /></WrapRoute>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AppRoutes />
    </AppErrorBoundary>
  )
}