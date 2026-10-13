import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Screenshot from '../components/Screenshot.jsx'
import { caseStudy, featuredProject, whatsappUrl } from '../data/site.js'

// One row of the case study: small label on the left, content on the right
function Row({ label, children }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-white/10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
      <h2 className="eyebrow lg:col-span-3 lg:pt-2">{label}</h2>
      <div className="lg:col-span-9">{children}</div>
    </Reveal>
  )
}

export default function MyVoterDesk() {
  useEffect(() => {
    const previous = document.title
    document.title = `${featuredProject.name} case study | Gaurav Kothari`
    return () => {
      document.title = previous
    }
  }, [])

  const meta = [
    { label: 'Type', value: featuredProject.tagline },
    { label: 'Role', value: 'Design, development, launch' },
    { label: 'Status', value: 'Live' },
  ]

  return (
    <article>
      <header className="wrap pb-14 pt-8 sm:pt-12 lg:pb-20">
        <Link to="/#projects" className="inline-flex items-center gap-2 py-2 text-sm text-cream/70 hover:text-saffron">
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </Link>

        <p className="eyebrow mt-10">Case study</p>
        <h1 className="display mt-5 text-[clamp(2.75rem,9vw,7rem)] leading-[0.95]">
          {featuredProject.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/70 sm:text-xl">{featuredProject.description}</p>

        <dl className="mt-10 grid border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
          {meta.map((item) => (
            <div
              key={item.label}
              className="border-b border-white/10 py-5 last:border-b-0 sm:border-b-0 sm:px-8 sm:py-6 sm:first:pl-0"
            >
              <dt className="label">{item.label}</dt>
              <dd className="mt-2 font-display text-lg">{item.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={featuredProject.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-9 w-full sm:w-auto"
        >
          Visit live site
          <ArrowUpRight aria-hidden="true" className="size-5" />
        </a>

        <Reveal className="mt-14">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-48 rounded-full bg-saffron/25 blur-3xl"
            />
            <Screenshot
              src={featuredProject.screenshot}
              alt={`${featuredProject.name} home page`}
              url="myvoterdesk.com"
              className="relative"
            />
          </div>
        </Reveal>
      </header>

      <div className="wrap">
        <Row label="The problem">
          <p className="display max-w-3xl text-2xl sm:text-3xl">{caseStudy.problem}</p>
        </Row>
        <Row label="What I built">
          <ul className="grid gap-4 sm:grid-cols-2">
            {caseStudy.features.map((feature, index) => (
              <li key={feature.title} className="glass rounded-2xl p-6">
                <p aria-hidden="true" className="font-display text-sm text-saffron">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-cream/70">{feature.text}</p>
              </li>
            ))}
          </ul>
        </Row>
        <Row label="My role">
          <p className="display max-w-3xl text-2xl sm:text-3xl">{caseStudy.role}</p>
        </Row>
        <Row label="Screenshots">
          <ul className="grid gap-6 sm:grid-cols-2">
            {caseStudy.screenshots.map((shot) => (
              <li key={shot.caption}>
                <figure>
                  <Screenshot src={shot.src} alt={`${featuredProject.name}: ${shot.caption}`} />
                  <figcaption className="label mt-4">{shot.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Row>
      </div>

      <section className="wrap pb-20 pt-6 sm:pb-28">
        <Reveal className="rounded-[2rem] bg-cream p-8 text-navy shadow-[0_40px_120px_-40px_rgb(245_165_36/0.6)] sm:p-14 lg:p-20">
          <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.75rem)]">
            Need something like this for your business? Let's talk.
          </h2>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Chat on WhatsApp
            </a>
            <Link
              to="/#contact"
              className="btn group border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-cream"
            >
              Send your details
              <ArrowRight
                aria-hidden="true"
                className="size-5 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </article>
  )
}
