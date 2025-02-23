import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypeHeadingIds from "./rehype-heading-ids";

type TocItem = {
  value: string;
  depth: number;
  slug: string;
};

type PostData = {
  id: string;
  title: string;
  date: string;
  category: string;
  content: MDXRemoteSerializeResult;
  tableOfContents: TocItem[];
  showToc?: boolean;
  showTopImage?: boolean;
  image?: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function extractTocItems(content: string): TocItem[] {
  const tocItems: TocItem[] = [];
  const lines = content.split("\n");
  let currentH2Slug = "";
  const usedSlugs = new Set<string>();

  lines.forEach((line) => {
    if (line.startsWith("##")) {
      const depth = line.match(/^#{2,6}/)?.[0].length || 2;
      const value = line
        .replace(/^#{2,6}\s+/, "")
        .replace(/\*\*/g, "")
        .trim();

      let slug = slugify(value);

      if (depth === 2) {
        currentH2Slug = slug;
      } else if (depth === 3) {
        slug = `${currentH2Slug}-${slug}`;
      }

      let uniqueSlug = slug;
      let counter = 1;
      while (usedSlugs.has(uniqueSlug)) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
      usedSlugs.add(uniqueSlug);

      tocItems.push({
        value,
        depth,
        slug: uniqueSlug,
      });
    }
  });

  return tocItems;
}

export async function getPost(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  // Extract TOC items before processing MDX
  const tocItems = extractTocItems(content);

  // Process content with MDX
  const mdxContent = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeHeadingIds]],
      format: "mdx",
      development: false,
    },
  });

  return {
    id,
    title: data.title,
    date: data.date,
    category: data.category,
    content: mdxContent,
    tableOfContents: tocItems,
    showTopImage: data.showTopImage,
    showToc: data.showToc,
    image: data.image,
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
}

export async function getAllPosts(): Promise<PostData[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      return await getPost(id);
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
