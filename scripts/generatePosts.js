const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "posts");
const outputFile = path.join(process.cwd(), "public/posts.json");

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      id,
      title: data.title,
      category: data.category,
      synopsisForLlms: data.synopsisForLlms,
    };
  });

  return allPostsData;
}

const posts = getAllPosts();
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log("Generated posts.json successfully!");
