import { lazy, Suspense } from 'react'

const CodeInner = lazy(() => import('./CodeInner'))

interface Props {
  code: string
  lang?: string
  className?: string
}

export function CodeDemo({ code, lang = 'python', className = '' }: Props) {
  return (
    <Suspense fallback={
      <pre className={`bg-near-black text-gray-300 p-5 text-xs leading-relaxed overflow-x-auto rounded-sm ${className}`}>
        <code>{code.trim()}</code>
      </pre>
    }>
      <CodeInner code={code} lang={lang} className={className} />
    </Suspense>
  )
}
