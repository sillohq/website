import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  id?: string
}

export function BorderedSection({ children, className = '', id }: Props) {
  return (
    <section id={id} className={`border-b border-border py-20 md:py-24 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeader({ title, subtitle }: { title: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-12">
      <h2 className="mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted text-lg leading-relaxed max-w-[55ch]">
          {subtitle}
        </p>
      )}
    </div>
  )
}