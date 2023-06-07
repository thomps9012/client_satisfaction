const withPWA = require("next-pwa")({
  dest: "public",
});
module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
});
