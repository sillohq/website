import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SiteNav } from '../components/SiteNav'
import { Doodle, DoodleArrow, HandwrittenNote, MarkerAside } from '../components/marker'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const ABOUT_TABS = [
  {
    id: 'philosophy',
    label: 'What Sillo is',
    eyebrow: '01 / WHAT SILLO IS',
    title: 'One product language for the whole async Python stack.',
    intro: 'Sillo is one framework where the ORM, auth, background work, websockets and HTTP layer are designed against each other and share one config model.',
    body: [
      'A product that starts as one route quickly needs validation, migrations, permissions, background jobs, mail, caching, events, WebSockets, and an admin. Assembled from separate packages, each of those arrives with its own interface, its own configuration style, its own failure mode, and its own upgrade cycle. The cost is rarely the install. It is the seams between them.',
      'Sillo removes the seams. Record, auth, Work, and websockets are first-party modules built against one another: they share a configuration model, a testing story, and a set of naming conventions. Reading one subsystem teaches you how to read the next.',
      'That coherence shows up in small places. One auth= declaration gates a route and writes its securityScheme into the OpenAPI spec, so the gate and the document cannot drift apart. The scheduler registers on app.state and starts with the application lifecycle. Range requests, ETags, and content negotiation are middleware rather than something each project rewrites.',
      'Sillo is opinionated at the defaults and open at the boundaries. The common path is short: SilloApp, a route, a request_model, a Record model. The advanced path is documented rather than hidden — auth backends, middleware, cache drivers, session stores, and hashing algorithms are all contracts you can implement yourself.',
      'Trade-offs are decisions, not gaps. The sillo command carries the framework-level operations, and inside a project it merges in whatever that project registers, so sillo db:migrate works without the framework owning the command set. Underneath, every operation stays a plain function in sillo.record.commands, sillo.users.commands and sillo.work.commands — the names are yours to choose.',
      'The admin panel follows the same rule. It registers your models and authenticates against your own user model instead of shipping a parallel user table, because a second identity system is exactly the kind of seam Sillo exists to remove.',
      'Modules stay useful on their own. Point Record at SQLite or Postgres, swap the cache backend from memory to Redis, bring your own session store, serve a React or Vue frontend through Inertia, or add a Strawberry GraphQL endpoint. Strong defaults make the common path fast; documented contracts keep advanced teams in control.',
      'The operating principles are short: strong defaults with open boundaries, convenience without mystery, documentation as part of the interface, and compatibility as a promise. Anything the framework does on your behalf is something you can read, override, or replace.',
      'What Sillo avoids matters as much as what it ships. Not a set of modules that share a logo but not an architecture. Not convenience that turns into mystery the first time something breaks. Not impressive demos at the expense of upgrades, debugging, security, and production failure modes.',
      'The result is fewer disconnected decisions. You learn one set of conventions and apply them across HTTP, data, auth, and background work, and the framework holds those pieces together instead of leaving the joins to you.',
    ],
  },
  {
    id: 'ships',
    label: 'What ships',
    eyebrow: '02 / WHAT SHIPS',
    title: 'What is shipped, what is in flight, and what is next.',
    intro: 'The working board for the framework — every subsystem tracked in the open, from planning to completed.',
    body: [],
  },
  {
    id: 'brand',
    label: 'Brand',
    eyebrow: '03 / BRAND',
    title: 'The marks, colours, and type rules Sillo is written in.',
    intro: 'Use these when writing about Sillo in documentation, articles, community assets, conference talks, or integration materials.',
    body: [],
  },
]

const BRAND_ASSETS = [
  { name: 'Logo Colored', file: 'logo-colored.svg', path: '/branding/logo-colored.svg', tone: 'Light / default usage' },
  { name: 'Logo White', file: 'logo-white.svg', path: '/branding/logo-white.svg', tone: 'Dark backgrounds' },
  { name: 'Logo Black', file: 'logo-black.svg', path: '/branding/logo-black.svg', tone: 'Light monochrome' },
  { name: 'Brand One', file: 'brand-one.svg', path: '/branding/brand-one.svg', tone: 'Extended mark' },
  { name: 'Brand Two', file: 'brand-two.svg', path: '/branding/brand-two.svg', tone: 'Alternate lockup' },
]

const BRAND_COLORS = [
  { name: 'Primary', value: '#fc0345', usage: 'Action, accent, active states' },
  { name: 'Primary Bright', value: '#ff285f', usage: 'Glow and hover accents' },
  { name: 'Primary Dark', value: '#c00236', usage: 'Pressed states' },
  { name: 'Background', value: '#050505', usage: 'Main dark surface' },
  { name: 'Surface', value: '#111112', usage: 'Panels and code surfaces' },
  { name: 'Text', value: '#f7f7f5', usage: 'Primary foreground' },
]

const BRAND_FONTS = [
  { name: 'Instrument Sans', usage: 'Headlines, navigation, UI copy' },
  { name: 'JetBrains Mono', usage: 'Code, labels, metadata, terminal UI' },
]

const PHILOSOPHY_SECTIONS = [
  { title: 'The Seams', paragraphs: ABOUT_TABS[0].body.slice(0, 3) },
  { title: 'How Sillo Is Built', paragraphs: ABOUT_TABS[0].body.slice(3, 7) },
  { title: 'Principles And Boundaries', paragraphs: ABOUT_TABS[0].body.slice(7) },
]

const KANBAN_COLUMNS = [
  {
    title: 'Planning',
    tag: 'Scoped, not started',
    dot: 'bg-dimmed',
    pulse: false,
    items: [
      ['Mail', 'Templated mail', 'A mail client with queued delivery, built on the Work subsystem.'],
      ['Events', 'Redis event transport', 'A Redis transport for the emitter, alongside the in-memory default.'],
      ['Sessions', 'More session stores', 'Backends beyond signed-cookie and file, behind the same contract.'],
      ['Templating', 'Server-side templating', 'Rendering helpers for HTML responses, with escaping by default.'],
      ['Testing', 'Streaming test coverage', 'Sync and async test clients covering websockets and streamed responses.'],
    ],
  },
  {
    title: 'In Progress',
    tag: 'Being built',
    dot: 'bg-primary',
    pulse: true,
    items: [
      ['Work', 'Queues and workers', 'Durable background jobs as one subsystem with the scheduler.'],
      ['Frontend', 'Inertia', 'Server-driven React and Vue frontends, served by the framework.'],
      ['Cache', 'Cache backends', 'Pluggable drivers, from in-memory to Redis, behind one interface.'],
      ['GraphQL', 'GraphQL endpoint', 'A Strawberry endpoint mounted beside the HTTP routes.'],
    ],
  },
  {
    title: 'Review',
    tag: 'Under review',
    dot: 'bg-amber-400',
    pulse: false,
    items: [
      ['Admin', 'Admin panel', 'A model admin at /admin/ that authenticates against your own user model.'],
      ['Tooling', 'sillo-start', 'New projects scaffolded from the starter repository, personalised on fetch.'],
      ['Work', 'Scheduler', 'Cron-style jobs registered on app.state and started by the app lifecycle.'],
    ],
  },
  {
    title: 'Completed',
    tag: 'Shipped',
    dot: 'bg-emerald-400',
    pulse: false,
    items: [
      ['HTTP', 'Routing and lifecycle', 'Decorator and router-based routes, mountable subapps, typed path parameters.'],
      ['HTTP', 'Response builder', 'JSON, text, HTML, files, streams, redirects, and cookies in one fluent API.'],
      ['HTTP', 'HTTP correctness', 'RFC 9110 ranges, ETags, conditional requests, and content negotiation.'],
      ['Record', 'Record models', 'Active-record fields, casting, scopes, events, and transactions.'],
      ['Record', 'Migrations', 'Schema migrations as built-in commands over sillo.record.commands.'],
      ['Auth', 'Auth backends', 'JWT, session, and API-key behind one contract — auth= gates the route and writes its securityScheme.'],
      ['Auth', 'Permissions', 'DB-backed named permissions with group inheritance and one-call caching.'],
      ['OpenAPI', 'OpenAPI', 'The spec is generated from your routes and declared response models.'],
      ['Real-time', 'WebSockets', 'Consumers, channels, groups, and connection history.'],
    ],
  },
]

function AboutPage() {
  const [activeTab, setActiveTab] = useState(ABOUT_TABS[0].id)
  const [copiedBrand, setCopiedBrand] = useState('')
  const active = ABOUT_TABS.find(tab => tab.id === activeTab) ?? ABOUT_TABS[0]

  const copyText = (key: string, value: string) => {
    void navigator.clipboard.writeText(value)
    setCopiedBrand(key)
    window.setTimeout(() => setCopiedBrand(''), 1400)
  }

  const copySvg = async (asset: { name: string; path: string }) => {
    const response = await fetch(asset.path)
    const svg = await response.text()
    copyText(asset.name, svg)
  }

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (ABOUT_TABS.some(tab => tab.id === hash)) {
        setActiveTab(hash)
      }
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  return (
    <main className="min-h-screen bg-bg text-text">
      <SiteNav />
      <section className="relative mx-auto grid max-w-[1520px] grid-cols-1 gap-12 px-8 py-16 md:px-12 lg:grid-cols-[260px_1fr] lg:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-2/3 bg-[radial-gradient(ellipse_50%_55%_at_80%_20%,rgba(252,3,69,0.06),transparent_65%)]" />
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-10">
            <div className="font-mono text-[11px] text-primary tracking-[0.18em] mb-4">ABOUT SILLO</div>
            <p className="text-sm leading-relaxed text-muted">
              Principles, subsystems, and brand assets for the framework.
            </p>
          </div>
          <div className="border-l border-border/70 pl-3">
            {ABOUT_TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  window.history.replaceState(null, '', `#${tab.id}`)
                }}
                className={`relative block w-full px-4 py-4 text-left transition-colors ${activeTab === tab.id ? 'text-text' : 'text-muted hover:text-text'}`}
              >
                {activeTab === tab.id && <span className="absolute inset-y-3 -left-3 w-px bg-primary" />}
                <span className="block font-mono text-[10px] text-dimmed">{String(index + 1).padStart(2, '0')}</span>
                <span className="mt-1 block text-sm font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
          <MarkerAside show="desktop" offset="1rem" className="gap-2">
            <DoodleArrow curve="up" seed={137} rotate={-28} width={40} height={32} className="opacity-60" />
            <HandwrittenNote rotate={-4} size="1.25rem" className="mt-1 opacity-80">
              start anywhere
            </HandwrittenNote>
          </MarkerAside>
        </aside>

        <div className="relative min-w-0">
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] text-primary tracking-[0.16em]">
              {active.eyebrow}
              <Doodle name="sparkle" tone="red" seed={139} size={14} rotate={13} show="tablet" className="opacity-80" />
            </div>
            <h1 className="max-w-[1040px] text-5xl md:text-7xl font-semibold leading-[0.96] tracking-[-0.065em]">{active.title}</h1>
            <p className="mt-7 max-w-[760px] text-lg leading-relaxed text-muted">{active.intro}</p>
          </div>

          {activeTab === 'philosophy' && <PhilosophyContent />}
          {activeTab === 'ships' && <KanbanBoard />}
          {activeTab === 'brand' && <BrandSection copiedBrand={copiedBrand} copyText={copyText} copySvg={copySvg} />}
        </div>
      </section>
    </main>
  )
}

function PhilosophyContent() {
  return (
    <div className="space-y-20">
      {PHILOSOPHY_SECTIONS.map((section, sectionIndex) => (
        <section key={section.title} className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <div className="font-mono text-[10px] text-dimmed mb-3">{String(sectionIndex + 1).padStart(2, '0')}</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.045em] text-text">{section.title}</h2>
          </div>
          <div className="max-w-[860px] space-y-6">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[16px] leading-[1.9] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {KANBAN_COLUMNS.map(column => (
        <section key={column.title} className="min-w-0 rounded-2xl bg-surface/55 p-4 shadow-[0_26px_90px_rgba(0,0,0,0.25)]">
          <div className="mb-4 flex items-start justify-between px-2 py-2">
            <div>
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${column.dot}${column.pulse ? ' motion-safe:animate-pulse' : ''}`} />
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-text">{column.title}</h2>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">{column.tag}</div>
            </div>
            <span className="flex items-center gap-2">
              {column.title === 'Completed' && (
                <Doodle name="tick" tone="red" seed={149} size={19} rotate={-8} show="tablet" className="opacity-85" />
              )}
              <span className="rounded-full border border-border/70 px-2.5 py-1 font-mono text-[10px] text-muted">
                {column.items.length}
              </span>
            </span>
          </div>
          <div className="space-y-3">
            {column.items.map(([tag, title, description]) => (
              <article key={title} className="group rounded-xl bg-bg/82 p-5 transition-colors hover:bg-elevated">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{tag}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${column.dot}`} />
                </div>
                <h3 className="mb-3 text-lg font-semibold tracking-[-0.04em] text-text">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function BrandSection({
  copiedBrand,
  copyText,
  copySvg,
}: {
  copiedBrand: string
  copyText: (key: string, value: string) => void
  copySvg: (asset: { name: string; path: string }) => void
}) {
  return (
    <div className="space-y-16">
      <section>
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.045em] text-text">Logo Assets</h2>
            <p className="mt-3 max-w-[620px] text-sm leading-relaxed text-muted">
              Download SVG files or copy the inline SVG source directly for websites, docs, sponsorship pages, and community materials.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BRAND_ASSETS.map(asset => (
            <article key={asset.file} className="group overflow-hidden rounded-2xl bg-surface/60 transition-colors hover:bg-surface">
              <div className="grid min-h-[220px] place-items-center bg-bg/70 p-8">
                <img src={asset.path} alt={asset.name} className="max-h-28 max-w-[220px] object-contain transition-transform group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <div className="mb-1 text-base font-semibold tracking-[-0.03em] text-text">{asset.name}</div>
                <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">{asset.tone}</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copySvg(asset)}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-bg transition-transform hover:scale-[1.03]"
                  >
                    {copiedBrand === asset.name ? 'Copied' : 'Copy SVG'}
                  </button>
                  <a href={asset.path} download={asset.file} className="rounded-full bg-bg px-4 py-2 text-xs font-semibold text-text transition-colors hover:bg-elevated">
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-6 text-3xl font-semibold tracking-[-0.045em] text-text">Color Scheme</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {BRAND_COLORS.map(color => (
              <button
                key={color.name}
                type="button"
                onClick={() => copyText(color.name, color.value)}
                className="group flex items-center gap-4 rounded-xl bg-surface/55 p-4 text-left transition-colors hover:bg-surface"
              >
                <span className="h-12 w-12 shrink-0 rounded-lg border border-border" style={{ backgroundColor: color.value }} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-text">{color.name}</span>
                  <span className="mt-1 block font-mono text-xs text-muted">{color.value}</span>
                  <span className="mt-1 block text-xs text-dimmed">{color.usage}</span>
                </span>
                <span className="font-mono text-[10px] text-dimmed">{copiedBrand === color.name ? 'Copied' : 'Copy'}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-semibold tracking-[-0.045em] text-text">Typography</h2>
          <div className="space-y-3">
            {BRAND_FONTS.map(font => (
              <article key={font.name} className="rounded-xl bg-surface/55 p-5">
                <div className="text-xl font-semibold tracking-[-0.04em] text-text">{font.name}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{font.usage}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
