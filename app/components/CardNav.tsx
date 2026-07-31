import { type KeyboardEvent, type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './CardNav.css'

type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
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

function ArrowIcon() {
  return (
    <svg className="nav-card-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 260

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const contentEl = navEl.querySelector<HTMLElement>('.card-nav-content')
      if (contentEl) {
        const wasVisible = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = 'visible'
        contentEl.style.pointerEvents = 'auto'
        contentEl.style.position = 'static'
        contentEl.style.height = 'auto'

        const topBar = 60
        const padding = 16
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVisible
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        return topBar + contentHeight + padding
      }
    }

    return 276
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 42, opacity: 0 })

    const tl = gsap.timeline({ paused: true })
    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.42,
      ease,
    })
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.38, ease, stagger: 0.07 }, '-=0.12')

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
  }, [ease, items])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() })
        tlRef.current.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current.kill()
        tlRef.current = createTimeline()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return

    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleMenu()
    }
  }

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el
  }

  return (
    <div className={`card-nav-container ${className}`.trim()}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            onKeyDown={handleMenuKeyDown}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || 'var(--color-text)' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <a href="/" className="card-nav-logo-container" aria-label={logoAlt}>
            <span className="card-nav-logo">{logo}</span>
          </a>

          <a
            href={ctaHref}
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {ctaLabel}
          </a>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="nav-card"
              ref={setCardRef(index)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((link, linkIndex) => (
                  <a key={`${link.label}-${linkIndex}`} className="nav-card-link" href={link.href} aria-label={link.ariaLabel}>
                    <ArrowIcon />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
