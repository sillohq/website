import CardNav from './CardNav'
import {
  AuthIcon,
  BookIcon,
  BoxIcon,
  BrandIcon,
  CompassIcon,
  GithubIcon,
  LayersIcon,
  QueueIcon,
  SparkIcon,
} from './code-icons'
import { DOCS_LINKS, DOCS_URL, GITHUB_URL } from '../data/links'

const navItems = [
  {
    label: 'Framework',
    links: [
      {
        label: 'Capabilities',
        href: `${DOCS_URL}/guides/introduction/`,
        ariaLabel: 'Read what Sillo ships',
        description: 'Everything in the box',
        icon: LayersIcon,
      },
      {
        label: 'Authentication',
        href: `${DOCS_URL}/guides/authentication/`,
        ariaLabel: 'Read the authentication guide',
        description: 'Sessions, JWT, API keys',
        icon: AuthIcon,
      },
      {
        label: 'Background work',
        href: `${DOCS_URL}/guides/work/`,
        ariaLabel: 'Read the background work guide',
        description: 'Queues and the scheduler',
        icon: QueueIcon,
      },
    ],
  },
  {
    label: 'Resources',
    links: [
      {
        label: 'Documentation',
        href: DOCS_URL,
        ariaLabel: 'Open documentation',
        description: 'Guides and reference',
        icon: BookIcon,
      },
      {
        label: 'GitHub',
        href: GITHUB_URL,
        ariaLabel: 'Open Sillo on GitHub',
        description: 'Source and issues',
        icon: GithubIcon,
      },
      {
        label: 'Get started',
        href: DOCS_LINKS.installation,
        ariaLabel: 'Get started with Sillo',
        description: 'Install and first app',
        icon: SparkIcon,
      },
    ],
  },
  {
    label: 'About',
    links: [
      {
        label: 'What Sillo is',
        href: '/about#philosophy',
        ariaLabel: 'What Sillo is',
        description: 'The shape of the thing',
        icon: CompassIcon,
      },
      {
        label: 'Roadmap',
        href: '/about#ships',
        ariaLabel: 'Roadmap',
        description: 'Planned and shipped modules',
        icon: BoxIcon,
      },
      {
        label: 'Brand',
        href: '/about#brand',
        ariaLabel: 'Brand',
        description: 'Name, mark and colour',
        icon: BrandIcon,
      },
    ],
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
