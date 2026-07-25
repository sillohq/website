import CardNav from './CardNav'

const docsUrl = import.meta.env.VITE_DOCS_URL ?? 'https://sillo.build'
const githubUrl = import.meta.env.VITE_GITHUB_URL ?? 'https://github.com/sillohq/core'

const aboutLinks = [
  { label: 'Company Thesis', href: '/about#philosophy' },
  { label: 'Strategic Roadmap', href: '/about#roadmap' },
  { label: 'Brand', href: '/about#brand' },
  { label: 'Platform Vision', href: '/about#philosophy' },
  { label: 'Ecosystem', href: '/about#roadmap' },
]

const navItems = [
  {
    label: 'Framework',
    bgColor: '#111112',
    textColor: '#f7f7f5',
    links: [
      { label: 'Capabilities', href: '/#', ariaLabel: 'View framework capabilities' },
      { label: 'Architecture', href: '/#', ariaLabel: 'View architecture section' },
      { label: 'Enterprise', href: '/#', ariaLabel: 'View enterprise section' },
    ],
  },
  {
    label: 'Resources',
    bgColor: '#171719',
    textColor: '#f7f7f5',
    links: [
      { label: 'Documentation', href: docsUrl, ariaLabel: 'Open documentation' },
      { label: 'GitHub', href: githubUrl, ariaLabel: 'Open Sillo on GitHub' },
      { label: 'Get started', href: `${docsUrl}/guides/installation/`, ariaLabel: 'Get started with Sillo' },
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
        baseColor="rgba(17,17,18,0.84)"
        menuColor="#f7f7f5"
        buttonBgColor="#ffffff"
        buttonTextColor="#050505"
      />
    </header>
  )
}
