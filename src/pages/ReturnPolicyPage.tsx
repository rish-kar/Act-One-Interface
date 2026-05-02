import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import useIsMobile from '../lib/useIsMobile'
import { MobileGlassCard } from '../components/mobile/MobileUIComponents'

export default function ReturnPolicyPage() {
  const isMobile = useIsMobile(640)

  const content = (
    <>
      <h1 className="font-serif text-4xl text-white sm:text-5xl">Return Policy</h1>
      <p className="mt-3 text-white/60">Last updated: January 2026</p>

      <div className="mt-6 space-y-6">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-white/80">
          <span className="font-semibold text-white">Not applicable:</span> Prarambh Theatre Group provides event tickets and services.
          We do not sell physical goods, so there are no product returns.
        </div>

        <div className="text-sm leading-relaxed text-white/75">
          If you have questions about a booking, please contact us:
          <div className="mt-3">
            Email:{' '}
            <a className="text-[#ff8b3d] hover:underline" href="mailto:prarambhtheatre@gmail.com">
              prarambhtheatre@gmail.com
            </a>
            <br />
            Phone:{' '}
            <a className="text-[#ff8b3d] hover:underline" href="tel:+919818620738">
              +91-9818620738
            </a>
            ,{' '}
            <a className="text-[#ff8b3d] hover:underline" href="tel:+919310109669">
              +91-9310109669
            </a>
            <br />
            Address: Gaur City 1, Avenue 1, Gautam Buddha Nagar, Greater Noida West, Uttar Pradesh - 201318
          </div>
        </div>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <div className="px-4 pb-24">
        <header className="pt-6">
          <h1 className="font-serif text-2xl text-white">Return Policy</h1>
          <p className="mt-2 text-sm text-white/60">Last updated: January 2026</p>
        </header>

        <section className="mt-5 space-y-4">
          <MobileGlassCard>
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-white/80">
              <span className="font-semibold text-white">Not applicable:</span> We sell event tickets/services and do not ship physical goods.
            </div>
          </MobileGlassCard>
          <MobileGlassCard>
            <h2 className="font-serif text-lg text-white">Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Email:{' '}
              <a className="text-[#ff8b3d] hover:underline" href="mailto:prarambhtheatre@gmail.com">
                prarambhtheatre@gmail.com
              </a>
              <br />
              Phone:{' '}
              <a className="text-[#ff8b3d] hover:underline" href="tel:+919818620738">
                +91-9818620738
              </a>
              ,{' '}
              <a className="text-[#ff8b3d] hover:underline" href="tel:+919310109669">
                +91-9310109669
              </a>
              <br />
              Address: Gaur City 1, Avenue 1, Gautam Buddha Nagar, Greater Noida West, Uttar Pradesh - 201318
            </p>
          </MobileGlassCard>
        </section>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <SectionReveal>
        <div className="pt-8 sm:pt-10">
          <GlassPanel className="p-6 sm:p-8">{content}</GlassPanel>
        </div>
      </SectionReveal>
    </div>
  )
}