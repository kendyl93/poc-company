import { Section } from "@poc-company/ui";
import { themeTokens } from "@poc-company/theme";
import {
  renderAction,
  renderContainer,
  renderHeading,
  renderSubheading,
  renderText,
} from "./render.js";

import type { HeroAction } from "./hero.js";

export type CtaSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
};

export function Cta({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: CtaSectionProps): string {
  const actionRow = `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:${themeTokens.spacing['3']};margin-top:${themeTokens.spacing['6']}">${
    renderAction(primaryAction)
  }${secondaryAction ? renderAction(secondaryAction) : ""}</div>`;

  return Section({
    children: renderContainer(
      `<div style="display:grid;justify-items:center;gap:${themeTokens.spacing['4']};text-align:center">${[
        eyebrow ? renderText(eyebrow, { tone: "eyebrow", align: "center" }) : "",
        renderHeading(title, { level: 2, align: "center" }),
        description ? renderSubheading(description, { align: "center" }) : "",
        actionRow,
      ]
        .filter(Boolean)
        .join("")}</div>`,
    ),
  });
}
