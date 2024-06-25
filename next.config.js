/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  rewrites: async () => {
    return [
      {
        source: "/api/p/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/p/:path*"
            : "/api/p/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/p/docs"
            : "/api/p/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/api/p/openapi.json",
      },
    ];
  },
};

module.exports = nextConfig;
