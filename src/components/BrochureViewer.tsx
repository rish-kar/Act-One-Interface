import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, Download, Loader2, Maximize2, Minus, Plus, X } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

const brochure2024Url = new URL('../data/brochures/brochure-2024.pdf', import.meta.url).toString()
const brochure2026Url = new URL('../data/brochures/brochure-2026.pdf', import.meta.url).toString()

type Props = { mobile?: boolean }

const TOOLBAR_GRADIENT =
  'linear-gradient(135deg, rgba(30,76,160,0.65) 0%, rgba(10,30,90,0.60) 40%, rgba(0,10,55,0.55) 70%, rgba(0,0,0,0.50) 100%)'

const PDF_OPTIONS = {
  cMapUrl: undefined,
  standardFontDataUrl: undefined,
}

/* ═══════════════════════════════════════════════════════════════
   BrochureViewer — Single-Document architecture
   ──────────────────────────────────────────────
   KEY INSIGHT: The old code had TWO <Document> instances (inline + fullscreen).
   Each <Document> independently downloads + parses the PDF (~128 MB).
   That caused a long loading glitch when opening fullscreen on desktop.

   FIX: ONE <Document> wraps everything. The fullscreen overlay is rendered
   via createPortal() INSIDE the <Document> JSX tree. React portals preserve
   context, so the fullscreen <Page> reuses the already-parsed document.
   Result: fullscreen page renders INSTANTLY — zero re-download, zero re-parse.
   ═══════════════════════════════════════════════════════════════ */
export default function BrochureViewer({ mobile = false }: Props) {
  /* ─── Shared state ─── */
  const [numPages, setNumPages] = useState(0)
  const [selectedYear, setSelectedYear] = useState<'2026' | '2024'>('2026')
  const [containerWidth, setContainerWidth] = useState(600)
  const containerRef = useRef<HTMLDivElement>(null)
  const pdfUrl = selectedYear === '2026' ? brochure2026Url : brochure2024Url
  const documentFile = useMemo(() => ({ url: pdfUrl }), [pdfUrl])

  /* ─── Inline preview state ─── */
  const [currentPage, setCurrentPage] = useState(1)
  const [pageOpacity, setPageOpacity] = useState(1)
  const [busy, setBusy] = useState(false)
  const touchStartX = useRef(0)

  /* ─── Fullscreen state ─── */
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [fsPage, setFsPage] = useState(1)
  const [fsZoom, setFsZoom] = useState(1)
  const [fsOpacity, setFsOpacity] = useState(1)
  const [fsFlipping, setFsFlipping] = useState(false)

  /* ─── Resize observer ─── */
  useEffect(() => {
    if (!containerRef.current) return
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) setContainerWidth(e.contentRect.width)
    })
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  /* ─── Reset on year change ─── */
  useEffect(() => {
    setCurrentPage(1)
    setBusy(false)
    setPageOpacity(1)
  }, [selectedYear])

  function onDocumentLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n)
    setCurrentPage(1)
    setPageOpacity(1)
  }

  /* ─── Inline page navigation ─── */
  const goToPage = useCallback(
    (dir: 'next' | 'prev') => {
      if (busy) return
      const target = dir === 'next' ? currentPage + 1 : currentPage - 1
      if (target < 1 || target > numPages) return
      setBusy(true)
      setPageOpacity(0)
      setTimeout(() => {
        setCurrentPage(target)
        requestAnimationFrame(() => {
          setPageOpacity(1)
          setTimeout(() => setBusy(false), 300)
        })
      }, 260)
    },
    [currentPage, numPages, busy],
  )

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) goToPage(diff > 0 ? 'next' : 'prev')
  }

  /* ─── Fullscreen open / close ─── */
  const openFullscreen = useCallback(() => {
    setFsPage(currentPage)
    setFsZoom(1)
    setFsOpacity(1)
    setFsFlipping(false)
    setShowFullscreen(true)
  }, [currentPage])

  const closeFullscreen = useCallback(() => {
    setShowFullscreen(false)
  }, [])

  /* ─── Fullscreen page navigation ─── */
  const fsFlip = useCallback((dir: 'next' | 'prev') => {
    if (fsFlipping) return
    setFsFlipping(true)
    const target = dir === 'next' ? fsPage + 1 : fsPage - 1
    if (target < 1 || target > numPages) { setFsFlipping(false); return }
    setFsOpacity(0)
    setTimeout(() => {
      setFsPage(target)
      requestAnimationFrame(() => {
        setFsOpacity(1)
        setTimeout(() => setFsFlipping(false), 280)
      })
    }, 240)
  }, [fsFlipping, fsPage, numPages])

  /* ─── Fullscreen keyboard ─── */
  useEffect(() => {
    if (!showFullscreen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showFullscreen, closeFullscreen])

  /* ─── Dimensions ─── */
  const pageWidth = mobile
    ? Math.min(containerWidth - 8, 390)
    : Math.min(containerWidth - 40, 640)

  const fsBaseW = Math.round(
    mobile
      ? Math.min(window.innerWidth - 32, 520)
      : Math.min((window.innerHeight - 100) * 0.68, window.innerWidth - 180, 820),
  )

  /* ─── Fullscreen overlay JSX (portaled to body, but INSIDE Document context) ─── */
  const fullscreenOverlay = showFullscreen
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483647,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'auto',
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setTimeout(closeFullscreen, 0)}
            style={{
              position: 'absolute', top: 16, left: 16, zIndex: 10,
              padding: '8px 16px', borderRadius: 9999,
              backgroundColor: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <X size={20} />
            <span style={{ fontSize: 14 }}>Close</span>
          </button>

          {/* Zoom + page counter */}
          <div
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 10,
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 9999,
              backgroundColor: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <button
              type="button"
              onClick={() => setFsZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)))}
              disabled={fsZoom <= 0.5}
              style={{ padding: 4, color: fsZoom <= 0.5 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)' }}
            >
              <Minus size={16} />
            </button>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', minWidth: 40, textAlign: 'center' }}>
              {Math.round(fsZoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setFsZoom(z => Math.min(3, +(z + 0.25).toFixed(2)))}
              disabled={fsZoom >= 3}
              style={{ padding: 4, color: fsZoom >= 3 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)' }}
            >
              <Plus size={16} />
            </button>
            <span style={{ marginLeft: 8, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              {fsPage}/{numPages || '-'}
            </span>
          </div>

          {/* Scrollable PDF area */}
          <div
            style={{
              overflowX: 'auto', overflowY: 'auto',
              maxHeight: '82%', maxWidth: '96%',
              padding: 8, borderRadius: 12,
              backgroundColor: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.06)',
              touchAction: 'pan-x pan-y',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
          >
            <div style={{ padding: 8 }}>
              <div
                style={{
                  width: Math.round(fsBaseW * fsZoom),
                  height: Math.round(fsBaseW * 1.414 * fsZoom),
                }}
              >
                <div
                  style={{
                    opacity: fsOpacity,
                    transition: 'opacity 0.24s ease',
                    borderRadius: 8,
                    overflow: 'hidden',
                    transform: `scale(${fsZoom})`,
                    transformOrigin: 'top left',
                    width: fsBaseW,
                    willChange: 'transform',
                    touchAction: 'pan-x pan-y',
                  }}
                >
                  {/* This <Page> reuses the already-parsed Document — INSTANT render */}
                  <Page
                    pageNumber={fsPage}
                    width={fsBaseW}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div style={{
                        width: fsBaseW, height: fsBaseW * 1.414,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 8,
                      }}>
                        <Loader2 size={40} style={{ color: 'rgba(255,255,255,0.4)' }} className="animate-spin" />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          {numPages > 1 && (
            <>
              <button
                type="button"
                onClick={() => fsFlip('prev')}
                disabled={fsPage <= 1 || fsFlipping}
                style={{
                  position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 10, padding: 12, borderRadius: 9999,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: fsPage <= 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => fsFlip('next')}
                disabled={fsPage >= numPages || fsFlipping}
                style={{
                  position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 10, padding: 12, borderRadius: 9999,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: fsPage >= numPages ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Mobile hint */}
          {mobile && numPages > 1 && (
            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                Use arrows to change pages. Swipe to pan when zoomed.
              </span>
            </div>
          )}
        </div>,
        document.body,
      )
    : null

  /* ═══════════════════════════════════════════════════════════════ */

  return (
    <div ref={containerRef} className="w-full">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between gap-2 mb-4 rounded-xl px-3 py-2 border border-white/15 backdrop-blur-md shadow-lg shadow-black/30"
        style={{ background: TOOLBAR_GRADIENT }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <label className="text-sm text-white/90 font-medium shrink-0">Edition:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value as '2026' | '2024')}
            className="min-w-[130px] max-w-full text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-white/30 cursor-pointer border border-white/20"
            style={{ backgroundColor: 'rgba(10,20,60,0.7)', backgroundImage: TOOLBAR_GRADIENT }}
          >
            <option value="2026" style={{ background: '#0d1a4a', color: '#fff' }}>2026 Edition</option>
            <option value="2024" style={{ background: '#0d1a4a', color: '#fff' }}>2024 Edition</option>
          </select>
        </div>
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={openFullscreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
            title="Enlarge"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <a
            href={pdfUrl}
            download={`Prarambh-Brochure-${selectedYear}.pdf`}
            className="inline-flex items-center text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg px-2.5 py-2 transition-colors whitespace-nowrap"
            title={mobile ? 'Download PDF' : undefined}
            aria-label={mobile ? 'Download PDF' : undefined}
          >
            <Download className="w-4 h-4" />
            {mobile ? null : 'Download PDF'}
          </a>
        </div>
      </div>

      {/* ── Single <Document> wrapping BOTH inline + fullscreen ── */}
      <Document
        file={documentFile}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/50"
               style={{ width: '100%', height: pageWidth * 1.414 + 40 }}>
            <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
          </div>
        }
        error={
          <div className="flex items-center justify-center text-white/50 text-sm rounded-2xl border border-white/10 bg-black/50"
               style={{ width: '100%', height: pageWidth * 1.414 + 40 }}>
            Failed to load brochure
          </div>
        }
        options={PDF_OPTIONS}
      >
        {/* Inline brochure preview */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 cursor-pointer"
          onClick={openFullscreen}
          onTouchStart={mobile ? onTouchStart : undefined}
          onTouchEnd={mobile ? onTouchEnd : undefined}
        >
          <div className="flex justify-center items-center py-4">
            <div style={{ opacity: pageOpacity, transition: 'opacity 0.26s ease-in-out', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-2xl shadow-black/50"
                loading={
                  <div className="flex items-center justify-center bg-black/20 rounded-lg"
                       style={{ width: pageWidth, height: pageWidth * 1.414 }}>
                    <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
                  </div>
                }
              />
            </div>
          </div>
          <p className="text-center text-xs text-white/40 pb-2">Tap to view full screen</p>

          {numPages > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPage('prev') }}
                disabled={currentPage <= 1 || busy}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/15 text-white/70 hover:text-white hover:bg-black/70 disabled:opacity-30 transition-all backdrop-blur-sm"
              >
                <ChevronLeft className={mobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToPage('next') }}
                disabled={currentPage >= numPages || busy}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/15 text-white/70 hover:text-white hover:bg-black/70 disabled:opacity-30 transition-all backdrop-blur-sm"
              >
                <ChevronRight className={mobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </button>
            </>
          )}
        </div>

        {/* Fullscreen overlay — INSIDE Document context, portaled to body.
            createPortal preserves React context, so <Page> here reuses the
            already-parsed PDF document. No re-download, no re-parse, instant. */}
        {fullscreenOverlay}
      </Document>

      {/* Page indicator (outside Document — doesn't need it) */}
      {numPages > 0 && (
        <div className="flex items-center justify-center mt-4 gap-4">
          <button onClick={() => goToPage('prev')} disabled={currentPage <= 1 || busy}
                  className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-white/80 font-medium tabular-nums min-w-[70px] text-center">
            {currentPage} / {numPages}
          </span>
          <button onClick={() => goToPage('next')} disabled={currentPage >= numPages || busy}
                  className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      {mobile && numPages > 1 && (
        <p className="text-center text-xs text-white/40 mt-2 italic">Swipe or tap arrows to navigate</p>
      )}
    </div>
  )
}
