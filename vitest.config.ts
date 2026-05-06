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
    alias: packageAliases,
  },
  test: {
    include: ["tests/**/*.test.ts", "**/src/**/*.test.ts"],
    environment: "node",
  },
});
