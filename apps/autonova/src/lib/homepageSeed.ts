import type { PayloadPage } from "./payloadClient.js";

export const autonovaHomepageSeed = {
  slug: "home",
  title: "Autonova launches from Payload",
  layout: [
    {
      blockType: "hero",
      eyebrow: "AutoNova demo",
      title: "Launch AutoNova from a seeded Payload homepage",
      description:
        "The first demo proves the app renders real CMS content instead of a hardcoded landing page.",
      primaryAction: {
        label: "Open the CMS",
        href: "/admin",
      },
      secondaryAction: {
        label: "Review the architecture",
        href: "/docs/adr/0001-block-driven-multi-client-architecture.md",
        variant: "secondary",
      },
    },
    {
      blockType: "feature-grid",
      eyebrow: "What the seed proves",
      title: "The homepage is content-driven",
      description:
        "Each block lands in the app through the Payload page query and the shared block renderer.",
      features: [
        {
          title: "Payload owns the page",
          description: "The home route fetches the CMS page by slug before rendering.",
        },
        {
          title: "Blocks stay typed",
          description: "Hero, feature grid, testimonials, and CTA blocks render through shared contracts.",
        },
        {
          title: "Visible smoke coverage",
          description: "The route test exercises the full fetch-to-markup flow against the seeded page.",
        },
      ],
    },
    {
      blockType: "testimonials",
      eyebrow: "Demo confidence",
      title: "The homepage reads like a live product",
      description:
        "The block stack gives reviewers a real page to inspect during the first delivery.",
      testimonials: [
        {
          quote: "The demo is seeded, rendered, and ready for review.",
          name: "Riley",
          role: "Product",
          company: "AutoNova",
        },
        {
          quote: "Content moves through Payload without special-casing the route.",
          name: "Jordan",
          role: "Engineering",
          company: "AutoNova",
        },
      ],
    },
    {
      blockType: "cta",
      eyebrow: "Next step",
      title: "Continue from the seeded homepage",
      description:
        "Use the same document in Payload to drive the demo while the app keeps rendering the live CMS response.",
      primaryAction: {
        label: "See the homepage",
        href: "/",
      },
      secondaryAction: {
        label: "Open the collection",
        href: "/admin/collections/pages",
        variant: "ghost",
      },
    },
  ],
} as const satisfies PayloadPage;
