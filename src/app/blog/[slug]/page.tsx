import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import fs from 'node:fs/promises'
import path from 'path'

type Post = {
  contentHtml: string,
  title: string,
  date: string,
}

async function getPost(slug: string) {
  const content = await fs.readFile(path.join(process.cwd(), `/content/${slug}.md`));
  const matterResult = matter(content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  let post = { contentHtml, ...matterResult.data } as Post;
  return post;
}

export default async function Blog({ params }: { params: { slug: string } }) {
  let post = await getPost(params.slug);
  console.log(post);
  return (
    <div>
      <div className="text-2xl pb-2">{post.title}</div>
      <div className="text-gray-500 pb-2">{post.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}
