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

/* ─── Navigation ─── */

export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3.5 3.5 8l8.5 4.5L20.5 8 12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3.5 12.5 12 17l8.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M3.5 16.5 12 21l8.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4.5h5a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H4v-13Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M20 4.5h-5a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H20v-13Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9.5 20.2c-4 1.2-4-2.1-5.5-2.5m11 4.3v-3.4c0-1 .1-1.4-.5-2 2.3-.25 4.5-1.15 4.5-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.25-2.9 1.1a10 10 0 0 0-5 0C7.9 5.6 7 5.85 7 5.85a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 5.8 11.3c0 3.8 2.2 4.7 4.5 5-.6.6-.6 1.2-.5 2V22"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5 10.1 12.8 4.5 10.9 10.1 9 12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M18.5 16.5 19.2 18.6l2.3.8-2.3.8-.7 2.1-.7-2.1-2.3-.8 2.3-.8.7-2.1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.45" />
    </svg>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15 9-1.7 4.3L9 15l1.7-4.3L15 9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

export function BoxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20.5 7.8v8.4a1.6 1.6 0 0 1-.85 1.4l-6.8 3.7a1.7 1.7 0 0 1-1.7 0l-6.8-3.7a1.6 1.6 0 0 1-.85-1.4V7.8a1.6 1.6 0 0 1 .85-1.4l6.8-3.7a1.7 1.7 0 0 1 1.7 0l6.8 3.7a1.6 1.6 0 0 1 .85 1.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m3.7 7.3 8.3 4.5 8.3-4.5M12 21v-9.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}

export function BrandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2.2-.9 2.2-2 0-.6-.2-1-.6-1.4-.4-.4-.6-.8-.6-1.3 0-1 .8-1.8 1.9-1.8h1.3a4.3 4.3 0 0 0 4.3-4.3c0-3.4-3.6-6.2-8.5-6.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="8" cy="11" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="8" r="1.2" fill="currentColor" opacity="0.45" />
      <circle cx="16" cy="10.5" r="1.2" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function GridIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" opacity="0.3" />
    </svg>
  )
}

export function WorkerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="17" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.5" y="13.5" width="17" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" opacity="0.5" />
      <path d="M7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 7.5h5M11 16.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function AlertIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4.2 21 19.5H3L12 4.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 10v3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 16.6h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m7.5 10 2.5 2.2-2.5 2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 14.5h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function OutboundIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M11 5H6.5A2.5 2.5 0 0 0 4 7.5v10A2.5 2.5 0 0 0 6.5 20h10a2.5 2.5 0 0 0 2.5-2.5V13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 4h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20 4-8.5 8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
