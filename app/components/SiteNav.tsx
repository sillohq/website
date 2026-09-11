import CardNav from './CardNav'
import {
  AuthIcon,
  BookIcon,
  BoxIcon,
  BrandIcon,
  CompassIcon,
  GithubIcon,
  LayersIcon,
  MailIcon,
  ObservabilityIcon,
  OrmIcon,
  QueueIcon,
  RouteIcon,
  ScheduleIcon,
  SparkIcon,
  TerminalIcon,
} from './code-icons'
import { DOCS_LINKS, DOCS_URL, GITHUB_URL } from '../data/links'

const navItems = [
  {
    label: 'Platforms',
    links: [],
    platforms: true,
    intro: {
      title: 'Everything Sillo ships, running on Sillo',
      description:
        'A studio, a dashboard, an admin and an API reference. Each one is an ordinary Sillo application — the same routing, auth, records and background work you write yourself — so nothing here is a capability the framework keeps for itself.',
      ctaLabel: 'More platforms',
      ctaHref: DOCS_LINKS.packages,
    },
  },
  {
    label: 'Framework',
    links: [],
    columns: [
      {
        heading: 'Explore Sillo',
        rich: true,
        links: [
          {
            label: 'Overview',
            href: DOCS_LINKS.introduction,
            ariaLabel: 'Read what Sillo ships',
            description: 'Everything in the box',
            icon: LayersIcon,
          },
          {
            label: 'Get started',
            href: DOCS_LINKS.installation,
            ariaLabel: 'Install Sillo and build a first app',
            description: 'Install and first app',
            icon: SparkIcon,
          },
          {
            label: 'API reference',
            href: DOCS_LINKS.apiReference,
            ariaLabel: 'Open the API reference',
            description: 'Every module, documented',
            icon: CompassIcon,
          },
        ],
      },
      {
        heading: 'Capabilities',
        rich: true,
        links: [
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
          {
            label: 'Records',
            href: `${DOCS_URL}/guides/record/`,
            ariaLabel: 'Read the record guide',
            description: 'Models, relations, migrations',
            icon: OrmIcon,
          },
        ],
      },
      {
        heading: 'Documentation',
        links: [
          { label: 'Installation', href: DOCS_LINKS.installation, ariaLabel: 'Installation', icon: TerminalIcon },
          { label: 'Routing', href: `${DOCS_URL}/guides/introduction/`, ariaLabel: 'Routing', icon: RouteIcon },
          { label: 'Queues', href: `${DOCS_URL}/guides/work/queue/`, ariaLabel: 'Queues', icon: QueueIcon },
          { label: 'Scheduler', href: `${DOCS_URL}/guides/work/scheduler/`, ariaLabel: 'Scheduler', icon: ScheduleIcon },
          { label: 'Mail', href: `${DOCS_URL}/guides/services/mail/`, ariaLabel: 'Mail', icon: MailIcon },
        ],
        more: { label: 'View all', href: DOCS_URL },
      },
      {
        heading: 'Starter kit',
        headingHref: 'https://github.com/sillohq/starter',
        links: [],
        files: [
          { label: 'main.py', icon: TerminalIcon },
          { label: 'routes/web.py', icon: RouteIcon },
          { label: 'database/models/user.py', icon: OrmIcon },
          { label: 'jobs/send_report.py', icon: QueueIcon },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    links: [],
    columns: [
      {
        heading: 'Project',
        links: [
          { label: 'Documentation', href: DOCS_URL, ariaLabel: 'Open documentation', icon: BookIcon },
          { label: 'Get started', href: DOCS_LINKS.installation, ariaLabel: 'Get started with Sillo', icon: SparkIcon },
          { label: 'API reference', href: DOCS_LINKS.apiReference, ariaLabel: 'Open the API reference', icon: CompassIcon },
          { label: 'GitHub', href: GITHUB_URL, ariaLabel: 'Open Sillo on GitHub', icon: GithubIcon },
          { label: 'Contributing', href: DOCS_LINKS.contributing, ariaLabel: 'Read the contribution guide', icon: LayersIcon },
        ],
      },
      {
        heading: 'Packages',
        plain: true,
        links: [
          { label: 'sillo-inertia', href: DOCS_LINKS.packages, ariaLabel: 'sillo-inertia' },
          { label: 'sillo-graphql', href: DOCS_LINKS.packages, ariaLabel: 'sillo-graphql' },
          { label: 'sillo-oauth', href: DOCS_LINKS.packages, ariaLabel: 'sillo-oauth' },
          { label: 'sillo-wire', href: DOCS_LINKS.packages, ariaLabel: 'sillo-wire' },
          { label: '@sillo/atlas', href: DOCS_LINKS.packages, ariaLabel: 'Atlas' },
        ],
        more: { label: 'View all', href: DOCS_LINKS.packages },
      },
    ],
    featured: {
      heading: 'Featured',
      eyebrow: 'In development',
      title: 'Sillo 1.0 is being built in the open',
      description:
        'Handlers take a single ctx, GraphQL and the WebSocket room layer moved into their own packages, and pip still installs 0.x.',
      ctaLabel: 'Read more',
      href: GITHUB_URL,
      glyph: '1.0',
      tint: '252, 3, 69',
    },
  },
  {
    label: 'About',
    links: [],
    columns: [
      {
        heading: 'The project',
        rich: true,
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
      {
        heading: 'Community',
        links: [
          { label: 'GitHub', href: GITHUB_URL, ariaLabel: 'Open Sillo on GitHub', icon: GithubIcon },
          { label: 'Contributing', href: DOCS_LINKS.contributing, ariaLabel: 'Read the contribution guide', icon: LayersIcon },
          { label: 'Documentation', href: DOCS_URL, ariaLabel: 'Open documentation', icon: BookIcon },
        ],
        more: { label: 'View the source', href: GITHUB_URL },
      },
    ],
    featured: {
      heading: 'Where it is going',
      eyebrow: 'Roadmap',
      title: 'Planned and shipped, on one board',
      description:
        'Every module the framework owns, what is done, what is next, and what was deliberately left out of scope.',
      ctaLabel: 'See the roadmap',
      href: '/about#ships',
      glyph: '—',
      tint: '252, 3, 69',
    },
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
