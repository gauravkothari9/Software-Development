import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contact, whatsappUrl } from '../data/site.js'

const links = [
  { to: '/#services', label: 'What I build' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#process', label: 'How it works' },
  { to: '/#contact', label: 'Contact' },
]

// Floating pill-shaped bar that turns to frosted glass once the page scrolls
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const glass = 'border-white/10 bg-navy/70 shadow-xl shadow-black/30 backdrop-blur-xl'

  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4 sm:px-6">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-6 pr-2 transition-all duration-500 sm:h-16 ${
          scrolled || open ? glass : 'border-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 font-display text-lg font-medium tracking-tight">
          <img src="/logo.png" alt="" width="442" height="319" className="h-7 w-auto" />
          {contact.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="link-line text-sm text-cream/70 hover:text-cream">
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary hidden min-h-11 px-5 py-2 text-sm lg:inline-flex"
        >
          Let's talk
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>

        <button
          type="button"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fade-up mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-navy/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl lg:hidden"
          style={{ animationDuration: '0.4s' }}
        >
          <ul>
            {links.map((link, index) => (
              <li key={link.to} className="border-b border-white/10">
                <Link to={link.to} className="flex items-baseline gap-4 py-4 font-display text-2xl">
                  <span className="text-xs text-cream/40">{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
