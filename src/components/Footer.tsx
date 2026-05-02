import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { siteContent } from '../content/siteContent'

export default function Footer() {
  const year = new Date().getFullYear()
  const copyright = siteContent.footer.copyright.replace('[YEAR]', String(year))

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/25">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-serif text-lg text-white">{siteContent.footer.left.title}</div>
            <p className="mt-2 text-sm text-white/70">{siteContent.footer.left.text}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <ul className="mt-3 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-white/70" aria-hidden="true" />
                <span>
                  {siteContent.contactPage.contactDetails.address}
                  {siteContent.contactPage.contactDetails.city && (
                    <>
                      <br />
                      {siteContent.contactPage.contactDetails.city}
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/70" aria-hidden="true" />
                <a className="hover:text-white" href={`mailto:${siteContent.contactPage.contactDetails.email}`}>
                  {siteContent.contactPage.contactDetails.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                <a className="hover:text-white" href={`tel:${siteContent.contactPage.contactDetails.phone}`}>
                  {siteContent.contactPage.contactDetails.phone}
                </a>
              </li>
              {siteContent.contactPage.contactDetails.phone2 &&
                siteContent.contactPage.contactDetails.phone2.trim() && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                    <a className="hover:text-white" href={`tel:${siteContent.contactPage.contactDetails.phone2}`}>
                      {siteContent.contactPage.contactDetails.phone2}
                    </a>
                  </li>
                )}
              {siteContent.contactPage.contactDetails.phone3 &&
                siteContent.contactPage.contactDetails.phone3.trim() && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-white/70" aria-hidden="true" />
                    <a className="hover:text-white" href={`tel:${siteContent.contactPage.contactDetails.phone3}`}>
                      {siteContent.contactPage.contactDetails.phone3}
                    </a>
                  </li>
                )}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  className="hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/return-policy"
                  className="hover:text-white transition-colors"
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a
                  href="/shipping-policy"
                  className="hover:text-white transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Social</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {siteContent.contactPage.social
                .filter((s) => s.href && !s.href.includes('[TBD]') && !s.href.includes('[Optional'))
                .map((s) => (
                  <a
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                  >
                    <span>{s.label}</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              {siteContent.contactPage.social.every((s) => s.href.includes('[TBD]') || s.href.includes('[Optional')) && (
                <div className="text-xs text-white/55">Social links will appear here once set.</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-2 border-t border-white/10 pt-6 text-xs text-white/55 md:grid-cols-2 md:items-start">
          <div className="space-y-1">
            <div>{copyright}</div>
            {siteContent.footer.credits?.developer && <div>{siteContent.footer.credits.developer}</div>}
            {siteContent.footer.credits?.music && <div>{siteContent.footer.credits.music}</div>}
          </div>
          <div className="md:text-right">Built for Firebase Hosting</div>
        </div>
      </div>
    </footer>
  )
}