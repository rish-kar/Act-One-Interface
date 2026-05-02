import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import { playGallerySections } from '../data/galleryImages'
import { useGlassGradientFromImg } from '../lib/useGlassGradientFromImg'
import MobileImagePreview from '../components/mobile/MobileImagePreview'
import useIsMobile from '../lib/useIsMobile'

function clampIndex(i: number, len: number) {
  if (!len || len <= 0) return 0
  return ((i % len) + len) % len
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE GALLERY - Ultra simple, no hooks that can crash iOS Safari
// ══════════════════════════════════════════════════════════════════════════════
function MobileGallerySection({
  title,
  images,
  synopsis,
}: {
  title: string
  images: { id: string; src: string; alt: string }[]
  synopsis?: string
}) {
  const [index, setIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  if (!images || images.length === 0) return null

  const safeIndex = clampIndex(index, images.length)
  const current = images[safeIndex]

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          backgroundColor: 'rgba(10,20,40,0.6)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: 16,
        }}
      >
        <h2 style={{ color: 'white', fontSize: 20, marginBottom: 8 }}>{title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 12 }}>
          {safeIndex + 1} / {images.length}
        </p>

        {synopsis && (
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>
            {synopsis}
          </p>
        )}

        {/* Main image - tap to preview */}
        <div
          onClick={() => setPreviewOpen(true)}
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
            padding: 8,
            marginBottom: 12,
          }}
        >
          <img
            src={current.src}
            alt={current.alt || 'Gallery'}
            style={{ width: '100%', height: 'auto', maxHeight: '50vh', objectFit: 'contain', display: 'block' }}
            loading="lazy"
          />
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 8 }}>
            Tap to view full screen
          </p>
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              type="button"
              onClick={() => setIndex((i) => clampIndex(i - 1, images.length))}
              style={{
                padding: 10,
                borderRadius: 9999,
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => clampIndex(i + 1, images.length))}
              style={{
                padding: 10,
                borderRadius: 9999,
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen preview */}
      {previewOpen && (
        <MobileImagePreview
          images={images}
          initialIndex={safeIndex}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// DESKTOP GALLERY - Full featured with gradients
// ══════════════════════════════════════════════════════════════════════════════
function DesktopGallerySection({
  title,
  images,
  synopsis,
  isFirst = false,
}: {
  title: string
  images: { id: string; src: string; alt: string }[]
  synopsis?: string
  isFirst?: boolean
}) {
  const [index, setIndex] = useState(0)

  const safeImages = useMemo(() => {
    if (!Array.isArray(images)) return []
    return images.filter((img) => img && img.src)
  }, [images])

  const imageCount = safeImages.length
  const active = imageCount ? safeImages[clampIndex(index, imageCount)] : null

  const activeImgRef = useRef<HTMLImageElement | null>(null)
  const gradient = useGlassGradientFromImg(activeImgRef, {
    enabled: true,
    cacheKey: active?.src ?? null,
  })

  if (!imageCount) return null

  return (
    <SectionReveal>
      <GlassPanel
        className="p-4 sm:p-6 text-justify"
        labelledBy={`gallery-${title}`}
        style={gradient ? ({ ['--glass-gradient']: gradient } as React.CSSProperties) : undefined}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 id={`gallery-${title}`} className="font-serif text-2xl text-white sm:text-3xl">
                {title}
              </h2>
              <div className="mt-1 text-sm text-white/70">
                Image {clampIndex(index, imageCount) + 1} of {imageCount}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:mt-6">
              <button
                type="button"
                className="btn-secondary px-3 py-2"
                onClick={() => setIndex((v) => clampIndex(v - 1, imageCount))}
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button
                type="button"
                className="btn-secondary px-3 py-2"
                onClick={() => setIndex((v) => clampIndex(v + 1, imageCount))}
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {synopsis && (
            <p className="max-w-none w-full text-sm leading-relaxed text-white/70 text-justify">{synopsis}</p>
          )}

          <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-center">
              {active && (
                <img
                  ref={activeImgRef}
                  src={active.src}
                  alt={active.alt || 'Gallery image'}
                  crossOrigin="anonymous"
                  loading={isFirst ? 'eager' : 'lazy'}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  decoding="async"
                />
              )}
            </div>
          </div>

          {imageCount > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {safeImages.map((img, i) => (
                <button
                  key={img.id || i}
                  type="button"
                  className={
                    'h-16 shrink-0 overflow-hidden rounded-xl border ' +
                    (i === clampIndex(index, imageCount) ? 'border-white/30' : 'border-white/10 opacity-80')
                  }
                  onClick={() => setIndex(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    crossOrigin="anonymous"
                    className="h-full w-24 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </GlassPanel>
    </SectionReveal>
  )
}

export default function GalleryPage() {
  const isMobile = useIsMobile(640)

  const sections = useMemo(() => {
    if (!Array.isArray(playGallerySections)) return []
    return playGallerySections.filter((s) => s && s.images && s.images.length > 0)
  }, [])

  // MOBILE VERSION - Ultra simple, no complex hooks
  if (isMobile) {
    return (
      <div style={{ padding: '16px', paddingBottom: 100 }}>
        <header style={{ paddingTop: 24, marginBottom: 24 }}>
          <h1 style={{ color: 'white', fontSize: 28, fontFamily: 'serif' }}>Gallery</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>
            Browse photos grouped by production.
          </p>
          <Link
            to="/gallery/backstage"
            style={{
              display: 'inline-block',
              marginTop: 12,
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Backstage
          </Link>
          <Link
            to="/gallery/social-work"
            style={{
              display: 'inline-block',
              marginTop: 12,
              marginLeft: 8,
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              color: 'white',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Social Work
          </Link>
        </header>

        {sections.map((section, i) => (
          <MobileGallerySection
            key={section.id || i}
            title={section.title}
            synopsis={section.synopsis}
            images={section.images}
          />
        ))}
      </div>
    )
  }

  // DESKTOP VERSION - Full featured
  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <header className="pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-4xl text-white md:text-5xl">Gallery</h1>
              <p className="mt-3 max-w-prose text-white/70">Browse photos grouped by production.</p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/gallery/backstage" className="btn-secondary px-4 py-2">
                Backstage
              </Link>
              <Link to="/gallery/social-work" className="btn-secondary px-4 py-2">
                Social Work
              </Link>
            </div>
          </div>
        </header>
      </SectionReveal>

      <section className="mt-8 pb-20">
        <div className="grid gap-6">
          {sections.map((section, i) => (
            <DesktopGallerySection
              key={section.id || i}
              title={section.title}
              synopsis={section.synopsis}
              images={section.images}
              isFirst={i === 0}
            />
          ))}
        </div>
      </section>
    </div>
  )
}