# Ordinal Docs

User-facing docs for Ordinal (https://app.tryordinal.com), built with [Blume](https://useblume.dev) and deployed on Vercel. The product code lives in `ordinalhq/ordinal`.

## Commands

- `npm run dev` — local preview at http://localhost:4321
- `npm run build` — production build; fails on frontmatter or config errors
- `npm run validate` — broken links, anchors, and assets. 0 errors is required; the existing warnings are known (tab deep links the checker can't see, and duplicate "Overview"/"File Uploads" labels)

Stop any running `blume dev` before building: Blume refuses to build while a dev server holds the `.blume` runtime. (`--isolated` doesn't work here; with the `vercel()` adapter its function bundle can't find `node_modules`.)

## Where things go

- **All content lives under `docs/`**, and a page's URL is its path inside `docs/`. Never add a top-level `api/` folder: Vercel would deploy its `.ts` files as serverless functions.
- **Guides** live in topic folders under `docs/`: `getting-started/`, `social-profiles/`, `(calendar-and-posts)/`, `collaboration/`, `analytics/`, `account/`, `integrations/`, `referrals/`.
- **Parenthesized folders add no URL segment.** `docs/(calendar-and-posts)/posts/media.mdx` is served at `/posts/media`. Some pages sit in a group folder but set `slug:` in frontmatter to keep their URL (e.g. `docs/(calendar-and-posts)/ideas.mdx` → `/posts/ideas`). Check `slug:` before assuming a page's URL.
- **Sidebar order and titles** come from each folder's `meta.ts` (`pages: [...]` lists children by file name). A new page must be added to its folder's `meta.ts` `pages` array.
- **API endpoints are generated from `docs/api/openapi.json`** (Agency API: `docs/agency-api/openapi.json`). Never hand-write an endpoint page. Add or change the operation in the spec, with an `operationId`, a `summary`, and one of the existing `tags`. Its page is served at `/api/<tag-slug>/<operationId-in-kebab-case>` (tag `File Uploads` + `uploads-get` → `/api/file-uploads/uploads-get`). Conceptual API pages (`docs/api/introduction.mdx`, `docs/api/authentication.mdx`, …) are normal MDX.
- **MCP tools** are documented in `docs/mcp/tools.mdx`.
- **Webhook events** are documented in `docs/integrations/webhooks/`, grouped into `(social-profile)/`, `(posts)/`, `(approvals)/`, `(invites)/`. List new events in `docs/integrations/webhooks/event-types.mdx` as well.
- **Images** go in `public/images/` and are referenced as `/images/<file>`.
- **Tabs, redirects, and API references** are configured in `blume.config.ts`. If a page moves or is renamed, add a `redirects` entry from the old URL.

## Writing pages

Every page needs frontmatter with `title` and `description`. The frontmatter schema is strict: unknown keys fail the build. Valid extras include `icon`, `slug`, `sidebar: { label, order, hidden }`, and `noindex`. Don't repeat the title as an H1; start the body at `##`.

Blume syntax. This repo migrated from Mintlify, so Mintlify components will not render:

| Instead of (Mintlify) | Write (Blume) |
| --- | --- |
| `<Note>`, `<Tip>`, `<Warning>`, `<Info>`, `<Check>` | `:::note`, `:::tip`, `:::warning`, `:::info`, `:::success` … closed with `:::` |
| `<AccordionGroup>` + `<Accordion title>` | `<Accordion>` + `<AccordionItem title>` |
| `<ResponseField>` / `<ParamField>` | `<TypeTable type={{ "field": { type, required, description } }} />`, with dotted names for nested fields (`data.post.id`). Descriptions are plain text, so no backticks. |
| `<ResponseExample>` / `<RequestExample>` | `<CodeGroup>` wrapping titled code fences |
| `<Tabs>` | `<Tabs inline>` (children stay `<Tab title="…">`; add `id="…"` to a tab that other pages link to with `#…`) |
| FontAwesome icon names | Lucide names only (https://lucide.dev/icons), e.g. `square-pen`, `settings`, `zap`. For X, Threads, TikTok, and Discord use `/icons/x.svg`, `/icons/threads.svg`, `/icons/tiktok.svg`, `/icons/discord.svg` |

`<Card>`, `<CardGroup cols={2}>`, `<Steps>`/`<Step>`, `<Frame>`, `<Expandable>`, and `<CodeGroup>` work as-is.

Internal links are root-relative (`/posts/media`). Run `npm run build` and `npm run validate` before opening a PR.

## Style

Write for Ordinal customers: social media managers and marketing teams, not engineers (except in `api/`, `mcp/`, `agency-api/`, and `integrations/webhooks/`). Use second person, present tense, and short paragraphs. Name UI elements exactly as they appear in the app, in **bold**. Match the tone and depth of neighboring pages.
