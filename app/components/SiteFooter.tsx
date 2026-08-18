import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Doodle, HandwrittenNote, MarkerAside } from './marker'
import { DOCS_URL as DOCS, GITHUB_URL as GITHUB } from '../data/links'

/**
 * The site footer, on every page.
 *
 * It was written inline in the home page and is shared now because the About,
 * Foreman and Craftman pages ended without one. The Products column carries the
 * links that used to sit in the About menu: those pages describe work that is
 * planned rather than shipped, and a top-level menu entry reads like a shipped
 * feature.
 */
export function SiteFooter() {
  const [copiedFooterCommand, setCopiedFooterCommand] = useState(false)

  const copyFooterCommand = () => {
    void navigator.clipboard.writeText('uv add sillo-framework')
    setCopiedFooterCommand(true)
    window.setTimeout(() => setCopiedFooterCommand(false), 1600)
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_48%_70%_at_100%_55%,rgba(252,3,69,0.12),transparent_68%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(255,255,255,0.08),transparent_62%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[460px] w-[520px] opacity-[0.16]"
        style={{
          background: 'repeating-radial-gradient(ellipse at bottom left, transparent 0 18px, rgba(255,255,255,0.55) 19px, transparent 21px)',
          maskImage: 'linear-gradient(to top right, black, transparent 72%)',
        }}
      />

      <button
        type="button"
        onClick={copyFooterCommand}
        className="group relative block w-full border-b border-border px-8 py-20 text-left md:px-12 md:py-24"
        aria-label="Copy install command"
      >
        <div className="mx-auto max-w-[1520px]">
          <div className="font-mono text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.9] tracking-[-0.08em] text-white/10 transition-colors duration-300 group-hover:text-white/42">
            <span className="text-white/28 group-hover:text-white/80">$</span> uv add sillo-framework
          </div>
          <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-dimmed transition-colors group-hover:text-muted">
            {'{ '} {copiedFooterCommand ? 'Copied' : 'Click. Copy. Build'} {' }'}
            <Doodle
              name={copiedFooterCommand ? 'heart' : 'smile'}
              tone={copiedFooterCommand ? 'red' : 'muted'}
              seed={127}
              size={17}
              rotate={-7}
              show="tablet"
              /* -my-1 so a 17px mark cannot make a 10px row any taller. */
              className="-my-1 opacity-80"
            />
          </div>
        </div>
      </button>

      <div className="relative mx-auto grid max-w-[1520px] grid-cols-1 border-b border-border px-8 md:grid-cols-[36%_64%] md:px-12">
        <div className="border-b border-border py-16 md:border-b-0 md:border-r md:pr-16">
          <h3 className="mb-6 text-2xl font-semibold tracking-[-0.04em] text-text">Want to stay in touch?</h3>
          <p className="mb-9 max-w-[380px] font-mono text-sm leading-relaxed text-muted">
            Release notes and framework updates, sent when a version ships.
          </p>
          <form className="flex max-w-[420px] overflow-hidden rounded-full border border-border-strong bg-white/10 p-1">
            <input
              type="email"
              placeholder="ENTER YOUR E-MAIL"
              className="min-w-0 flex-1 bg-transparent px-5 font-mono text-xs text-text outline-none placeholder:text-dimmed"
            />
            <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02]">
              Subscribe
            </button>
          </form>
          <MarkerAside offset="1.1rem" className="items-center gap-2">
            <Doodle name="tick" tone="red" seed={113} size={18} rotate={-6} className="opacity-80" />
            <HandwrittenNote rotate={-2} size="1.25rem" className="opacity-75">
              no spam. ever.
            </HandwrittenNote>
          </MarkerAside>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-3 lg:grid-cols-5 md:pl-16">
          {[
            { title: 'Products', links: [
              { label: 'Sillo', href: '/', internal: true },
              { label: 'Craftman', href: '/craftman', internal: true },
              { label: 'Foreman', href: '/foreman', internal: true },
              { label: 'Roadmap', href: '/about#ships', internal: true },
            ]},
            { title: 'Resources', links: [
              { label: 'Documentation', href: DOCS },
              { label: 'Guides', href: `${DOCS}/guides/introduction/` },
              { label: 'Examples', href: `${DOCS}/community/` },
              { label: 'API reference', href: `${DOCS}/reference/plugin-api/` },
            ]},
            { title: 'Tools', links: [
              { label: 'Admin panel', href: `${DOCS}/guides/start/admin/` },
              { label: 'Console', href: `${DOCS}/guides/start/console/` },
              { label: 'Test clients', href: `${DOCS}/guides/start/testing/` },
              { label: 'OpenAPI', href: `${DOCS}/guides/openapi/` },
            ]},
            { title: 'Project', links: [
              { label: 'GitHub', href: GITHUB },
              { label: 'Issues', href: `${GITHUB}/issues` },
              { label: 'Discussions', href: `${GITHUB}/discussions` },
              { label: 'Releases', href: `${GITHUB}/releases` },
            ]},
            { title: 'About', links: [
              { label: 'Installation', href: `${DOCS}/guides/installation/` },
              { label: 'Contributing', href: `${DOCS}/community/contribution-guide/` },
              { label: 'About', href: '/about', internal: true },
              { label: 'License', href: `${GITHUB}/blob/main/LICENSE` },
            ]},
          ].map(group => (
            <div key={group.title}>
              <h5 className="mb-8 font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">{group.title}</h5>
              <ul className="flex flex-col gap-5">
                {group.links.map(link => (
                  <li key={link.label}>
                    {'internal' in link && link.internal ? (
                      <Link to={link.href} className="text-sm font-semibold text-text/90 transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm font-semibold text-text/90 transition-colors hover:text-primary">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1520px] flex-col gap-4 px-8 py-8 font-mono text-[10px] uppercase tracking-[0.08em] text-dimmed md:flex-row md:items-center md:justify-between md:px-12">
        <div>Released under the BSD 3-Clause License / Copyright &copy; {new Date().getFullYear()} Sillo</div>
        <div className="flex gap-5">
          <a href={DOCS} className="hover:text-text transition-colors">Docs</a>
          <a href={`${GITHUB}/releases`} className="hover:text-text transition-colors">Releases</a>
          <a href={GITHUB} className="hover:text-text transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
