import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const packageAliases = {
  "@poc-company/ui": fileURLToPath(new URL("./packages/ui/src/index.ts", import.meta.url)),
  "@poc-company/sections": fileURLToPath(new URL("./packages/sections/src/index.ts", import.meta.url)),
  "@poc-company/theme": fileURLToPath(new URL("./packages/theme/src/index.ts", import.meta.url)),
  "@poc-company/cms": fileURLToPath(new URL("./packages/cms/src/index.ts", import.meta.url)),
  "@poc-company/lib": fileURLToPath(new URL("./packages/lib/src/index.ts", import.meta.url)),
};

export default defineConfig({
  resolve: {
    alias: packageAliases,
  },
  test: {
    include: ["tests/**/*.test.ts", "**/src/**/*.test.ts"],
    environment: "node",
  },
});
