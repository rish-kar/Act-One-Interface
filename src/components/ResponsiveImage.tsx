import { useMemo } from 'react'
import type { CSSProperties } from 'react'

export type ResponsiveImageProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  /**
   * sizes attribute for srcset selection.
   * Example: "(max-width: 640px) 92vw, 900px"
   */
  sizes?: string
  /** base widths used for generated responsive variants */
  srcSetWidths?: number[]
  loading?: 'eager' | 'lazy'
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
  style?: CSSProperties
}

function buildCandidateUrl(src: string, w: number) {
  // Only supports .webp inputs from our pipeline.
  if (!src.toLowerCase().endsWith('.webp')) return null
  const i = src.lastIndexOf('.webp')
  return `${src.slice(0, i)}-${w}.webp ${w}w`
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  width,
  height,
  sizes,
  srcSetWidths = [480, 768, 1024, 1440],
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  style,
}: ResponsiveImageProps) {
  const srcSet = useMemo(() => {
    if (!srcSetWidths || srcSetWidths.length === 0) return null

    const candidates = srcSetWidths
      .map((w) => buildCandidateUrl(src, w))
      .filter((x): x is string => Boolean(x))

    // include original as the largest fallback
    candidates.push(`${src} 9999w`)

    return candidates.join(', ')
  }, [src, srcSetWidths])

  return (
    <img
      src={src}
      srcSet={srcSet ?? undefined}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      // Use lowercase fetchpriority for valid HTML attribute
      {...{ fetchpriority: fetchPriority }}
      style={style}
    />
  )
}