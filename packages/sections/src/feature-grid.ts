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

export type FeatureItem = {
  title: string;
  description: string;
};

export type FeatureGridSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  features: readonly FeatureItem[];
};

export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
}: FeatureGridSectionProps): string {
  const headingBlock = [
    eyebrow ? renderText(eyebrow, { tone: "eyebrow", align: "center" }) : "",
    renderHeading(title, { level: 2, align: "center" }),
    description ? renderSubheading(description, { align: "center" }) : "",
  ]
    .filter(Boolean)
    .join("");

  const cards = renderGrid(
    features
      .map((feature) =>
        renderCard(
          [
            renderHeading(feature.title, { level: 3 }),
            renderSubheading(feature.description),
          ].join(""),
        ),
      )
      .join(""),
    {
      columns: 3,
    },
  );

  return Section({
    children: renderContainer(
      `<div style="display:grid;gap:${themeTokens.spacing['8']}">${headingBlock}${cards}</div>`,
    ),
  });
}
