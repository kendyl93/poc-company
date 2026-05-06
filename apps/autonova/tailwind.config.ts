import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
};

export default config;
