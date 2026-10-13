import { useEffect, useState } from 'react'

const clamp = (value) => Math.min(1, Math.max(0, value))

// How far an element has travelled through the viewport, from 0 to 1.
// It starts when the element's top reaches `startAt` (a fraction of the viewport height)
// and finishes when its bottom reaches `endAt`. With no ref it tracks the whole page.
export function useScrollProgress(ref, startAt = 0.85, endAt = 0.45) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      if (!ref) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? clamp(window.scrollY / max) : 0)
        return
      }
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const start = window.innerHeight * startAt
      const end = window.innerHeight * endAt
      setProgress(clamp((start - rect.top) / (rect.height + start - end)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, startAt, endAt])

  return progress
}
