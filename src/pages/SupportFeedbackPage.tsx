import { useMemo, useState } from 'react'
import GlassPanel from '../components/GlassPanel'
import SectionReveal from '../components/SectionReveal'
import FormField from '../components/FormField'

import qrWhite from '../data/payments/QR Code White.webp'

type SupportForm = {
  fullName: string
  email: string
  phone: string
  message: string
}

type FeedbackForm = {
  fullName: string
  email: string
  phone: string
  showName: string
  showVenue: string
  message: string
}

function validateSupport(form: SupportForm) {
  const errors: Partial<Record<keyof SupportForm, string>> = {}
  if (!form.fullName.trim()) errors.fullName = 'Full Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid email.'
  if (!form.phone.trim()) errors.phone = 'Phone Number is required.'
  else if (!/^\d{10}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

function validateFeedback(form: FeedbackForm) {
  const errors: Partial<Record<keyof FeedbackForm, string>> = {}
  if (!form.fullName.trim()) errors.fullName = 'Full Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid email.'
  if (!form.phone.trim()) errors.phone = 'Phone Number is required.'
  else if (!/^\d{10}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid 10-digit mobile number.'
  if (!form.showName.trim()) errors.showName = 'Show Name is required.'
  if (!form.showVenue.trim()) errors.showVenue = 'Show Venue is required.'
  if (!form.message.trim()) errors.message = 'Feedback message is required.'
  return errors
}

export default function SupportFeedbackPage() {
  const [supportForm, setSupportForm] = useState<SupportForm>({ fullName: '', email: '', phone: '', message: '' })
  const [supportErrors, setSupportErrors] = useState<Partial<Record<keyof SupportForm, string>>>({})
  const [supportSubmitted, setSupportSubmitted] = useState(false)

  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    fullName: '',
    email: '',
    phone: '',
    showName: '',
    showVenue: '',
    message: '',
  })
  const [feedbackErrors, setFeedbackErrors] = useState<Partial<Record<keyof FeedbackForm, string>>>({})
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const panelStyle = useMemo(
    () =>
      ({
        ['--glass-gradient']:
          'linear-gradient(145deg, rgba(0,10,55,0.46) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.32) 100%)',
      } as React.CSSProperties),
    [],
  )

  function onSubmitSupport(e: React.FormEvent) {
    e.preventDefault()
    const next = validateSupport(supportForm)
    setSupportErrors(next)
    if (Object.keys(next).length > 0) return
    setSupportSubmitted(true)
  }

  function onSubmitFeedback(e: React.FormEvent) {
    e.preventDefault()
    const next = validateFeedback(feedbackForm)
    setFeedbackErrors(next)
    if (Object.keys(next).length > 0) return
    setFeedbackSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <SectionReveal>
        <div className="pt-10">
          <h1 className="font-serif text-3xl text-white md:text-4xl">Support &amp; Feedback</h1>
          <p className="mt-3 w-full max-w-none text-sm text-white/70 text-justify">
            Help us keep rehearsal rooms alive and stories on-stage. And if you’ve watched us perform, tell us what you
            felt—your words shape our next curtain call.
          </p>
        </div>
      </SectionReveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionReveal>
          <GlassPanel className="p-6 md:p-8" style={panelStyle}>
            <div className="text-sm font-semibold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Feedback</div>
            <div className="mt-2 text-sm text-white/70" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>Tell us what stayed with you—moments, music, or performances.</div>

            {feedbackSubmitted ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                Thank you for your feedback.
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={onSubmitFeedback} noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    id="feedback-fullName"
                    label="Full Name"
                    required
                    value={feedbackForm.fullName}
                    onChange={(v) => setFeedbackForm((s) => ({ ...s, fullName: v }))}
                    error={feedbackErrors.fullName}
                  />

                  <FormField
                    id="feedback-email"
                    label="Email"
                    required
                    type="email"
                    value={feedbackForm.email}
                    onChange={(v) => setFeedbackForm((s) => ({ ...s, email: v }))}
                    error={feedbackErrors.email}
                  />

                  {/* Phone number: prefix box exactly like booking */}
                  <div>
                    <label className="label" htmlFor="feedback-phone">
                      Phone Number <span className="text-white/50">*</span>
                    </label>
                    <div className="mt-2 flex rounded-xl border border-white/15 bg-white/5 overflow-hidden">
                      <div className="flex items-center px-3 text-sm text-white/45 select-none border-r border-white/10">
                        +91
                      </div>
                      <input
                        id="feedback-phone"
                        className="field !mt-0 flex-1 !border-0 !bg-transparent"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        pattern="\d*"
                        maxLength={10}
                        value={feedbackForm.phone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
                          setFeedbackForm((s) => ({ ...s, phone: digitsOnly }))
                        }}
                        aria-invalid={Boolean(feedbackErrors.phone)}
                        aria-describedby={feedbackErrors.phone ? 'support-feedback-phone-error' : undefined}
                        required
                      />
                    </div>
                    {feedbackErrors.phone ? (
                      <div id="support-feedback-phone-error" className="error mt-2">
                        {feedbackErrors.phone}
                      </div>
                    ) : null}
                  </div>

                  <FormField
                    id="feedback-showName"
                    label="Show Name"
                    required
                    value={feedbackForm.showName}
                    onChange={(v) => setFeedbackForm((s) => ({ ...s, showName: v }))}
                    error={feedbackErrors.showName}
                    placeholder="e.g. Chenni"
                  />

                  <FormField
                    id="feedback-showVenue"
                    label="Show Venue"
                    required
                    value={feedbackForm.showVenue}
                    onChange={(v) => setFeedbackForm((s) => ({ ...s, showVenue: v }))}
                    error={feedbackErrors.showVenue}
                    placeholder="e.g. LTG Auditorium"
                  />
                </div>

                <FormField
                  id="feedback-message"
                  label="Your Feedback"
                  required
                  as="textarea"
                  value={feedbackForm.message}
                  onChange={(v) => setFeedbackForm((s) => ({ ...s, message: v }))}
                  error={feedbackErrors.message}
                />

                <div className="pt-1">
                  <button type="submit" className="btn-primary w-full">
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </GlassPanel>
        </SectionReveal>

        <SectionReveal>
          <GlassPanel className="p-6 md:p-8" style={panelStyle}>
            <div className="text-sm font-semibold text-white">Donate via UPI</div>
            <div className="mt-2 text-sm text-white/70">Scan the QR code to support our work.</div>

            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3">
                <img src={qrWhite} alt="UPI QR code" className="w-full rounded-xl" decoding="async" />
              </div>
            </div>

            <div className="mt-8 text-sm font-semibold text-white">Send us a note</div>
            <div className="mt-2 text-sm text-white/70">Share your details so we can thank you and share updates.</div>

            {supportSubmitted ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
                Thank you. We’ve received your message.
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={onSubmitSupport} noValidate>
                <FormField
                  id="support-fullName"
                  label="Full Name"
                  required
                  value={supportForm.fullName}
                  onChange={(v) => setSupportForm((s) => ({ ...s, fullName: v }))}
                  error={supportErrors.fullName}
                />

                <FormField
                  id="support-email"
                  label="Email"
                  required
                  type="email"
                  value={supportForm.email}
                  onChange={(v) => setSupportForm((s) => ({ ...s, email: v }))}
                  error={supportErrors.email}
                />

                {/* Phone number: prefix box exactly like booking */}
                <div>
                  <label className="label" htmlFor="support-phone">
                    Phone Number <span className="text-white/50">*</span>
                  </label>
                  <div className="mt-2 flex rounded-xl border border-white/15 bg-white/5 overflow-hidden">
                    <div className="flex items-center px-3 text-sm text-white/45 select-none border-r border-white/10">
                      +91
                    </div>
                    <input
                      id="support-phone"
                      className="field !mt-0 flex-1 !border-0 !bg-transparent"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="\d*"
                      maxLength={10}
                      value={supportForm.phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
                        setSupportForm((s) => ({ ...s, phone: digitsOnly }))
                      }}
                      aria-invalid={Boolean(supportErrors.phone)}
                      aria-describedby={supportErrors.phone ? 'support-phone-error' : undefined}
                      required
                    />
                  </div>
                  {supportErrors.phone ? (
                    <div id="support-phone-error" className="error mt-2">
                      {supportErrors.phone}
                    </div>
                  ) : null}
                </div>

                <FormField
                  id="support-message"
                  label="Message"
                  required
                  as="textarea"
                  value={supportForm.message}
                  onChange={(v) => setSupportForm((s) => ({ ...s, message: v }))}
                  error={supportErrors.message}
                  placeholder="Leave a note with your donation…"
                />

                <div className="pt-1">
                  <button type="submit" className="btn-primary w-full">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </GlassPanel>
        </SectionReveal>
      </div>

      <div className="h-10" />
    </div>
  )
}