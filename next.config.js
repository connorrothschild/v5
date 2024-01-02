/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/award/:splat*",
        destination: "https://connorrothschild.github.io/v4/award/:splat*",
        permanent: true,
      },
      {
        source: "/project/:splat*",
        destination: "https://connorrothschild.github.io/v4/project/:splat*",
        permanent: true,
      },
      {
        source: "/post/:splat*",
        destination: "https://connorrothschild.github.io/v4/post/:splat*",
        permanent: true,
      },
      {
        source: "/viz",
        destination: "https://connorrothschild.github.io/v4/viz",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
