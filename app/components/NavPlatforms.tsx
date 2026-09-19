import { AppMock } from './AppMock'
import { AuthIcon, LayersIcon, ObservabilityIcon } from './code-icons'
import { CRAFTMAN, VISE, WARDER } from '../data/products'

/**
 * The platforms grid in the nav, and the only place that reaches for the
 * product mockups.
 *
 * It lives in its own module so `CardNav` can load it lazily. Imported
 * directly, the product data and every mockup it draws land in the chunk the
 * site loads on every page — paid for by every visitor, to render a menu most
 * of them never open.
 */

const platforms = [
  {
    product: CRAFTMAN,
    href: CRAFTMAN.href,
    ariaLabel: 'Craftman, the backend studio',
    title: 'A complete backend workspace for the database you already run',
    cta: 'Open the studio',
    icon: LayersIcon,
    tint: '52, 211, 153',
  },
  {
    product: VISE,
    href: VISE.href,
    ariaLabel: 'Vise, the application dashboard',
    title: 'Full observability for everything your application is doing',
    cta: 'See the dashboard',
    icon: ObservabilityIcon,
    tint: '251, 191, 36',
  },
  {
    product: WARDER,
    href: WARDER.href,
    ariaLabel: 'Warder, the declarative admin',
    title: 'A declarative admin, built from one Resource definition',
    cta: 'Read the guide',
    icon: AuthIcon,
    tint: '167, 139, 250',
  },
]

function RightArrowIcon() {
  return (
    <svg className="nav-platform-link-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h9" />
      <path d="M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  )
}

export default function NavPlatforms({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="nav-platform-grid">
      {platforms.map((platform) => {
        const Mark = platform.icon
        return (
          <a
            key={platform.product.id}
            className="nav-platform-card"
            style={{ ['--platform-tint' as string]: platform.tint }}
            href={platform.href}
            aria-label={platform.ariaLabel}
            onClick={onNavigate}
          >
            <span className="nav-platform-mark">
              <Mark className="nav-platform-mark-glyph" />
              <span className="nav-platform-wordmark">{platform.product.name}</span>
            </span>

            <span className="nav-platform-title">{platform.title}</span>

            <span className="nav-platform-link">
              {platform.cta}
              <RightArrowIcon />
            </span>

            {/* The product's own interface, not a drawing of it. Held at the
                width it is designed for and scaled down, which is what makes
                it read as a screenshot. Inert, so the card stays one link. */}
            <span className="nav-platform-preview">
              <span className="nav-platform-preview-scale">
                <AppMock product={platform.product} />
              </span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
