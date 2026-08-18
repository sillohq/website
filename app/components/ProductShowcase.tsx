import { Link } from '@tanstack/react-router'
import { AppMock } from './AppMock'
import type { Product } from './AppMock'
import { Doodle, DoodleArrow, HandwrittenNote, MarkerAside } from './marker'

/**
 * A product's hero and its mockup, identical wherever it appears.
 *
 * The home page and the two product pages had drifted — different heading
 * sizes, different captions, the Planning note on one and not the other — for
 * no reason other than having been written twice. This is the one copy.
 *
 * Two things vary, and only because they have to:
 *
 *   `as`      the heading level. A page has one h1; the home page already
 *             spent its own, so its sections carry h2 with the same type.
 *   `action`  the read-the-plan link, which a page cannot show for itself.
 *
 * Nothing else. The home page showed a four-panel subset of the mockup for a
 * while and it read as a different product — the whole point is that somebody
 * scrolling the home page sees the thing they will see on the page.
 */
export function ProductShowcase({
  product,
  as = 'h1',
  action = false,
}: {
  product: Product
  as?: 'h1' | 'h2'
  action?: boolean
}) {
  const Heading = as

  return (
    <>
      <section className="relative mx-auto max-w-[1520px] px-6 pb-14 pt-14 sm:px-8 md:px-12">
        <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-2/3 bg-[radial-gradient(ellipse_50%_55%_at_75%_15%,rgba(252,3,69,0.07),transparent_65%)]" />

        <div className="relative">
          <div className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-primary">
            {product.name.toUpperCase()}
            <Doodle
              name="sparkle"
              tone="red"
              seed={product.seeds.sparkle}
              size={14}
              rotate={product.seeds.sparkleRotate}
              show="tablet"
              className="opacity-80"
            />
          </div>

          <Heading className="max-w-[1100px] text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl sm:leading-[0.98] md:text-7xl md:tracking-[-0.065em]">
            {product.tagline}
          </Heading>

          <p className="mt-7 max-w-[780px] text-base leading-relaxed text-muted md:text-lg">{product.blurb}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
            <span className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-400/[0.07] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sky-400">Planning</span>
            </span>
            <p className="max-w-[560px] text-sm leading-relaxed text-muted">
              Specified and not started. This is the specification and the design, not a release —
              nothing here runs yet.{' '}
              <Link
                to="/about"
                hash="ships"
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
              >
                See where it sits on the board
              </Link>
              .
            </p>
          </div>

          {action && (
            <Link
              to={product.href}
              className="mt-9 inline-flex w-fit items-center gap-2.5 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              Read the {product.name} plan
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1520px] px-6 pb-6 sm:px-8 md:px-12">
        <AppMock product={product} autoplay />
        <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-dimmed">
            Mockup — the interface being designed toward, drawn with placeholder data. The {product.unit} switch.
          </p>
          <MarkerAside show="desktop" className="gap-2">
            <DoodleArrow
              curve="down"
              seed={product.seeds.arrow}
              rotate={product.seeds.arrowRotate}
              width={38}
              height={30}
              className="opacity-60"
            />
            <HandwrittenNote rotate={-3} size="1.2rem" className="opacity-80">
              not a screenshot
            </HandwrittenNote>
          </MarkerAside>
        </div>
      </section>
    </>
  )
}
