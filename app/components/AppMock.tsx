import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactElement, SVGProps } from 'react'
import { DemoCursor, TOUR_HIT, useGuidedTour } from './DemoCursor'

/**
 * The product mockup, shared by /foreman, /craftman and the home page.
 *
 * It was written twice — once per product page — before the home page needed a
 * third copy. The two differed only in their data, so the data moved to
 * `app/data/products.ts` and this renders whichever product it is handed.
 *
 * A panel may carry stat tiles or a toolbar, a chart, a code block, a table and
 * a side rail, in that order. Foreman leans on tiles because it is a dashboard;
 * Craftman leans on toolbars because it is a tool you work in.
 */

type Icon = (props: SVGProps<SVGSVGElement>) => ReactElement

export type MockColumn = { label: string; cls?: string }

export type MockPanel = {
  id: string
  name: string
  group: string
  icon: Icon
  crumb: string
  summary: string
  features: string[]
  badge?: string
  tiles?: { label: string; value: string; delta?: string; tone?: string; spark: string }[]
  toolbar?: string[]
  chart?: { label: string; note: string; bars: number[] }
  code?: { label: string; lines: string[] }
  table?: { columns: MockColumn[]; rows: string[][] }
  aside?: { label: string; note: string; rows: [string, string, string?][] }
}

export type Product = {
  id: string
  name: string
  href: string
  url: string
  env: { label: string; tone: string }
  tagline: string
  blurb: string
  /** What this product calls its panels, in prose. */
  unit: string
  /** Marker-layer seeds, so a doodle stays put between renders. */
  seeds: { sparkle: number; sparkleRotate: number; arrow: number; arrowRotate: number }
  groups: string[]
  panels: MockPanel[]
  /** Panel opened first. Falls back to the first panel. */
  initial?: string
}

/**
 * Every pill is coloured from a vocabulary the framework actually uses, so a
 * state Sillo does not have cannot be rendered as though it does.
 */
export function toneFor(value: string): string {
  const v = value.toLowerCase()
  if (['completed', 'healthy', 'closed', 'hit', 'stored', 'resolved', 'required', 'published', 'active', 'enabled', 'public'].includes(v)) {
    return 'text-emerald-400 bg-emerald-400/10'
  }
  if (['running', 'scheduled', 'info', 'queued', 'in_review', 'invited', 'signed'].includes(v)) {
    return 'text-sky-400 bg-sky-400/10'
  }
  if (['retrying', 'degraded', 'half_open', 'warning', 'muted', 'evicted', 'draft', 'private'].includes(v)) {
    return 'text-amber-400 bg-amber-400/10'
  }
  if (['failed', 'open', 'stalled', 'error', 'cancelled', 'locked', 'disabled', 'archived'].includes(v)) {
    return 'text-primary bg-primary/10'
  }
  if (['pending', 'miss', 'debug', 'get', 'set', 'forget', 'generated', 'handler'].includes(v)) {
    return 'text-dimmed bg-white/5'
  }
  if (/^2\d\d$/.test(v)) return 'text-emerald-400 bg-emerald-400/10'
  if (/^3\d\d$/.test(v)) return 'text-sky-400 bg-sky-400/10'
  if (/^4\d\d$/.test(v)) return 'text-amber-400 bg-amber-400/10'
  if (/^5\d\d$/.test(v)) return 'text-primary bg-primary/10'
  return ''
}

export function AppMock({
  product,
  autoplay = false,
}: {
  product: Product
  /** Let a pointer work the mockup until the reader takes over. */
  autoplay?: boolean
}) {
  const panels = product.panels
  const [activeId, setActiveId] = useState(product.initial ?? panels[0].id)
  const panel = panels.find(item => item.id === activeId) ?? panels[0]
  const groups = product.groups.filter(group => panels.some(item => item.group === group))

  const frameRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>())
  const panelIds = useMemo(() => panels.map(item => item.id), [panels])
  const getNav = useCallback((id: string) => buttonRefs.current.get(id) ?? null, [])
  const { point, clicking, stop } = useGuidedTour({
    enabled: autoplay,
    panelIds,
    containerRef: frameRef,
    getNav,
    onOpen: setActiveId,
  })

  // Any real input ends the tour for good; a pointer that keeps moving after
  // the reader has taken the wheel is the thing everybody hates about these.
  const takeOver = (id?: string) => {
    stop()
    if (id) setActiveId(id)
  }

  return (
    <div
      ref={frameRef}
      onPointerDown={() => stop()}
      className="relative overflow-hidden rounded-xl border border-border-strong bg-[#08080a] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
    >
      <DemoCursor at={point} clicking={clicking} />
      <div className="flex items-center gap-3 border-b border-border/60 bg-surface/60 px-3 py-2.5 sm:gap-4 sm:px-4">
        <div className="hidden gap-1.5 sm:flex">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-bg/70 px-3 py-1">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          <span className="truncate font-mono text-[10px] text-muted sm:text-[11px]">{product.url}</span>
        </div>
        <span className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${product.env.tone}`}>
          {product.env.label}
        </span>
      </div>

      <div className="border-b border-border/50 bg-surface/20 lg:hidden">
        <div className="flex gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {panels.map(item => {
            const isActive = item.id === panel.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => takeOver(item.id)}
                aria-pressed={isActive}
                className={`flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors ${
                  isActive ? 'bg-primary/10 text-text' : 'text-muted hover:bg-white/5'
                }`}
              >
                <item.icon className={`h-[13px] w-[13px] ${isActive ? 'text-primary' : 'text-dimmed'}`} />
                <span className="whitespace-nowrap text-[12px]">{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[186px_1fr]">
        <aside className="hidden border-r border-border/50 bg-surface/30 px-3 py-4 lg:block">
          <div className="mb-6 flex items-center gap-2.5 px-2">
            <img src="/logo.svg" alt="" className="h-4 w-4 object-contain" />
            <span className="text-[13px] font-semibold tracking-[-0.03em]">{product.name}</span>
          </div>
          {groups.map(group => (
            <div key={group} className="mb-5">
              <div className="mb-2 px-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-dimmed">{group}</div>
              {panels.filter(item => item.group === group).map(item => {
                const isActive = item.id === panel.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    ref={node => {
                      if (node) buttonRefs.current.set(item.id, node)
                      else buttonRefs.current.delete(item.id)
                    }}
                    onClick={() => takeOver(item.id)}
                    aria-pressed={isActive}
                    className={`mb-0.5 flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors ${
                      isActive ? 'bg-primary/10 text-text' : 'text-muted hover:bg-white/5 hover:text-text'
                    }`}
                  >
                    <item.icon className={`h-[13px] w-[13px] shrink-0 ${isActive ? 'text-primary' : 'text-dimmed'}`} />
                    <span className="text-[12px]">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto rounded bg-primary/15 px-1.5 font-mono text-[9px] text-primary">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </aside>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-dimmed">{panel.crumb}</div>
              <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.04em] sm:text-[19px]">{panel.name}</h3>
            </div>
            {panel.tiles && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-md border border-border/60 px-2.5 py-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="font-mono text-[10px] text-muted">Live</span>
                </div>
                <div className="rounded-md border border-border/60 px-2.5 py-1.5 font-mono text-[10px] text-muted">Last 1h</div>
              </div>
            )}
          </div>

          {panel.toolbar && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {panel.toolbar.map((chip, index) => (
                <span
                  key={chip}
                  {...{ [TOUR_HIT]: '' }}
                  className={`rounded-md border px-2.5 py-1.5 font-mono text-[10px] ${
                    index === 0
                      ? 'border-border-strong bg-surface/60 text-text'
                      : index === panel.toolbar!.length - 1
                        ? 'ml-auto border-transparent text-dimmed'
                        : 'border-border/60 text-muted'
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {panel.tiles && (
            <div className="mb-3 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
              {panel.tiles.map(tile => (
                <div key={tile.label} {...{ [TOUR_HIT]: '' }} className="rounded-lg border border-border/40 bg-surface/40 p-3 sm:p-3.5">
                  <div className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-dimmed">{tile.label}</div>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[18px] font-semibold tabular-nums tracking-[-0.045em] sm:text-[21px]">{tile.value}</span>
                    <span className={`font-mono text-[10px] ${tile.tone ?? 'text-muted'}`}>{tile.delta}</span>
                  </div>
                  <svg viewBox="0 0 72 20" className="mt-2.5 h-6 w-full sm:h-7" preserveAspectRatio="none" aria-hidden="true">
                    <polyline points={tile.spark} fill="none" stroke="currentColor" strokeWidth="1.4" className="text-primary/70" />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {panel.chart && (
            <div className="mb-3 rounded-lg border border-border/40 bg-surface/40 p-3.5 sm:p-4">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[12px] font-semibold tracking-[-0.02em]">{panel.chart.label}</span>
                <span className="font-mono text-[9px] text-dimmed">{panel.chart.note}</span>
              </div>
              <div className="flex h-[60px] items-end gap-[2px] sm:h-[84px]">
                {panel.chart.bars.map((height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-sm ${index > 30 ? 'bg-primary/70' : 'bg-white/12'}`}
                  />
                ))}
              </div>
            </div>
          )}

          {panel.code && (
            <div className="mb-3 overflow-hidden rounded-lg border border-border/40 bg-surface/40">
              <div className="flex items-center justify-between border-b border-border/40 px-3.5 py-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dimmed">{panel.code.label}</span>
                <span className="font-mono text-[9px] text-dimmed">copy</span>
              </div>
              <pre className="overflow-x-auto px-3.5 py-3 font-mono text-[11px] leading-[1.7] text-muted">
                {panel.code.lines.map((line, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="w-4 shrink-0 select-none text-right text-dimmed/60">{index + 1}</span>
                    <span>{line || ' '}</span>
                  </div>
                ))}
              </pre>
            </div>
          )}

          {panel.table && (
            <div className={`grid gap-3 ${panel.aside ? 'xl:grid-cols-[1fr_230px]' : ''}`}>
              <div className="min-w-0 overflow-hidden rounded-lg border border-border/40 bg-surface/40">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b border-border/40">
                      {panel.table.columns.map(column => (
                        <th
                          key={column.label}
                          className={`px-3 py-2 text-left font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-dimmed ${column.cls ?? ''}`}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {panel.table.rows.map(row => (
                      <tr
                        key={row.join('|')}
                        {...{ [TOUR_HIT]: '' }}
                        className="border-b border-border/20 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                      >
                        {row.map((cell, index) => {
                          const column = panel.table?.columns[index]
                          const tone = toneFor(cell)
                          return (
                            <td key={index} className={`px-3 py-2 ${column?.cls ?? ''}`}>
                              {tone ? (
                                <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[9px] ${tone}`}>{cell}</span>
                              ) : (
                                <span className={`block truncate font-mono text-[10.5px] ${index === 0 ? 'text-text' : 'text-muted'}`}>
                                  {cell}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {panel.aside && (
                <div className="rounded-lg border border-border/40 bg-surface/40 p-3.5">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-[12px] font-semibold tracking-[-0.02em]">{panel.aside.label}</span>
                    <span className="font-mono text-[9px] text-dimmed">{panel.aside.note}</span>
                  </div>
                  {panel.aside.rows.map(([name, detail, state]) => (
                    <div key={name} {...{ [TOUR_HIT]: '' }} className="mb-2.5 flex items-center gap-2.5 rounded px-1 last:mb-0">
                      {state && (
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            state === 'healthy' ? 'bg-emerald-400' : state === 'degraded' ? 'bg-amber-400' : 'bg-primary'
                          }`}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-mono text-[10.5px] text-text">{name}</div>
                        {state && <div className="truncate font-mono text-[9px] text-dimmed">{detail}</div>}
                      </div>
                      <span className="shrink-0 font-mono text-[9px] text-dimmed">{state ?? detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
