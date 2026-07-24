import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SiteNav } from '../components/SiteNav'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const ABOUT_TABS = [
  {
    id: 'philosophy',
    label: 'Company Thesis',
    eyebrow: '01 / COMPANY THESIS',
    title: 'Building the enterprise developer platform for serious software.',
    intro: 'Sillo exists to make the complete path from first route to production operations coherent, productive, and enterprise-ready.',
    body: [
      'Modern teams should not have to assemble a fragile collection of unrelated tools before they can build a reliable business application. A simple product quickly needs validation, migrations, permissions, background jobs, email, files, caching, events, WebSockets, audit trails, deployment, secrets, logs, health checks, alerting, billing, and team access. Each concern often arrives with a different package, dashboard, interface, failure mode, and upgrade cycle.',
      'Sillo is a developer tooling company building an integrated platform for the full lifecycle of enterprise software. At the centre is Sillo Core: a productive Python foundation for web applications, APIs, real-time systems, workloads, and business platforms. Around that core, Sillo is designed to grow into first-party products for visual administration, managed deployment, server operations, identity, observability, templates, and integrations.',
      'The ambition is larger than releasing another web framework. Sillo exists to reduce the operational tax teams repeatedly pay: choosing incompatible packages, rebuilding authentication and organisation models, wiring queues and schedulers, inventing deployment standards, assembling monitoring tools, and maintaining internal infrastructure that does not differentiate the business.',
      'Our point of view is direct: the market does not need another thin wrapper around an HTTP server. It needs a framework company willing to own the boring but essential path from development to operations. Sillo should be opinionated at the defaults, extensible at the boundaries, and transparent underneath. Convenience must not mean mystery; enterprise readiness must not mean unnecessary ceremony.',
      'The open framework is the trust foundation. A developer should be able to begin with Sillo Core, grow into a structured team architecture, deploy through Sillo-managed or self-managed infrastructure, add identity and observability, and purchase reusable templates or integrations without abandoning the ecosystem.',
      'The product family is intentionally layered. Sillo Core establishes the programming model. Miko turns application records, workflows, permissions, and operational actions into governed interfaces. Nira supplies reusable identity, organisations, roles, permissions, and audit history. Zoro gives teams a managed path to production. Koda brings Sillo deployment conventions to customer-controlled servers. Piko connects logs, queues, jobs, releases, and application health to the Sillo application model.',
      'These products should integrate deeply but remain valuable independently. A company may use Sillo Core with its existing infrastructure, run Koda without Zoro, connect Piko to a self-hosted application, or adopt Nira for identity. Integration should reward customers, not trap them. Strong defaults should make the common path fast; documented contracts should keep advanced teams in control.',
      'Sillo’s operating principles are developer happiness, strong defaults with open boundaries, enterprise without theatre, operations as part of the product story, open source as a trust engine, compatibility as a promise, documentation as part of the interface, and an ecosystem that lets third-party creators, agencies, educators, and infrastructure partners build alongside Sillo.',
      'What Sillo will not become matters as much as what it will become. It should not be a collection of products that share a logo but not an architecture. It should not be a closed cloud that requires teams to surrender control of applications or data. It should not optimise impressive demos while neglecting upgrades, debugging, security, and production failure modes.',
      'The long-term promise is simple: help developers move from an idea to dependable enterprise software with fewer disconnected decisions, clearer systems, and tools that grow with their ambition. Sillo earns that promise through openness, excellent engineering, responsible operations, and a business model aligned with long-term developer success.',
    ],
  },
  {
    id: 'roadmap',
    label: 'Strategic Roadmap',
    eyebrow: '02 / STRATEGIC ROADMAP',
    title: 'A phase-based path from open framework to enterprise platform.',
    intro: 'The roadmap advances by evidence, quality, adoption, and operational readiness rather than calendar theatre.',
    body: [
      'Phase 1 establishes the technical constitution: routing, request lifecycle, middleware, dependency injection, configuration, records, migrations, security foundations, testing, CLI, documentation architecture, release automation, adapter contracts, compatibility policy, contribution process, and security governance.',
      'Phase 2 makes the core production-ready: queues, workers, scheduling, events, storage, mail, caching, real-time capabilities, health checks, structured logging, deployment specifications, reference applications, upgrade tooling, production guides, security review, and failure testing.',
      'Phase 3 turns Sillo applications into operable business systems through Miko: schema-aware resources, forms, filters, actions, dashboards, permissions, extension points, audit events, organisation boundaries, accessibility, and customisation standards.',
      'Phase 4 brings controlled infrastructure through Koda: server enrolment, environment preparation, release orchestration, domains, TLS, processes, workers, backups, health checks, rollback, policy, and audit foundations for customer-owned servers.',
      'Phase 5 creates the managed cloud path through Zoro: build and release pipelines, application plans, managed resources, preview environments, scaling, billing, support operations, service objectives, incident procedures, and framework-aware deployment feedback.',
      'Phase 6 productises reusable identity through Nira: framework SDKs, hosted identity, organisations, roles, permissions, invitations, audit records, security operations, and eventually enterprise federation after independent security review.',
      'Phase 7 creates operational intelligence through Piko: logs, runtime events, queue and job views, errors, deployment correlation, health, alerts, retention, access policies, redaction, and cost controls.',
      'Phase 8 opens the ecosystem through marketplaces: publisher tools, package verification, billing, licensing, compatibility testing, discovery, reviews, dispute handling, security response, official templates, and official integrations.',
      'Phase 9 and beyond expand enterprise readiness: long-term support, enterprise contracts, SSO, advanced audit, dedicated environments, regional data controls, procurement documentation, partner delivery, customer success, certification, global events, and industry solution kits.',
      'Every phase should be reviewed through four lenses: user evidence, technical quality, commercial viability, and organisational capacity. Public roadmap language should distinguish ideas, planned work, active development, and released commitments.',
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    eyebrow: '03 / BRAND',
    title: 'A serious identity system for an enterprise developer platform.',
    intro: 'Use the Sillo marks, colors, and type rules when writing about the framework, platform products, community assets, events, or partner materials.',
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
  { title: 'The Enterprise Tooling Gap', paragraphs: ABOUT_TABS[0].body.slice(0, 3) },
  { title: 'The Sillo Platform', paragraphs: ABOUT_TABS[0].body.slice(3, 7) },
  { title: 'Principles And Boundaries', paragraphs: ABOUT_TABS[0].body.slice(7) },
]

const ROADMAP_COLUMNS = [
  {
    title: 'Planning',
    tag: 'Designed next',
    items: [
      ['Technical constitution', 'Scope, extension contracts, compatibility, governance, security process, and open-source boundaries.'],
      ['Design partners', 'A small set of real applications used to validate recurring production, identity, deployment, and observability problems.'],
      ['Shared platform schemas', 'Common models for applications, environments, releases, identities, jobs, events, and operational metadata.'],
      ['Evidence gates', 'Clear criteria for when a product moves from exploration to committed platform development.'],
    ],
  },
  {
    title: 'In Progress',
    tag: 'Being shaped',
    items: [
      ['Production-ready core', 'Hardening routing, lifecycle, middleware, DI, records, queues, scheduling, caching, security, testing, and docs.'],
      ['Miko foundations', 'The admin and operations studio for records, workflows, permissions, dashboards, and governed internal actions.'],
      ['Koda/Zoro contracts', 'Deployment metadata, release specifications, health checks, workers, scheduler topology, and rollback conventions.'],
      ['Company narrative', 'Aligning website, documentation, launch content, partner materials, and contributor onboarding around the same thesis.'],
    ],
  },
  {
    title: 'Pending',
    tag: 'Open queue',
    items: [
      ['Nira identity', 'Reusable authentication, organisations, roles, permissions, invitations, audit history, and enterprise federation path.'],
      ['Piko observability', 'Logs, queue health, failed jobs, deployments, alerts, retention controls, and framework-native operating views.'],
      ['Marketplace rules', 'Publisher verification, compatibility checks, licensing, quality review, security response, and discovery fairness.'],
      ['Enterprise package', 'Supported versions, security evidence, reliability practices, privacy controls, procurement docs, and support boundaries.'],
    ],
  },
  {
    title: 'Done',
    tag: 'Shipped in Sillo',
    items: [
      ['Sillo Core foundation', 'Routing, request validation, dependency injection, authentication, Record ORM, queues, scheduling, caching, sessions, middleware, responses, OpenAPI, testing utilities, and WebSocket foundations are already part of the open framework.'],
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
    <main className="min-h-screen bg-bg text-text noise-overlay">
      <SiteNav />
      <section className="relative mx-auto grid max-w-[1520px] grid-cols-1 gap-12 px-8 py-16 md:px-12 lg:grid-cols-[260px_1fr] lg:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-2/3 bg-[radial-gradient(ellipse_50%_55%_at_80%_20%,rgba(252,3,69,0.06),transparent_65%)]" />
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-10">
            <div className="font-mono text-[11px] text-primary tracking-[0.18em] mb-4">ABOUT SILLO</div>
            <p className="text-sm leading-relaxed text-muted">
              Principles and product direction for the framework.
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
        </aside>

        <div className="relative min-w-0">
          <div className="mb-14">
            <div className="font-mono text-[11px] text-primary tracking-[0.16em] mb-4">{active.eyebrow}</div>
            <h1 className="max-w-[1040px] text-5xl md:text-7xl font-semibold leading-[0.96] tracking-[-0.065em]">{active.title}</h1>
            <p className="mt-7 max-w-[760px] text-lg leading-relaxed text-muted">{active.intro}</p>
          </div>

          {activeTab === 'philosophy' && <PhilosophyContent />}
          {activeTab === 'roadmap' && <RoadmapBoard />}
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

function RoadmapBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {ROADMAP_COLUMNS.map(column => (
        <section key={column.title} className="min-w-0 rounded-2xl bg-surface/55 p-4 shadow-[0_26px_90px_rgba(0,0,0,0.25)]">
          <div className="mb-4 flex items-center justify-between px-2 py-2">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-text">{column.title}</h2>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">{column.tag}</div>
            </div>
          </div>
          <div className="space-y-3">
            {column.items.map(([title, description]) => (
              <article key={title} className="group rounded-xl bg-bg/82 p-5 transition-colors hover:bg-elevated">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{column.title}</span>
                  <span className="h-2 w-2 rounded-full bg-primary/70" />
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
