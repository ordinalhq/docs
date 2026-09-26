import { defineConfig } from "blume";
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

  // Mintlify serves pages from the repo root, so scope Blume to the content folders.
  content: {
    root: ".",
    include: [
      "index.mdx",
      "help-center.mdx",
      "[(]calendar-and-posts[)]/**/*.mdx",
      "{getting-started,social-profiles,collaboration,analytics,account,integrations,referrals,api,mcp,agency-api}/**/*.mdx",
    ],
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
    openapi({ spec: "./api/openapi.json", route: "/api" }),
    openapi({ spec: "./agency-api/openapi.json", route: "/agency-api" }),
  ],

  // A server build so Vercel serves the redirects as real 301s (a Git-connected
  // project ignores the vercel.json a static build writes into dist/).
  deployment: vercel(),

  search: { indexing: { includeHiddenPages: true } },

  redirects: [
    { from: "/api/mcp", to: "/mcp/introduction" },
    { from: "/mcp/install/claude", to: "/mcp/install/overview" },
    { from: "/mcp/install/claude-code", to: "/mcp/install/overview" },
    { from: "/mcp/install/cursor", to: "/mcp/install/overview" },
    { from: "/mcp/install/vscode", to: "/mcp/install/overview" },
    { from: "/posts/auto-engagements", to: "/posts/team-engagements" },
    // Mintlify slugged endpoints by summary under /api-reference; Blume slugs by operationId.
    ...endpointRedirects,
  ],
});
