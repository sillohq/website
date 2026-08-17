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
    title: 'One framework, designed as one thing.',
    intro: 'Sillo is the Python you already write, with the ORM, auth, background work, websockets and HTTP layer already in place, designed against each other and sharing one config model.',
    body: [
      'The language does not change. You write the same Python, with the same type hints and the same async you already know. What changes is how much of the backend is waiting for you when you start.',
      'A product that begins as one route quickly needs validation, migrations, permissions, background jobs, mail, caching, events, WebSockets, and an admin. Every one of those is a solved problem with good packages behind it. The work that remains is the fitting: each arrives with its own interface, its own configuration style, its own failure mode, and its own upgrade cycle. The cost is rarely the install. It is the seams between them.',
      'Sillo puts those pieces in place with the seams already closed. Record, auth, Work, and websockets are first-party modules built against one another: they share a configuration model, a testing story, and a set of naming conventions. Reading one subsystem teaches you how to read the next.',
      'That coherence shows up in small places. One auth= declaration gates a route and writes its securityScheme into the OpenAPI spec, so the gate and the document cannot drift apart. The scheduler registers on app.state and starts with the application lifecycle. Range requests, ETags, and content negotiation are middleware rather than something each project rewrites.',
      'Sillo is opinionated at the defaults and open at the boundaries. The common path is short: SilloApp, a route, a request_model, a Record model. The advanced path is documented rather than hidden: auth backends, middleware, cache drivers, session stores, and hashing algorithms are all contracts you can implement yourself.',
      'Trade-offs are decisions, not gaps. The sillo command carries the framework-level operations, and inside a project it merges in whatever that project registers, so sillo db:migrate works without the framework owning the command set. Underneath, every operation stays a plain function in sillo.record.commands, sillo.users.commands and sillo.work.commands, so the names are yours to choose.',
      'The admin panel follows the same rule. It registers your models and authenticates against your own user model instead of shipping a parallel user table, because a second identity system is exactly the kind of seam Sillo exists to remove.',
      'Modules stay useful on their own. Point Record at SQLite or Postgres, swap the cache backend from memory to Redis, bring your own session store, serve a React or Vue frontend through Inertia, or add a Strawberry GraphQL endpoint. Strong defaults make the common path fast; documented contracts keep advanced teams in control.',
      'In place does not mean installed regardless. The base package is the HTTP layer, routing, validation, dependency injection, and the middleware stack. Record, JWT, templating, Redis and the rest are optional extras declared in pyproject.toml and pulled in when the product actually needs them, so the dependency tree stays proportional to what you build.',
      'The operating principles are short: strong defaults with open boundaries, convenience without mystery, documentation as part of the interface, and compatibility as a promise. Anything the framework does on your behalf is something you can read, override, or replace.',
      'What Sillo avoids matters as much as what it ships. Not a set of modules that share a logo but not an architecture. Not convenience that turns into mystery the first time something breaks. Not impressive demos at the expense of upgrades, debugging, security, and production failure modes.',
      'The result is fewer disconnected decisions. You learn one set of conventions and apply them across HTTP, data, auth, and background work, and the framework holds those pieces together instead of leaving the joins to you.',
    ],
  },
  {
    id: 'ships',
    label: 'Roadmap',
    eyebrow: '02 / ROADMAP',
    title: 'What we have built, and what is next.',
    intro: 'Every subsystem, by the state it is actually in. There are no dates on this board: an item moves when the work is finished, not when a calendar says it should be.',
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

// Index ranges, so they must be re-checked whenever a paragraph is added to
// or removed from ABOUT_TABS[0].body.
const PHILOSOPHY_SECTIONS = [
  { title: 'The Seams', paragraphs: ABOUT_TABS[0].body.slice(0, 4) },
  { title: 'How Sillo Is Built', paragraphs: ABOUT_TABS[0].body.slice(4, 9) },
  { title: 'Principles And Boundaries', paragraphs: ABOUT_TABS[0].body.slice(9) },
]

// Grouped by state, not by subsystem, and deliberately not by date. The rules
// for this board:
//
//   Completed  is in the released framework and has a documentation page.
//   Testing    is written and merged, and is being proven before it is claimed.
//   Building   has code in the tree and is not finished.
//   Planning   is specified and not started. Nothing here may be described
//              anywhere else on the site as though it ships today.
//
// An item moves left to right only. Before adding to Completed, grep for it.
//
// One state at a time, because the four are 40, 7, 6 and 30 items long. Side
// by side, the only way to fit those in equal columns is to take the
// descriptions away from the long ones, and an item reduced to two words is
// not worth reading. A tab gives every item the same room whichever state it
// is in.
const KANBAN_COLUMNS = [
  {
    title: 'Planning',
    tag: 'Specified',
    dot: 'bg-sky-400',
    meaning: 'Specified and not started. Nothing here is described anywhere else on this site as though it ships today.',
    items: [
      ['Auth', 'Two-factor and passkeys', 'TOTP enrolment with single-use recovery codes, and WebAuthn passkeys behind the same auth= gate.'],
      ['Plugins', 'Extension points', 'Packages that register routes, middleware, console commands and admin panels through one entry point.'],
      ['Admin', 'Filters and search', 'Faceted filtering and search on any registered model, pushed into SQL rather than filtered in memory.'],
      ['Work', 'Dead letters', 'Jobs that exhaust their retries kept with their payload and trace, listable and replayable from the CLI.'],
      ['HTTP', 'Problem details', 'RFC 9457 application/problem+json as the error representation, negotiated against Accept.'],
      ['Cache', 'Tag invalidation', 'Entries tagged on write and evicted by tag in one call, across both the memory and Redis backends.'],
      ['Record', 'Migration autogeneration', 'Model diffs compiled into a migration, with destructive changes named before they run.'],
      ['i18n', 'Locale negotiation', 'Message catalogues and pluralisation, selected by the Accept-Language negotiation already in the HTTP layer.'],
      ['Auth', 'Password reset and verification', 'Single-use signed tokens, rate limits and mail templates, working across all three auth backends.'],
      ['Real-time', 'Presence channels', 'Channel membership with join and leave events, including on connections that close without a close frame.'],
      ['CLI', 'sillo doctor', 'One command that checks the interpreter, the installed extras, Redis, pending migrations, config and middleware order.'],
      ['Work', 'Batches and chains', 'Batches with a completion callback, and chains that pass each result forward, both surviving a worker restart.'],
      ['Security', 'Content Security Policy', 'Per-request nonces threaded into templates and Inertia, deployable in report-only mode first.'],
      ['Record', 'Read replicas', 'Writes to the primary and reads to a replica pool, with a sticky window after a write.'],
      ['Admin', 'Bulk actions', 'Declarative actions with a confirmation screen, a permission gate and an activity-log entry per affected row.'],
      ['Auth', 'Object policies', 'Per-model policies that answer whether a user may act on one specific row, from routes, templates and the admin.'],
      ['Cache', 'Two-tier caching', 'An in-process layer in front of Redis, invalidated across workers over the event bus.'],
      ['Work', 'Scheduler leadership', 'A leader lock, misfire policies, overlap prevention and jitter, so several workers run one schedule.'],
      ['HTTP', 'API versioning', 'One application serving several versions from the same route table, resolved by path, header or media type, with an OpenAPI document and Sunset headers per version.'],
      ['Storage', 'Direct uploads', 'Signed URLs scoped by method, expiry, content type and size, so a browser uploads straight to the bucket.'],
      ['HTTP', 'Response caching', 'RFC 9111 semantics, with Vary derived from the negotiation the response actually performed.'],
      ['Sessions', 'Redis store', 'Sessions that survive a deploy and can be revoked, alongside the signed-cookie and file stores.'],
      ['Ops', 'Health probes', 'Separate liveness and readiness endpoints that probe the database, Redis and the queue.'],
      ['Events', 'Persistence and replay', 'A durable transport with per-stream sequencing, so a restarted consumer resumes where it stopped.'],
      ['Record', 'Bulk operations', 'bulk_create, bulk_update and bulk_delete with batch sizes, plus cursor iteration over a large table.'],
      ['Auth', 'Audit log', 'Sign-ins, failures, permission denials and privilege changes recorded with actor, target and outcome.'],
      ['Testing', 'Pytest plugin', 'client, async_client, ws_client, mailbox and queue fixtures shipped with the framework.'],
      ['Work', 'Rate-limited tasks', 'Per-task rate and concurrency limits enforced across every worker, not per process.'],
      ['GraphQL', 'Subscriptions', 'Subscriptions over the same channels and groups the websocket consumers use.'],
      ['Admin', 'JSON API', 'Every panel operation available as JSON under the same permissions, for scripts and external tools.'],
      ['Frontend', 'Deferred props', 'Inertia props resolved in a follow-up request, merged props for infinite scroll, and prefetch hints.'],
      ['Security', 'Trusted proxies', 'One place that decides which proxies may set Forwarded and X-Forwarded-For.'],
      ['Record', 'Full-text search', 'One search scope compiled to tsvector, MATCH or FTS5 depending on the engine underneath.'],
      ['CLI', 'Scriptable output', 'JSON output and colour control on every command, honouring NO_COLOR.'],
      ['Observability', 'Trace continuity', 'One trace spanning the request, the job it queued, the mail that job sent and the event it emitted.'],
      ['Auth', 'Step-up authentication', 'Routes that require recent or second-factor authentication, answering with a challenge rather than a refusal.'],
      ['Storage', 'One filesystem contract', 'Sessions, uploads, attachments and inspector data behind a single driver.'],
      ['Mail', 'Preview', 'Every message the application would have sent, rendered in the browser during development.'],
      ['Work', 'Queue inspector', 'Depth, in-flight claims, recent failures and dead letters, with retry and delete.'],
      ['Record', 'Locking', 'select_for_update, advisory locks and an explicit isolation-level API.'],
      ['Docs', 'Generated reference', 'An API reference generated from the docstrings, alongside the written guides.'],
    ],
  },
  {
    title: 'Building',
    tag: 'In progress',
    dot: 'bg-primary',
    meaning: 'Code is in the tree and the work is not finished.',
    items: [
      ['Storage', 'File storage', 'One driver contract over local disk and S3-compatible object storage, with streamed writes that never buffer a whole upload.'],
      ['Mail', 'Queued delivery', 'Messages sent through the Work queue, with retry, backoff and dead letters.'],
      ['Record', 'Engine coverage', 'One record API across SQLite, Postgres and MySQL, proven by a matrix over all three.'],
      ['Observability', 'Metrics and traces', 'Request, queue, cache and database timings as Prometheus metrics and OpenTelemetry spans.'],
      ['Performance', 'Continuous benchmarks', 'The benchmark suite run on every merge against FastAPI, Starlette, Django and Flask, with a regression failing the build.'],
      ['Frontend', 'Server-side rendering', 'Inertia pages rendered on the server, falling back to the client when it is unreachable.'],
      ['Reference', 'OpenAPI 3.1 in Atlas', 'Webhooks, callbacks and the 3.1 schema dialect, in the reference and the client.'],
    ],
  },
  {
    title: 'Testing',
    tag: 'Hardening',
    dot: 'bg-amber-400',
    meaning: 'Written and merged, and being proven before it is claimed.',
    items: [
      ['Real-time', 'Protocol conformance', 'The Autobahn suite for websockets, and an ASGI conformance suite for lifespan, disconnects and body streaming.'],
      ['Work', 'Delivery guarantees', 'At-least-once claims held under killed workers, an expired claim deadline and three workers on one queue.'],
      ['Security', 'Adversarial inputs', 'Fuzzed multipart, ranges, ETags, Accept headers and URLs, asserting 400 and never 500.'],
      ['Record', 'Transaction semantics', 'Savepoints, rollback on exception and isolation levels asserted identically on SQLite, Postgres and MySQL.'],
      ['Quality', 'Mutation coverage', 'Auth, sessions and security measured by mutation score, not by line count.'],
      ['Platform', 'Version matrix', 'Python 3.10 through 3.14 and free-threaded builds, on Linux, macOS and Windows.'],
    ],
  },
  {
    title: 'Completed',
    tag: 'Released',
    dot: 'bg-emerald-400',
    meaning: 'In the released framework, each with a documentation page.',
    items: [
      ['HTTP', 'Routing and lifecycle', 'Decorator and router-based routes, mountable subapps, typed path parameters.'],
      ['HTTP', 'Response builder', 'JSON, text, HTML, files, streams, redirects, and cookies in one fluent API.'],
      ['HTTP', 'HTTP correctness', 'RFC 9110 ranges, ETags, conditional requests, and content negotiation.'],
      ['HTTP', 'Server-sent events', 'A one-way stream to the browser, with the wire format and reconnection hints handled for you.'],
      ['Validation', 'Request models', 'request_model turns untrusted bodies into validated Pydantic objects at the boundary.'],
      ['DI', 'Dependency injection', 'Depend resolves services and request-aware providers in the handler signature.'],
      ['OpenAPI', 'Generated spec', 'The document is generated from your routes, parameters, and declared response models.'],
      ['Record', 'Record models', 'Active-record fields, casting, scopes, events, and transactions.'],
      ['Record', 'Migrations', 'Schema migrations as built-in commands over sillo.record.commands.'],
      ['Record', 'Pagination', 'Cursor and page-based pagination on the query builder.'],
      ['Record', 'Factories and seeding', 'Model factories and seeders for fixtures, tests, and demo data.'],
      ['Cache', 'Cache backends', 'Pluggable drivers, from in-memory to Redis, behind one interface.'],
      ['Auth', 'Auth backends', 'JWT, session, and API-key behind one contract. Setting auth= gates the route and writes its securityScheme.'],
      ['Auth', 'Permissions', 'DB-backed named permissions with group inheritance and one-call caching.'],
      ['Auth', 'OAuth2', 'Social login as two functions, with no router or response object of its own.'],
      ['Auth', 'Password hashing', 'bcrypt, argon2 and scrypt behind one interface, with a built-in scheme when none is installed.'],
      ['Admin', 'Admin panel', 'A model admin at /admin/ that authenticates against your own user model.'],
      ['Security', 'CORS, CSRF, rate limits', 'Security headers, origin policy, token protection, and throttling as middleware.'],
      ['Sessions', 'Session stores', 'Signed-cookie and file backends behind one interface.'],
      ['Work', 'Queues and workers', 'Durable background jobs as one subsystem with the scheduler.'],
      ['Work', 'Scheduler', 'Cron-style jobs registered on app.state and started by the app lifecycle.'],
      ['Events', 'Event bus', 'An emitter with pluggable transports, alongside the in-memory default.'],
      ['Real-time', 'WebSockets', 'Consumers, channels, groups, and connection history.'],
      ['Mail', 'Templated mail', 'A mail client that renders templates, addresses, and attachments, and suppresses sending in development.'],
      ['Frontend', 'Inertia and templating', 'Server-driven React and Vue frontends, plus HTML rendering with escaping by default.'],
      ['GraphQL', 'Strawberry endpoint', 'A GraphQL schema mounted on the application, sharing its context and lifecycle.'],
      ['CLI', 'The sillo command', 'serve, routes and version, merging in whatever your project registers in its own console.py.'],
      ['CLI', 'Request inspector', 'Every request the server handled, with its timing, at /__sillo/requests.'],
      ['Testing', 'Test clients', 'Sync and async clients covering routes, auth, jobs, websockets, and streamed responses.'],
      ['Reference', 'Atlas', 'A three-pane OpenAPI reference and request client, with no runtime dependencies.'],
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
  const [state, setState] = useState(KANBAN_COLUMNS[0].title)
  const column = KANBAN_COLUMNS.find(c => c.title === state) ?? KANBAN_COLUMNS[0]

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-border/60 pb-1">
        {KANBAN_COLUMNS.map(tab => {
          const isActive = tab.title === column.title
          return (
            <button
              key={tab.title}
              type="button"
              onClick={() => setState(tab.title)}
              aria-pressed={isActive}
              className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 transition-colors ${
                isActive ? 'text-text' : 'text-muted hover:text-text'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-opacity ${tab.dot} ${isActive ? 'opacity-100' : 'opacity-45 group-hover:opacity-80'}`}
              />
              <span className="text-sm font-semibold tracking-[-0.03em]">{tab.title}</span>
              <span className="font-mono text-[10px] tabular-nums text-dimmed">{tab.items.length}</span>
              {isActive && <span className="absolute inset-x-0 -bottom-px h-px bg-primary" />}
            </button>
          )
        })}
      </div>

      <div className="mt-6 mb-8 flex items-start gap-3">
        <span className="mt-[7px] font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{column.tag}</span>
        <p className="max-w-[720px] text-sm leading-relaxed text-muted">{column.meaning}</p>
        {column.title === 'Completed' && (
          <Doodle name="tick" tone="red" seed={149} size={19} rotate={-8} show="tablet" className="mt-1 opacity-85" />
        )}
      </div>

      <ul className="divide-y divide-border/40 border-t border-border/40">
        {column.items.map(([tag, title, description]) => (
          <li
            key={title}
            className="group relative grid grid-cols-1 gap-x-8 gap-y-1.5 py-4 pl-4 transition-colors sm:grid-cols-[112px_1fr] lg:grid-cols-[112px_300px_1fr]"
          >
            <span
              className={`absolute inset-y-2 left-0 w-px ${column.dot} opacity-0 transition-opacity group-hover:opacity-80`}
            />
            <span className="font-mono text-[9.5px] uppercase leading-5 tracking-[0.16em] text-dimmed transition-colors group-hover:text-primary sm:pt-px">
              {tag}
            </span>
            <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.035em] text-text">{title}</h3>
            <p className="max-w-[620px] text-[13.5px] leading-relaxed text-muted sm:col-start-2 lg:col-start-3">
              {description}
            </p>
          </li>
        ))}
      </ul>
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
