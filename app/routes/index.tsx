import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  AuthIcon,
  CacheIcon,
  DependencyIcon,
  OrmIcon,
  QueueIcon,
  RouteIcon,
  ScheduleIcon,
  ValidationIcon,
} from '../components/code-icons'
import { SiteNav } from '../components/SiteNav'
import Plasma from '../components/Plasma'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'

import { DOCS_URL as DOCS, GITHUB_URL as GITHUB } from '../data/links'

export const Route = createFileRoute('/')({
  component: HomePage,
})

/* ─── Code examples ─── */

const CODE_EXAMPLES: Record<string, string> = {
  routing: `from sillo import silloApp
from sillo.core.http import Request, Response

app = silloApp(title="Projects API")


@app.get("/projects/{project_id:int}")
async def show_project(
    req: Request,
    res: Response,
    project_id: int,
) -> Response:
    return res.json({
        "id": project_id,
        "name": "Sillo Marketing",
        "status": "active",
    })`,

  auth: `from sillo import silloApp
from sillo.auth import JWTAuthBackend, create_jwt
from sillo.auth.middleware import AuthenticationMiddleware
from app.users import User

app = silloApp()
jwt_backend = JWTAuthBackend()

app.add_middleware(
    AuthenticationMiddleware(user_model=User, backend=jwt_backend)
)


@app.post("/login")
async def login(req, res):
    form = await req.form

    if form.get("username") == "admin":
        token = create_jwt({"sub": "123"})
        return res.json({"token": token})

    return res.html("Invalid credentials", status_code=401)`,

  queue: `from sillo.work.queue.job import Job
from app.mail import Mail
from app.models import User


class SendWelcomeEmail(Job):
    queue = "emails"
    tries = 3
    timeout = 30

    def __init__(self, user_id: str):
        self.user_id = user_id

    async def handle(self):
        user = await User.get(self.user_id)
        await Mail.to(user.email).send("welcome")


SendWelcomeEmail.dispatch_after(300, "user-42")`,

  validation: `from pydantic import BaseModel, EmailStr
from sillo import silloApp
from sillo.core.http import Request, Response

app = silloApp()


class Signup(BaseModel):
    username: str
    email: EmailStr


@app.post("/signup", request_model=Signup)
async def signup(
    req: Request,
    res: Response,
    data: Signup,
) -> Response:
    return res.json({"user": data.model_dump()}, status_code=201)`,

  dependency: `from sillo import Depend, silloApp
from sillo.core.http import Request, Response

app = silloApp()


async def get_database():
    return Database("postgres://localhost/app")


async def get_current_user(req: Request = Depend(get_request=True)):
    token = req.headers.get("Authorization")
    return await User.from_token(token)


@app.get("/projects")
async def list_projects(
    req: Request,
    res: Response,
    db=Depend(get_database),
    user=Depend(get_current_user),
) -> Response:
    projects = await db.projects.for_user(user.id)
    return res.json({"projects": projects})`,

  orm: `from sillo import silloApp
from sillo.record import DatabaseConfig, Model, setup_record
from tortoise import fields

app = silloApp(title="Projects API")
setup_record(app, DatabaseConfig.sqlite("app.db"), model_modules=[__name__])


class Project(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=120)
    is_active = fields.BooleanField(default=True)


@app.get("/projects/{project_id:int}")
async def show_project(req, res, project_id: int):
    project = await Project.get(id=project_id)
    return res.json({"project": project.to_dict()})`,
}

const CODE_TABS = [
  { id: 'routing', label: 'Routing', file: 'routes.py', kicker: 'Path params', icon: RouteIcon },
  { id: 'auth', label: 'Authentication', file: 'auth.py', kicker: 'JWT guard', icon: AuthIcon },
  { id: 'queue', label: 'Queue', file: 'jobs.py', kicker: 'Async work', icon: QueueIcon },
  { id: 'validation', label: 'Validation', file: 'schemas.py', kicker: 'Request model', icon: ValidationIcon },
  { id: 'dependency', label: 'Dependency Injection', file: 'dependencies.py', kicker: 'Explicit request', icon: DependencyIcon },
  { id: 'orm', label: 'ORM', file: 'models.py', kicker: 'Record layer', icon: OrmIcon },
]

/* ─── Syntax highlight tokens ─── */

const KEYWORDS = 'class|def|return|await|async|if|else|for|in|not|and|or|import|from|as|True|False|None|self|pass|with|try|except|finally|raise|yield|lambda'

const RE_SHIKI = new RegExp([
  '(\\x00kw(\\w+)\\x00)',
  '("(?:[^"\\\\]|\\\\.)*")',
  "('(?:[^'\\\\]|\\\\.)*')",
  '(#.*$)',
  `(\\b(?:${KEYWORDS})\\b)`,
  '(@\\w+(?:\\.\\w+)*)',
  '(\\b\\d+\\.?\\d*\\b)',
  '(\\b[A-Z]\\w*(?=\\())',
].join('|'), 'g')

const RE_IMPORT = /\b(from|import|as)\b/g

const shiki = (code: string) => {
  const lines = code.split('\n')
  return lines.map(line => {
    line = line.replace(RE_IMPORT, m => `\x00kw${m}\x00`)
    const parts: { text: string; color?: string }[] = []
    let last = 0
    let m: RegExpExecArray | null
    while ((m = RE_SHIKI.exec(line)) !== null) {
      if (m.index > last) {
        parts.push({ text: line.slice(last, m.index) })
      }
      const full = m[0]
      if (m[1]) {
        parts.push({ text: m[2], color: '#fc0345' })
      } else if (m[2] || m[3]) {
        parts.push({ text: full, color: '#f5a97f' })
      } else if (m[4]) {
        parts.push({ text: full, color: '#6a9955' })
      } else if (m[5]) {
        parts.push({ text: full, color: '#fc0345' })
      } else if (m[6]) {
        parts.push({ text: full, color: '#7fb4f0' })
      } else if (m[7]) {
        parts.push({ text: full, color: '#c0a0e8' })
      } else if (m[8]) {
        parts.push({ text: full, color: '#7fb4f0' })
      } else {
        parts.push({ text: full })
      }
      last = RE_SHIKI.lastIndex
    }
    if (last < line.length) {
      parts.push({ text: line.slice(last) })
    }
    return parts
  })
}

/* ─── Pygments inline style ─── */

function CodeLine({ parts, num }: { parts: { text: string; color?: string }[]; num: number }) {
  return (
    <div className="code-line flex font-mono" style={{ animationDelay: `${0.03 + num * 0.04}s` }}>
      <span className="text-dimmed text-right w-8 mr-5 select-none shrink-0 text-[13px] leading-[1.9]">{num + 1}</span>
      <span className="leading-[1.9] text-[15px] whitespace-pre">
        {parts.map((p, i) =>
          p.color ? (
            <span key={i} style={{ color: p.color }}>{p.text}</span>
          ) : (
            <span key={i} className="text-[#e0e0e0]">{p.text}</span>
          )
        )}
      </span>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  const lines = shiki(code)
  return (
    <div className="p-6 md:p-8">
      {lines.map((parts, i) => (
        <CodeLine key={i} parts={parts} num={i} />
      ))}
    </div>
  )
}

/* ─── Page ─── */

function HomePage() {
  return (
    <main className="bg-bg min-h-screen">
      <SiteNav />
      <Hero />
      <CapabilityStrip />
      <OneFramework />
      <SilloMagicSection />
      <ArchitectureSection />
      <EnterpriseSection />
      <FinalCta />
      <FooterSection />
    </main>
  )
}

/* ─── Hero ─── */

const CAPABILITIES = [
  { name: 'Typed path parameters into handler arguments', icon: RouteIcon },
  { name: 'Dependencies resolved in the signature', icon: DependencyIcon },
  { name: 'Pydantic validation at the route boundary', icon: ValidationIcon },
  { name: 'One auth= declaration gates and documents', icon: AuthIcon },
  { name: 'Queues and scheduler in the app lifecycle', icon: QueueIcon },
  { name: 'Record models and migrations', icon: OrmIcon },
]

function Hero() {
  const [activeTab, setActiveTab] = useState('routing')

  return (
    <section className="border-b  border-border min-h-[calc(100dvh-72px)] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-70 mix-blend-screen">
        <Plasma
          color="#fc0345"
          speed={0.45}
          direction="forward"
          scale={1.35}
          opacity={0.28}
          mouseInteractive={true}
          renderScale={0.45}
          maxDpr={1.25}
          targetFps={30}
          iterations={42}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(90deg, rgb(5,5,5) 0%, rgba(5,5,5,0.88) 32%, rgba(5,5,5,0.46) 62%, rgb(5,5,5) 100%),
            linear-gradient(to bottom, rgba(5,5,5,0.35), rgb(5,5,5) 100%)
          `,
        }}
      />
      {/* Red glow behind code */}
      <div className="absolute top-0 right-0 w-3/5 h-full pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 70% 20%, rgba(252,3,69,0.08), transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 40%, rgba(252,3,69,0.04), transparent 50%),
            radial-gradient(ellipse 30% 50% at 60% 60%, rgba(252,3,69,0.03), transparent 60%)
          `,
        }}
      />

      <div className="flex-1 relative z-10">
        <div className="max-w-[1520px] mx-auto">
          {/* Left column */}
          <div className="w-[42%] max-w-[638px] flex flex-col justify-start pl-8 md:pl-12 pr-8 md:pr-12 lg:pr-16"
            style={{ paddingTop: 'calc(20dvh)' }}>
            {/* Eyebrow */}
            <div className="font-mono text-[11px] text-muted tracking-[0.15em] mb-5 flex items-center gap-1.5">
              <span className="text-dimmed">&lt;</span>
              <span>ONE PRODUCT LANGUAGE</span>
              <span className="text-dimmed">&gt;</span>
              <span className="text-primary">_</span>
              <span className="w-[2px] h-3.5 bg-primary cursor-blink" />
            </div>

            {/* Headline */}
            <h2 className="text-text text-3xl md:text-4xl mb-7 max-w-[520px] font-medium leading-tight tracking-tight">
              Batteries included.<br />
              One design.
            </h2>

            {/* Subhead */}
            <p className="text-muted text-base leading-relaxed mb-8 max-w-[460px]">
              The ORM, auth, background work and websockets ship as one framework and
              share one config model. Declare auth once — it gates the route and writes
              the OpenAPI spec.
            </p>

            {/* CTA */}
            <div className="mb-9">
              <a href={DOCS} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-bg transition-all leading-none hover:scale-[1.03] hover:shadow-[0_16px_46px_rgba(255,255,255,0.16)]">
                Read the docs
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l4 4-4 4"/></svg>
              </a>
            </div>

            {/* 01 / FOUNDATION */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-dimmed">
              <span className="text-primary">01</span>
              <span className="w-px h-3 bg-border" />
              <span>FOUNDATION</span>
            </div>
          </div>
        </div>
      </div>

     

      {/* Code panel — absolutely positioned, extends beyond right viewport */}
      <div
        className="absolute right-0 bottom-0 z-20 overflow-visible hidden lg:block"
        style={{ left: 'calc(42% + 3rem)', top: '17%' }}
      >
        {/* Fade: right edge → bottom edge → corner blend */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, transparent 35%, rgba(5,5,5,0.35) 60%, rgba(5,5,5,0.85) 82%, rgb(5,5,5) 100%),
              linear-gradient(to top, rgb(5,5,5) 0%, rgba(5,5,5,0.7) 25%, rgba(5,5,5,0.3) 45%, transparent 70%, transparent 100%)
            `,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[350px] h-[280px] z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at bottom right, rgb(5,5,5) 0%, rgba(5,5,5,0.5) 50%, transparent 75%)',
          }}
        />

        {/* Code panel body — oversized, cropped by viewport */}
        <div
          className="relative h-full"
          style={{ width: 'clamp(600px, 62vw, 1200px)' }}
        >
          {/* Layer 1 */}
          <div
            className="border border-border/40 p-[6px] h-full"
            style={{ borderRadius: '28px 0 0 0', borderRight: 'none', borderBottom: 'none' }}
          >
            {/* Layer 2 */}
            <div
              className="border border-border/30 p-[5px] h-full"
              style={{ borderRadius: '24px 0 0 0', borderRight: 'none', borderBottom: 'none' }}
            >
              {/* Layer 3 */}
              <div
                className="border border-border/20 p-[12px] h-full"
                style={{ borderRadius: '20px 0 0 0', borderRight: 'none', borderBottom: 'none' }}
              >
                {/* Code surface */}
                <div
                  className="bg-surface border border-border overflow-hidden h-full"
                  style={{ borderRadius: '14px 0 0 0', borderRight: 'none', borderBottom: 'none' }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-6 overflow-x-auto">
                      {CODE_TABS.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          type="button"
                          className={`text-sm font-mono transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                            activeTab === tab.id
                              ? 'text-text'
                              : 'text-dimmed hover:text-muted'
                          }`}
                        >
                          {tab.label}
                          {activeTab === tab.id && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-dimmed font-mono hidden md:block">
                      {CODE_TABS.find(t => t.id === activeTab)?.file}
                    </div>
                  </div>

                  {/* Code content */}
                  <div key={activeTab} className="transition-tab" style={{ animation: 'none' }}>
                    <CodeBlock code={CODE_EXAMPLES[activeTab]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Capability Strip ─── */

function CapabilityStrip() {
  return (
    <section className="relative border-b border-border py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-1/2 top-0 h-full w-[70%] -translate-x-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(252,3,69,0.045), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-2xl border border-border-strong bg-bg/92 shadow-[0_28px_100px_rgba(0,0,0,0.42)]">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.name}
              className={`group relative min-h-[260px] md:min-h-[320px] border-border p-10 md:p-16 transition-colors duration-300 hover:bg-surface/45 ${
                i % 3 !== 2 ? 'md:border-r' : ''
              } ${i < 3 ? 'border-b' : ''}`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_20%,rgba(252,3,69,0.09),transparent_34%)]" />
              <div className="relative flex h-full flex-col items-start justify-center gap-9">
                <cap.icon className="h-8 w-8 text-white" />
                <p className="max-w-[280px] text-xl md:text-[22px] font-semibold leading-[1.35] tracking-[-0.04em] text-text">
                  {cap.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── One Framework Section ─── */

const CAPABILITY_DETAILS: Record<string, { title: string; desc: string; code: string }> = {
  Authentication: {
    title: 'Authentication',
    desc: 'Session-based auth for web apps, token auth for APIs. Login, logout, password reset, role-based guards, and current-user resolution through a consistent interface.',
    code: `from sillo.auth import auth
from sillo.http import Request


@app.post("/auth/login")
async def login(
    request: Request,
    email: str,
    password: str,
):
    user = await auth.attempt(email, password)
    await auth.login(user)

    return {"token": user.to_token()}


@app.get("/dashboard")
@auth.require("admin")
async def dashboard(request: Request):
    return {
        "user": request.user.email,
        "role": request.user.role,
    }`,
  },
  Queue: {
    title: 'Queue',
    desc: 'Background job dispatch with retry, backoff, and worker processes. Queue anything from email notifications to video processing.',
    code: `from sillo.work import job
from sillo.mail import Mail


@job(queue="mail", max_retries=3)
async def send_invoice_email(
    user_id: int,
    invoice_id: int,
):
    user = await User.find_or_fail(user_id)
    invoice = await Invoice.find_or_fail(invoice_id)

    await Mail("invoice", {
        "user": user,
        "invoice": invoice,
    }).send_to(user.email)`,
  },
  'Record ORM': {
    title: 'Record ORM',
    desc: 'Async active-record ORM with typed fields, relationships, query builder, and migration support.',
    code: `from sillo.record import Record
from sillo.record.fields import (
    String, Integer, BelongsTo, HasMany
)


class Team(Record):
    name = String()
    slug = String(unique=True)

    members = HasMany("Member")


class Member(Record):
    name = String()
    role = String(default="member")
    team = BelongsTo("Team")


# Usage
team = await Team.query() \\
    .where(slug="acme") \\
    .first_or_fail()

members = await team.members \\
    .where(role="admin") \\
    .order_by("name") \\
    .all()`,
  },
  Mail: {
    title: 'Mail',
    desc: 'Class-based transactional email with template rendering, queue integration, and multiple driver support.',
    code: `from sillo.mail import Mail


class WelcomeMail(Mail):
    subject = "Welcome to Sillo"

    async def build(self):
        return self.view(
            "mail/welcome",
            user=self.user,
        )


class InvoiceMail(Mail):
    subject = "Your invoice"

    async def build(self):
        return self.view(
            "mail/invoice",
            invoice=self.invoice,
        ).attach_pdf(
            f"invoice-{self.invoice.id}.pdf"
        )`,
  },
  'Rate limiting': {
    title: 'Rate Limiting',
    desc: 'Named limiters with per-route, per-user, or per-IP policies. Redis and in-memory backends.',
    code: `from sillo.security import limiter


api = limiter.namespace("api")


@api.limit("100/minute")
@app.get("/api/projects")
async def list_projects(request):
    return await Project.all()


@api.limit("20/minute")
@app.post("/api/projects")
async def create_project(request):
    data = await request.validate(CreateProject)
    project = await Project.create(**data)
    return project`,
  },
  Routing: {
    title: 'Routing',
    desc: 'Typed route parameters, dependency injection, middleware pipelines, and automatic request parsing.',
    code: `from sillo.http import Request, Response
from sillo.routing import get, post


@get("/projects/{project_id:int}")
async def show_project(
    request: Request,
    project_id: int,
    db: Database = Depends(get_db),
):
    project = await db.projects.find(project_id)

    if not project:
        return Response.not_found()

    return {
        "project": project.to_dict(),
        "viewer": request.user.to_dict(),
    }


@post("/projects")
async def create_project(
    request: Request,
    db: Database = Depends(get_db),
):
    data = await request.json()
    project = await db.projects.create(**data)
    return Response.created(project)`,
  },
  Caching: {
    title: 'Caching',
    desc: 'Pluggable cache backends with TTL, tags, versioning, and remember helper.',
    code: `from sillo.cache import cache


@app.get("/stats")
async def dashboard_stats(request):
    stats = await cache.remember(
        key=f"dashboard:stats",
        ttl=300,  # 5 minutes
        loader=lambda: compute_stats(),
    )

    return {"stats": stats}


@app.post("/refresh")
async def refresh_cache(request):
    await cache.forget("dashboard:stats")
    return {"ok": True}`,
  },
  Scheduling: {
    title: 'Scheduling',
    desc: 'Cron-based recurring tasks managed within the framework. Schedule maintenance, reports, and periodic jobs.',
    code: `from sillo.schedule import cron, every


@cron("0 3 * * *")  # Daily at 3am
async def cleanup_expired_sessions():
    await Session.query() \\
        .where("expires_at <", now()) \\
        .delete()


@every(hours=1)
async def sync_external_data():
    data = await fetch_updates()
    await Record.bulk_upsert(data)`,
  },
}

const CAPABILITY_KEYS = [
  'Authentication', 'Queue', 'Record ORM', 'Mail',
  'Rate limiting', 'Routing', 'Caching', 'Scheduling',
]

const CAPABILITY_DETAILS_V2: Record<string, { title: string; desc: string; file: string; icon: typeof RouteIcon; code: string }> = {
  Routing: {
    title: 'Routing',
    desc: 'Path parameters are converted and passed directly into handler signatures.',
    file: 'routes.py',
    icon: RouteIcon,
    code: CODE_EXAMPLES.routing,
  },
  Authentication: {
    title: 'Authentication',
    desc: 'JWT and session authentication via middleware, user models, and route guards.',
    file: 'auth.py',
    icon: AuthIcon,
    code: CODE_EXAMPLES.auth,
  },
  Validation: {
    title: 'Validation',
    desc: 'Use request_model to validate payloads and inject the Pydantic model into handlers.',
    file: 'schemas.py',
    icon: ValidationIcon,
    code: CODE_EXAMPLES.validation,
  },
  'Dependency Injection': {
    title: 'Dependency Injection',
    desc: 'Dependencies are explicit, including raw request access through Depend(get_request=True).',
    file: 'dependencies.py',
    icon: DependencyIcon,
    code: CODE_EXAMPLES.dependency,
  },
  'Record ORM': {
    title: 'Record ORM',
    desc: 'The sillo.record layer wraps Tortoise models with setup helpers and serialization.',
    file: 'models.py',
    icon: OrmIcon,
    code: CODE_EXAMPLES.orm,
  },
  Queue: {
    title: 'Queue',
    desc: 'Dispatchable jobs with queue names, retry counts, timeouts, delays, and workers.',
    file: 'jobs.py',
    icon: QueueIcon,
    code: CODE_EXAMPLES.queue,
  },
  Caching: {
    title: 'Caching',
    desc: 'Configure a memory or Redis backend and cache async function results with tags.',
    file: 'cache.py',
    icon: CacheIcon,
    code: `from sillo.cache import MemoryCache, cache, configure_cache

configure_cache(MemoryCache(default_ttl=300))


@cache(ttl=120, tags=["catalog"])
async def get_product(product_id: int):
    product = await Product.get(id=product_id)
    return product.to_dict()`,
  },
  Scheduling: {
    title: 'Scheduling',
    desc: 'Register recurring async jobs with interval or cron triggers.',
    file: 'scheduler.py',
    icon: ScheduleIcon,
    code: `from sillo.work.scheduler.manager import SchedulerManager

scheduler = SchedulerManager()


@scheduler.cron("0 3 * * *", name="cleanup")
async def cleanup_expired_sessions():
    await Session.filter(expired=True).delete()


@scheduler.every(3600, name="sync")
async def sync_external_data():
    await Importer.sync_latest()`,
  },
}

const CAPABILITY_KEYS_V2 = [
  'Routing', 'Authentication', 'Validation', 'Dependency Injection',
  'Record ORM', 'Queue', 'Caching', 'Scheduling',
]

const SILLO_MAGIC_STACK = [
  {
    eyebrow: 'DEPENDENCY INJECTION',
    title: 'Ask for the pieces the handler needs.',
    desc: 'Nested dependencies, request access, and query params stay in the signature.',
    file: 'dependencies.py',
    code: `from sillo import Depend, Query, silloApp

app = silloApp(title="Projects")


async def get_settings():
    return {"database_url": "sqlite://app.db"}


async def get_database(settings=Depend(get_settings)):
    return Database(settings["database_url"])


async def get_viewer(req=Depend(get_request=True)):
    return req.scope["user"]


@app.get("/projects")
async def list_projects(
    request,
    response,
    page: int = Query(1),
    db=Depend(get_database),
    viewer=Depend(get_viewer),
):
    projects = await db.projects.for_user(viewer.id).page(page)
    return response.json({"projects": projects})`,
  },
  {
    eyebrow: 'SECURED ROUTES',
    title: 'Put the gate on the route.',
    desc: 'One auth= gates the route on permissions and writes its securityScheme into the OpenAPI spec.',
    file: 'routes/applications.py',
    code: `from sillo.auth import useAuth
from sillo.core.routing import Route
from sillo_inertia import Inertia


async def applications_page(request, response):
    inertia: Inertia = request.base_app.state["inertia"]
    props = await applications_props(request)
    return await inertia.render(
        request,
        response,
        "Applications",
        props,
    )


application_routes = [
    Route(
        "/applications",
        applications_page,
        methods=["GET"],
        auth=useAuth(permissions=["applications:manage"]),
    ),
]`,
  },
  {
    eyebrow: 'QUEUE',
    title: 'Move slow work out of the request.',
    desc: 'A Job carries its arguments, queue, retry count, timeout, and backoff.',
    file: 'jobs/send_report.py',
    code: `from sillo.work.queue import Job


class SendReport(Job):
    queue = "reports"
    tries = 3
    timeout = 30
    backoff = 10

    def __init__(self, user_id: str, report_id: str):
        self.user_id = user_id
        self.report_id = report_id

    async def handle(self):
        report = await Report.get(id=self.report_id)
        await report.generate_pdf()
        await mail_service.send_report(self.user_id, report)


SendReport.dispatch("user-42", "report-9")
SendReport.dispatch_after(3600, "user-42", "report-10")`,
  },
  {
    eyebrow: 'SCHEDULER',
    title: 'Register recurring work with the app.',
    desc: 'setup_scheduler stores the manager on app.state and starts it with the lifecycle.',
    file: 'scheduler.py',
    code: `from sillo import silloApp
from sillo.work.scheduler import setup_scheduler

app = silloApp()
scheduler = setup_scheduler(app)


@scheduler.every(300, name="refresh-metrics")
async def refresh_metrics():
    await MetricsSnapshot.collect()


@scheduler.cron("0 9 * * 1-5", name="weekday-digest")
async def weekday_digest():
    for user in await User.subscribed().all():
        DigestJob.dispatch(user.id)`,
  },
  {
    eyebrow: 'SILLO INERTIA',
    title: 'Render React pages from Sillo routes.',
    desc: 'Shared props, Vite React assets, and server-side page props in one response.',
    file: 'app.py',
    code: `from sillo import silloApp
from sillo_inertia import Inertia, lazy, vite_react

app = silloApp(title="Sillo Monitor")

inertia = Inertia(
    app,
    root_view=BASE_DIR / "resources" / "views" / "app.html",
    base_dir=BASE_DIR,
    version=lambda: "monitor-db",
    vite=vite_react(dev=IS_DEV, dev_server=DEV_SERVER),
)
inertia.share(shared=lazy(shared_props))
app.state["inertia"] = inertia


async def login_page(request, response):
    return await inertia.render(
        request,
        response,
        "Login",
        {"demoUsers": []},
    )`,
  },
]

function OneFramework() {
  const [active, setActive] = useState(CAPABILITY_KEYS_V2[0])
  const detail = CAPABILITY_DETAILS_V2[active]

  return (
    <section className="relative border-b border-border py-20 md:py-28 overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-2/3 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 52% 48% at 78% 34%, rgba(252,3,69,0.055), transparent 66%)',
        }}
      />
      <div className="relative z-10 max-w-[1520px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[34%_66%] gap-10 lg:gap-0 items-start">
          {/* Left */}
          <div>
            <div className="font-mono text-[11px] text-primary tracking-[0.15em] mb-4">02 / CAPABILITIES</div>
            <h2 className="mb-4">
              One framework.<br />
              One config model.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-10 max-w-[420px]">
              Every capability is a first-party module with shared configuration,
              consistent APIs, and one set of testing utilities. Nothing to assemble.
            </p>
            <div className="space-y-1 border-l border-border/70 pl-3">
              {CAPABILITY_KEYS_V2.map((key, i) => {
                const item = CAPABILITY_DETAILS_V2[key]
                return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  type="button"
                  className={`group relative flex w-full items-center gap-4 px-4 py-3.5 text-left transition-all duration-300 cursor-pointer ${
                    active === key
                      ? 'text-text bg-surface/45'
                      : 'text-muted hover:bg-surface/25 hover:text-text'
                  }`}
                >
                  {active === key && (
                    <span className="absolute inset-y-3 -left-3 w-px bg-primary/80 shadow-[0_0_16px_rgba(252,3,69,0.6)]" />
                  )}
                  <span className={`grid h-9 w-9 shrink-0 place-items-center transition-colors ${
                    active === key
                      ? 'text-primary'
                      : 'text-dimmed group-hover:text-muted'
                  }`}>
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold tracking-[-0.02em]">{item.title}</span>
                    <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">{item.file}</span>
                  </span>
                  <span className="font-mono text-[10px] text-dimmed">{String(i + 1).padStart(2, '0')}</span>
                </button>
                )
              })}
            </div>
          </div>

          {/* Right */}
          <div className="mt-8 lg:mt-[220px] lg:-mr-[calc((100vw-1520px)/2+3rem)]">
            <div className="relative overflow-hidden bg-surface border border-border/70 shadow-[0_30px_90px_rgba(0,0,0,0.32)]" style={{ borderRadius: '16px 0 0 0', borderRight: 'none', borderBottom: 'none' }}>
              <div className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `
                    linear-gradient(to right, transparent 55%, rgba(5,5,5,0.32) 78%, rgb(5,5,5) 100%),
                    linear-gradient(to top, rgba(5,5,5,0.84) 0%, rgba(5,5,5,0.36) 28%, transparent 62%)
                  `,
                }}
              />
              <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-border-strong via-border to-transparent" />
              <div className="relative border-b border-border/80 px-6 py-4 flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-9 w-9 place-items-center text-primary">
                    <detail.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-dimmed tracking-[0.18em] uppercase">Live Example</span>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.045em] text-text">{detail.title}</h3>
                  </div>
                </div>
                <span className="hidden md:inline-flex px-3 py-1.5 text-[10px] text-dimmed font-mono">
                  {detail.file}
                </span>
              </div>
              <div key={active} className="relative code-panel-fade transition-tab">
                <CodeBlock code={detail.code} />
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mt-5 max-w-[640px]">
              {detail.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SilloMagicSection() {
  return (
    <section className="relative border-b border-border py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse 52% 42% at 12% 8%, rgba(252,3,69,0.09), transparent 64%),
            radial-gradient(ellipse 52% 50% at 92% 45%, rgba(255,255,255,0.055), transparent 68%)
          `,
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1520px] px-8 md:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[32%_68%] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
            <div className="mb-4 font-mono text-[11px] tracking-[0.15em] text-primary">03 / SILLO SYSTEMS</div>
            <h2 className="mb-5 max-w-[440px]">
              One idiom,<br />
              every subsystem.
            </h2>
            <p className="max-w-[420px] text-base leading-relaxed text-muted">
              Dependency injection, queues, the scheduler, Inertia, and route gates all follow the same shape.
            </p>
            <div className="mt-9 hidden border-l border-border/70 pl-4 font-mono text-[11px] leading-relaxed text-dimmed lg:block">
              Scroll the stack. Read the code.
            </div>
          </div>

          <ScrollStack
            useWindowScroll
            className="-mt-10 lg:-mt-32"
            itemDistance={150}
            itemScale={0.032}
            itemStackDistance={38}
            stackPosition="16%"
            scaleEndPosition="7%"
            baseScale={0.82}
            rotationAmount={0.5}
            blurAmount={0.55}
          >
            {SILLO_MAGIC_STACK.map((item, index) => (
              <ScrollStackItem key={item.title} itemClassName="group overflow-hidden rounded-[28px] border border-border-strong bg-surface shadow-[0_34px_110px_rgba(0,0,0,0.42)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_18%_0%,rgba(252,3,69,0.13),transparent_38%)] opacity-90" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_72%_18%,rgba(252,3,69,0.12),transparent_36%)]" />
                <div className="relative grid min-h-[560px] grid-cols-1 lg:grid-cols-[40%_60%]">
                  <div className="flex flex-col justify-between border-b border-border p-7 md:p-9 lg:border-b-0 lg:border-r lg:p-10">
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dimmed">
                        <span className="text-primary">{String(index + 1).padStart(2, '0')}</span>
                        <span>{item.eyebrow}</span>
                      </div>
                      <h3 className="mb-5 max-w-[430px] text-3xl font-semibold leading-[0.98] tracking-[-0.055em] text-text md:text-4xl">
                        {item.title}
                      </h3>
                      <p className="max-w-[390px] text-sm leading-relaxed text-muted md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative min-w-0 bg-bg/72">
                    <div
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        background: `
                          linear-gradient(to right, transparent 58%, rgba(5,5,5,0.3) 82%, rgb(5,5,5) 100%),
                          linear-gradient(to top, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.24) 30%, transparent 62%)
                        `,
                      }}
                    />
                    <div className="relative flex items-center justify-between border-b border-border px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                      </div>
                      <span className="font-mono text-[10px] text-dimmed">{item.file}</span>
                    </div>
                    <div className="relative overflow-x-auto">
                      <CodeBlock code={item.code} />
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  )
}

/* ─── Architecture Section ─── */

function ArchitectureSection() {
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="max-w-[1360px] mx-auto px-8 md:px-12">
        <a
          href={`${DOCS}/guides/installation/`}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            setGlowPosition({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100,
            })
          }}
          className="group relative block min-h-[420px] overflow-hidden rounded-2xl bg-surface px-8 py-16 transition-all duration-300 hover:-translate-y-1 hover:bg-surface-2 hover:shadow-[0_34px_110px_rgba(0,0,0,0.4)] md:min-h-[520px] md:px-14 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_82%_78%_at_50%_50%,transparent_45%,rgba(5,5,5,0.58)_82%,rgb(5,5,5)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_80%_at_50%_0%,rgba(252,3,69,0.13),transparent_62%),linear-gradient(135deg,rgba(255,255,255,0.055),transparent_38%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 220px at ${glowPosition.x}% ${glowPosition.y}%, rgba(252,3,69,0.24), rgba(252,3,69,0.08) 34%, transparent 68%)`,
            }}
          />
          <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-primary/20" />
          <div className="relative flex min-h-[288px] flex-col items-center justify-center text-center md:min-h-[360px]">
            <div className="max-w-[960px]">
              <div className="font-mono text-[11px] text-primary tracking-[0.18em] mb-5">04 / ONE FOUNDATION</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.96] tracking-[-0.06em] text-text">
                The whole foundation is one product, not eleven packages.
              </h2>
            </div>
            <div className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-bg transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_16px_46px_rgba(255,255,255,0.16)]">
              Start building
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3.5 10.5 8 6 12.5" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}

/* ─── Enterprise Section ─── */

const ENTERPRISE_ITEMS = [
  {
    title: 'Application architecture',
    desc: 'Modular project structure with dependency injection, middleware pipelines, and lifecycle hooks.',
    span: 'row-span-2',
  },
  {
    title: 'Authentication',
    desc: 'JWT, session, and API-key backends, one contract.',
  },
  {
    title: 'Background work',
    desc: 'Durable job dispatch with retry and workers.',
  },
  {
    title: 'Data access',
    desc: 'Record models, migrations, transactions, and factories.',
  },
  {
    title: 'Security',
    desc: 'CORS, CSRF, rate limiting, and Shield.',
  },
  {
    title: 'HTTP correctness',
    desc: 'Full RFC 9110 Range support — single, multi-range, suffix, and 416 — with ETags, conditional requests, and content negotiation as middleware.',
    span: 'row-span-2',
  },
  {
    title: 'Testing',
    desc: 'Sync and async test clients, factories, transactions.',
  },
  {
    title: 'Admin panel',
    desc: 'A model admin at /admin/ on your own user model.',
  },
]

function EnterpriseSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="max-w-[1520px] mx-auto px-8 md:px-12">
        <div className="font-mono text-[11px] text-primary tracking-[0.15em] mb-4">05 / FOUNDATIONS</div>
        <h2 className="mb-12">
          Built for the parts<br />
          that are hard to add later.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(170px,auto)] overflow-hidden rounded-2xl border border-border bg-bg/45">
          {ENTERPRISE_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`border border-border -m-px p-8 md:p-10 flex flex-col gap-3 justify-end min-h-[170px] ${
                i === 0 ? 'md:col-span-2 md:row-span-2 bg-elevated' : ''
              } ${i === 5 ? 'md:col-span-2 md:row-span-2 bg-elevated' : ''}`}
            >
              <span className="font-mono text-[10px] text-dimmed">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="text-base md:text-lg font-medium text-text tracking-[-0.03em]">{item.title}</h4>
              <p className="text-sm text-muted leading-relaxed max-w-[320px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Ecosystem Section ─── */

const ECOSYSTEM_ITEMS = [
  { name: 'Miko', desc: 'Visual administration studio for Sillo applications.', tag: 'Admin' },
  { name: 'Zoro', desc: 'Managed deployment platform with zero-config setup.', tag: 'Deploy' },
  { name: 'Koda', desc: 'Server management and deployment orchestration.', tag: 'Infra' },
  { name: 'Nira', desc: 'Authentication and organisation infrastructure.', tag: 'Auth' },
  { name: 'Piko', desc: 'Logs, queues, and application monitoring console.', tag: 'Ops' },
]

function EcosystemSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="max-w-[1520px] mx-auto px-8 md:px-12">
        <div className="font-mono text-[11px] text-primary tracking-[0.15em] mb-4">05 / ECOSYSTEM</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="mb-4">
              A framework is only<br />
              the beginning.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-[420px]">
              An ecosystem of tools being built around Sillo to handle administration,
              deployment, monitoring, and authentication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ECOSYSTEM_ITEMS.map(item => (
              <div key={item.name} className="border border-border p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text">{item.name}</span>
                  <span className="font-mono text-[10px] text-dimmed border border-border px-1.5 py-0.5">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */

function FinalCta() {
  const [copiedInstall, setCopiedInstall] = useState(false)

  const copyInstallCommand = () => {
    void navigator.clipboard.writeText('uv add sillo-framework')
    setCopiedInstall(true)
    window.setTimeout(() => setCopiedInstall(false), 1600)
  }

  return (
    <section className="border-b border-border py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 48% 58% at 50% 100%, rgba(252,3,69,0.09), transparent 66%)',
        }}
      />
      <div className="max-w-[1520px] mx-auto px-8 md:px-12 relative z-10">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_34px_110px_rgba(0,0,0,0.38)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),transparent_38%),radial-gradient(circle_at_78%_30%,rgba(252,3,69,0.13),transparent_38%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[48%_52%]">
            <div className="relative min-h-[280px] border-b border-border lg:border-b-0 lg:border-r">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(252,3,69,0.12),transparent_38%)]" />
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `
                    linear-gradient(to right, transparent 55%, rgba(5,5,5,0.28) 82%, rgb(5,5,5) 100%),
                    linear-gradient(to top, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.24) 28%, transparent 62%)
                  `,
                }}
              />
              <div className="relative flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
                <span className="font-mono text-[10px] text-dimmed">terminal</span>
              </div>
              <div className="relative p-8 md:p-12 font-mono">
                <div className="flex items-center justify-between gap-4 text-base md:text-lg text-text">
                  <span><span className="text-primary">$</span> uv add sillo-framework</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault()
                      copyInstallCommand()
                    }}
                    className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-bg transition-transform hover:scale-[1.04]"
                    aria-label="Copy install command"
                  >
                    {copiedInstall ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-14 lg:p-16">
              <div className="font-mono text-[11px] text-primary tracking-[0.15em] mb-5">06 / START BUILDING</div>
              <h2 className="text-4xl md:text-6xl font-semibold leading-[0.98] tracking-[-0.06em] mb-6">
                Build the product.<br />
                Sillo handles the foundation.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-9 max-w-[520px]">
                Python 3.10+ &middot; BSD 3-Clause &middot; Open source on GitHub
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`${DOCS}/guides/installation/`} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-bg transition-all leading-none hover:scale-[1.03] hover:shadow-[0_16px_46px_rgba(255,255,255,0.16)]">
                  Get started
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l4 4-4 4"/></svg>
                </a>
                <a href={DOCS} className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-7 py-3.5 text-sm font-semibold text-text transition-all leading-none hover:bg-elevated hover:shadow-[0_16px_46px_rgba(0,0,0,0.24)]">
                  Read the documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */

function FooterSection() {
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
          <div className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-dimmed transition-colors group-hover:text-muted">
            {'{ '} {copiedFooterCommand ? 'Copied' : 'Click. Copy. Build'} {' }'}
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
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 md:pl-16">
          {[
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
              { label: 'Sillo', href: '/about' },
              { label: 'License', href: `${GITHUB}/blob/main/LICENSE` },
            ]},
          ].map(group => (
            <div key={group.title}>
              <h5 className="mb-8 font-mono text-[10px] uppercase tracking-[0.14em] text-dimmed">{group.title}</h5>
              <ul className="flex flex-col gap-5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-semibold text-text/90 transition-colors hover:text-primary">{link.label}</a>
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
