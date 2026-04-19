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
- Per-app user gating (e.g. an email allow-list; see
  `jamie-career`'s `SITE_ALLOWED_EMAILS` pattern for a worked
  example).
- The middleware in `site/src/proxy.ts` (Clerk matcher tweaks).

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
