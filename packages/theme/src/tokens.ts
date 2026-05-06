export type ThemeColorTokens = {
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  focus: string;
};

export type ThemeTypographyTokens = {
  fontFamily: {
    sans: string;
    display: string;
    mono: string;
  };
  fontSize: {
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
};

export type ThemeSpacingTokens = {
  px: string;
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "6": string;
  "8": string;
  "12": string;
  "16": string;
};

export type ThemeRadiusTokens = {
  sm: string;
  md: string;
  lg: string;
  pill: string;
};

export type ThemeButtonVariantTokens = {
  background: string;
  foreground: string;
  border: string;
  hoverBackground: string;
  hoverForeground: string;
};

export type ThemeTokens = {
  color: ThemeColorTokens;
  typography: ThemeTypographyTokens;
  spacing: ThemeSpacingTokens;
  radius: ThemeRadiusTokens;
  button: {
    primary: ThemeButtonVariantTokens;
    secondary: ThemeButtonVariantTokens;
    ghost: ThemeButtonVariantTokens;
  };
};

export type ButtonVariant = keyof ThemeTokens["button"];

export const themeTokens = {
  color: {
    surface: "#ffffff",
    surfaceMuted: "#f7f8fa",
    text: "#111827",
    textMuted: "#4b5563",
    border: "#d1d5db",
    primary: "#0f766e",
    primaryForeground: "#ffffff",
    secondary: "#e2e8f0",
    secondaryForeground: "#0f172a",
    focus: "#2563eb",
  },
  typography: {
    fontFamily: {
      sans: '"Inter", "Segoe UI", sans-serif',
      display: '"Inter", "Segoe UI", sans-serif',
      mono: '"SFMono-Regular", Consolas, monospace',
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
    lineHeight: {
      tight: "1.1",
      normal: "1.5",
      relaxed: "1.75",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    px: "1px",
    "0": "0rem",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "6": "1.5rem",
    "8": "2rem",
    "12": "3rem",
    "16": "4rem",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    pill: "9999px",
  },
  button: {
    primary: {
      background: "#0f766e",
      foreground: "#ffffff",
      border: "#0f766e",
      hoverBackground: "#115e59",
      hoverForeground: "#ffffff",
    },
    secondary: {
      background: "#e2e8f0",
      foreground: "#0f172a",
      border: "#cbd5e1",
      hoverBackground: "#cbd5e1",
      hoverForeground: "#0f172a",
    },
    ghost: {
      background: "transparent",
      foreground: "#0f172a",
      border: "transparent",
      hoverBackground: "#f1f5f9",
      hoverForeground: "#0f172a",
    },
  },
} as const satisfies ThemeTokens;

export function getButtonTokens(variant: ButtonVariant) {
  return themeTokens.button[variant];
}
