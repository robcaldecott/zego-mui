/** @type {import('next').NextConfig} */

const withBundleStats = require("next-plugin-bundle-stats");

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["components", "mocks", "pages", "providers", "types", "utils"],
  },
};

module.exports = withBundleStats(nextConfig);
