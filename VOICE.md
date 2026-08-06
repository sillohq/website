# Sillo — Voice and Copy Guide

This governs every user-facing string on sillo.build: hero and landing copy, feature
text, nav and button labels, CTAs, footer, page titles, meta descriptions, error copy,
and alt text. It does not govern API reference parameter descriptions, changelogs, or
the code inside samples.

---

## The wedge

**Sillo is one product language across the whole async stack — Record, auth, Work, and
websockets are designed to look like each other and share one config model.**

That coherence is what makes Django feel like a single tool instead of a pile of
libraries. Sillo brings it to async. Every line of copy on this site must ladder up to
that sentence. Breadth alone is not the pitch — a list of twelve features is what a
plugin ecosystem also offers. The claim is that the twelve were designed together.

## The four supporting claims, in priority order

1. **Auth is declared once.** `auth=` gates the route *and* writes `securitySchemes`
   into the OpenAPI spec. Elsewhere those are two separate declarations and nothing
   checks that they agree.
2. **Durable background work is part of the app lifecycle, not a bolt-on.** The queue,
   the scheduler, and events ship with the framework and start with the app.
3. **A real admin panel, on your own user model.** Not a separate user table.
4. **HTTP correctness as middleware.** Range requests, ETags, conditional requests, and
   content negotiation — not hand-rolled per project.

When a section has room for exactly one claim, use the highest-priority one that fits
the section's subject.

---

## Voice

- **Plainspoken over clever.** The fewest words that carry the meaning.
- **Confident and opinionated.** Sillo makes decisions for you. That is the product.
- **Respectful of alternatives.** Never disparage FastAPI, Django, Flask, Starlette, or
  Litestar — by name or by implication. "Another thin wrapper around an HTTP server" is
  disparagement by implication.
- **Show, don't adjective.** A concrete capability or a one-line sample beats any
  modifier. `Full RFC 9110 Range support — single, multi-range, suffix, and 416` tells a
  senior engineer more about this project than "production-ready" ever will.
- **Address the reader as "you."** Refer to the project as "Sillo" or "we."
- **Short sentences, active voice.** Nothing over ~25 words in hero or headline copy.
- **Technical register.** The reader is a working backend engineer, not a buyer. They
  know what middleware, a scheduler, and an OpenAPI spec are. Don't explain fundamentals.

## Maturity framing

Sillo is a complete, shipped framework with a broad working surface. The copy must read
that way. New frameworks leak insecurity through their prose, and that is the fastest way
to lose a senior engineer's trust.

- **Present indicative only.** "Sillo ships X." "Record handles Y." Never *will*,
  *plans to*, *aims to*, *is working toward*, *coming soon*, *on the roadmap*.
- **Never label the project or a subsystem** alpha, beta, early, experimental, new,
  young, in-progress, or "not yet." If something genuinely isn't ready, **omit it rather
  than caveat it.**
- **No apology, no hedging.** No "for now", "currently only", "still rough", "we know
  it's missing", "bear with us."
- **No origin story or founder narrative on product pages.** That belongs in a blog post.
  On a homepage it reads as a hobby project.
- **Never use "simple", "lightweight", "minimal", or "tiny" as a headline claim.** Sillo's
  claim is completeness and coherence. Smallness is the opposite pitch and invites "so
  it's unfinished?"
- **State trade-offs as decisions, never deficits.** "Projects own their `console.py`,
  assembled from the framework's commands — the CLI is yours, not ours" is a decision.
  "Sillo doesn't have a CLI yet" is a hole. Same fact, opposite signal.
- **Comparisons belong on a dedicated comparison page**, never in the hero or feature
  sections. On that page, lead with what Sillo includes. Concede ecosystem size and
  maturity factually, in one sentence each, without self-deprecation, then move to scope.
- **Don't oversell either.** No "the last framework you'll need", no implied scale claims,
  no "battle-tested" or "production-proven." Those need evidence we don't have, and a
  skeptic will call it out.

## Facts — check these before you write them

Verified against the repo as of this writing. Re-verify before changing:

| Claim | Truth | Source |
|---|---|---|
| Install command | `uv add sillo-framework` | `sillo` is **404 on PyPI** |
| Python version | 3.10+ | `pyproject.toml` `requires-python = ">=3.10"` |
| License | BSD 3-Clause | `pyproject.toml`, `LICENSE` |
| CLI | **Sillo ships none, by decision** | `pyproject.toml` removed the `cli` extra explicitly |

Never invent benchmarks, adoption counts, download numbers, testimonials, company logos,
or version numbers. If a capability is not in the inventory, it does not go on the site —
do not write around it.

## Banned language

**Marketing filler:** blazing fast, revolutionary, next-generation, seamless, robust,
powerful, cutting-edge, game-changing, unleash, supercharge, empower, delightful,
reimagine, state-of-the-art, 10x, effortless, magical.

**Premature signalling:** coming soon, roadmap, planned, upcoming, early access, alpha,
beta, experimental, work in progress, stay tuned, we're building, help us build.

**Unbacked benefit-speak:** build faster, ship with confidence, developer-first, focus on
what matters — *unless immediately followed by a specific mechanism.*

**Also:** no emoji in headings, no exclamation marks outside code, no checkmark-emoji
feature lists.

---

## Before / after

Five real pairs from the audit of this site.

**1. Hero headline** — borrowed slogan → the wedge

> Python, batteries included.

> Batteries included. One design.

*"Batteries included" is Django's line and Python's line. It claims breadth, which a
plugin ecosystem also has. The second sentence is the part nobody else can say.*

**2. Feature card** — generic → claim 1

> Authentication guards and user sessions

> One auth= declaration gates and documents

*The first could sit unchanged on any framework's site. The second states something
only Sillo does, in the same number of characters.*

**3. Section headline** — competitor's pain → what Sillo includes

> Stop stitching tech together when Sillo can ship the foundation.

> The whole foundation is one product, not eleven packages.

*Leading with the reader's frustration is a weaker open than leading with what you are.
It also reads as a swipe at frameworks we respect.*

**4. Enterprise card** — unbacked claim → verifiable depth

> Observability — Structured logging, metrics, request tracing.

> HTTP correctness — Full RFC 9110 Range support: single, multi-range, suffix, and 416.

*Metrics and tracing do not exist in the framework. The replacement is specific enough
that a skeptic can go read the code and confirm it — which is the point.*

**5. Roadmap board** — maturity violation → present indicative

> In Progress · Being shaped
> Production-ready core — Hardening routing, lifecycle, middleware, DI, records,
> queues, scheduling, caching, security, testing, and docs.

> Beyond the request · Shipped in Sillo
> Work, events, and real-time — Queues, workers, the scheduler, an event emitter with
> pluggable transports, WebSocket consumers and channels, cache backends, and mail.

*The original tells a senior engineer the core is not ready and undoes the entire
homepage in one card.*

---

## Three sentences Sillo would never write

1. *"Sillo is a new async framework we're building to make Python development
   delightful — join us early and help shape the roadmap."*
   Premature signalling, banned adjective, and an invitation to treat the project as
   unfinished, in one breath.

2. *"Unlike bloated legacy frameworks, Sillo is a lightweight, blazing-fast alternative
   that lets you focus on what matters."*
   Disparages peers, claims smallness as a virtue when our pitch is completeness, and
   ends on benefit-speak with no mechanism.

3. *"Sillo will eventually offer a full observability suite, managed deployment, and
   enterprise SSO."*
   Future tense about things that do not exist. If it isn't shipped, it isn't on the
   site.
