import { type ReactNode, useCallback, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import './ScrollStack.css'

type ScrollStackProps = {
  children: ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
}

type ScrollStackItemProps = {
  children: ReactNode
  itemClassName?: string
}

type TransformCache = {
  translateY: number
  scale: number
  rotation: number
  blur: number
}

type Layout = {
  cardTops: number[]
  endTop: number
  containerHeight: number
}

/**
 * Distance from the top of the document to an element, by layout.
 *
 * Walks the offsetParent chain rather than reading getBoundingClientRect,
 * because offsetTop is a layout value and a CSS transform does not affect it.
 * That matters here: these cards are moved with translate3d, so a rect-based
 * measurement would report the position the card has been animated *to* and
 * the animation would feed on its own output.
 */
function layoutTop(element: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = element

  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }

  return top
}

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(new Map<number, TransformCache>())
  const layoutRef = useRef<Layout | null>(null)

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const getScrollTop = useCallback(() => {
    if (useWindowScroll) return window.scrollY
    return scrollerRef.current?.scrollTop ?? 0
  }, [useWindowScroll])

  /**
   * Read every position the scroll handler needs, in one batch.
   *
   * Called on mount, on resize, and when the content itself reflows — never
   * while scrolling. Everything the handler does afterwards is arithmetic and
   * style writes, so a scrolling frame forces no layout at all.
   */
  const measure = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = cardsRef.current
    const origin = useWindowScroll ? 0 : layoutTop(scroller)
    const endElement = scroller.querySelector<HTMLElement>('.scroll-stack-end')

    layoutRef.current = {
      cardTops: cards.map((card) => layoutTop(card) - origin),
      endTop: endElement ? layoutTop(endElement) - origin : 0,
      containerHeight: useWindowScroll ? window.innerHeight : scroller.clientHeight,
    }
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current
    const layout = layoutRef.current
    if (!cards.length || !layout) return

    const { cardTops, endTop, containerHeight } = layout
    const scrollTop = getScrollTop()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)
    const pinEnd = endTop - containerHeight / 2

    // One pass for the topmost stacked card, instead of rescanning every card
    // for every card. The trigger points only depend on cached layout.
    let topCardIndex = 0
    if (blurAmount) {
      for (let j = 0; j < cards.length; j += 1) {
        const jTriggerStart = cardTops[j] - stackPositionPx - itemStackDistance * j
        if (scrollTop >= jTriggerStart) topCardIndex = j
      }
    }

    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i]
      const cardTop = cardTops[i]
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = triggerStart

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0
      const blur = blurAmount && i < topCardIndex ? Math.max(0, (topCardIndex - i) * blurAmount) : 0

      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : ''
        lastTransformsRef.current.set(i, newTransform)
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    }
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollTop,
  ])

  const handleResize = useCallback(() => {
    measure()
    updateCardTransforms()
  }, [measure, updateCardTransforms])

  const setupLenis = useCallback(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const options = {
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    }

    const scroller = scrollerRef.current
    const lenis = useWindowScroll
      ? new Lenis(options)
      : scroller
        ? new Lenis({
            ...options,
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
          })
        : null

    if (!lenis) return
    lenis.on('scroll', updateCardTransforms)

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)
    lenisRef.current = lenis
  }, [updateCardTransforms, useWindowScroll])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    const transformsCache = lastTransformsRef.current

    cardsRef.current = cards
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.transition = `box-shadow ${scaleDuration}s ease, border-color ${scaleDuration}s ease`
      card.style.willChange = blurAmount ? 'transform, filter' : 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.perspective = '1000px'
    })

    measure()
    setupLenis()
    updateCardTransforms()

    window.addEventListener('resize', handleResize)

    // Code blocks and webfonts settle after the first paint, which moves every
    // card below them. Without re-measuring, the cached positions describe a
    // layout that no longer exists and the stack pins in the wrong place.
    const observer = new ResizeObserver(handleResize)
    observer.observe(scroller)

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      observer.disconnect()
      lenisRef.current?.destroy()
      window.removeEventListener('resize', handleResize)
      stackCompletedRef.current = false
      cardsRef.current = []
      layoutRef.current = null
      transformsCache.clear()
    }
  }, [
    itemDistance,
    scaleDuration,
    blurAmount,
    measure,
    setupLenis,
    updateCardTransforms,
    handleResize,
  ])

  return (
    <div className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-window' : ''} ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}
