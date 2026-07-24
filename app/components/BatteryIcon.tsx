interface Props {
  name: string
}

const ICONS: Record<string, string> = {
  routing: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h14M10 3v14M6 14l4-4-4-4M14 6l-4 4 4 4"/></svg>',
  auth: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="12" height="10" rx="1"/><path d="M7 8V5a3 3 0 016 0v3"/><circle cx="10" cy="13" r="1.5"/></svg>',
  orm: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h14M3 10h14M3 15h14"/><path d="M7 3v2M13 3v2M7 13v2M13 13v2M10 8v2"/></svg>',
  queues: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="3" rx=".5"/><rect x="3" y="9" width="14" height="3" rx=".5"/><rect x="3" y="14" width="10" height="3" rx=".5"/></svg>',
  cache: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14l3 3 4-5"/><path d="M4 10l3 3 4-5"/><circle cx="14" cy="6" r="3"/><path d="M14 4v4M12 6h4"/></svg>',
  mail: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="16" height="12" rx="1"/><path d="M2 4l8 6 8-6"/></svg>',
  validation: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3l2 2-8 8-4-4 2-2 2 2z"/><path d="M7 14l-4 4M13 14l4 4"/></svg>',
  scheduler: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/></svg>',
  events: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="10" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="14" cy="14" r="2"/><path d="M8 9l4-2M8 11l4 2"/></svg>',
  websockets: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0-4 3-8 6-8s6 4 6 8"/><path d="M4 6c0-4 3-8 6-8s6 4 6 8"/><circle cx="10" cy="14" r="2"/></svg>',
  storage: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M7 8h6M7 12h4"/></svg>',
  security: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2l6 3v5c0 4-3 7-6 8-3-1-6-4-6-8V5z"/><path d="M8 10l1.5 1.5L12 9"/></svg>',
}

export function BatteryIcon({ name }: Props) {
  const svg = ICONS[name] || ICONS.routing
  return (
    <div className="w-10 h-10 flex items-center justify-center border border-border rounded-xs text-muted" dangerouslySetInnerHTML={{ __html: svg }} />
  )
}