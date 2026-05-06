import { Section } from "@poc-company/ui";
import { themeTokens } from "@poc-company/theme";
import {
  renderAction,
  renderContainer,
  renderHeading,
  joinHtml,
  renderText,
  renderSubheading,
} from "./render.js";

export type HeroAction = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  target?: "_blank" | "_self";
};

export type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroSectionProps): string {
  const actionRow =
    primaryAction || secondaryAction
      ? `<div style="display:flex;flex-wrap:wrap;gap:${themeTokens.spacing['3']};margin-top:${themeTokens.spacing['6']}">${
          joinHtml(
            primaryAction ? renderAction(primaryAction) : "",
            secondaryAction ? renderAction(secondaryAction) : "",
          )
        }</div>`
      : "";

  const content = joinHtml(
    eyebrow ? renderText(eyebrow, { tone: "eyebrow" }) : "",
    renderHeading(title, { level: 1 }),
    description ? renderSubheading(description) : "",
    actionRow,
  );

  return Section({
    tone: "muted",
    children: renderContainer(
      `<div style="display:grid;gap:${themeTokens.spacing['4']};max-width:42rem">${content}</div>`,
    ),
  });
}
