import { getButtonTokens, themeTokens, type ButtonVariant } from "@poc-company/theme";

type StyleValue = string | number | undefined;

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

export function textStyles(options?: {
  tone?: "default" | "muted" | "eyebrow";
  align?: "left" | "center";
}): string {
  const tone = options?.tone ?? "default";
  const align = options?.align ?? "left";

  return styleToString({
    margin: "0",
    color:
      tone === "muted"
        ? themeTokens.color.textMuted
        : tone === "eyebrow"
          ? themeTokens.color.primary
          : themeTokens.color.text,
    textAlign: align,
    fontFamily:
      tone === "eyebrow"
        ? themeTokens.typography.fontFamily.mono
        : themeTokens.typography.fontFamily.sans,
    fontSize:
      tone === "eyebrow"
        ? themeTokens.typography.fontSize.sm
        : themeTokens.typography.fontSize.base,
    lineHeight:
      tone === "eyebrow"
        ? themeTokens.typography.lineHeight.tight
        : themeTokens.typography.lineHeight.relaxed,
    fontWeight:
      tone === "eyebrow"
        ? themeTokens.typography.fontWeight.bold
        : themeTokens.typography.fontWeight.regular,
    letterSpacing: tone === "eyebrow" ? "0.12em" : undefined,
    textTransform: tone === "eyebrow" ? "uppercase" : undefined,
  });
}

export function renderText(
  content: string,
  options?: {
    tone?: "default" | "muted" | "eyebrow";
    align?: "left" | "center";
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
  size?: "sm" | "md" | "lg";
  target?: "_blank" | "_self";
}): string {
  const variant = options.variant ?? "primary";
  const tokens = getButtonTokens(variant);
  const size = options.size ?? "md";
  const sizeTokens =
    size === "sm"
      ? {
          x: themeTokens.spacing["3"],
          y: themeTokens.spacing["2"],
          fontSize: themeTokens.typography.fontSize.sm,
        }
      : size === "lg"
        ? {
            x: themeTokens.spacing["6"],
            y: themeTokens.spacing["3"],
            fontSize: themeTokens.typography.fontSize.lg,
          }
        : {
            x: themeTokens.spacing["4"],
            y: themeTokens.spacing["2"],
            fontSize: themeTokens.typography.fontSize.base,
          };

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
  width?: "lg" | "xl" | "full";
}): string {
  const width = options?.width ?? "xl";
  const maxWidth = width === "full" ? "none" : width === "lg" ? "64rem" : "80rem";

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
    level?: 1 | 2 | 3;
    align?: "left" | "center";
  },
): string {
  const level = options?.level ?? 2;
  const fontSize =
    level === 1
      ? themeTokens.typography.fontSize["2xl"]
      : level === 2
        ? themeTokens.typography.fontSize.xl
        : themeTokens.typography.fontSize.lg;

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

