// All site content lives here. Edit this file to change text, prices or projects.
// Anything in [SQUARE BRACKETS] is a placeholder waiting for real content.
import { BookOpen, Boxes, ClipboardList, Globe, ReceiptText, Workflow } from 'lucide-react'

export const contact = {
  name: 'Gaurav Kothari',
  role: 'Software Developer',
  location: 'Jodhpur, Rajasthan',
  phoneDisplay: '+91 90241 57399',
  phoneHref: 'tel:+919024157399',
  whatsappNumber: '919024157399',
  email: 'gauravkothari3789@gmail.com',
}

export const defaultWhatsappMessage = "Hi Gaurav, I'm interested in custom software for my business"

export function whatsappUrl(text = defaultWhatsappMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export function mailtoUrl(subject, body) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const services = [
  {
    icon: Globe,
    title: 'Website & mobile app',
    text: 'A website or app your customers can use on any phone.',
  },
  {
    icon: Boxes,
    title: 'Inventory & stock management',
    text: "Know what's in stock, what's running low and where it is.",
  },
  {
    icon: ClipboardList,
    title: 'Order & production tracking',
    text: 'Follow every order from enquiry to dispatch.',
  },
  {
    icon: ReceiptText,
    title: 'Billing & invoices',
    text: 'Create bills and invoices quickly, with every record in one place.',
  },
  {
    icon: BookOpen,
    title: 'Online buyer catalogue',
    text: 'Share your products with buyers through a simple link.',
  },
  {
    icon: Workflow,
    title: 'Daily work automation',
    text: 'Replace repetitive registers, sheets and follow-ups with software.',
  },
]

export const featuredProject = {
  name: 'MyVoterDesk',
  tagline: 'Election candidate platform',
  description:
    'Voter-list software for election candidates and campaign teams. Designed, built and launched end to end by me.',
  url: 'https://myvoterdesk.com',
  caseStudyPath: '/projects/myvoterdesk',
  // Images live in client/public; set the path here
  screenshot: '/screenshots/myvoterdesk-home.webp',
}

export const otherProjects = [
  { name: '[PROJECT NAME]', description: '[ONE-LINE DESCRIPTION]', link: '[LINK]', screenshot: null },
  { name: '[PROJECT NAME]', description: '[ONE-LINE DESCRIPTION]', link: '[LINK]', screenshot: null },
]

// The problem and features below are drawn from the wording on myvoterdesk.com.
// Check them and rewrite in your own words where needed.
export const caseStudy = {
  problem:
    'The official electoral roll reaches a candidate as Excel sheets and PDFs. A campaign needs it as something it can search, target households with and act on.',
  features: [
    { title: 'Roll import', text: 'Ward Excel files or official SEC roll PDFs, converted without OCR.' },
    { title: 'Bilingual search', text: 'Find voters by name, EPIC, house or relative, in English or the local language.' },
    { title: 'Precise targeting', text: 'Filter by booth, section, gender, age and status.' },
    { title: 'Branded voter slips', text: 'A WhatsApp slip per voter, or A4 sheets for booth teams.' },
    { title: 'WhatsApp sending', text: "Cards and personalised messages sent from the candidate's own number." },
    { title: 'Ward analytics', text: 'Family and household views, saved selections and exports.' },
  ],
  role: 'Complete product, from design and development to launch.',
  // Gallery tiles: images live in client/public
  screenshots: [
    { src: '/screenshots/myvoterdesk-how-it-works.webp', caption: 'How it works' },
    { src: '/screenshots/myvoterdesk-features.webp', caption: 'Roll import' },
    { src: '/screenshots/myvoterdesk-voter-cards.webp', caption: 'Branded voter slips' },
    { src: '/screenshots/myvoterdesk-pricing.webp', caption: 'Pricing' },
  ],
}

export const plans = [
  {
    name: 'Basic',
    setup: '₹25,000',
    monthly: '₹10,000',
    features: ['Catalogue', 'Billing', 'Simple stock tracking'],
  },
  {
    name: 'Standard',
    popular: true,
    setup: '₹40,000–50,000',
    monthly: '₹25,000',
    features: ['Order + production tracking', 'Inventory', 'Multiple users'],
  },
  {
    name: 'Complex',
    setup: '₹75,000+',
    setupNote: 'Quote after discussion',
    monthly: '₹50,000',
    features: ['Custom workflows', 'Buyer portal', 'App + web', 'Integrations', 'Full customization'],
  },
]

export const pricingNote =
  'Monthly fee covers hosting, maintenance, updates & support. Free consultation.'

export const steps = [
  {
    title: 'Free consultation',
    text: "Tell me how your business works and what's slowing it down. No charge.",
  },
  {
    title: 'Demo & proposal',
    text: 'You see a demo and get a clear proposal with pricing.',
  },
  {
    title: 'Build & setup',
    text: 'I build the software and set it up for you and your team.',
  },
  {
    title: 'Ongoing support',
    text: 'Hosting, maintenance, updates and support continue every month.',
  },
]
