import { Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { defaultWhatsappMessage, mailtoUrl, whatsappUrl } from '../data/site.js'

const emptyForm = { name: '', business: '', phone: '', message: '' }

function enquiryText({ name, business, phone, message }) {
  const details = [
    `Name: ${name}`,
    business && `Business: ${business}`,
    `Phone: ${phone}`,
    message && `What I need: ${message}`,
  ].filter(Boolean)

  return `${defaultWhatsappMessage}.\n\n${details.join('\n')}`
}

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [opened, setOpened] = useState(null)

  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))

  function handleSubmit(event) {
    event.preventDefault()
    const channel = event.nativeEvent.submitter?.value === 'email' ? 'email' : 'whatsapp'
    const text = enquiryText(form)
    const url =
      channel === 'email'
        ? mailtoUrl(`Custom software enquiry from ${form.name}`, text)
        : whatsappUrl(text)

    // Open straight away, while still inside the tap, so mobile browsers don't block it
    if (channel === 'email') {
      window.location.href = url
    } else {
      window.open(url, '_blank', 'noopener')
    }

    // Keep a copy of the lead on the server. The message itself goes via WhatsApp/email,
    // so a failure here must never get in the visitor's way.
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, channel }),
      keepalive: true,
    }).catch(() => {})

    setOpened({ channel, url })
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          value={form.name}
          onChange={update}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="business" className="mb-1.5 block text-sm font-medium">
          Business name
        </label>
        <input
          id="business"
          name="business"
          maxLength={150}
          autoComplete="organization"
          value={form.business}
          onChange={update}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          pattern="[+0-9][0-9\s\-]{6,19}"
          title="Enter a phone number, for example 98765 43210"
          autoComplete="tel"
          value={form.phone}
          onChange={update}
          className="field"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          What you need
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          value={form.message}
          onChange={update}
          className="field resize-y"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button type="submit" name="channel" value="whatsapp" className="btn btn-primary">
          <MessageCircle aria-hidden="true" className="size-5" />
          Send on WhatsApp
        </button>
        <button type="submit" name="channel" value="email" className="btn btn-outline">
          <Mail aria-hidden="true" className="size-5" />
          Send by email
        </button>
      </div>

      <p className="text-sm text-cream/60">
        This opens WhatsApp or your email app with your details filled in. A copy is saved so I can
        follow up.
      </p>

      <p role="status" className="text-sm text-cream/80">
        {opened && (
          <>
            {opened.channel === 'email' ? 'Opening your email app. ' : 'Opening WhatsApp. '}
            Press send there to reach me. Nothing opened?{' '}
            <a
              href={opened.url}
              target={opened.channel === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-saffron underline"
            >
              Tap here
            </a>
            .
          </>
        )}
      </p>
    </form>
  )
}
