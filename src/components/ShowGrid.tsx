import { useEffect, useMemo, useState } from 'react'
import GlassPanel from './GlassPanel'
import SectionReveal from './SectionReveal'
import ShowCard, { type ShowCardData } from './ShowCard'
import type { Auditorium } from '../lib/auditoriums'
import { getAuditoriums } from '../lib/auditoriums'

type FetchState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: Auditorium[] }

export default function ShowGrid({ limit, compact }: { limit?: number; compact?: boolean }) {
  const [state, setState] = useState<FetchState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getAuditoriums({ force: true })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const data = useMemo(() => {
    if (state.status !== 'ready') return [] as Auditorium[]
    return limit != null ? state.data.slice(0, limit) : state.data
  }, [state, limit])

  const rows = useMemo(() => data.map((a) => ({ show: buildShowCardData(a), auditorium: a })), [data])

  if (state.status === 'loading') {
    const loadingClass = compact ? 'grid gap-4' : 'grid gap-6 md:grid-cols-2'
    return (
      <div className={loadingClass}>
        {[0, 1].map((i) => (
          <GlassPanel key={i} className="p-6 animate-pulse">
            <div className="h-5 w-1/2 rounded bg-white/10" />
            <div className="mt-4 space-y-3">
              {[0, 1, 2].map((line) => (
                <div key={line} className="h-4 w-3/4 rounded bg-white/5" />
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <div className="h-9 w-24 rounded bg-white/10" />
              <div className="h-9 w-24 rounded bg-white/10" />
            </div>
          </GlassPanel>
        ))}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <GlassPanel className="p-6 text-sm text-white/70">
        Unable to load shows right now. Please refresh the page.
      </GlassPanel>
    )
  }

  if (!rows.length) {
    return (
      <GlassPanel className="p-6 text-sm text-white/70">
        No upcoming shows are scheduled yet. Check back soon.
      </GlassPanel>
    )
  }

  const gridClass = compact ? 'grid gap-4' : 'grid gap-6 md:grid-cols-2'
  return (
    <div className={gridClass}>
      {rows.map(({ show, auditorium }, idx) => (
        <SectionReveal key={show.id} delay={Math.min(idx * 0.06, 0.24)}>
          <ShowCard show={show} auditorium={auditorium} />
        </SectionReveal>
      ))}
    </div>
  )
}

function buildShowCardData(auditorium: Auditorium): ShowCardData {
  return {
    id: auditorium.showId ?? auditorium.auditoriumId,
    title: auditorium.showName ?? 'Untitled show',
    dateLabel: formatDateLabel(auditorium.showDate, auditorium.showTime),
    venue: auditorium.auditoriumName ?? 'Venue TBA',
    priceLabel: formatPrice(auditorium.ticketAmount),
  }
}

function formatDateLabel(date?: string, time?: string) {
  if (date && time) return `${formatFullDate(date)} · ${format12HourTime(time)}`
  if (date) return formatFullDate(date)
  if (time) return format12HourTime(time)
  return 'Schedule TBA'
}

function formatFullDate(isoDate: string) {
  // Accept YYYY-MM-DD
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function format12HourTime(hms: string) {
  // Accept HH:mm:ss (or HH:mm)
  const [hh, mm] = hms.split(':')
  const d = new Date()
  d.setHours(Number(hh || 0), Number(mm || 0), 0, 0)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatPrice(amount?: number) {
  if (typeof amount === 'number' && !Number.isNaN(amount)) {
    return `₹ ${amount.toFixed(0)}`
  }
  return '₹ --'
}