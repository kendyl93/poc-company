/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@poc-company/cms",
    "@poc-company/lib",
    "@poc-company/sections",
    "@poc-company/theme",
    "@poc-company/ui",
  ],
  webpack(config) {
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      ".js": [".ts", ".tsx", ".js"],
      ".mjs": [".mts", ".mjs"],
    };

    return config;
  },
};

export default nextConfig;
