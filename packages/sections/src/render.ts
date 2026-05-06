import { getButtonTokens, themeTokens, type ButtonVariant } from "@poc-company/theme";

type StyleValue = string | number | undefined;
type TextTone = "default" | "muted" | "eyebrow";
type TextAlign = "left" | "center";
type ButtonSize = "sm" | "md" | "lg";
type ContainerWidth = "lg" | "xl" | "full";
type HeadingLevel = 1 | 2 | 3;

type TextStyleTokens = {
  color: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  textTransform?: string;
};

type ButtonSizeTokens = {
  x: string;
  y: string;
  fontSize: string;
};

const textToneStyles: Record<TextTone, TextStyleTokens> = {
  default: {
    color: themeTokens.color.text,
    fontFamily: themeTokens.typography.fontFamily.sans,
    fontSize: themeTokens.typography.fontSize.base,
    lineHeight: themeTokens.typography.lineHeight.relaxed,
    fontWeight: themeTokens.typography.fontWeight.regular,
  },
  muted: {
    color: themeTokens.color.textMuted,
    fontFamily: themeTokens.typography.fontFamily.sans,
    fontSize: themeTokens.typography.fontSize.base,
    lineHeight: themeTokens.typography.lineHeight.relaxed,
    fontWeight: themeTokens.typography.fontWeight.regular,
  },
  eyebrow: {
    color: themeTokens.color.primary,
    fontFamily: themeTokens.typography.fontFamily.mono,
    fontSize: themeTokens.typography.fontSize.sm,
    lineHeight: themeTokens.typography.lineHeight.tight,
    fontWeight: themeTokens.typography.fontWeight.bold,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
};

const buttonSizeTokens: Record<ButtonSize, ButtonSizeTokens> = {
  sm: {
    x: themeTokens.spacing["3"],
    y: themeTokens.spacing["2"],
    fontSize: themeTokens.typography.fontSize.sm,
  },
  md: {
    x: themeTokens.spacing["4"],
    y: themeTokens.spacing["2"],
    fontSize: themeTokens.typography.fontSize.base,
  },
  lg: {
    x: themeTokens.spacing["6"],
    y: themeTokens.spacing["3"],
    fontSize: themeTokens.typography.fontSize.lg,
  },
};

const headingFontSizes: Record<HeadingLevel, string> = {
  1: themeTokens.typography.fontSize["2xl"],
  2: themeTokens.typography.fontSize.xl,
  3: themeTokens.typography.fontSize.lg,
};

const containerMaxWidths: Record<ContainerWidth, string> = {
  lg: "64rem",
  xl: "80rem",
  full: "none",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function styleToString(style: Record<string, StyleValue>): string {
  return Object.entries(style)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
}

function renderElement(
  tagName:
    | "a"
    | "article"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "li"
    | "p"
    | "section"
    | "span"
    | "ul",
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

export function joinHtml(...parts: Array<string | undefined | false>): string {
  return parts
    .filter((part): part is string => typeof part === "string" && part.length > 0)
    .join("");
}

export function textStyles(options?: {
  tone?: TextTone;
  align?: TextAlign;
}): string {
  const tone = options?.tone ?? "default";
  const align = options?.align ?? "left";
  const toneStyles = textToneStyles[tone];

  return styleToString({
    margin: "0",
    color: toneStyles.color,
    textAlign: align,
    fontFamily: toneStyles.fontFamily,
    fontSize: toneStyles.fontSize,
    lineHeight: toneStyles.lineHeight,
    fontWeight: toneStyles.fontWeight,
    letterSpacing: toneStyles.letterSpacing,
    textTransform: toneStyles.textTransform,
  });
}

export function renderText(
  content: string,
  options?: {
    tone?: TextTone;
    align?: TextAlign;
    tagName?: "p" | "span";
  },
): string {
  return renderElement(
    options?.tagName ?? "p",
    {
      style: textStyles(options),
    },
    escapeHtml(content),
  );
}

export function renderAction(options: {
  label: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  target?: "_blank" | "_self";
}): string {
  const variant = options.variant ?? "primary";
  const tokens = getButtonTokens(variant);
  const size = options.size ?? "md";
  const sizeTokens = buttonSizeTokens[size];

  const content = escapeHtml(options.label);
  const sharedStyle = styleToString({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeTokens.spacing["2"],
    appearance: "none",
    textDecoration: "none",
    borderStyle: "solid",
    borderWidth: themeTokens.spacing.px,
    borderColor: tokens.border,
    borderRadius: themeTokens.radius.md,
    background: tokens.background,
    color: tokens.foreground,
    paddingInline: sizeTokens.x,
    paddingBlock: sizeTokens.y,
    fontFamily: themeTokens.typography.fontFamily.sans,
    fontSize: sizeTokens.fontSize,
    fontWeight: themeTokens.typography.fontWeight.semibold,
    lineHeight: themeTokens.typography.lineHeight.normal,
  });

  if (options.href) {
    return renderElement(
      "a",
      {
        href: options.href,
        target: options.target,
        rel:
          options.target === "_blank"
            ? "noreferrer noopener"
            : undefined,
        style: sharedStyle,
      },
      content,
    );
  }

  return renderElement(
    "span",
    {
      "data-role": "button",
      style: sharedStyle,
    },
    content,
  );
}

export function renderSectionShell(children: string, tone: "surface" | "muted" = "surface"): string {
  return renderElement(
    "section",
    {
      "data-section": tone,
      style: styleToString({
        background:
          tone === "surface"
            ? themeTokens.color.surface
            : themeTokens.color.surfaceMuted,
        color: themeTokens.color.text,
        paddingBlock: themeTokens.spacing["16"],
      }),
    },
    children,
  );
}

export function renderContainer(children: string, options?: {
  width?: ContainerWidth;
}): string {
  const width = options?.width ?? "xl";
  const maxWidth = containerMaxWidths[width];

  return renderElement(
    "div",
    {
      "data-section": "container",
      style: styleToString({
        width: "100%",
        maxWidth,
        marginInline: "auto",
        paddingInline: themeTokens.spacing["4"],
      }),
    },
    children,
  );
}

export function renderHeading(
  content: string,
  options?: {
    level?: HeadingLevel;
    align?: TextAlign;
  },
): string {
  const level = options?.level ?? 2;
  const fontSize = headingFontSizes[level];

  return renderElement(
    `h${level}`,
    {
      style: styleToString({
        margin: "0",
        color: themeTokens.color.text,
        textAlign: options?.align ?? "left",
        fontFamily: themeTokens.typography.fontFamily.display,
        fontSize,
        lineHeight: themeTokens.typography.lineHeight.tight,
        fontWeight: themeTokens.typography.fontWeight.bold,
      }),
    },
    escapeHtml(content),
  );
}

export function renderGrid(children: string, options?: { columns?: 2 | 3 | 4 }): string {
  const columns = options?.columns ?? 3;

  return renderElement(
    "div",
    {
      style: styleToString({
        display: "grid",
        gap: themeTokens.spacing["6"],
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }),
    },
    children,
  );
}

export function renderCard(children: string): string {
  return renderElement(
    "article",
    {
      style: styleToString({
        borderStyle: "solid",
        borderWidth: themeTokens.spacing.px,
        borderColor: themeTokens.color.border,
        borderRadius: themeTokens.radius.lg,
        background: themeTokens.color.surface,
        padding: themeTokens.spacing["6"],
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
      }),
    },
    children,
  );
}

export function renderList(children: string): string {
  return renderElement(
    "ul",
    {
      style: styleToString({
        listStyle: "none",
        padding: "0",
        margin: "0",
        display: "grid",
        gap: themeTokens.spacing["4"],
      }),
    },
    children,
  );
}

export function renderListItem(children: string): string {
  return renderElement(
    "li",
    {
      style: styleToString({
        margin: "0",
      }),
    },
    children,
  );
}

export function renderSubheading(children: string, options?: { align?: "left" | "center" }): string {
  return renderElement(
    "p",
    {
      style: styleToString({
        margin: "0",
        color: themeTokens.color.textMuted,
        textAlign: options?.align ?? "left",
        fontFamily: themeTokens.typography.fontFamily.sans,
        fontSize: themeTokens.typography.fontSize.lg,
        lineHeight: themeTokens.typography.lineHeight.relaxed,
      }),
    },
    escapeHtml(children),
  );
}
