import { DOCS_LINKS, DOCS_URL as DOCS, GITHUB_URL as GITHUB } from './links'

export const BRAND = {
  name: 'Sillo',
  tagline: 'Python With the Pieces Already in Place.',
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
    request: Request,
    response: Response,
    user_id: int,
    db: Database = Depend(get_db),
):
    user = await db.users.find(user_id)
    return response.json(user.to_dict())`,
    result: 'Typed route handlers with automatic parameter injection.',
    feature: 'Dependency injection',
  },
  {
    id: 'auth',
    label: 'Authentication',
    description: 'Authenticated endpoints with guards and current user resolution.',
    code: `@app.get("/dashboard")
async def dashboard(request, response):
    user = request.user
    return response.json({
        "user": user.email,
        "role": user.role,
    })`,
    result: 'Declarative auth guards that compose with any route.',
    feature: 'Role-based access',
  },
  {
    id: 'orm',
    label: 'ORM',
    description: 'Record models with typed queries and clean data access.',
    code: `from tortoise import fields
from sillo.record import Model


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
    code: `@app.post("/orders")
async def create_order(request, response):
    order = await Order.create(**request.json())
    await dispatch(InvoiceJob, {
        "order_id": order.id,
        "email": order.customer_email,
    })
    return response.json(order.to_dict(), status=201)`,
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

@app.post("/auth/signup")
async def signup(
    request: Request,
    response: Response,
    body: SignupSchema,
):
    user = await User.create(**body.model_dump())
    return response.json(user.to_dict(), status=201)`,
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
