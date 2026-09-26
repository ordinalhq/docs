# Ordinal Docs

The source for Ordinal's documentation, built with [Blume](https://useblume.dev).

## Development

```
npm install
npm run dev
```

View your local preview at `http://localhost:4321`.

Before opening a PR, run a production build and the link checker:

```
npm run build
npm run validate
```

## Layout

- Pages are `.mdx` files in the topic folders (`getting-started/`, `social-profiles/`, `api/`, …). A page's URL is its path, unless its frontmatter sets `slug`.
- Folders wrapped in parentheses, like `(calendar-and-posts)/`, group pages in the sidebar without adding a URL segment.
- Each folder's `meta.ts` sets its sidebar title, icon, and page order.
- Header tabs, the API references, and redirects live in `blume.config.ts`.
- The API and Agency API endpoint pages are generated from `api/openapi.json` and `agency-api/openapi.json`. Edit the spec, not the pages.
- Static assets live in `public/` and are served from the site root (`public/images/foo.jpg` → `/images/foo.jpg`).

## Resources

- [Blume documentation](https://useblume.dev/docs)
