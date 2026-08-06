import CardNav from './CardNav'
import { DOCS_LINKS, DOCS_URL, GITHUB_URL } from '../data/links'

const aboutLinks = [
  { label: 'What Sillo is', href: '/about#philosophy' },
  { label: 'What ships', href: '/about#ships' },
  { label: 'Brand', href: '/about#brand' },
  { label: 'Design principles', href: '/about#philosophy' },
  { label: 'Subsystems', href: '/about#ships' },
]

const navItems = [
  {
    label: 'Framework',
    bgColor: '#111112',
    textColor: '#f7f7f5',
    links: [
      { label: 'Capabilities', href: `${DOCS_URL}/guides/introduction/`, ariaLabel: 'Read what Sillo ships' },
      { label: 'Authentication', href: `${DOCS_URL}/guides/authentication/`, ariaLabel: 'Read the authentication guide' },
      { label: 'Background work', href: `${DOCS_URL}/guides/work/`, ariaLabel: 'Read the background work guide' },
    ],
  },
  {
    label: 'Resources',
    bgColor: '#171719',
    textColor: '#f7f7f5',
    links: [
      { label: 'Documentation', href: DOCS_URL, ariaLabel: 'Open documentation' },
      { label: 'GitHub', href: GITHUB_URL, ariaLabel: 'Open Sillo on GitHub' },
      { label: 'Get started', href: DOCS_LINKS.installation, ariaLabel: 'Get started with Sillo' },
    ],
  },
  {
    label: 'About',
    bgColor: '#250610',
    textColor: '#fff',
    links: aboutLinks.map(link => ({ ...link, ariaLabel: link.label })),
  },
]

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-8">
      <CardNav
        logo={(
          <>
            <img src="/logo.svg" alt="" className="h-6 w-6 object-contain" />
            <span>Sillo</span>
          </>
        )}
        logoAlt="Sillo home"
        items={navItems}
        ctaHref={DOCS_LINKS.installation}
        baseColor="rgba(17,17,18,0.84)"
        menuColor="#f7f7f5"
        buttonBgColor="#ffffff"
        buttonTextColor="#050505"
      />
    </header>
  )
}
