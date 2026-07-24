import { useEffect, useRef, useState } from 'react'
import type { HighlighterGeneric } from 'shiki'

let highlighter: HighlighterGeneric<any, any> | null = null
let loading: Promise<void> | null = null

async function getHl() {
  if (highlighter) return
  if (loading) return loading
  loading = (async () => {
    const { createHighlighter } = await import('shiki')
    highlighter = await createHighlighter({
      langs: ['python'],
      themes: ['github-dark'],
    })
  })()
  return loading
}

interface Props {
  code: string
  lang?: string
  className?: string
}

export default function CodeInner({ code, lang = 'python', className = '' }: Props) {
  const ref = useRef<HTMLPreElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    getHl().then(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready || !ref.current || !highlighter) return
    ref.current.innerHTML = highlighter.codeToHtml(code.trim(), { lang, theme: 'github-dark' })
  }, [ready, code, lang])

  return (
    <pre
      ref={ref}
      className={`bg-near-black text-xs leading-relaxed overflow-x-auto rounded-sm [&_.shiki]:p-5 [&_.shiki]:!bg-transparent [&_.shiki]:overflow-x-auto ${className}`}
    />
  )
}
