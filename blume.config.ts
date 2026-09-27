import { defineConfig } from "blume";
import { gateway } from "blume/ai";
import { posthog } from "blume/analytics";
import { vercel } from "blume/deploy";
import { openapi } from "blume/reference";
import endpointRedirects from "./endpoint-redirects.json" with { type: "json" };

export default defineConfig({
  title: "Ordinal Docs",
  description: "Get an overview of Ordinal's features, integrations, and how to use them.",
  logo: {
    image: {
      light: "/logo/ordinal-lightmode.svg",
      dark: "/logo/ordinal-darkmode.svg",
      alt: "Ordinal",
    },
    text: "",
  },

  theme: {
    accent: { light: "#24574D", dark: "#8EF5B5" },
    action: "#24574D",
    fonts: { body: "inter" },
  },

  navigation: {
    // Guides owns the root so every existing page keeps its URL; the other tabs scope by prefix.
    tabs: [
      { label: "Guides", path: "/", icon: "book-open" },
      { label: "API", path: "/api", href: "/api/introduction", icon: "code" },
      { label: "MCP", path: "/mcp", href: "/mcp/introduction", icon: "server" },
      { label: "Webhooks", path: "/integrations/webhooks", href: "/integrations/webhooks/introduction", icon: "webhook" },
      { label: "Agency API", path: "/agency-api", href: "/agency-api/introduction", icon: "building-2" },
    ],
    featured: [
      { label: "Dashboard", href: "https://app.tryordinal.com", icon: "layout-grid" },
      { label: "Support", href: "mailto:support@tryordinal.com", icon: "headset" },
    ],
    actions: [{ label: "Support", href: "mailto:support@tryordinal.com" }],
    cta: { label: "Dashboard", href: "https://app.tryordinal.com" },
  },

  reference: [
    openapi({ spec: "./docs/api/openapi.json", route: "/api" }),
    openapi({ spec: "./docs/agency-api/openapi.json", route: "/agency-api" }),
  ],

  // A server build so Vercel serves the redirects as real 301s (a Git-connected
  // project ignores the vercel.json a static build writes into dist/).
  deployment: vercel(),

  search: { indexing: { includeHiddenPages: true } },

  // POSTHOG_API_KEY comes from Infisical, one project token per environment, so
  // production and dev traffic land in separate PostHog projects. Unset = no analytics.
  // Also records "Was this page helpful?" answers, which go nowhere without an adapter.
  analytics: process.env.POSTHOG_API_KEY
    ? [posthog({ key: process.env.POSTHOG_API_KEY, host: "https://us.i.posthog.com" })]
    : [],

  // "Edit on GitHub" page action and header repo link.
  github: { owner: "ordinalhq", repo: "docs", branch: "master" },

  // Needs full git history on Vercel: set VERCEL_DEEP_CLONE=true on the project.
  lastModified: "git",

  ai: {
    assistant: {
      enabled: true,
      // Authenticates with the deployment's OIDC token on Vercel; no key to manage.
      provider: gateway({ model: "anthropic/claude-sonnet-5" }),
      instructions:
        "You answer questions about Ordinal, a social media management platform for B2B marketing teams, using only these docs. Most readers are marketers, not engineers, unless they ask about the API, MCP, or webhooks. If the docs don't cover something, say so and suggest contacting support@tryordinal.com.",
      suggestions: [
        { label: "How do I connect a LinkedIn profile?", icon: "linkedin" },
        { label: "How do approvals work?", icon: "circle-check" },
        { label: "How do team engagements work?", icon: "thumbs-up" },
        { label: "How do I create a post with the API?", icon: "code" },
      ],
    },
  },

  agents: {
    // Separate from Ordinal's product MCP server, which the /mcp pages document.
    mcp: { enabled: true, route: "/docs-mcp", name: "ordinal-docs" },
  },

  redirects: [
    { from: "/api/mcp", to: "/mcp/introduction" },
    { from: "/mcp/install/claude", to: "/mcp/install/overview" },
    { from: "/mcp/install/claude-code", to: "/mcp/install/overview" },
    { from: "/mcp/install/cursor", to: "/mcp/install/overview" },
    { from: "/mcp/install/vscode", to: "/mcp/install/overview" },
    { from: "/posts/auto-engagements", to: "/posts/team-engagements" },
    { from: "/mcp/migrating", to: "/mcp/install/overview" },
    // Mintlify slugged endpoints by summary under /api-reference; Blume slugs by operationId.
    ...endpointRedirects,
  ],
});
