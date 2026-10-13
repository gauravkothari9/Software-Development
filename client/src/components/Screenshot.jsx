import { Image } from 'lucide-react'

// A screenshot inside a browser-window frame. Shows the image when `src` is set,
// otherwise a placeholder of the same shape. `url` is the text in the address bar.
export default function Screenshot({ src, alt, url, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl shadow-black/60 ${className}`}
    >
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-cream/25" />
        <span className="size-2.5 rounded-full bg-cream/25" />
        <span className="size-2.5 rounded-full bg-cream/25" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-navy/70 px-3 py-1 text-xs text-cream/60">
            {url}
          </span>
        )}
      </div>
      {src ? (
        // Captures are 2.2:1; the fixed ratio reserves the space before the image loads
        <img src={src} alt={alt} loading="lazy" className="aspect-[2.2/1] w-full object-cover object-top" />
      ) : (
        <div
          role="img"
          aria-label={`${alt} (placeholder)`}
          className="flex aspect-[2.2/1] w-full flex-col items-center justify-center gap-2 text-cream/40"
        >
          <Image aria-hidden="true" className="size-7" strokeWidth={1.25} />
          <span className="label text-cream/40">Screenshot</span>
        </div>
      )}
    </div>
  )
}
