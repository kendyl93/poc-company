import { Section } from "@poc-company/ui";
import { themeTokens } from "@poc-company/theme";
import {
  renderCard,
  renderContainer,
  renderGrid,
  renderHeading,
  joinHtml,
  renderSubheading,
  renderText,
} from "./render.js";

export type TestimonialItem = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
};

export type TestimonialsSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  testimonials: readonly TestimonialItem[];
};

function renderTestimonialCard(testimonial: TestimonialItem): string {
  const attribution = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(", ");
  const attributionBlock = attribution
    ? renderText(attribution, { tone: "muted" })
    : "";

  return renderCard(
    `<div style="display:grid;gap:${themeTokens.spacing['4']}">${joinHtml(
      renderSubheading(`"${testimonial.quote}"`),
      `<div style="display:grid;gap:${themeTokens.spacing['1']}">${joinHtml(
        renderText(testimonial.name, { tone: "default" }),
        attributionBlock,
      )}</div>`,
    )}</div>`,
  );
}

export function Testimonials({
  eyebrow,
  title,
  description,
  testimonials,
}: TestimonialsSectionProps): string {
  const cards = renderGrid(
    testimonials.map(renderTestimonialCard).join(""),
    { columns: 3 },
  );

  return Section({
    children: renderContainer(
      `<div style="display:grid;gap:${themeTokens.spacing['8']}">${joinHtml(
        eyebrow ? renderText(eyebrow, { tone: "eyebrow", align: "center" }) : "",
        renderHeading(title, { level: 2, align: "center" }),
        description ? renderSubheading(description, { align: "center" }) : "",
        cards,
      )}</div>`,
    ),
  });
}
