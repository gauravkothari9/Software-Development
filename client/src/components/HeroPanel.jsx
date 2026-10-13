// Decorative illustration of the kind of screen a client gets. The figures are made up
// for the picture and the whole panel is hidden from screen readers.
// It tilts with the pointer using the --mx / --my variables set by the hero section.
const stats = [
  { label: 'Orders', value: '24' },
  { label: 'In production', value: '9' },
  { label: 'Ready to ship', value: '6' },
]

const orders = [
  { id: '#1042', stage: 'In production', active: true },
  { id: '#1041', stage: 'Packed' },
  { id: '#1040', stage: 'Dispatched' },
]

const stock = [45, 70, 55, 90, 35, 60, 80]

export default function HeroPanel() {
  return (
    <div aria-hidden="true" className="fade-up relative mx-auto max-w-md select-none lg:ml-auto lg:mr-0" style={{ animationDelay: '500ms' }}>
      {/* Soft saffron light behind the panel; drifts with the pointer */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-full bg-saffron/25 blur-3xl transition-transform duration-500 ease-out"
        style={{ transform: 'translate(calc(var(--mx, 0) * 90px), calc(var(--my, 0) * 90px))' }}
      />

      <div className="float relative">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform:
              'perspective(1200px) rotateY(calc(var(--mx, 0) * 10deg)) rotateX(calc(var(--my, 0) * -10deg))',
          }}
        >
          <div className="glass rounded-3xl bg-navy/50">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3.5">
              <span className="size-2.5 rounded-full bg-cream/20" />
              <span className="size-2.5 rounded-full bg-cream/20" />
              <span className="size-2.5 rounded-full bg-cream/20" />
              <span className="label ml-3">Your business, one screen</span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-4 py-4 sm:px-5">
                  <p className="font-display text-2xl font-medium sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-cream/60">{stat.label}</p>
                </div>
              ))}
            </div>

            <ul className="divide-y divide-white/10 border-b border-white/10">
              {orders.map((order) => (
                <li key={order.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
                  <span className="font-display">Order {order.id}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      order.active ? 'bg-saffron text-navy' : 'border border-white/15 text-cream/70'
                    }`}
                  >
                    {order.stage}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-5 py-5">
              <p className="label">Stock levels</p>
              <div className="mt-4 flex h-20 items-end gap-2">
                {stock.map((height, index) => (
                  <span
                    key={index}
                    style={{ height: `${height}%`, animationDelay: `${900 + index * 70}ms` }}
                    className={`grow-bar flex-1 rounded-sm ${index === 3 ? 'bg-saffron' : 'bg-cream/15'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="glass absolute -bottom-5 right-4 rounded-2xl bg-navy/80 px-4 py-3 lg:-left-8 lg:right-auto">
            <p className="text-xs text-cream/60">Invoice sent</p>
            <p className="mt-0.5 font-display text-sm font-medium">Order #1040 · Billed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
