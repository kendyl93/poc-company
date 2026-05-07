import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { sharedPackageNames } from "./workspace-packages.js";

const packageAliases = Object.fromEntries(
  sharedPackageNames.map((name) => [
    `@poc-company/${name}`,
    fileURLToPath(new URL(`./packages/${name}/src/index.ts`, import.meta.url)),
  ]),
);

export default defineConfig({
  resolve: {
    alias: {
      "@poc-company/cms/blocks": fileURLToPath(
        new URL("./packages/cms/src/blocks/index.ts", import.meta.url),
      ),
      "@poc-company/cms/rendering/BlockRenderer": fileURLToPath(
        new URL(
          "./packages/cms/src/rendering/BlockRenderer.ts",
          import.meta.url,
        ),
      ),
      ...packageAliases,
    },
  },
  test: {
    include: [
      "tests/**/*.test.ts",
      "tests/**/*.test.tsx",
      "**/src/**/*.test.ts",
      "**/src/**/*.test.tsx",
    ],
    environment: "node",
  },
});
