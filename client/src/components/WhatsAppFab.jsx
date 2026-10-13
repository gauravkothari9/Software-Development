import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../data/site.js'

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-saffron text-navy shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105"
    >
      <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full border border-saffron" />
      <MessageCircle aria-hidden="true" className="relative size-7" />
    </a>
  )
}
