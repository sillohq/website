import { DOCS_LINKS, DOCS_URL as DOCS, GITHUB_URL as GITHUB } from './links'

export const BRAND = {
  name: 'Sillo',
  tagline: 'The Buildsmith framework. Fast, async, and built with everything you need to ship.',
  subtitle:
    'The same Python you already write, with routing, validation, the ORM, auth, the admin, queues, the scheduler, mail and WebSockets designed against each other and sharing one config model.',
  closing: 'Build the product. The pieces are already in place.',
  closing_sub:
    'You learn one set of conventions and apply them across HTTP, data, auth and background work, instead of fitting a new interface to each one.',
} as const

export const CODE_TABS = [
  {
    id: 'routing',
    label: 'Routing',
    description: 'Typed routes with dependency injection and clean response handling.',
    code: `@app.get("/users/{user_id:int}")
async def get_user(
    ctx: HttpContext,
    user_id: int,
    db=Depend(get_db),
):
    user = await db.users.find(user_id)
    return user.to_dict()`,
    result: 'Typed route handlers with automatic parameter injection.',
    feature: 'Dependency injection',
  },
  {
    id: 'auth',
    label: 'Authentication',
    description: 'Authenticated endpoints with guards and current user resolution.',
    code: `@app.get("/dashboard", auth=useAuth())
async def dashboard(ctx: HttpContext):
    user = ctx.user
    return {
        "user": user.email,
        "role": user.role,
    }`,
    result: 'Declarative auth guards that compose with any route.',
    feature: 'Role-based access',
  },
  {
    id: 'orm',
    label: 'ORM',
    description: 'Record models with typed queries and clean data access.',
    code: `from sillo.record import Model, fields


class Product(Model):
    name = fields.CharField(max_length=255)
    price = fields.DecimalField(max_digits=10, decimal_places=2)
    stock = fields.IntField(default=0)
    category = fields.CharField(max_length=100)


products = await Product.filter(category="electronics") \\
    .filter(stock__gt=0) \\
    .order_by("-price") \\
    .limit(20) \\
    .all()`,
    result: 'Expressive query builder with predictable SQL generation.',
    feature: 'Async ORM',
  },
  {
    id: 'queues',
    label: 'Queues',
    description: 'Dispatch background jobs without infrastructure boilerplate.',
    code: `@app.post("/orders", request_model=CreateOrder)
async def create_order(ctx: HttpContext, body: CreateOrder):
    order = await Order.create(**body.model_dump())
    await enqueue(InvoiceJob, order.id, email=order.customer_email)
    return created(order.to_dict())`,
    result: 'Fire-and-forget background processing with retry support.',
    feature: 'Async dispatch',
  },
  {
    id: 'validation',
    label: 'Validation',
    description: 'Automatic request validation using typed schemas.',
    code: `from pydantic import BaseModel, EmailStr

class SignupSchema(BaseModel):
    name: str = Field(min_length=2)
    email: EmailStr
    password: str = Field(min_length=8)

@app.post("/auth/signup", request_model=SignupSchema)
async def signup(ctx: HttpContext, body: SignupSchema):
    user = await User.objects.create_user(**body.model_dump())
    return created(user.to_dict())`,
    result: 'Zero-boilerplate validation with Pydantic integration.',
    feature: 'Schema validation',
  },
] as const

export const BATTERIES = [
  {
    name: 'Routing',
    desc: 'Typed URL patterns with dependency injection.',
    icon: 'routing',
  },
  {
    name: 'Authentication',
    desc: 'Session and token auth with role-based guards.',
    icon: 'auth',
  },
  {
    name: 'ORM',
    desc: 'Async Record models with a query builder.',
    icon: 'orm',
  },
  {
    name: 'Queues',
    desc: 'Background job dispatch with retry and workers.',
    icon: 'queues',
  },
  {
    name: 'Validation',
    desc: 'Pydantic schemas with automatic request parsing.',
    icon: 'validation',
  },
  {
    name: 'WebSockets',
    desc: 'Real-time bidirectional communication.',
    icon: 'websockets',
  },
  {
    name: 'Cache',
    desc: 'Pluggable backends with TTL and tags.',
    icon: 'cache',
  },
  {
    name: 'Mail',
    desc: 'SMTP, templates, attachments, and queue integration.',
    icon: 'mail',
  },
  {
    name: 'Scheduler',
    desc: 'Recurring jobs with cron expressions.',
    icon: 'scheduler',
  },
  {
    name: 'Events',
    desc: 'Application-wide event dispatch and listening.',
    icon: 'events',
  },
  {
    name: 'Storage',
    desc: 'File uploads with local and cloud drivers.',
    icon: 'storage',
  },
  {
    name: 'Security',
    desc: 'CORS, CSRF, rate limiting, and session security.',
    icon: 'security',
  },
] as const

export const FOOTER_LINKS = {
  framework: [
    { label: 'Documentation', href: DOCS },
    { label: 'GitHub', href: GITHUB },
    { label: 'Getting Started', href: DOCS_LINKS.installation },
    { label: 'API Reference', href: DOCS_LINKS.apiReference },
  ],
  community: [
    { label: 'GitHub', href: GITHUB },
    { label: 'Discord', href: '#' },
    { label: 'Contributing', href: DOCS_LINKS.contributing },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'License', href: '#' },
  ],
}
