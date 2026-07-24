interface Props {
  size?: number
}

export function Logo({ size = 32 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="4" stroke="#FC0345" strokeWidth="2" fill="none" />
      <path d="M10 22V10h4l4 8 4-8h4v12" stroke="#FC0345" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 6v2M8 16h2M22 16h2" stroke="#FC0345" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function LogoWordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tighter text-xl">
      <Logo size={28} />
      Sillo
    </span>
  )
}
