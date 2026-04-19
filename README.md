# {{APP_NAME}}

`{{APP_SLUG}}.mcclenaghan.uk` — {{APP_DESC}}.

Created from [`mcclenaghan/app-template`](https://github.com/mcclenaghan/app-template)
by `make new-app NAME={{APP_SLUG}}` in
[`mcclenaghan-app`](https://github.com/mcclenaghan/mcclenaghan-app).

## Quick start

```bash
make env-pull          # pull team-shared env vars from Vercel
make site-dev          # next dev on :3000
```

## Where things live

- `site/` — the Next.js app (Node 24, Next 16, React 19, Clerk, Biome).
- `AGENTS.md` — orientation for agents + humans.
- `.envrc` / `.envrc.local` — direnv-loaded env. Real secrets in
  `.envrc.local` (gitignored).
- Instance-level auth / DNS / Clerk admin lives in
  [`../mcclenaghan-app`](https://github.com/mcclenaghan/mcclenaghan-app).

## Invariants (do NOT fight these)

- No `isSatellite` on `<ClerkProvider>`. The `.mcclenaghan.uk` cookie
  is shared automatically. See
  [ADR-0001](https://github.com/mcclenaghan/mcclenaghan-app/blob/main/docs/adr/0001-subdomain-cookie-sharing.md).
- `/.well-known/*` is excluded from the Clerk matcher in
  `site/src/proxy.ts` — don't let redirects creep in there (breaks
  TWA asset-links and Google verification).

## Next steps after scaffolding

See [`../mcclenaghan-app/docs/new-app.md`](https://github.com/mcclenaghan/mcclenaghan-app/blob/main/docs/new-app.md)
for the full end-to-end checklist (Vercel domain, Cloudflare DNS,
Clerk pin + origins, smoke test).
