const AGENT_REPOSITORY = 'https://github.com/sillohq/agent'

const INSTALL_COMMAND = 'npx github:sillohq/agent install codex'

export function AgentSection() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 90% at 78% 45%, rgba(252,3,69,0.10), transparent 68%)' }}
      />
      <div className="relative mx-auto max-w-[980px] px-8 md:px-12">
        <div className="max-w-[620px]">
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
            </a>
            <span className="font-mono text-xs text-dimmed">Offline. No telemetry.</span>
          </div>
        </div>

        <div className="mt-12 border-y border-border py-8 md:mt-16 md:py-10">
          <div className="space-y-8">
            <div>
              <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-dimmed">01 / INSTALL FOR YOUR AGENT</p>
              <code className="block overflow-x-auto bg-bg py-3 font-mono text-sm text-text">
                <span className="mr-3 text-primary">$</span>{INSTALL_COMMAND}
              </code>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-dimmed">02 / ASK FOR WHAT YOU NEED</p>
              <code className="block overflow-x-auto bg-bg py-3 font-mono text-sm text-text">
                <span className="mr-3 text-primary">&gt;</span>add Sillo auth to my project
              </code>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Requires Node 20.12+. Restart your agent after installing. Use <code className="font-mono text-text">claude</code> or <code className="font-mono text-text">opencode</code> in the command above to set up another supported agent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
