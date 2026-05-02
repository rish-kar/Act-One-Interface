import { useEffect, useMemo, useState, type RefObject } from 'react'
import { colorsToGlassGradient, extractDominantColorsFromImageData } from './dominantColors'

const gradientCache = new Map<string, string>()

type Options = {
  enabled?: boolean
  /** Required for caching and detecting when to recompute (use the active image src). */
  cacheKey: string | null | undefined
}

/**
 * Computes a glass gradient from the pixels of an already-rendered <img> element.
 * This avoids re-loading images and reduces performance impact.
 */
export function useGlassGradientFromImg(
  imgRef: RefObject<HTMLImageElement | null>,
  { enabled = true, cacheKey }: Options,
) {
  const key = cacheKey ?? null

  const cached = useMemo(() => {
    if (!key) return null
    return gradientCache.get(key) ?? null
  }, [key])

  const [computed, setComputed] = useState<{ key: string; gradient: string | null } | null>(null)

  useEffect(() => {
    if (!enabled) return
    const imgEl = imgRef.current
    if (!imgEl) return
    if (!key) return
    if (cached) return

    let cancelled = false

    const compute = async () => {
      if (cancelled) return
      try {
        // Ensure decoding is complete (helps mobile Safari/Chrome stability)
        // decode() isn't supported everywhere.
        const maybeDecodable = imgEl as HTMLImageElement & { decode?: () => Promise<void> }
        if (typeof maybeDecodable.decode === 'function') {
          try {
            await maybeDecodable.decode()
          } catch {
            // ignore decode failures; we can still try canvas draw
          }
        }

        const w = 48
        const h = 48
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return

        ctx.drawImage(imgEl, 0, 0, w, h)
        const data = ctx.getImageData(0, 0, w, h).data
        const colors = extractDominantColorsFromImageData(data)
        const g = colorsToGlassGradient(colors)
        if (!g) return

        gradientCache.set(key, g)
        setComputed({ key, gradient: g })
      } catch {
        setComputed({ key, gradient: null })
      }
    }

    const schedule = () => requestAnimationFrame(compute)

    if (imgEl.complete && imgEl.naturalWidth > 0) {
      schedule()
    } else {
      imgEl.addEventListener('load', schedule, { once: true })
      return () => {
        cancelled = true
        imgEl.removeEventListener('load', schedule)
      }
    }

    return () => {
      cancelled = true
    }
  }, [enabled, imgRef, key, cached])

  if (cached) return cached
  if (!key) return null
  return computed?.key === key ? computed.gradient : null
}