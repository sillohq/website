import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function RouteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 6h5.5c2.2 0 4 1.8 4 4v0c0 2.2-1.8 4-4 4H8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 10 4 6l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 22l4-4-4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 18h-5.5c-2.2 0-4-1.8-4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function AuthIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-5A2.5 2.5 0 0 1 6.5 10Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 14v2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 4.8c.8-.5 1.8-.8 3-.8s2.2.3 3 .8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function QueueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 7h7.5A3.5 3.5 0 0 1 16 10.5v0A3.5 3.5 0 0 1 12.5 14H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 4 5 7l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 17h-7.5A3.5 3.5 0 0 1 8 13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m16 14 3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 10.5h.01M12 17h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function ValidationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 3.5h8l4 4v13H6v-17Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m8.5 14.2 2 2 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 8.5H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function DependencyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 5v5M12 14v5M7 12H4M20 12h-3M8.5 8.5 6.4 6.4M17.6 17.6l-2.1-2.1M15.5 8.5l2.1-2.1M6.4 17.6l2.1-2.1" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="4" r="1.6" fill="currentColor" />
      <circle cx="20" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="20" r="1.6" fill="currentColor" />
      <circle cx="4" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function OrmIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 5.5v6c0 1.5 2.9 2.7 6.5 2.7s6.5-1.2 6.5-2.7v-6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 11.5v6c0 1.5 2.9 2.7 6.5 2.7s6.5-1.2 6.5-2.7v-6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 12.8c.9.4 2.1.6 3.5.6s2.6-.2 3.5-.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function ScheduleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 3v3M17 3v3M4.5 8.5h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 12v3l2.2 1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CacheIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 8.5h12M6 15.5h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 12h5M9.5 18h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5.5 6.5h13A2.5 2.5 0 0 1 21 9v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16V9a2.5 2.5 0 0 1 2.5-2.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.5 8 7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m7 16 2.2-2M17 16l-2.2-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function RealtimeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 15.5A7.5 7.5 0 0 1 12 5a7.5 7.5 0 0 1 7 10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 13.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 4 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.5" />
      <path d="M10.5 16.5 12 13l1.5 3.5 3.5 1.5-3.5 1.5L12 23l-1.5-3.5L7 18l3.5-1.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

export function ObservabilityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3.5 12s3-5.5 8.5-5.5S20.5 12 20.5 12s-3 5.5-8.5 5.5S3.5 12 3.5 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M17.5 4.5 19 3M5 21l1.5-1.5M6.5 4.5 5 3M19 21l-1.5-1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}
