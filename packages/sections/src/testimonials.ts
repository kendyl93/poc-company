import { Section } from "@poc-company/ui";
import { themeTokens } from "@poc-company/theme";
import {
  renderCard,
  renderContainer,
  renderGrid,
  renderHeading,
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

export function Testimonials({
  eyebrow,
  title,
  description,
  testimonials,
}: TestimonialsSectionProps): string {
  const cards = renderGrid(
    testimonials
      .map((testimonial) =>
        renderCard(
          `<div style="display:grid;gap:${themeTokens.spacing['4']}">${[
            renderSubheading(`"${testimonial.quote}"`),
            `<div style="display:grid;gap:${themeTokens.spacing['1']}">${[
              renderText(testimonial.name, { tone: "default" }),
              testimonial.role || testimonial.company
                ? renderText(
                    [testimonial.role, testimonial.company]
                      .filter(Boolean)
                      .join(", "),
                    { tone: "muted" },
                  )
                : "",
            ]
              .filter(Boolean)
              .join("")}</div>`,
          ]
            .filter(Boolean)
            .join("")}</div>`,
        ),
      )
      .join(""),
    { columns: 3 },
  );

  return Section({
    children: renderContainer(
      `<div style="display:grid;gap:${themeTokens.spacing['8']}">${[
        eyebrow ? renderText(eyebrow, { tone: "eyebrow", align: "center" }) : "",
        renderHeading(title, { level: 2, align: "center" }),
        description ? renderSubheading(description, { align: "center" }) : "",
        cards,
      ]
        .filter(Boolean)
        .join("")}</div>`,
    ),
  });
}
