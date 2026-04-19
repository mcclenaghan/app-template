SHELL := /bin/bash

.PHONY: help env-pull site-dev site-build site-start site-lint site-typecheck

help:
	@echo "{{APP_NAME}} — Makefile targets"
	@echo ""
	@echo "  env-pull        pull Vercel team-shared env → .env"
	@echo "  site-dev        next dev on :3000"
	@echo "  site-build      next build"
	@echo "  site-start      next start"
	@echo "  site-lint       biome check"
	@echo "  site-typecheck  tsc --noEmit"
	@echo ""
	@echo "Instance-level ops (Clerk pin, DNS, origins) live in"
	@echo "../mcclenaghan-app. See its Makefile and docs/new-app.md."

env-pull:
	@command -v vercel >/dev/null || { echo "Install vercel CLI: npm i -g vercel"; exit 1; }
	# Link at the REPO ROOT, not site/: Vercel's root_directory is "site"
	# so the CLI must receive the whole repo and descend into site/ to build.
	# Linking inside site/ makes `vercel deploy` look for site/site.
	vercel link --yes --scope mcclenaghan --project "{{APP_SLUG}}"
	vercel env pull --environment=development --yes site/.env.development.local
	@cp site/.env.development.local .env
	@echo "✓ wrote .env from Vercel project {{APP_SLUG}} (development scope)"

site-dev:
	cd site && npm run dev

site-build:
	cd site && npm run build

site-start:
	cd site && npm run start

site-lint:
	cd site && npm run lint

site-typecheck:
	cd site && npm run typecheck
