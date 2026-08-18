import { Link, createFileRoute } from '@tanstack/react-router'
import { SiteNav } from '../components/SiteNav'
import { SiteFooter } from '../components/SiteFooter'
import { ProductShowcase } from '../components/ProductShowcase'
import { FOREMAN } from '../data/products'
import { Doodle, DoodleArrow, HandwrittenNote, MarkerAside } from '../components/marker'

export const Route = createFileRoute('/foreman')({
  component: ForemanPage,
  head: () => ({
    meta: [
      { title: 'Foreman: The Sillo Operations Dashboard' },
      {
        name: 'description',
        content:
          'Foreman is the planned operations dashboard for Sillo: queues, workers, schedules, requests, queries, cache, outgoing calls, exceptions and logs in one web interface, with Atlas embedded as the request client.',
      },
    ],
  }),
})

const BUILDS_ON: [string, string][] = [
  ['server/inspector.py', 'RequestRecord, a RequestLog ring buffer and redact() — the recorder pattern, already written.'],
  ['record/logging.py', 'Query logging, which the queries panel reads.'],
  ['http/client/middleware.py', 'The outgoing client already has a middleware layer to hook.'],
  ['work/ queue middleware', 'LoggingMiddleware is the shape every job watcher takes.'],
  ['QueueStats, WorkerStats', 'The fields the queue and worker panels show. What is missing is a time series behind them.'],
  ['@sillo/atlas', 'The request client, at 79 kB with no runtime dependencies.'],
]

const CONSTRAINTS = [
  {
    title: 'Redaction happens on capture',
    body: 'Never on read. A watcher that stores a Cookie header and hides it in the interface is a credential store with a filter on top. Sillo 0.1.0 fixed a debug page that returned one request headers to another client, and this is that surface multiplied.',
  },
  {
    title: 'Disabled means compiled out',
    body: 'Not a branch inside the hot path. Framework overhead went from 702.8µs to 27.1µs by deleting per-request allocation, and a recorder that builds an event per query and per cache read gives that back.',
  },
  {
    title: 'The cost is a published number',
    body: 'Foreman on and Foreman off are separate rows in the benchmark suite, next to FastAPI, Starlette, Django and Flask.',
  },
  {
    title: 'One recorder, many watchers',
    body: 'Fourteen panels with fourteen collection paths is fourteen storage decisions and fourteen ways to leak. One recorder, one store, one watcher per concern — emitting the same events a hosted collector would ingest.',
  },
]

function ForemanPage() {
  return (
    <main className="min-h-screen bg-bg pt-24 text-text lg:pt-28">
      <SiteNav />

      <ProductShowcase product={FOREMAN} />


      <section className="mx-auto max-w-[1520px] px-6 py-20 sm:px-8 md:px-12 lg:py-28">
        <div className="mb-14 max-w-[720px]">
          <div className="mb-4 font-mono text-[11px] tracking-[0.16em] text-primary">THE PANELS</div>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl md:text-5xl">
            Fourteen panels, one recorder.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Each panel is a watcher over a hook the framework already has, writing into one store.
            That is what keeps this a dashboard rather than fourteen small products.
          </p>
        </div>

        <div className="space-y-16">
          {FOREMAN.groups.map(group => {
            const panels = FOREMAN.panels.filter(panel => panel.group === group)
            return (
              <div key={group}>
                <div className="mb-8 flex items-center gap-4 border-b border-border/50 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{group}</span>
                  <span className="font-mono text-[10px] tabular-nums text-dimmed">{panels.length}</span>
                </div>

                <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                  {panels.map(panel => (
                    <div key={panel.id} className="min-w-0">
                      <div className="mb-3 flex items-center gap-3">
                        <panel.icon className="h-[18px] w-[18px] shrink-0 text-primary" />
                        <h3 className="text-[17px] font-semibold tracking-[-0.035em] text-text">{panel.name}</h3>
                      </div>
                      <p className="mb-5 text-sm leading-relaxed text-muted">{panel.summary}</p>
                      <ul className="space-y-2 border-l border-border/50 pl-4">
                        {panel.features.map(feature => (
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
        <div className="mx-auto grid max-w-[1520px] grid-cols-1 gap-14 px-6 py-20 sm:px-8 md:px-12 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-4 font-mono text-[11px] tracking-[0.16em] text-primary">WHAT IT IS BUILT ON</div>
            <h2 className="mb-6 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl md:text-4xl">
              Most of the collection already exists.
            </h2>
            <p className="mb-9 max-w-[520px] text-base leading-relaxed text-muted">
              The panels read hooks that are in the framework today. What is missing is a shared
              recorder, a time series to write into, and the interface over both.
            </p>
            <ul className="divide-y divide-border/40 border-t border-border/40">
              {BUILDS_ON.map(([path, note]) => (
                <li key={path} className="grid grid-cols-1 gap-x-6 gap-y-1 py-4 sm:grid-cols-[220px_1fr]">
                  <code className="font-mono text-[12px] leading-6 text-text">{path}</code>
                  <p className="text-[13px] leading-relaxed text-muted">{note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 font-mono text-[11px] tracking-[0.16em] text-primary">CONSTRAINTS</div>
            <h2 className="mb-6 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl md:text-4xl">
              Four rules that ship with it.
            </h2>
            <p className="mb-9 max-w-[520px] text-base leading-relaxed text-muted">
              Part of the specification rather than follow-up work, because each one is expensive to
              retrofit and cheap to design in.
            </p>
            <div className="space-y-8">
              {CONSTRAINTS.map((rule, index) => (
                <div key={rule.title} className="grid grid-cols-[28px_1fr] gap-4">
                  <span className="pt-1 font-mono text-[11px] tabular-nums text-dimmed">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="mb-2 text-[15px] font-semibold tracking-[-0.03em] text-text">{rule.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-muted">{rule.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 py-20 sm:px-8 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border/40 pt-10">
          <p className="max-w-[560px] text-sm leading-relaxed text-muted">
            Foreman sits in Planning on the roadmap board, alongside everything else that is specified
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
