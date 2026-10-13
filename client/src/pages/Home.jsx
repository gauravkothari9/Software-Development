import { ArrowRight, ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm.jsx'
import HeroPanel from '../components/HeroPanel.jsx'
import Reveal from '../components/Reveal.jsx'
import Screenshot from '../components/Screenshot.jsx'
import {
  contact,
  featuredProject,
  otherProjects,
  plans,
  pricingNote,
  services,
  steps,
  whatsappUrl,
} from '../data/site.js'
import { useScrollProgress } from '../lib/useScrollProgress.js'

const twoDigits = (number) => String(number).padStart(2, '0')
const isPlaceholder = (value) => value.startsWith('[')
const isUrl = (value) => /^https?:\/\//.test(value)

// Feeds the pointer position to the .spot highlight
const trackSpot = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

function SectionHeading({ index, eyebrow, title, children }) {
  return (
    <Reveal className="grid gap-5 lg:grid-cols-12 lg:gap-8">
      <p className="eyebrow flex items-center gap-3 lg:col-span-3 lg:pt-4">
        <span className="text-cream/40">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line" />
        {eyebrow}
      </p>
      <div className="lg:col-span-9">
        <h2 className="display max-w-3xl text-[clamp(2rem,4.6vw,3.5rem)]">{title}</h2>
        {children && <p className="mt-5 max-w-2xl text-lg text-cream/70">{children}</p>}
      </div>
    </Reveal>
  )
}

// Faint square grid drawn behind the hero
function GridBackdrop() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full text-cream/[0.07] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_72%)]">
      <defs>
        <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  )
}

const headline = [
  { text: 'Custom' },
  { text: 'software,' },
  { text: 'built', accent: true },
  { text: 'for', accent: true },
  { text: 'your', accent: true },
  { text: 'business.', accent: true },
]

const marqueeWords = ['Websites', 'Mobile apps', 'Inventory', 'Order tracking', 'Billing', 'Buyer catalogues', 'Automation']

// Slim ticker of capabilities that drifts sideways under the hero
function Marquee() {
  // The list is repeated so the loop has no visible seam and always fills wide screens
  const words = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords]

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="marquee-track">
        {words.map((word, index) => (
          <span key={index} className="flex items-center">
            <span className="whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.22em] text-cream/60">
              {word}
            </span>
            <span className="mx-8 size-1.5 shrink-0 rounded-full bg-saffron" />
          </span>
        ))}
      </div>
    </div>
  )
}

const statement =
  'I build custom software for businesses and exporters: whatever they need, built to fit how they work.'.split(' ')

// Large statement whose words light up one by one as it scrolls through the screen
function Statement() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, 0.8, 0.5)
  const lit = Math.round(progress * statement.length)

  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Approach</p>
        <p
          ref={ref}
          aria-label={statement.join(' ')}
          className="display mt-8 max-w-5xl text-[clamp(1.9rem,5vw,4rem)] leading-[1.12]"
        >
          {statement.map((word, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`transition-opacity duration-500 ${index < lit ? 'opacity-100' : 'opacity-15'}`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function Hero() {
  const facts = [
    { label: 'Built for', value: 'Businesses & exporters' },
    { label: 'Based in', value: contact.location },
    { label: 'First step', value: 'Free consultation' },
  ]

  // Feeds the pointer position (-0.5 to 0.5) to the tilting panel and its glow
  const trackPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3))
    event.currentTarget.style.setProperty('--my', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3))
  }
  const resetPointer = (event) => {
    event.currentTarget.style.setProperty('--mx', 0)
    event.currentTarget.style.setProperty('--my', 0)
  }

  return (
    <section
      className="relative overflow-hidden"
      onMouseMove={trackPointer}
      onMouseLeave={resetPointer}
    >
      <GridBackdrop />
      <div className="wrap relative">
        <div className="grid gap-14 pb-16 pt-10 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="glass fade-up inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-cream/85">
              <span aria-hidden="true" className="size-2 rounded-full bg-saffron" />
              {contact.role} · {contact.location}
            </p>
            <h1
              aria-label="Custom software, built for your business."
              className="display mt-7 text-[clamp(2.6rem,7vw,5.25rem)] leading-[0.98]"
            >
              {headline.map((word, index) => (
                <Fragment key={index}>
                  <span aria-hidden="true" className="rise-word">
                    <span
                      className={word.accent ? 'text-gold' : ''}
                      style={{ animationDelay: `${150 + index * 80}ms` }}
                    >
                      {word.text}
                    </span>
                  </span>{' '}
                </Fragment>
              ))}
            </h1>
            <p className="fade-up mt-7 font-display text-xl sm:text-2xl" style={{ animationDelay: '650ms' }}>
              Tell me the problem. I'll build the solution.
            </p>
            <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '800ms' }}>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                Chat on WhatsApp
              </a>
              <Link to="/#projects" className="btn btn-outline group">
                See my work
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
          <div className="pb-6 lg:col-span-5">
            <HeroPanel />
          </div>
        </div>

        <dl className="grid border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-white/10 py-5 last:border-b-0 sm:border-b-0 sm:px-8 sm:py-7 sm:first:pl-0"
            >
              <dt className="label">{fact.label}</dt>
              <dd className="mt-2 font-display text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <SectionHeading index="01" eyebrow="What I build" title="Software that fits the way you already work." />
        <Reveal
          as="ul"
          onMouseMove={trackSpot}
          className="spot mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl shadow-black/40 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="group bg-navy/95 p-7 transition-colors duration-500 hover:bg-navy/80 sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="glass flex size-12 items-center justify-center rounded-xl text-saffron transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </span>
                <span aria-hidden="true" className="font-display text-sm text-cream/30">
                  {twoDigits(index + 1)}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-cream/70">{text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Projects() {
  const meta = [
    { label: 'Type', value: featuredProject.tagline },
    { label: 'Role', value: 'Design, development, launch' },
    { label: 'Status', value: 'Live' },
  ]

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHeading index="02" eyebrow="Projects" title="Work I've shipped." />

        <Reveal as="article" className="card relative mt-14 overflow-hidden lg:p-12">
          {/* Light behind the screenshot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-full bg-saffron/20 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Featured project</p>
              <h3 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">{featuredProject.name}</h3>
              <p className="mt-4 max-w-xl text-lg text-cream/70">{featuredProject.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit live site
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </a>
                <Link to={featuredProject.caseStudyPath} className="btn btn-outline group">
                  View case study
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
            <dl className="border-t border-white/10 lg:col-span-5">
              {meta.map((item) => (
                <div key={item.label} className="flex justify-between gap-6 border-b border-white/10 py-3.5">
                  <dt className="label pt-1">{item.label}</dt>
                  <dd className="text-right text-cream/90">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Link
            to={featuredProject.caseStudyPath}
            aria-label={`View the ${featuredProject.name} case study`}
            className="group relative mt-10 block lg:mt-14"
          >
            <Screenshot
              src={featuredProject.screenshot}
              alt={`${featuredProject.name} home page`}
              url="myvoterdesk.com"
              className="transition-transform duration-700 ease-expo group-hover:-translate-y-2"
            />
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {otherProjects.map((project, index) =>
            isPlaceholder(project.name) ? (
              // Until a real project is filled in (see data/site.js) the slot invites an enquiry
              <Reveal as="article" key={index} delay={index * 100}>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-56 flex-col justify-between rounded-3xl border border-dashed border-white/20 p-7 transition-colors duration-500 hover:border-saffron sm:p-9"
                >
                  <span className="label">{index === 0 ? 'Next project' : 'Open slot'}</span>
                  <span className="mt-10 flex items-end justify-between gap-6">
                    <span className="display text-3xl sm:text-4xl">
                      {index === 0 ? 'Yours could be here.' : 'Tell me what you need.'}
                    </span>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-saffron group-hover:bg-saffron group-hover:text-navy">
                      <ArrowUpRight aria-hidden="true" className="size-5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            ) : (
              <Reveal as="article" key={index} delay={index * 100} className="card">
                <Screenshot src={project.screenshot} alt={`${project.name} screenshot`} />
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight">{project.name}</h3>
                    <p className="mt-2 text-cream/70">{project.description}</p>
                  </div>
                  {isUrl(project.link) && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-saffron hover:text-saffron"
                    >
                      <ArrowUpRight aria-hidden="true" className="size-5" />
                    </a>
                  )}
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="wrap">
        <SectionHeading index="03" eyebrow="Pricing" title="Clear pricing, no surprises." />
        <ul className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const popular = Boolean(plan.popular)
            const muted = popular ? 'text-navy/65' : 'text-cream/60'
            const rule = popular ? 'border-navy/15' : 'border-white/10'

            return (
              <Reveal
                as="li"
                key={plan.name}
                delay={index * 100}
                className={`flex flex-col rounded-3xl border p-7 sm:p-9 ${
                  popular
                    ? 'border-cream bg-cream text-navy shadow-[0_30px_90px_-30px_rgb(245_165_36/0.55)] lg:-my-4 lg:py-13'
                    : 'glass'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-tight">{plan.name}</h3>
                  {popular && (
                    <span className="rounded-full bg-navy px-3 py-1.5 font-display text-xs font-medium uppercase tracking-wider text-cream">
                      Most popular
                    </span>
                  )}
                </div>

                <p className={`mt-9 font-display text-xs font-medium uppercase tracking-[0.18em] ${muted}`}>
                  Setup
                </p>
                <p className="display mt-2 text-3xl xl:text-4xl">{plan.setup}</p>
                {plan.setupNote && <p className={`mt-1.5 text-sm ${muted}`}>{plan.setupNote}</p>}
                <p className="mt-3 text-lg">
                  + {plan.monthly}
                  <span className={muted}> / month</span>
                </p>

                <ul className={`mb-9 mt-8 flex flex-col gap-3.5 border-t pt-8 ${rule}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className={`mt-0.5 size-5 shrink-0 ${popular ? 'text-navy' : 'text-saffron'}`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(`Hi Gaurav, I'm interested in the ${plan.name} plan`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn mt-auto ${popular ? 'btn-dark' : 'btn-outline'}`}
                >
                  Discuss {plan.name}
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </a>
              </Reveal>
            )
          })}
        </ul>
        <Reveal as="p" className="mt-12 max-w-2xl text-cream/70">
          {pricingNote}
        </Reveal>
      </div>
    </section>
  )
}

function Process() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, 0.75, 0.55)

  return (
    <section id="process" className="section">
      <div className="wrap">
        <SectionHeading
          index="04"
          eyebrow="How it works"
          title="Four steps from first call to live software."
        />
        <ol ref={ref} className="relative mt-16 grid lg:grid-cols-4" style={{ '--p': progress }}>
          {/* Saffron line that fills along the timeline as you scroll: downwards on phones, across on desktop */}
          <li
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px origin-top scale-y-[var(--p)] bg-saffron lg:h-px lg:w-full lg:origin-left lg:scale-x-[var(--p)] lg:scale-y-100"
          />
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 100}
              className="relative border-l border-white/10 pb-10 pl-7 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-9"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full transition-colors duration-500 lg:-top-[5px] lg:left-0 ${
                  progress > index / steps.length ? 'bg-saffron' : 'bg-line'
                }`}
              />
              <p aria-hidden="true" className="font-display text-sm text-cream/40">
                {twoDigits(index + 1)}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-cream/70">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Contact() {
  const rowClass = 'flex items-baseline justify-between gap-6 border-b border-white/10 py-5'

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-cream/40">05</span>
              <span aria-hidden="true" className="h-px w-8 bg-line" />
              Contact
            </p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5.2vw,4rem)]">
              Tell me what you need. <span className="text-gold">Let's build it.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-cream/70">
              The first consultation is free. Message me on WhatsApp or fill in the form.
            </p>
          </Reveal>

          <Reveal as="dl" className="mt-10 border-t border-white/10">
            <div className={rowClass}>
              <dt className="label">Phone</dt>
              <dd>
                <a href={contact.phoneHref} className="font-display text-lg hover:text-saffron sm:text-xl">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className={rowClass}>
              <dt className="label">Email</dt>
              <dd className="min-w-0">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all font-display text-lg hover:text-saffron sm:text-xl"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className={rowClass}>
              <dt className="label">Location</dt>
              <dd className="font-display text-lg sm:text-xl">{contact.location}</dd>
            </div>
          </Reveal>

          <Reveal className="mt-9">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full sm:w-auto"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Chat on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Services />
      <Projects />
      <Pricing />
      <Process />
      <Contact />
    </>
  )
}
