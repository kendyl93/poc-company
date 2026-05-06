import { getButtonTokens, themeTokens, type ButtonVariant } from "@poc-company/theme";

type StyleValue = string | number;

export type ContainerWidth = "sm" | "md" | "lg" | "xl" | "full";
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type TextTone = "default" | "muted";
export type SectionTone = "surface" | "muted";
export type ButtonSize = "sm" | "md" | "lg";

export type ContainerProps = {
  children?: string;
  width?: ContainerWidth;
  paddingX?: keyof typeof themeTokens.spacing;
};

export type SectionProps = {
  children?: string;
  tone?: SectionTone;
};

export type HeadingProps = {
  children: string;
  level?: HeadingLevel;
  tone?: TextTone;
};

export type ButtonProps = {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function styleToString(style: Record<string, StyleValue | undefined>): string {
  return Object.entries(style)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

function renderElement(
  tagName: "div" | "section" | `h${HeadingLevel}` | "button",
  attributes: Record<string, string | undefined>,
  children: string,
): string {
  const attrString = Object.entries(attributes)
    .filter(
      (entry): entry is [string, string] =>
        entry[1] !== undefined && entry[1] !== "",
    )
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(" ");

  return `<${tagName}${attrString ? ` ${attrString}` : ""}>${children}</${tagName}>`;
}

function widthToMaxWidth(width: ContainerWidth): string {
  switch (width) {
    case "sm":
      return "36rem";
    case "md":
      return "48rem";
    case "lg":
      return "64rem";
    case "xl":
      return "80rem";
    case "full":
      return "none";
  }
}

function sizeToPadding(size: ButtonSize): { x: string; y: string; fontSize: string } {
  switch (size) {
    case "sm":
      return { x: themeTokens.spacing["3"], y: themeTokens.spacing["2"], fontSize: themeTokens.typography.fontSize.sm };
    case "md":
      return { x: themeTokens.spacing["4"], y: themeTokens.spacing["2"], fontSize: themeTokens.typography.fontSize.base };
    case "lg":
      return { x: themeTokens.spacing["6"], y: themeTokens.spacing["3"], fontSize: themeTokens.typography.fontSize.lg };
  }
}

export function Container({
  children = "",
  width = "lg",
  paddingX = "4",
}: ContainerProps): string {
  return renderElement(
    "div",
    {
      "data-ui": "container",
      style: styleToString({
        width: "100%",
        maxWidth: widthToMaxWidth(width),
        marginInline: "auto",
        paddingInline: themeTokens.spacing[paddingX],
      }),
    },
    children,
  );
}

export function Section({
  children = "",
  tone = "surface",
}: SectionProps): string {
  const background = tone === "surface" ? themeTokens.color.surface : themeTokens.color.surfaceMuted;

  return renderElement(
    "section",
    {
      "data-ui": "section",
      style: styleToString({
        background,
        color: themeTokens.color.text,
        paddingBlock: themeTokens.spacing["8"],
      }),
    },
    children,
  );
}

export function Heading({
  children,
  level = 2,
  tone = "default",
}: HeadingProps): string {
  const color = tone === "muted" ? themeTokens.color.textMuted : themeTokens.color.text;
  const fontSize = level === 1 ? themeTokens.typography.fontSize["2xl"] : level === 2 ? themeTokens.typography.fontSize.xl : themeTokens.typography.fontSize.lg;

  return renderElement(
    `h${level}`,
    {
      "data-ui": "heading",
      style: styleToString({
        margin: "0",
        color,
        fontFamily: themeTokens.typography.fontFamily.display,
        fontSize,
        lineHeight: themeTokens.typography.lineHeight.tight,
        fontWeight: themeTokens.typography.fontWeight.bold,
      }),
    },
    escapeHtml(children),
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonProps): string {
  const variantTokens = getButtonTokens(variant);
  const sizeTokens = sizeToPadding(size);

  return renderElement(
    "button",
    {
      "data-ui": "button",
      "data-variant": variant,
      type: "button",
      style: styleToString({
        appearance: "none",
        borderStyle: "solid",
        borderWidth: themeTokens.spacing.px,
        borderColor: variantTokens.border,
        borderRadius: themeTokens.radius.md,
        background: variantTokens.background,
        color: variantTokens.foreground,
        paddingInline: sizeTokens.x,
        paddingBlock: sizeTokens.y,
        fontFamily: themeTokens.typography.fontFamily.sans,
        fontSize: sizeTokens.fontSize,
        fontWeight: themeTokens.typography.fontWeight.semibold,
        lineHeight: themeTokens.typography.lineHeight.normal,
        cursor: "pointer",
        width: fullWidth ? "100%" : "auto",
      }),
    },
    escapeHtml(children),
  );
}
