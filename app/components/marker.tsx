/**
 * The marker layer.
 *
 * A sketchbook pass drawn over the top of the site: underlines, circles,
 * arrows, doodles and margin notes, as though someone went over the interface
 * with a felt-tip. The interface underneath stays exactly as precise as it was
 * — the contrast between the two is the entire point, so nothing in here is
 * allowed to be clean.
 *
 * Every path is generated, not hand-authored. `rough()` seeds a deterministic
 * PRNG and knocks each control point off its true position, so no line is
 * straight, no circle closes where it started, and two marks with different
 * seeds never look like copies of each other. Marks are drawn in two or three
 * passes at slightly different offsets and opacities, which is what makes a
 * stroke read as a marker rather than a border: the thickness wanders and the
 * ink pools where the passes overlap.
 *
 * Colours come from the existing palette only — `--color-text` for the chalk
 * marker, `--color-primary` for the red one. Nothing here introduces a colour.
 *
 * Everything is decoration. Every component is `aria-hidden` and
 * `pointer-events: none`, so no mark can intercept a click meant for the
 * content it is drawn over.
 */

import type { CSSProperties, ReactNode } from 'react'

/* ─── Tones ─── */

export type MarkerTone = 'chalk' | 'red' | 'muted'

const TONES: Record<MarkerTone, string> = {
  chalk: 'var(--color-text)',
  red: 'var(--color-primary)',
  muted: 'var(--color-muted)',
}

/** Screen sizes a mark is allowed to appear at. Desktop gets the most. */
export type MarkerVisibility = 'all' | 'tablet' | 'desktop'

// Hide downward rather than reveal upward: `lg:block` would overwrite the
// display a mark was already given, and an inline-flex note would break onto
// its own line the moment it became visible.
const VISIBILITY: Record<MarkerVisibility, string> = {
  all: '',
  tablet: 'max-md:hidden',
  desktop: 'max-lg:hidden',
}

type Common = {
  /** Palette entry to draw with. Ignored when `color` is given. */
  tone?: MarkerTone
  /** Any CSS colour, for the rare case a tone does not fit. */
  color?: string
  /** Changes which way the line wobbles. Same seed, same mark, every render. */
  seed?: number
  /** Stroke width in user units before any stretch. */
  weight?: number
  /** Degrees of rotation. A mark sitting perfectly level looks printed. */
  rotate?: number
  /** Smallest breakpoint the mark appears at. */
  show?: MarkerVisibility
  /** Animate the stroke on as though it were being drawn. */
  draw?: boolean
  /** Seconds to wait before drawing. */
  delay?: number
  className?: string
  style?: CSSProperties
}

function inkOf({ tone = 'chalk', color }: Common) {
  return color ?? TONES[tone]
}

/* ─── Roughness ─── */

type Point = [number, number]

/** mulberry32. Small, fast, and the same sequence for the same seed. */
function rough(seed: number) {
  let t = (seed * 2654435761) >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let x = Math.imul(t ^ (t >>> 15), 1 | t)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

/** Knocks every point off its true position by up to `amount`. */
function wobble(points: Point[], rand: () => number, amount: number): Point[] {
  return points.map(([x, y]) => [
    x + (rand() - 0.5) * amount * 2,
    y + (rand() - 0.5) * amount * 2,
  ])
}

const round = (n: number) => Math.round(n * 100) / 100

/** Catmull-Rom through the points, emitted as cubics. Curves, never corners. */
function smooth(points: Point[]): string {
  if (points.length < 2) return ''
  let d = `M${round(points[0]![0])} ${round(points[0]![1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[i + 2] ?? p2
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${round(c1[0])} ${round(c1[1])},${round(c2[0])} ${round(c2[1])},${round(p2[0])} ${round(p2[1])}`
  }
  return d
}

/* ─── Shared plumbing ─── */

type SvgShellProps = Common & {
  viewBox: string
  width?: number | string
  height?: number | string
  stretch?: boolean
  children: ReactNode
}

/**
 * The wrapper every mark goes through: decorative, inert, and rotated a
 * degree or two off true.
 */
function Mark({
  viewBox,
  width,
  height,
  stretch = false,
  rotate = 0,
  show = 'all',
  draw = false,
  delay = 0,
  className = '',
  style,
  children,
}: SvgShellProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      width={width}
      height={height}
      preserveAspectRatio={stretch ? 'none' : undefined}
      className={[
        'pointer-events-none select-none overflow-visible',
        draw ? 'marker-draw' : '',
        VISIBILITY[show],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...(rotate ? { transform: `rotate(${rotate}deg)` } : null),
        ...(draw && delay ? { animationDelay: `${delay}s` } : null),
        ...style,
      }}
    >
      {children}
    </svg>
  )
}

type StrokeProps = {
  d: string
  ink: string
  weight: number
  opacity?: number
  delay?: number
}

/** One pass of the marker. `pathLength` normalises the draw animation. */
function Stroke({ d, ink, weight, opacity = 1, delay }: StrokeProps) {
  return (
    <path
      d={d}
      fill="none"
      stroke={ink}
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      pathLength={1}
      vectorEffect="non-scaling-stroke"
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    />
  )
}

/* ─── Underlines ─── */

/**
 * A rough underline under a word or phrase.
 *
 * Two passes: a firm one and a lighter one that only covers part of the span,
 * the way a second swipe of a marker rarely lands on the first. The stroke
 * overshoots both ends of the text — a hand-drawn line does not know where the
 * text box stops.
 */
export function MarkerUnderline({
  children,
  seed = 11,
  weight = 2.4,
  tone = 'red',
  color,
  show = 'all',
  draw = false,
  delay = 0,
  className = '',
  ...rest
}: Common & { children: ReactNode }) {
  const ink = inkOf({ tone, color })
  const rand = rough(seed)

  // Overshoot at both ends, and never by the same amount.
  const start = -4 - rand() * 6
  const end = 104 + rand() * 6
  const spine: Point[] = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6
    // A sag in the middle, as though the hand pivoted from the wrist. The
    // amplitudes look large because the viewBox is 100 units tall and the box
    // it stretches into is a fraction of a line — anything subtler here
    // flattens into something indistinguishable from a border.
    return [start + (end - start) * t, 40 + Math.sin(t * Math.PI) * 16]
  })

  const first = smooth(wobble(spine, rand, 15))
  const second = smooth(
    wobble(spine.slice(1, 6).map(([x, y]) => [x + 4, y + 26] as Point), rand, 13),
  )

  return (
    <span className={`relative inline-block ${className}`.trim()}>
      {children}
      <Mark
        viewBox="0 0 100 100"
        stretch
        show={show}
        draw={draw}
        delay={delay}
        className="absolute left-0 top-full -mt-[0.2em] h-[0.55em] w-full"
        {...rest}
      >
        <Stroke d={first} ink={ink} weight={weight} />
        <Stroke d={second} ink={ink} weight={weight * 0.55} opacity={0.5} delay={delay + 0.12} />
      </Mark>
    </span>
  )
}

/* ─── Circles ─── */

/**
 * A marker circle around a word, a number, or a small control.
 *
 * Drawn as one and a bit laps with the radius breathing as it goes, so the
 * ends cross rather than meet. Nothing about it is an ellipse.
 */
export function MarkerCircle({
  children,
  seed = 3,
  weight = 2,
  tone = 'red',
  color,
  show = 'all',
  draw = false,
  delay = 0,
  rotate = 0,
  padX = 8,
  padY = 22,
  className = '',
}: Common & { children: ReactNode; padX?: number; padY?: number }) {
  const ink = inkOf({ tone, color })
  const rand = rough(seed)

  // Start somewhere near the top-left and carry on past the start point.
  const from = -0.62 + rand() * 0.12
  const laps = 1.06 + rand() * 0.1
  const steps = 22
  const points: Point[] = Array.from({ length: steps + 1 }, (_, i) => {
    const a = (from + (i / steps) * laps) * Math.PI * 2
    const rx = 46 + (rand() - 0.5) * 7
    const ry = 42 + (rand() - 0.5) * 7
    return [50 + Math.cos(a) * rx, 50 + Math.sin(a) * ry]
  })

  return (
    <span className={`relative inline-block ${className}`.trim()}>
      {children}
      <Mark
        viewBox="0 0 100 100"
        stretch
        show={show}
        draw={draw}
        delay={delay}
        rotate={rotate}
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          width: `calc(100% + ${padX * 2}px)`,
          height: `calc(100% + ${padY}px)`,
          marginLeft: `-${padX}px`,
        }}
      >
        <Stroke d={smooth(points)} ink={ink} weight={weight} />
      </Mark>
    </span>
  )
}

/* ─── Arrows ─── */

export type ArrowCurve = 'right' | 'left' | 'down' | 'up' | 'hook'

const ARROW_SPINES: Record<ArrowCurve, Point[]> = {
  // Left to right, bowing upward.
  right: [
    [6, 46],
    [26, 30],
    [52, 24],
    [76, 30],
    [92, 44],
  ],
  // Right to left.
  left: [
    [92, 46],
    [72, 30],
    [46, 24],
    [22, 30],
    [8, 44],
  ],
  // Down the page, leaning right.
  down: [
    [34, 6],
    [46, 26],
    [52, 50],
    [50, 72],
    [46, 92],
  ],
  up: [
    [46, 92],
    [52, 70],
    [52, 46],
    [44, 24],
    [40, 6],
  ],
  // Out sideways then hooking down — the one for pointing under a heading.
  hook: [
    [8, 12],
    [34, 14],
    [58, 22],
    [66, 46],
    [62, 76],
  ],
}

/**
 * A hand-drawn arrow. Curved spine, and a head made of two separate strokes
 * that do not quite meet the tip.
 */
export function DoodleArrow({
  curve = 'right',
  seed = 5,
  weight = 2.2,
  tone = 'chalk',
  color,
  rotate = 0,
  show = 'all',
  draw = false,
  delay = 0,
  width = 60,
  height = 40,
  className = '',
  style,
}: Common & { curve?: ArrowCurve; width?: number; height?: number }) {
  const ink = inkOf({ tone, color })
  const rand = rough(seed)

  const spine = wobble(ARROW_SPINES[curve], rand, 3.5)
  const tip = spine[spine.length - 1]!
  const before = spine[spine.length - 2]!

  // Head barbs, swung off the direction of travel by unequal angles.
  const angle = Math.atan2(tip[1] - before[1], tip[0] - before[0])
  const barb = (spread: number, len: number): Point[] => {
    const a = angle + Math.PI + spread
    return [
      [tip[0] + (rand() - 0.5) * 3, tip[1] + (rand() - 0.5) * 3],
      [tip[0] + Math.cos(a) * len, tip[1] + Math.sin(a) * len],
    ]
  }

  return (
    <Mark
      viewBox="0 0 100 100"
      width={width}
      height={height}
      rotate={rotate}
      show={show}
      draw={draw}
      delay={delay}
      className={className}
      style={style}
    >
      <Stroke d={smooth(spine)} ink={ink} weight={weight} />
      <Stroke d={smooth(barb(0.62, 21 + rand() * 5))} ink={ink} weight={weight} delay={delay + 0.18} />
      <Stroke d={smooth(barb(-0.5, 17 + rand() * 5))} ink={ink} weight={weight} delay={delay + 0.22} />
    </Mark>
  )
}

/* ─── Brush strokes ─── */

/**
 * A thick marker swipe, drawn behind whatever it is given.
 *
 * The silhouette is what sells it. A real swipe does not have parallel edges:
 * it starts thin where the tip lands, swells through the middle, thins again
 * where the hand lifts, and both edges wander the whole way. So the body is
 * sampled at fourteen points along each edge with heavy per-point jitter and
 * a taper baked into the ends, and two bristle drags are stroked over the top
 * and bottom edges where a felt tip leaves a lighter trailing line.
 */
export function BrushStroke({
  children,
  seed = 17,
  tone = 'chalk',
  color,
  rotate = -1.2,
  show = 'all',
  opacity = 0.92,
  className = '',
}: Common & { children: ReactNode; opacity?: number }) {
  const ink = inkOf({ tone, color })
  const rand = rough(seed)

  const steps = 14
  // Thin at both ends, fattest a little past the middle — a hand accelerates
  // into a stroke and decelerates out of it.
  const taper = (t: number) => Math.sin(Math.min(1, Math.max(0, t)) ** 0.72 * Math.PI) ** 0.45

  const edge = (which: 'top' | 'bottom', x0: number, x1: number, spread: number): Point[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const t = which === 'top' ? i / steps : 1 - i / steps
      const thickness = spread * taper(t)
      const drift = Math.sin(t * Math.PI * 1.7 + seed) * 4
      // 55, not 50: text sits below the middle of its own line box, so a
      // swipe centred on the box reads as riding too high over the words.
      const y = which === 'top' ? 55 - thickness + drift : 55 + thickness + drift
      return [x0 + (x1 - x0) * t, y + (rand() - 0.5) * 9] as Point
    })

  const body = (x0: number, x1: number, spread: number) =>
    `${smooth([...edge('top', x0, x1, spread), ...edge('bottom', x0, x1, spread)])}Z`

  return (
    // `isolate` keeps the swipe behind the text without letting it fall behind
    // whatever surface the caller sits on.
    <span className={`relative isolate inline-block ${className}`.trim()}>
      <Mark
        viewBox="0 0 400 100"
        stretch
        show={show}
        rotate={rotate}
        className="absolute -inset-x-[1.5%] -inset-y-[16%] z-0 h-[132%] w-[103%]"
      >
        <path d={body(6, 394, 40)} fill={ink} opacity={opacity} />
        <path d={body(52, 348, 33)} fill={ink} opacity={opacity * 0.4} />
        <path
          d={smooth(edge('top', 30, 370, 34))}
          fill="none"
          stroke={ink}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={opacity * 0.5}
        />
        <path
          d={smooth(edge('bottom', 44, 382, 35))}
          fill="none"
          stroke={ink}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={opacity * 0.42}
        />
      </Mark>
      <span className="relative z-[1]">{children}</span>
    </span>
  )
}

/* ─── Doodles ─── */

export type DoodleName =
  | 'cross'
  | 'dot'
  | 'star'
  | 'squiggle'
  | 'bolt'
  | 'heart'
  | 'code'
  | 'circle'
  | 'smile'
  | 'tick'
  | 'emphasis'
  | 'sparkle'

/** Each doodle returns its strokes; the caller wraps them in the shell. */
const DOODLES: Record<DoodleName, (rand: () => number) => Point[][]> = {
  cross: (r) => [
    wobble(
      [
        [18, 16],
        [50, 48],
        [84, 84],
      ],
      r,
      5,
    ),
    wobble(
      [
        [84, 18],
        [50, 50],
        [16, 82],
      ],
      r,
      5,
    ),
  ],
  dot: (r) => [
    wobble(
      [
        [42, 46],
        [58, 44],
        [56, 58],
        [42, 56],
        [42, 46],
      ],
      r,
      4,
    ),
  ],
  star: (r) => [
    wobble(
      [
        [50, 6],
        [58, 40],
        [92, 50],
        [58, 60],
        [50, 94],
        [42, 60],
        [8, 50],
        [42, 40],
        [50, 6],
      ],
      r,
      5,
    ),
  ],
  sparkle: (r) => [
    wobble(
      [
        [50, 10],
        [56, 44],
        [90, 50],
        [56, 56],
        [50, 90],
        [44, 56],
        [10, 50],
        [44, 44],
        [50, 10],
      ],
      r,
      3,
    ),
    wobble(
      [
        [78, 14],
        [82, 26],
        [94, 30],
      ],
      r,
      3,
    ),
  ],
  squiggle: (r) => [
    wobble(
      [
        [4, 50],
        [18, 30],
        [32, 70],
        [48, 30],
        [64, 70],
        [80, 32],
        [96, 52],
      ],
      r,
      5,
    ),
  ],
  bolt: (r) => [
    wobble(
      [
        [60, 4],
        [26, 52],
        [50, 54],
        [38, 96],
        [76, 44],
        [52, 42],
        [60, 4],
      ],
      r,
      4,
    ),
  ],
  heart: (r) => [
    wobble(
      [
        [50, 92],
        [12, 56],
        [8, 26],
        [30, 12],
        [50, 32],
        [70, 10],
        [92, 26],
        [88, 56],
        [50, 92],
      ],
      r,
      5,
    ),
  ],
  code: (r) => [
    wobble(
      [
        [36, 16],
        [10, 50],
        [38, 84],
      ],
      r,
      5,
    ),
    wobble(
      [
        [64, 16],
        [90, 50],
        [62, 84],
      ],
      r,
      5,
    ),
  ],
  circle: (r) => {
    const from = -0.5 + r() * 0.2
    return [
      Array.from({ length: 18 }, (_, i) => {
        const a = (from + (i / 17) * 1.08) * Math.PI * 2
        return [50 + Math.cos(a) * (42 + (r() - 0.5) * 8), 50 + Math.sin(a) * (40 + (r() - 0.5) * 8)] as Point
      }),
    ]
  },
  smile: (r) => {
    const from = r() * 0.1
    return [
      Array.from({ length: 18 }, (_, i) => {
        const a = (from + (i / 17) * 1.05) * Math.PI * 2
        return [50 + Math.cos(a) * (44 + (r() - 0.5) * 6), 50 + Math.sin(a) * (44 + (r() - 0.5) * 6)] as Point
      }),
      wobble(
        [
          [36, 38],
          [35, 46],
        ],
        r,
        3,
      ),
      wobble(
        [
          [66, 36],
          [67, 47],
        ],
        r,
        3,
      ),
      wobble(
        [
          [32, 64],
          [50, 78],
          [70, 62],
        ],
        r,
        4,
      ),
    ]
  },
  tick: (r) => [
    wobble(
      [
        [10, 54],
        [38, 82],
        [92, 16],
      ],
      r,
      5,
    ),
  ],
  emphasis: (r) => [
    wobble(
      [
        [22, 8],
        [12, 92],
      ],
      r,
      5,
    ),
    wobble(
      [
        [52, 6],
        [44, 90],
      ],
      r,
      5,
    ),
    wobble(
      [
        [82, 10],
        [74, 88],
      ],
      r,
      5,
    ),
  ],
}

/**
 * One of the small marks — a cross, a spark, a bolt, a smiley.
 *
 * These are punctuation, not illustration. A few per section is the whole
 * budget; a page covered in them stops reading as annotation.
 */
export function Doodle({
  name,
  size = 22,
  seed = 2,
  weight = 2,
  tone = 'chalk',
  color,
  rotate = 0,
  show = 'all',
  draw = false,
  delay = 0,
  filled = false,
  className = '',
  style,
}: Common & { name: DoodleName; size?: number; filled?: boolean }) {
  const ink = inkOf({ tone, color })
  const strokes = DOODLES[name](rough(seed))

  return (
    <Mark
      viewBox="0 0 100 100"
      width={size}
      height={size}
      rotate={rotate}
      show={show}
      draw={draw}
      delay={delay}
      className={className}
      style={style}
    >
      {strokes.map((points, i) => {
        const d = smooth(points)
        if (filled && i === 0) {
          return <path key={i} d={`${d}Z`} fill={ink} stroke={ink} strokeWidth={weight} strokeLinejoin="round" />
        }
        return <Stroke key={i} d={d} ink={ink} weight={weight} delay={delay + i * 0.08} />
      })}
    </Mark>
  )
}

/* ─── Handwriting ─── */

/**
 * A scribbled aside, the kind left in a margin.
 *
 * Short only. Handwriting is for annotations — never for body copy, headings,
 * navigation, or anything a reader has to rely on.
 */
export function HandwrittenNote({
  children,
  tone = 'chalk',
  color,
  rotate = -3,
  size = '1.35rem',
  show = 'all',
  className = '',
  style,
}: Omit<Common, 'seed' | 'weight' | 'draw' | 'delay'> & {
  children: ReactNode
  size?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`font-hand pointer-events-none select-none inline-block leading-none ${VISIBILITY[show]} ${className}`.trim()}
      style={{
        color: color ?? TONES[tone],
        fontSize: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/**
 * A margin for annotations that costs nothing.
 *
 * An annotation dropped into the flow after a form or a list pushes whatever
 * follows it down, and the marker layer is not allowed to move the interface
 * it is drawn on. This is a zero-height slot: its children hang below it, into
 * padding that was already empty, and the page measures exactly as tall with
 * the marks as without them.
 */
export function MarkerAside({
  children,
  offset = '1rem',
  show = 'all',
  className = '',
}: {
  children: ReactNode
  /** How far below the previous element the note hangs. */
  offset?: string
  show?: MarkerVisibility
  className?: string
}) {
  return (
    <div aria-hidden="true" data-marker-aside="" className={`relative h-0 ${VISIBILITY[show]}`.trim()}>
      <div
        className={`pointer-events-none absolute left-0 flex items-start ${className}`.trim()}
        style={{ top: offset }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * A note with an arrow already attached, for pointing at a neighbouring
 * element. `flip` puts the arrow before the text instead of after.
 */
export function NoteWithArrow({
  children,
  curve = 'right',
  flip = false,
  arrowRotate = 0,
  arrowWidth = 52,
  arrowHeight = 34,
  gap = '0.4rem',
  tone = 'chalk',
  color,
  rotate = -3,
  size = '1.3rem',
  seed = 9,
  show = 'all',
  className = '',
  style,
}: Common & {
  children: ReactNode
  curve?: ArrowCurve
  flip?: boolean
  arrowRotate?: number
  arrowWidth?: number
  arrowHeight?: number
  gap?: string
  size?: string
}) {
  const arrow = (
    <DoodleArrow
      curve={curve}
      tone={tone}
      color={color}
      seed={seed}
      rotate={arrowRotate}
      width={arrowWidth}
      height={arrowHeight}
      className="shrink-0"
    />
  )

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-flex items-center ${VISIBILITY[show]} ${className}`.trim()}
      style={{ gap, ...style }}
    >
      {flip ? arrow : null}
      <HandwrittenNote tone={tone} color={color} rotate={rotate} size={size}>
        {children}
      </HandwrittenNote>
      {flip ? null : arrow}
    </span>
  )
}
