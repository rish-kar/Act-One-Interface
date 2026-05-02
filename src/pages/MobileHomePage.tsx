import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowDownToLine } from 'lucide-react'
import MobileLayout from '../components/mobile/MobileLayout'
import { MobileGlassCard, MobileCollapsible, MobileReviewCard } from '../components/mobile/MobileUIComponents'
import ShowGrid from '../components/ShowGrid'
import { siteContent } from '../content/siteContent'

// ─── Types ───
type Props = {
  BackgroundSlideshow: React.ComponentType
}

// ─── Mobile Home Page ───
export default function MobileHomePage({ BackgroundSlideshow }: Props) {
  const { hero, aboutOurCraftPanel, bannerPanel, pressAndReviewsSection } = siteContent.homePage
  const [heroTitle, ...heroSubLines] = hero.headline.split('\n')

  const logoUrl = new URL('../data/images/Logo Image.webp', import.meta.url).toString()
  const upcomingPosterUrl = new URL('../data/images/Poster.webp', import.meta.url).toString()
  const brochureUrl = new URL('../data/brochures/brochure-2024.pdf', import.meta.url).toString()

  // Preload above-the-fold assets for faster first paint on mobile.
  const preloadImage = (src: string) => {
    if (!src) return
    const img = new Image()
    img.decoding = 'async'
    img.src = src
  }

  const slideshowPreloadUrls = [
    new URL('../data/images/background-01.webp', import.meta.url).toString(),
    new URL('../data/images/background-02.webp', import.meta.url).toString(),
    new URL('../data/images/background-03.webp', import.meta.url).toString(),
  ]

  useEffect(() => {
    preloadImage(logoUrl)
    preloadImage(upcomingPosterUrl)
    slideshowPreloadUrls.forEach(preloadImage)
    // only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MobileLayout>
      {/* Background slideshow - now visible */}
      <div className="fixed inset-0 -z-10">
        <BackgroundSlideshow />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex flex-col justify-end px-4 pb-6">
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080c] via-[#06080c]/40 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Logo - stronger orange glow pulse */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(255,106,26,0.75)_0%,rgba(255,106,26,0.35)_45%,transparent_72%)] animate-pulse scale-150" />
              <img
                src={logoUrl}
                alt="Prarambh"
                className="w-44 h-44 object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* Headline with glass background for readability */}
          <div className="text-center space-y-2 bg-black/40 backdrop-blur-sm rounded-2xl py-4 px-3 border border-white/5 shadow-lg shadow-black/30">
            <h1 className="font-serif text-[1.75rem] leading-tight text-white uppercase tracking-wide drop-shadow-lg">
              {heroTitle}
            </h1>
            {heroSubLines.length > 0 && (
              <p className="text-sm text-white/75 max-w-[280px] mx-auto drop-shadow-md">{heroSubLines.join(' ')}</p>
            )}
          </div>

          {/* Tagline with glass background */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl py-3 px-4 border border-white/5 shadow-lg shadow-black/30">
            <p className="text-center text-sm text-white/80 max-w-[300px] mx-auto leading-relaxed drop-shadow-md">
              {hero.subcopy}
            </p>
          </div>

          {/* CTA buttons - smooth glass orange/black diagonal */}
          <div className="flex gap-3 pt-2">
            <Link
              to="/shows"
              className="flex-1 flex items-center justify-center py-3.5 text-white font-semibold rounded-full transition-all
                bg-[linear-gradient(165deg,rgba(255,106,26,0.85)_10%,rgba(255,86,26,0.70)_18%,rgba(18,18,22,0.95)_55%,rgba(0,0,0,0.40)_100%)]
                border border-[#ff6a1a]/40
                backdrop-blur-md
                shadow-xl shadow-[#ff6a1a]/25"
            >
              Book Seats
            </Link>
            <Link
              to="/gallery"
              className="flex-1 flex items-center justify-center py-3.5 text-white font-medium rounded-full transition-colors
                bg-black/50 hover:bg-black/10
                border border-white/15
                backdrop-blur-md
                shadow-lg shadow-black/30"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TRUST INFO (Static Section)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 mt-6">
        <h2
          className="text-base font-semibold text-white mb-3"
          style={{
            textShadow: '0 0 40px rgba(0,0,0,1), 0 0 18px rgba(0,0,0,1), 0 6px 18px rgba(0,0,0,1)',
          }}
        >
          About the Trust
        </h2>
        <div
          className="text-sm text-white/70 space-y-1.5"
          style={{
            textShadow: '0 0 34px rgba(0,0,0,1), 0 0 16px rgba(0,0,0,1), 0 6px 18px rgba(0,0,0,1)',
          }}
        >
          <p>Socio Cultural Activity Group and Public Charitable Trust</p>
          <p>ESTD.: 2021, Registration No. 499</p>
          <p>Registered with NGO Darpan (Niti Ayog) Registration no. DL/2024/0395217</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          IN THREE ACTS (Our Craft) - Matching style with Upcoming Shows
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 mt-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl py-2 px-3 border border-white/5 shadow-lg shadow-black/30 mb-4">
          <h2
            className="font-serif text-lg text-white"
            style={{
              textShadow: '0 0 35px rgba(0,0,0,1), 0 0 70px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1)',
            }}
          >
            {aboutOurCraftPanel.title}
          </h2>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl shadow-black/35 p-3">
          <div className="space-y-3">
            {aboutOurCraftPanel.columns.map((col) => (
              <MobileCollapsible key={col.title} title={col.title}>
                <p
                  className="leading-relaxed"
                  style={{
                    textShadow: '0 0 25px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,1), 0 4px 15px rgba(0,0,0,1)',
                  }}
                >
                  {col.text}
                </p>
              </MobileCollapsible>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          UPCOMING SHOWS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4 bg-black/40 backdrop-blur-sm rounded-xl py-2 px-3 border border-white/5 shadow-lg shadow-black/30">
          <h2 className="font-serif text-lg text-white drop-shadow-md">
            {siteContent.homePage.upcomingShowsSection.title}
          </h2>
          <Link to="/shows" className="text-sm text-[#ff6a1a] hover:text-[#ff8040] flex items-center gap-1 drop-shadow-md">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <ShowGrid limit={2} compact />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED SHOW - Matching style with Upcoming Shows
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 mt-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl py-2 px-3 border border-white/5 shadow-lg shadow-black/30 mb-4">
          <h2 className="font-serif text-lg text-white"
              style={{
                textShadow: '0 0 35px rgba(0,0,0,1), 0 0 70px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1)'
              }}>
            Featured Show
          </h2>
        </div>

        <MobileGlassCard noPadding className="overflow-hidden shadow-lg shadow-black/30">
          <div className="relative">
            <img
              src={upcomingPosterUrl}
              alt="Upcoming show poster"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
          <div className="p-4">
            <Link
              to="/shows"
              className="flex items-center justify-center w-full py-3 text-white font-semibold rounded-full transition-all
                border border-[#ff6a1a]/60
                backdrop-blur-lg
                shadow-xl shadow-[#ff6a1a]/25
                hover:shadow-[#ff6a1a]/35 hover:border-[#ff8040]/70"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 106, 26, 0.65) 0%, rgba(255, 106, 26, 0.60) 5%, rgba(255, 69, 0, 0.55) 20%, rgba(40, 20, 10, 0.70) 75%, rgba(10, 10, 10, 0.65) 100%)',
                backgroundBlendMode: 'overlay'
              }}
            >
              Book Now
            </Link>
          </div>
        </MobileGlassCard>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          QUICK ACTIONS BANNER
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 mt-8">
        <MobileGlassCard className="shadow-lg shadow-black/30">
          <div className="text-center mb-4">
            <h3 className="text-sm font-semibold text-white drop-shadow-md">{bannerPanel.leftTitle}</h3>
            <p className="text-sm text-white/60 mt-1 drop-shadow-sm">{bannerPanel.leftText}</p>
          </div>

          <div className="space-y-2">
            <Link
              to={bannerPanel.rightCta.href}
              className="flex items-center justify-center w-full py-3 bg-black/50 hover:bg-black/60 text-white font-medium rounded-full border border-white/15 transition-colors backdrop-blur-sm shadow-md"
            >
              {bannerPanel.rightCta.label}
            </Link>
            <a
              href={brochureUrl}
              download
              className="flex items-center justify-center gap-2 w-full py-3 bg-black/40 hover:bg-black/50 text-white/80 font-medium rounded-full border border-white/10 transition-colors backdrop-blur-sm shadow-md"
            >
              <ArrowDownToLine className="w-4 h-4" />
              Download Brochure
            </a>
          </div>
        </MobileGlassCard>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRESS & REVIEWS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4 bg-black/40 backdrop-blur-sm rounded-xl py-2 px-3 border border-white/5 shadow-lg shadow-black/30">
          <h2 className="font-serif text-lg text-white drop-shadow-md">{pressAndReviewsSection.title}</h2>
        </div>

        {/* Render all reviews on mobile (no "See all" link) */}
        <div className="space-y-4">
          {pressAndReviewsSection.items.map((item) => (
            <MobileReviewCard
              key={item.id}
              title={item.headline}
              author={item.reviewer}
              source={item.location}
              date={item.eventDateText}
              excerpt={item.summary}
              linkUrl={item.link.href}
              linkLabel={item.link.label}
            />
          ))}
        </div>
      </section>
    </MobileLayout>
  )
}