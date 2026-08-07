import { type ComponentType, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type SVGProps, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './CardNav.css'

type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
  /** One short line under the label, saying what is there. */
  description?: string
  /** Line icon for the box, from code-icons. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

type CardNavItem = {
  label: string
  links: CardNavLink[]
}

type CardNavProps = {
  logo: ReactNode
  logoAlt?: string
  items: CardNavItem[]
  /** Where the "Get started" button points. */
  ctaHref: string
  ctaLabel?: string
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
}

/** Height of the bar itself, matching --card-nav-bar-height in the stylesheet. */
const BAR_HEIGHT = 60

function ArrowIcon() {
  return (
    <svg className="nav-box-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 11 11 5" />
      <path d="M6 5h5v5" />
    </svg>
  )
}

export default function CardNav({
  logo,
  logoAlt = 'Logo',
  items,
  ctaHref,
  ctaLabel = 'Get started',
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(17,17,18,0.84)',
  menuColor,
  buttonBgColor = '#fff',
  buttonTextColor = '#050505',
}: CardNavProps) {
  const groups = items.slice(0, 3)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([])

  const isOpen = openIndex !== null

  const close = useCallback((restoreFocusTo?: number) => {
    setOpenIndex((current) => {
      if (current === null) return current
      const target = restoreFocusTo ?? current
      triggersRef.current[target]?.focus()
      return null
    })
  }, [])

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  // Animate the bar open or shut whenever the active group changes. Driven off
  // the rendered state rather than a paused timeline, so switching straight
  // from one group to another animates to the new height instead of replaying
  // the old one.
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const boxes = panelRef.current
      ? Array.from(panelRef.current.querySelectorAll<HTMLElement>('.nav-box'))
      : []

    if (openIndex === null) {
      gsap.to(nav, { height: BAR_HEIGHT, duration: reduced ? 0 : 0.34, ease })
      return
    }

    // The panel is positioned but unconstrained in height, so its own height is
    // the real content height even while the bar is still clipped to 60px.
    const panelHeight = panelRef.current?.offsetHeight ?? 0

    gsap.to(nav, {
      height: BAR_HEIGHT + panelHeight,
      duration: reduced ? 0 : 0.42,
      ease,
    })
    gsap.fromTo(
      boxes,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: reduced ? 0 : 0.36, ease, stagger: reduced ? 0 : 0.05 }
    )
  }, [openIndex, ease])

  // A menu that stays open when you click past it or press Escape is a menu in
  // the way of the page behind it.
  useEffect(() => {
    if (!isOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenIndex(null)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close])

  // Left and right move between the three triggers, which is what a menubar is
  // expected to do once one of them has focus.
  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const step = event.key === 'ArrowRight' ? 1 : -1
    const next = (index + step + groups.length) % groups.length
    triggersRef.current[next]?.focus()
    if (isOpen) setOpenIndex(next)
  }

  const active = openIndex === null ? null : groups[openIndex]

  return (
    <div ref={containerRef} className={`card-nav-container ${className}`.trim()}>
      <nav
        ref={navRef}
        className={`card-nav ${isOpen ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
        aria-label="Main"
      >
        <div className="card-nav-top">
          <a href="/" className="card-nav-logo-container" aria-label={logoAlt}>
            <span className="card-nav-logo">{logo}</span>
          </a>

          <div className="card-nav-links" style={{ color: menuColor || 'var(--color-text)' }}>
            {groups.map((group, index) => (
              <button
                key={group.label}
                type="button"
                ref={(el) => { triggersRef.current[index] = el }}
                className={`card-nav-trigger ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onTriggerKeyDown(event, index)}
                aria-expanded={openIndex === index}
                aria-controls="card-nav-panel"
              >
                {group.label}
                <span className="card-nav-trigger-caret" aria-hidden="true" />
              </button>
            ))}
          </div>

          <a
            href={ctaHref}
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {ctaLabel}
          </a>
        </div>

        <div
          id="card-nav-panel"
          ref={panelRef}
          className="card-nav-panel"
          aria-hidden={!isOpen}
        >
          {active && (
            <div className="card-nav-boxes">
              {active.links.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    className="nav-box"
                    href={link.href}
                    aria-label={link.ariaLabel}
                    onClick={() => setOpenIndex(null)}
                  >
                    <span className="nav-box-head">
                      {Icon && (
                        <span className="nav-box-tile">
                          <Icon className="nav-box-glyph" />
                        </span>
                      )}
                      <ArrowIcon />
                    </span>
                    <span className="nav-box-label">{link.label}</span>
                    {link.description && <span className="nav-box-description">{link.description}</span>}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
