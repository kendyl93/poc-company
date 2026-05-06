import { describe, expect, it } from "vitest";
import { getButtonTokens, themeTokens } from "./index.js";

describe("@poc-company/theme", () => {
  it("exports typed theme tokens for shared usage", () => {
    expect(themeTokens.color.primary).toBe("#0f766e");
    expect(themeTokens.typography.fontFamily.sans).toContain("Inter");
    expect(themeTokens.spacing["4"]).toBe("1rem");
    expect(themeTokens.radius.pill).toBe("9999px");
  });

  it("exposes button variants through a helper", () => {
    expect(getButtonTokens("primary")).toEqual({
      background: "#0f766e",
      foreground: "#ffffff",
      border: "#0f766e",
      hoverBackground: "#115e59",
      hoverForeground: "#ffffff",
    });
    expect(getButtonTokens("ghost").background).toBe("transparent");
  });
});
