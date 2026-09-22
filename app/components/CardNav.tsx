import { type ComponentType, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type SVGProps, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { lazy, Suspense } from 'react'
import './CardNav.css'

/*
 * The platforms grid pulls in the product data and every mockup it draws.
 * Loaded eagerly that lands in the chunk every page fetches, to render a menu
 * most visitors never open — so it is fetched when the menu first opens.
 */
const NavPlatforms = lazy(() => import('./NavPlatforms'))

type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
  /** One short line under the label, saying what is there. */
  description?: string
  /** Line icon for the box, from code-icons. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

/** A column of links under a heading, as the resources panel is laid out. */
type CardNavColumn = {
  heading: string
  /** Makes the heading itself the link, with an arrow after it. */
  headingHref?: string
  links: CardNavLink[]
  /** Quiet list — no icons, no descriptions. */
  plain?: boolean
  /** Tiled icon, title and description per row, rather than a plain line. */
  rich?: boolean
  /** A "View all" at the foot of the column. */
  more?: { label: string; href: string }
  /** A cascade of file cards, in place of links. */
  files?: { label: string; icon?: ComponentType<SVGProps<SVGSVGElement>> }[]
}

/** The one thing a panel puts forward, given a column of its own. */
type CardNavFeatured = {
  heading: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  href: string
  /** Drawn in the thumbnail, in mono. */
  glyph: string
  tint: string
}

type CardNavItem = {
  label: string
  links: CardNavLink[]
  /** When set, the group opens as the (lazily loaded) platforms grid. */
  platforms?: boolean
  /** When present, the group opens as headed columns instead. */
  columns?: CardNavColumn[]
  /** Shown as the last column, beside `columns`. */
  featured?: CardNavFeatured
  /** Copy across the top of the panel, above a platforms grid. */
  intro?: {
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
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

function RightArrowIcon() {
  return (
    <svg className="nav-platform-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h9" />
      <path d="M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  )
}

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
  const groups = items.slice(0, 4)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
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

  // The panel drops below the bar rather than stretching it, so nothing here
  // measures or animates the bar's height. Driven off the rendered state rather
  // than a paused timeline, so switching straight from one group to another
  // replays the entrance on the new content instead of the old.
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const boxes = Array.from(panel.querySelectorAll<HTMLElement>('.nav-box, .nav-platform-card'))

    if (openIndex === null) {
      gsap.to(panel, { autoAlpha: 0, y: -8, duration: reduced ? 0 : 0.2, ease })
      return
    }

    gsap.fromTo(
      panel,
      { autoAlpha: 0, y: -8 },
      { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.28, ease }
    )
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

  // The bar is sized for three text triggers. Platform cards, and a panel of
  // four columns, both need more room than that, so the container widens while
  // one of those is open.
  const wide = Boolean(active?.platforms) || (active?.columns?.length ?? 0) > 2

  // The featured item earns a wider track than the lists beside it. Built from
  // the count rather than fixed, so a panel of four columns does not wrap its
  // last one onto a second row.
  const columnTracks = active?.columns
    ? `repeat(${active.columns.length}, 1fr)${active.featured ? ' 1.6fr' : ''}`
    : undefined

  return (
    <div ref={containerRef} className={`card-nav-container ${wide ? 'wide' : ''} ${className}`.trim()}>
      <nav
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
      </nav>

      <div
          id="card-nav-panel"
          ref={panelRef}
          className="card-nav-panel"
          aria-hidden={!isOpen}
        >
          {active?.intro && (
            <div className="nav-panel-intro">
              <div className="nav-panel-intro-copy">
                <p className="nav-panel-intro-title">{active.intro.title}</p>
                <p className="nav-panel-intro-description">{active.intro.description}</p>
              </div>
              <a
                className="nav-panel-intro-cta"
                href={active.intro.ctaHref}
                onClick={() => setOpenIndex(null)}
              >
                {active.intro.ctaLabel}
                <RightArrowIcon />
              </a>
            </div>
          )}

          {active?.platforms && (
            <Suspense fallback={<div className="nav-platform-fallback" aria-hidden="true" />}>
              <NavPlatforms onNavigate={() => setOpenIndex(null)} />
            </Suspense>
          )}

          {active?.columns && (
            <div className="nav-columns" style={{ gridTemplateColumns: columnTracks }}>
              {active.columns.map((column) => (
                <div key={column.heading} className={`nav-column ${column.files ? 'nav-column--visual' : ''}`}>
                  {column.headingHref ? (
                    <a
                      className="nav-column-heading nav-column-heading--link"
                      href={column.headingHref}
                      onClick={() => setOpenIndex(null)}
                    >
                      {column.heading}
                      <RightArrowIcon />
                    </a>
                  ) : (
                    <p className="nav-column-heading">{column.heading}</p>
                  )}

                  {column.files && (
                    <div className="nav-files" aria-hidden="true">
                      {column.files.map((file) => {
                        const FileIcon = file.icon
                        return (
                          <span key={file.label} className="nav-file">
                            {FileIcon && <FileIcon className="nav-file-glyph" />}
                            {file.label}
                          </span>
                        )
                      })}
                    </div>
                  )}

                  {!column.files && (
                    <ul className={`nav-column-list ${column.rich ? 'rich' : ''}`}>
                      {column.links.map((link) => {
                        const Icon = link.icon

                        if (column.rich) {
                          return (
                            <li key={link.label}>
                              <a
                                className="nav-column-rich"
                                href={link.href}
                                aria-label={link.ariaLabel}
                                onClick={() => setOpenIndex(null)}
                              >
                                <span className="nav-column-rich-tile">
                                  {Icon && <Icon className="nav-column-rich-glyph" />}
                                </span>
                                <span className="nav-column-rich-copy">
                                  <span className="nav-column-rich-label">{link.label}</span>
                                  {link.description && (
                                    <span className="nav-column-rich-description">{link.description}</span>
                                  )}
                                </span>
                              </a>
                            </li>
                          )
                        }

                        return (
                          <li key={link.label}>
                            <a
                              className={`nav-column-link ${column.plain ? 'plain' : ''}`}
                              href={link.href}
                              aria-label={link.ariaLabel}
                              onClick={() => setOpenIndex(null)}
                            >
                              {!column.plain && Icon && <Icon className="nav-column-link-glyph" />}
                              {link.label}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  {column.more && (
                    <a
                      className="nav-column-more"
                      href={column.more.href}
                      onClick={() => setOpenIndex(null)}
                    >
                      {column.more.label}
                      <RightArrowIcon />
                    </a>
                  )}
                </div>
              ))}

              {active.featured && (
                <div className="nav-column nav-column--featured">
                  <p className="nav-column-heading">{active.featured.heading}</p>
                  <a
                    className="nav-featured"
                    href={active.featured.href}
                    style={{ ['--platform-tint' as string]: active.featured.tint }}
                    onClick={() => setOpenIndex(null)}
                  >
                    <span className="nav-featured-thumb">
                      <span className="nav-featured-glyph">{active.featured.glyph}</span>
                    </span>
                    <span className="nav-featured-copy">
                      <span className="nav-featured-eyebrow">{active.featured.eyebrow}</span>
                      <span className="nav-featured-title">{active.featured.title}</span>
                      <span className="nav-featured-description">{active.featured.description}</span>
                      <span className="nav-featured-cta">
                        {active.featured.ctaLabel}
                        <RightArrowIcon />
                      </span>
                    </span>
                  </a>
                </div>
              )}
            </div>
          )}

          {active && !active.platforms && !active.columns && (
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
    </div>
  )
}
