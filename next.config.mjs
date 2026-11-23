const config = {
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  async redirects() {
    return [
      { source: "/skills", destination: "/about#toolkit", permanent: true },
      {
        source: "/experience",
        destination: "/about#experience",
        permanent: true,
      },
      { source: "/ai-pov", destination: "/writing", permanent: true },
      { source: "/exploring", destination: "/about#toolkit", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
export default config;
