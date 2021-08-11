import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import type PostType from "../types/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .map((slug) => slug.replace(/\.md$/, ""));
}

function getBySlug(slug: string) {
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
}

export function getPostBySlug(slug: string): PostType {
  const { data, content } = getBySlug(slug);

  return {
    title: data["title"],
    date: data["date"],
    slug: slug,
    coverImage: data["coverImage"],
    content: content,
    ogImage: data["ogImage"],
  };
}

export function getAllPosts(): PostType[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const { data } = getBySlug(slug);
      return {
        title: data["title"],
        date: data["date"],
        slug: slug,
        coverImage: data["coverImage"],
      } as PostType;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
