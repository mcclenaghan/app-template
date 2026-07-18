# AGENTS.md — {{APP_NAME}}

`{{APP_SLUG}}.mcclenaghan.uk` — {{APP_DESC}}.

## 1. What this repo is

A Next.js app deployed to Vercel, sharing the `mcclenaghan.uk` Clerk
instance via subdomain cookie (no satellite config).

Instance-level auth, DNS, Cloudflare, Clerk admin, and the apps
registry (`config/apps.toml`) live in
[`../mcclenaghan-app`](https://github.com/mcclenaghan/mcclenaghan-app).
Read its [`AGENTS.md`](https://github.com/mcclenaghan/mcclenaghan-app/blob/main/AGENTS.md),
[`docs/new-app.md`](https://github.com/mcclenaghan/mcclenaghan-app/blob/main/docs/new-app.md),
and the ADRs at
[`docs/adr/`](https://github.com/mcclenaghan/mcclenaghan-app/blob/main/docs/adr/)
before changing auth / DNS wiring.

This repo owns only:

- The Next.js app in `site/`.
- The middleware in `site/src/proxy.ts` (Clerk matcher tweaks). Access
  control is NOT per-repo: the gate requires membership of the
  McClenaghan Clerk org via `checkEstateMembership()` in
  `site/src/lib/acl.ts` (mcclenaghan-app ADR-0015). Grant/revoke
  access from mcclenaghan-app: `make clerk-org-invite EMAIL=…` /
  `make clerk-org-revoke EMAIL=…`. Signed-in non-members land on
  `/request-access`.
- Plan/feature **gates** (`has({ plan })` / `has({ feature })`) and the
  pricing page at `site/src/app/pricing/page.tsx`. The billing
  **catalog** (plans, prices, features) and all Stripe admin live in
  `mcclenaghan-app` (`config/billing.json`, `make billing-apply`,
  `scripts/stripe-*.sh`) — never configure billing from this repo.
  See mcclenaghan-app ADR-0013 + ADR-0014 and
  `docs/stripe-operations.md`.

## 2. Guardrails

- **Never** add `isSatellite: true` to `<ClerkProvider>`. Sub-apps
  share the `.mcclenaghan.uk` parent-domain cookie; satellite mode
  is paywalled on Hobby anyway. ADR-0001.
- **Never** narrow the matcher in `site/src/proxy.ts` so that
  `/.well-known/*` goes through Clerk. Even a 30x redirect there
  breaks Android TWA asset-links and Google site verification.
  ADR-0008.
- **Never** write Clerk env-vars to `site/.env.local` and commit
  them. `make env-pull` fetches them from Vercel team-shared env at
  runtime.
- **Never** gate on unprefixed billing slugs. The Clerk billing
  catalog is shared by every `*.mcclenaghan.uk` app; this app's plan
  and feature slugs are always `{{APP_SLUG}}_<name>` (mcclenaghan-app
  ADR-0013). `has({ plan: "pro" })` would match another app's plan.
- **Never** bump `@clerk/nextjs` past the pinned version without
  testing billing. The Billing APIs are experimental; the exact pin in
  `site/package.json` is deliberate (mcclenaghan-app ADR-0014).

## 3. Running

```bash
make env-pull       # one-time per clone + whenever env changes
make site-dev       # next dev
make site-build
make site-lint
make site-typecheck
```

## 4. Deploying

This repo is wired to its Vercel project by `git push origin main`.
Preview deploys run on every PR; production deploys run on `main`.

Clerk env-vars are pinned at the Vercel project level (overriding
the Marketplace integration) by `mcclenaghan-app`'s
`scripts/vercel-clerk-pin.py` — re-run from there after any Clerk
rotation. This repo never writes them.
