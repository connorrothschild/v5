import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 31536000, // 1 year in seconds
  },
  experimental: {
    scrollRestoration: false,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/award/:splat*",
        destination: "https://v4.connorrothschild.com/award/:splat*",
        permanent: true,
      },
      {
        source: "/project/:splat*",
        destination: "https://v4.connorrothschild.com/project/:splat*",
        permanent: true,
      },
      {
        source: "/post/:splat*",
        destination: "https://v4.connorrothschild.com/post/:splat*",
        permanent: true,
      },
      {
        source: "/viz",
        destination: "https://v4.connorrothschild.com/viz",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
