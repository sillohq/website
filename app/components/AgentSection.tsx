const AGENT_REPOSITORY = 'https://github.com/sillohq/agent'

const INSTALL_COMMAND = 'npx github:sillohq/agent install codex'

export function AgentSection() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 90% at 78% 45%, rgba(252,3,69,0.10), transparent 68%)' }}
      />
      <div className="relative mx-auto grid max-w-[1520px] grid-cols-1 gap-12 px-8 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div className="mb-4 font-mono text-[11px] tracking-[0.15em] text-primary">BUILD WITH AI</div>
          <h2 className="mb-5 max-w-[520px] text-text">
            Your AI agent should know your framework.
          </h2>
          <p className="max-w-[500px] text-base leading-relaxed text-muted">
            Sillo Agent gives Codex, Claude Code, and OpenCode version-aware Sillo skills. It helps your agent use the APIs you actually have—not invented patterns or outdated handlers.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={AGENT_REPOSITORY}
              className="inline-flex items-center gap-2 font-medium text-text transition-colors hover:text-primary"
            >
              Explore Sillo Agent
              <span aria-hidden="true">↗</span>
            </a>
            <span className="font-mono text-xs text-dimmed">Works offline. No telemetry.</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-6">
            <span className="font-mono text-xs text-muted">terminal</span>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dimmed">Node 20.12+</span>
          </div>
          <div className="space-y-7 p-5 md:p-7">
            <div>
              <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-dimmed">01 / INSTALL FOR YOUR AGENT</p>
              <code className="block overflow-x-auto rounded-md border border-border bg-bg px-4 py-3 font-mono text-sm text-text">
                <span className="mr-3 text-primary">$</span>{INSTALL_COMMAND}
              </code>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-dimmed">02 / ASK FOR WHAT YOU NEED</p>
              <code className="block overflow-x-auto rounded-md border border-border bg-bg px-4 py-3 font-mono text-sm text-text">
                <span className="mr-3 text-primary">&gt;</span>add Sillo auth to my project
              </code>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Restart your agent after installing. Use <code className="font-mono text-text">claude</code> or <code className="font-mono text-text">opencode</code> in the command above to set up another supported agent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
