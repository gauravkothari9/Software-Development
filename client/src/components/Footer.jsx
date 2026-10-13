import { Link } from 'react-router-dom'
import { contact, whatsappUrl } from '../data/site.js'

const links = [
  { to: '/#services', label: 'What I build' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#process', label: 'How it works' },
]

export default function Footer() {
  const linkClass = 'inline-block py-1.5 text-cream/80 hover:text-saffron'

  return (
    // Extra bottom padding keeps the floating WhatsApp button off the links
    <footer className="overflow-hidden border-t border-white/10 pb-24 pt-16">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="label">Based in</p>
            <p className="mt-3 text-cream/80">
              {contact.location}, India
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="label">Site</p>
            <ul className="mt-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label">Contact</p>
            <ul className="mt-2">
              <li>
                <a href={contact.phoneHref} className={linkClass}>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="display mt-16 whitespace-nowrap text-[clamp(2.75rem,12.5vw,11rem)] text-cream/10"
        >
          {contact.name}
          <span className="text-saffron">.</span>
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-cream/60 sm:flex-row sm:justify-between">
          <p>© 2026 {contact.name}</p>
          <p>{contact.role} · Custom software for businesses</p>
        </div>
      </div>
    </footer>
  )
}
