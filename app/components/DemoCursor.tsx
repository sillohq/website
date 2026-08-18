import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/**
 * A pointer that works a mockup on its own, so an interface nobody can run yet
 * still shows what using it looks like.
 *
 * Shared rather than written per page: /craftman, /foreman and the home page
 * all drive it, and any later mockup can too.
 *
 * It does more than click the sidebar. Each panel gets a short routine — open
 * it, then move through the things inside it: a toolbar chip, a row midway
 * down a table, an entry in the side rail — so the tour reads as somebody
 * looking around rather than a menu demo.
 *
 * Synthetic movement does not fire `:hover`, so the tour marks its target with
 * `.tour-hover` and the stylesheet does the rest.
 *
 * It stands down rather than fighting the reader: the tour ends for good on the
 * first real pointer input, never starts under `prefers-reduced-motion`, never
 * starts below the breakpoint where the sidebar exists, and pauses whenever the
 * mockup is off screen.
 */

export type Point = { x: number; y: number }

/** Marks an element the cursor may visit. */
export const TOUR_HIT = 'data-tour-hit'

type Move = { kind: 'open'; panelId: string } | { kind: 'look'; at: number }

/** Open the panel, then look at three things in it, spread down the panel. */
const LOOK_AT = [0.12, 0.5, 0.85]

export function useGuidedTour({
  enabled,
  panelIds,
  containerRef,
  getNav,
  onOpen,
}: {
  enabled: boolean
  panelIds: string[]
  containerRef: RefObject<HTMLElement | null>
  getNav: (id: string) => HTMLElement | null
  onOpen: (id: string) => void
}) {
  const [point, setPoint] = useState<Point | null>(null)
  const [clicking, setClicking] = useState(false)
  const [running, setRunning] = useState(enabled)
  const [visible, setVisible] = useState(false)
  const cursorRef = useRef(0)
  const openRef = useRef(onOpen)
  const navRef = useRef(getNav)
  const litRef = useRef<Element | null>(null)

  openRef.current = onOpen
  navRef.current = getNav

  const unlight = useCallback(() => {
    litRef.current?.classList.remove('tour-hover')
    litRef.current = null
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
    setPoint(null)
    unlight()
  }, [unlight])

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      entries => setVisible(entries.some(entry => entry.isIntersecting)),
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [containerRef])

  useEffect(() => {
    if (!running || !visible || panelIds.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const timers: number[] = []
    let cancelled = false

    // open, look, look, look — per panel, forever.
    const moves: Move[] = panelIds.flatMap(panelId => [
      { kind: 'open', panelId } as Move,
      ...LOOK_AT.map(at => ({ kind: 'look', at }) as Move),
    ])

    const aim = (el: Element, fraction: { x: number; y: number }) => {
      const container = containerRef.current
      if (!container) return
      const t = el.getBoundingClientRect()
      const c = container.getBoundingClientRect()
      setPoint({ x: t.left - c.left + t.width * fraction.x, y: t.top - c.top + t.height * fraction.y })
    }

    const run = () => {
      if (cancelled) return
      const move = moves[cursorRef.current % moves.length]
      cursorRef.current += 1
      const container = containerRef.current
      if (!container) return

      if (move.kind === 'open') {
        unlight()
        const target = navRef.current(move.panelId)
        if (!target) return void timers.push(window.setTimeout(run, 200))
        aim(target, { x: 0.32, y: 0.6 })
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return
            setClicking(true)
            openRef.current(move.panelId)
            timers.push(window.setTimeout(() => setClicking(false), 240))
          }, 640),
        )
        timers.push(window.setTimeout(run, 2000))
        return
      }

      const hits = [...container.querySelectorAll(`[${TOUR_HIT}]`)]
      if (hits.length === 0) return void timers.push(window.setTimeout(run, 400))
      const target = hits[Math.min(hits.length - 1, Math.floor(hits.length * move.at))]
      aim(target, { x: 0.28, y: 0.55 })
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          unlight()
          target.classList.add('tour-hover')
          litRef.current = target
        }, 620),
      )
      timers.push(window.setTimeout(run, 1500))
    }

    timers.push(window.setTimeout(run, 700))
    return () => {
      cancelled = true
      timers.forEach(window.clearTimeout)
      unlight()
    }
  }, [running, visible, panelIds, containerRef, unlight])

  return { point, clicking, running, stop }
}

export function DemoCursor({ at, clicking }: { at: Point | null; clicking: boolean }) {
  if (!at) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
      style={{
        transform: `translate3d(${at.x}px, ${at.y}px, 0)`,
        transition: 'transform 620ms cubic-bezier(0.33, 1, 0.68, 1)',
      }}
    >
      <span
        className="absolute -left-3 -top-3 block h-6 w-6 rounded-full bg-primary/30"
        style={{
          transform: clicking ? 'scale(1.9)' : 'scale(0)',
          opacity: clicking ? 0 : 0.9,
          transition: 'transform 420ms ease-out, opacity 420ms ease-out',
        }}
      />
      <svg width="17" height="21" viewBox="0 0 17 21" fill="none" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
        <path
          d="M1.5 1.2 15 11.4l-6.1.6-3.2 6.5-4.2-17.3Z"
          fill="#f7f7f5"
          stroke="#050505"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
