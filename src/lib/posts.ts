import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

type TocItem = {
  value: string;
  depth: number;
  slug: string;
};

type PostData = {
  id: string;
  title: string;
  date: string;
  content: string;
  tableOfContents: TocItem[];
};

const postsDirectory = path.join(process.cwd(), "posts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function getPost(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  // Extract TOC items
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
        // For h3s, prefix with parent h2's slug
        slug = `${currentH2Slug}-${slug}`;
      }

      // Handle duplicate slugs
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

  // Process content
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  // Add IDs to headings
  let htmlContent = processedContent.toString();
  tocItems.forEach((item) => {
    const headingRegex = new RegExp(
      `<h${item.depth}>([^<]*|<strong>[^<]*</strong>|[^<]*<strong>[^<]*</strong>[^<]*)</h${item.depth}>`,
      "g"
    );

    // Only replace the first occurrence to avoid duplicates
    let found = false;
    htmlContent = htmlContent.replace(headingRegex, (match, p1) => {
      if (!found && p1.replace(/<[^>]*>/g, "").trim() === item.value) {
        found = true;
        return `<h${item.depth} id="${item.slug}">${p1}</h${item.depth}>`;
      }
      return match;
    });
  });

  return {
    id,
    title: data.title,
    date: data.date,
    content: htmlContent,
    tableOfContents: tocItems,
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
