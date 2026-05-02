import { useEffect } from 'react'

export default function StaticPolicyRedirect({ to, title }: { to: string; title?: string }) {
  useEffect(() => {
    // Force a full document load so Firebase serves the static HTML policy page.
    window.location.assign(to)
  }, [to])

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-16">
      <h1 className="font-serif text-3xl text-white">{title ?? 'Opening policy page…'}</h1>
      <p className="mt-3 text-white/70">
        If you are not redirected automatically,{' '}
        <a className="text-[#ff8b3d] hover:underline" href={to}>
          click here
        </a>
        .
      </p>
    </div>
  )
}
