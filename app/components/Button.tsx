import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  children: ReactNode
}

const base = 'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border cursor-pointer transition-all duration-150 leading-none rounded-xs font-sans'

const variants = {
  primary: 'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark',
  ghost: 'bg-transparent border-transparent text-text hover:bg-soft-pink',
  outline: 'bg-transparent border-border text-text hover:border-primary hover:text-primary',
}

export function Button({ variant = 'ghost', href, children, className = '', ...props }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} {...(props as any)}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...(props as any)}>
      {children}
    </button>
  )
}