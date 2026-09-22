import { Link } from '@tanstack/react-router'
import { AppMock } from './AppMock'
import type { Product } from './AppMock'

/**
 * A product's hero and its mockup, identical wherever it appears.
 *
 * The home page and the two product pages had drifted — different heading
 * sizes, different captions, the Planning note on one and not the other — for
 * no reason other than having been written twice. This is the one copy.
 *
 * Three things vary, and only because they have to:
 *
 *   `as`      the heading level. A page has one h1; the home page already
 *             spent its own, so its sections carry h2 with the same type.
 *   `action`  the read-the-plan link, which a page cannot show for itself.
 *   `bleed`   which side of the screen the mockup runs off. Craftman and
 *             Vise sit one after another on the home page, so they bleed
 *             opposite edges to read as a pair rather than two copies of the
 *             same card.
 *
 * Nothing else. The home page showed a four-panel subset of the mockup for a
 * while and it read as a different product — the whole point is that somebody
 * scrolling the home page sees the thing they will see on the page.
 */
export function ProductShowcase({
  product,
  as = 'h1',
  action = false,
  bleed = 'right',
}: {
  product: Product
  as?: 'h1' | 'h2'
  action?: boolean
  bleed?: 'left' | 'right'
}) {
  const Heading = as

  const textBlock = (
    <div
      className={`relative flex flex-col justify-center py-14 lg:py-20 ${
        bleed === 'right'
          ? 'px-6 sm:px-8 md:px-12 lg:pl-[max(1.5rem,calc((100vw-1520px)/2+3rem))] lg:pr-10'
          : 'px-6 sm:px-8 md:px-12 lg:pr-[max(1.5rem,calc((100vw-1520px)/2+3rem))] lg:pl-10'
      }`}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-2/3 bg-[radial-gradient(ellipse_50%_55%_at_75%_15%,rgba(252,3,69,0.07),transparent_65%)]" />

      <div className="relative">
        <Heading className="max-w-[560px] text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.05em] sm:text-5xl md:text-6xl md:tracking-[-0.055em]">
          {product.tagline}
        </Heading>

        <p className="mt-7 max-w-[480px] text-base leading-relaxed text-muted md:text-lg">{product.blurb}</p>

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
    </div>
  )

  const fadeDir = bleed === 'right' ? 'to right' : 'to left'
  const fadeSide = bleed === 'right' ? 'right-0' : 'left-0'

  const mockBlock = (
    <div className="relative min-w-0 py-6 lg:py-14">
      <div className={`lg:w-[1360px] ${bleed === 'left' ? 'lg:ml-[calc(100%-1360px)]' : ''}`}>
        <AppMock product={product} autoplay />
      </div>
      {/* Two layers, not one: a hard-edged backdrop-blur reads as a seam no
          matter the width, because the blur itself has no ramp. Masking the
          blur's own opacity in from zero, then blending the last stretch into
          the page color, is what makes the edge disappear instead of just
          getting softer. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 ${fadeSide} hidden w-[28rem] max-w-[46%] lg:block`}
        style={{
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          maskImage: `linear-gradient(${fadeDir}, transparent 0%, rgba(0,0,0,0.5) 55%, black 100%)`,
          WebkitMaskImage: `linear-gradient(${fadeDir}, transparent 0%, rgba(0,0,0,0.5) 55%, black 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 ${fadeSide} hidden w-[28rem] max-w-[46%] lg:block`}
        style={{
          background: `linear-gradient(${fadeDir}, transparent 0%, transparent 35%, var(--color-bg) 100%)`,
        }}
      />
    </div>
  )

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2">
        {bleed === 'right' ? (
          <>
            {textBlock}
            {mockBlock}
          </>
        ) : (
          <>
            {mockBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  )
}
