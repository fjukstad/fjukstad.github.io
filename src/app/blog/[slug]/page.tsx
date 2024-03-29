import fs from 'node:fs/promises'
import path from 'path'
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import matter from 'gray-matter';
import type { Metadata } from 'next'


type Post = {
  contentHtml: string,
  title: string,
  date: Date,
}
//
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const rootDirectory = path.join(process.cwd(), "/content");
  const files = await fs.readdir(rootDirectory);

  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }))
}

async function getPost(slug: string) {
  const content = await fs.readFile(path.join(process.cwd(), `/content/${slug}.md`));
  const { data, content: markdownContent } = matter(content);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdownContent);
  const contentHtml = processedContent.toString();

  let post: Post = {
    contentHtml: contentHtml,
    title: data.title,
    date: data.date,
  };


  return post;
}

export default async function Blog({ params }: { params: { slug: string } }) {
  let post = await getPost(params.slug);
  return (
    <div>
      <h1 className="text-2xl pb-2">{post.title}</h1>
      <div className="text-gray-500 pb-2">{post.date.toDateString()}</div>
      <article className="prose dark:prose-invert text-gray-900 dark:text-white font-light" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let post = await getPost(params.slug);
  return {
    title: post.title,
  }
}
