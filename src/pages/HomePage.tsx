import { ArrowRight, ArrowDownToLine, ExternalLink, Users } from 'lucide-react'
import { useEffect, useMemo, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/GlassPanel'
import ResponsiveImage from '../components/ResponsiveImage'
import SectionReveal from '../components/SectionReveal'
import ShowGrid from '../components/ShowGrid'
import { siteContent } from '../content/siteContent'
import heroLogoGif from '../data/images/Logo Image.webp'
import { guestActorProfiles, memberProfiles } from '../data/members'
import MobileHomePage from './MobileHomePage'
import useIsMobile from '../lib/useIsMobile'

const brochure2024PdfUrl = new URL('../data/brochures/brochure-2024.pdf', import.meta.url).toString()
const logoVideoUrl = new URL('/media/logo.webm', import.meta.url).toString()
const logoPngUrl = new URL('/media/logo.webp', import.meta.url).toString()

// Home background slideshow images (URLs baked by Vite at build time).
type GlobUrlModule = { default: string }
const previousPlayImages = Object.values(
  import.meta.glob<GlobUrlModule>('../data/images/gallery/previousPlays/**/*.webp', {
    eager: true,
  }),
)
  .map((m) => m.default)
  .filter((v) => v.length > 0)
  .filter((src) => {
    // Exclude the specific image the user requested
    return !src.includes('shades-of-women-04.webp')
  })

function getObjectPosition(src: string) {
  if (src.includes('chup-adalat-cholche-07')) return 'object-center'
  if (src.includes('daag-03')) return 'object-center'
  if (src.includes('the-story-telling-04')) return 'object-center'
  if (src.includes('daag-07')) return 'object-center'
  if (src.includes('restaurant-03')) return 'object-top'
  return 'object-top'
}

function BackgroundSlideshow() {
  const images = useMemo(() => previousPlayImages, [])
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const [aIdx, setAIdx] = useState(0)
  const [bIdx, setBIdx] = useState(1)
  const [showA, setShowA] = useState(true)

  // rolling preload cache (mutable by design)
  const preloadCacheRef = useRef<Map<string, Promise<void>>>(new Map())

  const preload = useMemo(
    () =>
      (src: string) => {
        if (!src) return Promise.resolve()
        const cache = preloadCacheRef.current
        const existing = cache.get(src)
        if (existing) return existing

        const p = new Promise<void>((resolve) => {
          const img = new Image()
          img.decoding = 'async'
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        })

        cache.set(src, p)
        return p
      },
    [],
  )

  const preloadBatch = useMemo(
    () =>
      (start: number, count: number) => {
        if (!images.length) return
        for (let i = 0; i < Math.min(count, images.length); i++) {
          const idx = (start + i) % images.length
          void preload(images[idx] ?? '')
        }
      },
    [images, preload],
  )

  // Random starting images whenever the set of images changes + preload initial buffer.
  useEffect(() => {
    if (!images.length) return

    if (images.length === 1) {
      setAIdx(0)
      setBIdx(0)
      setShowA(true)
      void preload(images[0] ?? '')
      return
    }

    const start = Math.floor(Math.random() * images.length)
    let next = Math.floor(Math.random() * images.length)
    if (next === start) next = (next + 1) % images.length

    setAIdx(start)
    setBIdx(next)
    setShowA(true)

    // Preload 10 images at boot.
    preloadBatch(start, 10)
  }, [images, images.length, preload, preloadBatch])

  // Keep a stable interval and ensure the next image is preloaded before we crossfade.
  useEffect(() => {
    if (!images.length) return
    if (images.length === 1) return

    let cancelled = false
    let shownCount = 0

    const pickRandomNext = (current: number) => {
      if (images.length <= 1) return current
      let next = Math.floor(Math.random() * images.length)
      // avoid immediate repeats
      if (next === current) next = (next + 1) % images.length
      return next
    }

    const intervalId = window.setInterval(async () => {
      if (cancelled) return
      if (reducedMotion) return
      if (document.hidden) return

      const current = showA ? aIdx : bIdx
      const next = pickRandomNext(current)

      // Ensure hidden layer holds the next image before fading.
      if (showA) setBIdx(next)
      else setAIdx(next)

      // Guarantee next image is loaded before flipping opacity.
      await preload(images[next] ?? '')
      if (cancelled) return

      setShowA((v) => !v)

      shownCount += 1
      // When we hit the 8th shown image, preload the next 10 (rolling buffer).
      if (shownCount % 10 === 8) {
        preloadBatch(next, 10)
      }
    }, 7000)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [images, images.length, reducedMotion, aIdx, bIdx, showA, preload, preloadBatch])

  const aSrc = images[aIdx] ?? ''
  const bSrc = images[bIdx] ?? ''

  // warm current sources (safe no-op when empty)
  useEffect(() => {
    if (!images.length) return
    void preload(aSrc)
    void preload(bSrc)
  }, [images.length, aSrc, bSrc, preload])

  if (!images.length) return null

  const baseImgClasses =
    'absolute inset-0 h-full w-full object-cover will-change-opacity transform-gpu transition-opacity duration-[2000ms] ease-in-out'

  return (
    <div className="fixed inset-x-0 top-0 bottom-0 -z-10 overflow-hidden pointer-events-none bg-[#06070a]">
      <ResponsiveImage
        key={`bg-a-${aSrc}-${aIdx}`}
        src={aSrc}
        alt="Previous play background"
        className={`${baseImgClasses} ${getObjectPosition(aSrc)} ${showA ? 'opacity-70' : 'opacity-0'}`}
        loading="eager"
        decoding="async"
        fetchPriority="low"
        srcSetWidths={[]}
        sizes="100vw"
      />
      <ResponsiveImage
        key={`bg-b-${bSrc}-${bIdx}`}
        src={bSrc}
        alt="Previous play background"
        className={`${baseImgClasses} ${getObjectPosition(bSrc)} ${showA ? 'opacity-0' : 'opacity-70'}`}
        loading="eager"
        decoding="async"
        fetchPriority="low"
        srcSetWidths={[]}
        sizes="100vw"
      />
    </div>
  )
}

function usePrefersStaticHero() {
  const [prefersStatic, setPrefersStatic] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setPrefersStatic(media.matches)
    update()
    if (typeof media.addEventListener === 'function') media.addEventListener('change', update)
    else media.addListener(update)
    return () => {
      if (typeof media.removeEventListener === 'function') media.removeEventListener('change', update)
      else media.removeListener(update)
    }
  }, [])

  return prefersStatic
}

function HeroLogo() {
  const caption = siteContent.homePage.hero.centerMedia.caption
  const prefersStatic = usePrefersStaticHero()

  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col items-center">
      <div className="relative w-full">
        {/* Larger-radius glow behind the logo */}
        <div className="absolute inset-0 -z-10 rounded-[32px] blur-3xl bg-[radial-gradient(circle_at_center,rgba(255,138,76,0.58)_0%,rgba(255,106,26,0.30)_38%,rgba(255,140,60,0.18)_58%,transparent_90%)] animate-logo-glow" />

        {/* Animated logo (GIF) */}
        <img
          src={heroLogoGif}
          alt={siteContent.brand.logoAlt}
          className="mx-auto w-full max-w-[360px] rounded-3xl opacity-95"
          decoding="async"
          loading="eager"
        />

        {/* Keep the old transparent-logo slot for future use (post-processed webm) */}
        {prefersStatic ? null : (
          <video className="hidden" autoPlay loop muted playsInline preload="metadata" poster={logoPngUrl}>
            <source src={logoVideoUrl} type="video/webm" />
          </video>
        )}
      </div>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.35em] text-white/60">{caption}</p>
    </div>
  )
}

export default function HomePage() {
  const { hero, aboutOurCraftPanel, bannerPanel, pressAndReviewsSection } = siteContent.homePage
  const [heroTitle, ...heroSubLines] = hero.headline.split('\n')

  // Warm up backend once when the home page is loaded.
  useEffect(() => {
    let cancelled = false

    const warm = async () => {
      try {
        const base = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ?? ''
        const url = base ? `${base}/actuator/health` : '/actuator/health'
        await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } })
      } catch {
        // ignore warmup failures
      }
    }

    if (!cancelled) void warm()
    return () => {
      cancelled = true
    }
  }, [])

  const upcomingPosterUrl = useMemo(() => new URL('../data/images/Poster.webp', import.meta.url).toString(), [])
  const allPeople = useMemo(() => [...memberProfiles, ...guestActorProfiles], [])
  const isMobile = useIsMobile(640)

  if (isMobile) {
    return <MobileHomePage BackgroundSlideshow={BackgroundSlideshow} />
  }

  return (
    <div className="relative text-3d-shadow text-home-shadow">
      <BackgroundSlideshow />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <section className="grid gap-10 pb-8 pt-10 md:grid-cols-2 md:items-center">
          <SectionReveal>
            <div>
              {hero.eyebrow?.trim() ? (
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{hero.eyebrow}</p>
              ) : null}

              <div className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-10%] -z-10 rounded-full blur-3xl bg-[radial-gradient(circle_at_35%_45%,rgba(255,255,255,0.30),rgba(255,140,60,0.18),rgba(0,8,32,0))]"
                />
                <h1 className="mt-3 font-serif text-white leading-tight">
                  <span className="block uppercase tracking-[0.18em] heading-hero">{heroTitle}</span>
                  {heroSubLines.length > 0 ? (
                    <span className="mt-3 block uppercase tracking-[0.18em] text-white/85 leading-snug subheading-hero">
                      {heroSubLines.join(' ')}
                    </span>
                  ) : null}
                </h1>
              </div>

              <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/70 whitespace-pre-line text-justify">
                {'Socio Cultural Activity Group and Public Charitable Trust\nESTD.: 2021, Registration No. 499\nRegistered with NGO Darpan (Niti Ayog) Registration no. DL/2024/ 0395217'}
              </p>

              <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75 whitespace-pre-line text-justify">
                {hero.subcopy}
              </p>

              {/* CTAs intentionally removed on the Home page for now (identity-first). */}
              {/* Quick stat cards intentionally removed. */}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <HeroLogo />
          </SectionReveal>
        </section>

        <SectionReveal>
          <GlassPanel
            className="p-7 md:p-10"
            labelledBy="about-heading"
            style={
              ({
                ['--glass-gradient']:
                  'linear-gradient(220deg, rgba(255, 106, 26, 0.26) 0%, rgba(255, 106, 26, 0.12) 40%, rgba(255, 106, 26, 0.00) 78%)',
              } as React.CSSProperties)
            }
          >
            <h2 id="about-heading" className="font-serif text-white section-heading">
              {aboutOurCraftPanel.title}
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              {aboutOurCraftPanel.columns.map((col) => (
                <div key={col.title}>
                  <div className="text-sm font-semibold text-white">{col.title}</div>
                  <p className="mt-2 text-sm text-white/72 text-justify">{col.text}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </SectionReveal>

        <section className="mt-12">
          <SectionReveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-white section-heading">{siteContent.homePage.upcomingShowsSection.title}</h2>
              <Link to="/shows" className="text-sm text-white/70 hover:text-white">
                View all
              </Link>
            </div>
          </SectionReveal>

          <div className="mt-6">
            <ShowGrid limit={4} />
          </div>
        </section>

        <SectionReveal>
          <div className="mt-12 mb-2 rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/3 to-white/5 p-7 md:flex md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">{bannerPanel.leftTitle}</div>
              <div className="mt-1 text-white/70">{bannerPanel.leftText}</div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-0">
              <Link to={bannerPanel.rightCta.href} className="btn-secondary">
                {bannerPanel.rightCta.label}
              </Link>
              <a href={brochure2024PdfUrl} className="btn-secondary" download>
                Download brochure (PDF) <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-10 hidden sm:block">
            <GlassPanel
              as="article"
              className="p-6 md:p-8"
              labelledBy="members-highlight"
              style={
                ({
                  ['--glass-gradient']:
                    'linear-gradient(230deg, rgba(255, 106, 26, 0.22) 0%, rgba(0, 10, 55, 0.55) 55%, rgba(0, 0, 0, 0.30) 100%)',
                } as React.CSSProperties)
              }
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 id="members-highlight" className="text-lg font-semibold text-white">
                    Members
                  </h3>
                  <p className="mt-2 text-sm text-white/70 text-justify">
                    Meet the artists and organisers behind Prarambh—and our guest actors.
                  </p>
                </div>
                <Users className="h-6 w-6 text-white/60 flex-shrink-0" aria-hidden="true" />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {allPeople.map((m) => (
                  <Link
                    key={m.id}
                    to={`/members#${m.id}`}
                    className="flex flex-col items-center w-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                  >
                    <img
                      src={m.photoSrc}
                      alt={m.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover border border-white/15 bg-white/5"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      onError={(e) => {
                        const img = e.currentTarget
                        img.onerror = null
                        img.src = new URL('/media/fallback-avatar.svg', import.meta.url).toString()
                      }}
                    />
                    <span className="mt-1 text-[10px] text-white/70 text-center line-clamp-2 leading-tight">
                      {m.name}
                    </span>
                  </Link>
                ))}
              </div>

              <Link to="/members" className="btn-secondary mt-6 inline-flex">
                View members <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </GlassPanel>
          </div>
        </SectionReveal>

        <section className="mt-12">
          <SectionReveal>
            <h2 className="font-serif text-white section-heading">Upcoming Shows</h2>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <GlassPanel
              className="mt-6 p-4 sm:p-6 md:p-8"
              labelledBy="upcoming-poster"
              style={
                ({
                  ['--glass-gradient']:
                    'linear-gradient(145deg, rgba(30, 76, 140, 0.22) 0%, rgba(0, 10, 55, 0.55) 55%, rgba(0, 0, 0, 0.25) 100%)',
                } as React.CSSProperties)
              }
            >
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <img
                  src={upcomingPosterUrl}
                  alt="Upcoming shows poster"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/shows" className="btn-primary">
                  Book Seats
                </Link>
              </div>
            </GlassPanel>
          </SectionReveal>
        </section>

        <section className="mt-12">
          <SectionReveal>
            <h2 className="font-serif text-white section-heading">{pressAndReviewsSection.title}</h2>
          </SectionReveal>

          <div className="mt-6 grid gap-6">
            {pressAndReviewsSection.items.map((item, idx) => (
              <SectionReveal key={item.id} delay={Math.min(idx * 0.06, 0.2)}>
                <GlassPanel
                  as="article"
                  className="p-7 md:p-10"
                  labelledBy={item.id}
                  style={
                    ({
                      ['--glass-gradient']:
                        `linear-gradient(${[260, 210, 160, 120, 300][idx % 5]}deg, rgba(255, 106, 26, 0.22) 0%, rgba(255, 106, 26, 0.10) 40%, rgba(255, 106, 26, 0.00) 78%)`,
                    } as React.CSSProperties)
                  }
                >
                  <h3 id={item.id} className="text-white card-title">
                    {item.headline}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">
                    {item.reviewer} · {item.location} · {item.eventDateText}
                  </p>
                  <p className="mt-4 text-sm text-white/75 text-justify">{item.summary}</p>

                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/72 text-justify">
                    {item.highlightsBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <a
                    className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.link.label}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <p className="mt-4 text-xs text-white/50">Venue: {item.venue}</p>
                </GlassPanel>
              </SectionReveal>
            ))}
          </div>
        </section>

        <div className="h-8" />
      </div>
    </div>
  )
}