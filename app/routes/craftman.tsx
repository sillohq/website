import { Link, createFileRoute } from '@tanstack/react-router'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { ProductShowcase } from '../components/ProductShowcase'
import { CRAFTMAN } from '../data/products'
import { Doodle, DoodleArrow, HandwrittenNote, MarkerAside } from '../components/marker'

export const Route = createFileRoute('/craftman')({
  component: CraftmanPage,
  head: () => ({
    meta: [
      { title: 'Craftman: One Deployment, Whole Backend' },
      {
        name: 'description',
        content:
          'Craftman is the planned single-deployment backend for Sillo: a database with a generated API, authentication, realtime channels, storage and background tasks, running as one application you own.',
      },
    ],
  }),
})

// One array drives the studio mockup and the written surface list below it.
//
// Deliberately no stat tiles. Craftman is a tool you work in, not a dashboard
// you watch — the numbers belong in Foreman. A panel here shows the thing it
// edits: rows, policies, keys, files. Where a figure earns its place it sits in
// the toolbar of the panel it describes.
//
const PILLARS = [
  ['Your database', 'Postgres or MySQL that you run. Craftman maps what is there; it does not own it.'],
  ['API', 'REST generated per model, plus your own handlers, in one OpenAPI document.'],
  ['Auth', 'Sessions, JWT, API keys and OAuth against your own user model.'],
  ['Realtime', 'Channels, presence and row changes over the same authorisation as the API.'],
  ['Tasks', 'A queue and a scheduler that start with the application, not beside it.'],
  ['Storage', 'Buckets over local disk or S3-compatible object storage, with signed URLs.'],
]

const DECISIONS = [
  {
    title: 'One deployment, and it is yours',
    body: 'Craftman is a Sillo application you run against a database you run. There is no control plane elsewhere, no tenancy, and nothing that stops working when a bill lapses. The studio is served by the same process as the API.',
  },
  {
    title: 'Users stay in your schema',
    body: 'This is the one place Craftman deliberately parts company with the tools it otherwise mirrors. Rather than a users table in a schema the platform owns, authentication runs against the users table already in yours — the same model the admin panel uses. A second identity system beside the first is the seam Sillo exists to remove, and adding one here to feel familiar would be a strange place to start.',
  },
  {
    title: 'Generated, not hidden',
    body: 'The API is generated from your Record models, and the code it generates is code you can read, override and eventually replace with a handler. A generated route and a hand-written one sit in the same router and the same document.',
  },
  {
    title: 'Deny by default',
    body: 'A model with no policy exposes nothing. The generated API, the studio and your own handlers all ask the same policy object, so a page and an endpoint cannot disagree about who may do what.',
  },
  {
    title: 'It is still Sillo underneath',
    body: 'No second framework, no separate runtime, no parallel user table. Anything Craftman sets up is something you could have written by hand in the same application, which is also the exit: outgrow the studio and you are left holding an ordinary Sillo app.',
  },
]

function CraftmanPage() {
  return (
    <main className="min-h-screen bg-bg pt-24 text-text lg:pt-28">
      <SiteNav />

      <ProductShowcase product={CRAFTMAN} />


      <section className="mx-auto max-w-[1520px] px-6 py-20 sm:px-8 md:px-12 lg:py-24">
        <div className="mb-12 max-w-[720px]">
          <div className="mb-4 font-mono text-[11px] tracking-[0.16em] text-primary">WHAT COMES UP</div>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl md:text-5xl">
            Six pieces, already introduced to each other.
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
          {PILLARS.map(([name, body], index) => (
            <li key={name} className="grid grid-cols-[28px_1fr] gap-4 border-t border-border/40 pt-5">
              <span className="font-mono text-[11px] tabular-nums text-dimmed">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="mb-1.5 text-[15px] font-semibold tracking-[-0.03em] text-text">{name}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 pb-20 sm:px-8 md:px-12 lg:pb-28">
        <div className="mb-14 max-w-[720px]">
          <div className="mb-4 font-mono text-[11px] tracking-[0.16em] text-primary">THE STUDIO</div>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl md:text-5xl">Eleven surfaces to work in.</h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Each one edits something the framework already models. There are no dashboards here —
            operational detail belongs in{' '}
            <Link to="/foreman" className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-primary">
              Foreman
            </Link>
            , and this is the tool you build in.
          </p>
        </div>

        <div className="space-y-16">
          {CRAFTMAN.groups.map(group => {
            const surfaces = CRAFTMAN.panels.filter(surface => surface.group === group)
            return (
              <div key={group}>
                <div className="mb-8 flex items-center gap-4 border-b border-border/50 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{group}</span>
                  <span className="font-mono text-[10px] tabular-nums text-dimmed">{surfaces.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                  {surfaces.map(surface => (
                    <div key={surface.id} className="min-w-0">
                      <div className="mb-3 flex items-center gap-3">
                        <surface.icon className="h-[18px] w-[18px] shrink-0 text-primary" />
                        <h3 className="text-[17px] font-semibold tracking-[-0.035em] text-text">{surface.name}</h3>
                      </div>
                      <p className="mb-5 text-sm leading-relaxed text-muted">{surface.summary}</p>
                      <ul className="space-y-2 border-l border-border/50 pl-4">
                        {surface.features.map(feature => (
                          <li key={feature} className="text-[13px] leading-relaxed text-dimmed">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border/40 bg-elevated/40">
        <div className="mx-auto max-w-[1520px] px-6 py-20 sm:px-8 md:px-12 lg:py-28">
          <div className="mb-12 max-w-[720px]">
            <div className="mb-4 font-mono text-[11px] tracking-[0.16em] text-primary">DECISIONS</div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl md:text-5xl">
              Five that shape the rest.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {DECISIONS.map((decision, index) => (
              <div key={decision.title} className="grid grid-cols-[28px_1fr] gap-4">
                <span className="pt-1 font-mono text-[11px] tabular-nums text-dimmed">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-2 text-[15px] font-semibold tracking-[-0.03em] text-text">{decision.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-muted">{decision.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 py-20 sm:px-8 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border/40 pt-10">
          <p className="max-w-[560px] text-sm leading-relaxed text-muted">
            Craftman sits in Planning on the roadmap board, alongside everything else that is specified
            and not started.
          </p>
          <Link
            to="/about"
            hash="ships"
            className="inline-flex items-center gap-2.5 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            The roadmap board
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
