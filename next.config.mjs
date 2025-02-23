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
