import { useState, useEffect, useMemo, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Theater, Image, MoreHorizontal, Volume2, VolumeX, ChevronRight } from 'lucide-react'
import { MobileLayoutContext, type MobileLayoutContextType } from './MobileLayoutContext'

// ─── Types ───
type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

type MoreMenuItem = {
  label: string
  href: string
}

// ─── Navigation Config ───
const bottomNavItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Shows', href: '/shows', icon: Theater },
  { label: 'Gallery', href: '/gallery', icon: Image },
  { label: 'More', href: '#more', icon: MoreHorizontal },
]

const moreMenuItems: MoreMenuItem[] = [
  { label: 'Members', href: '/members' },
  { label: 'Previous Shows', href: '/previous-shows' },
  { label: 'Workshops', href: '/gallery/workshops' },
  { label: 'Social Work', href: '/gallery/social-work' },
  { label: 'Support Us', href: '/support-us' },
  { label: 'Send Feedback', href: '/feedback' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refund' },
]

// ─── Bottom Navigation Component (with sound button integrated) ───
function MobileBottomNav({ setIsMenuOpen, isMusicEnabled, setIsMusicEnabled }: { 
  setIsMenuOpen: (open: boolean) => void
  isMusicEnabled: boolean
  setIsMusicEnabled: (enabled: boolean) => void
}) {
  const location = useLocation()

  const handleNavClick = (item: NavItem) => {
    if (item.href === '#more') {
      setIsMenuOpen(true)
    }
  }

  const handleSoundToggle = () => {
    const newState = !isMusicEnabled
    setIsMusicEnabled(newState)
    // Dispatch event to BackgroundAudio component
    window.dispatchEvent(new CustomEvent('toggleBackgroundMusic', { detail: { enabled: newState } }))
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mobile-safe-bottom">
      <div className="flex items-center justify-around px-2 py-2 bg-gradient-to-r from-[#0a1628]/95 via-[#06080c]/95 to-[#0a1628]/95 backdrop-blur-md border-t border-white/10">
        {bottomNavItems.map((item) => {
          const isActive = item.href !== '#more' && location.pathname === item.href
          const Icon = item.icon

          if (item.href === '#more') {
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center gap-1 py-1 px-3 min-w-[64px] transition-colors"
              >
                <Icon className="w-5 h-5 text-white/60" />
                <span className="text-[10px] text-white/60 font-medium">{item.label}</span>
              </button>
            )
          }

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 min-w-[64px] transition-colors ${
                isActive ? 'text-[#ff6a1a]' : ''
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#ff6a1a]' : 'text-white/60'}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-[#ff6a1a]' : 'text-white/60'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}

        {/* Sound button integrated into nav bar */}
        <button
          onClick={handleSoundToggle}
          className="flex flex-col items-center gap-1 py-1 px-3 min-w-[64px] transition-colors"
          aria-label={isMusicEnabled ? 'Disable music' : 'Enable music'}
        >
          {isMusicEnabled ? (
            <Volume2 className="w-5 h-5 text-[#ff6a1a]" />
          ) : (
            <VolumeX className="w-5 h-5 text-white/60" />
          )}
          <span className={`text-[10px] font-medium ${isMusicEnabled ? 'text-[#ff6a1a]' : 'text-white/60'}`}>
            Sound
          </span>
        </button>
      </div>
    </nav>
  )
}

// ─── More Menu Overlay ───
function MobileMoreMenu({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (open: boolean) => void }) {
  if (!isMenuOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-[#0a1628] to-[#06080c] border-t border-white/10 rounded-t-3xl overflow-hidden animate-slide-up">
        <div className="p-4 pb-8 mobile-safe-bottom">
          {/* Handle bar */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Menu items */}
          <div className="space-y-1">
            {moreMenuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span className="text-base text-white/90">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Mobile Layout Component ───
type MobileLayoutProps = {
  children: ReactNode
}

const mobileLogoUrl = new URL('../../data/images/Small Logo.webp', import.meta.url).toString()

export default function MobileLayout({
  children,
}: MobileLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMusicEnabled, setIsMusicEnabled] = useState(false)

  const location = useLocation()
  useEffect(() => {
    setIsMenuOpen(false)

    if (!location.hash) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })
    }
  }, [location.pathname, location.hash])

  // Listen for music state changes from BackgroundAudio
  useEffect(() => {
    const handleMusicState = (e: CustomEvent<{ enabled: boolean }>) => {
      setIsMusicEnabled(e.detail.enabled)
    }
    window.addEventListener('backgroundMusicState' as never, handleMusicState as never)
    return () => {
      window.removeEventListener('backgroundMusicState' as never, handleMusicState as never)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue: MobileLayoutContextType = useMemo(
    () => ({ isMenuOpen, setIsMenuOpen, isMusicEnabled, setIsMusicEnabled }),
    [isMenuOpen, isMusicEnabled]
  )

  return (
    <MobileLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-transparent">
        <header className="fixed top-0 left-0 right-0 z-40 mobile-safe-top">
          <div className="flex items-center justify-between px-4 py-3 bg-black/25 backdrop-blur-md border-b border-white/10">
            <Link to="/" className="flex items-center gap-2" aria-label="Go to home">
              <img
                src={mobileLogoUrl}
                alt="Prarambh"
                className="h-9 w-auto"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </Link>

            <Link
              to="/"
              aria-label="Go to home"
              className="flex-1 text-center font-serif text-sm uppercase tracking-[0.18em] text-white/90"
            >
              Prarambh Theatre
            </Link>

            <div className="w-[36px]" aria-hidden="true" />
          </div>
        </header>

        <main className="pt-16 pb-24">
          {children}
        </main>

        <MobileBottomNav
          setIsMenuOpen={setIsMenuOpen}
          isMusicEnabled={isMusicEnabled}
          setIsMusicEnabled={setIsMusicEnabled}
        />
        <MobileMoreMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </MobileLayoutContext.Provider>
  )
}

// ─── CSS for animations (add to mobile-design-tokens.css) ───
// @keyframes slide-up {
//   from { transform: translateY(100%); }
//   to { transform: translateY(0); }
// }
// .animate-slide-up { animation: slide-up 0.3s ease-out; }