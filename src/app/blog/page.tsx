import fs from 'node:fs/promises'
import path from 'path'
import matter, { GrayMatterFile } from 'gray-matter';
import Link from 'next/link'

interface Posts extends GrayMatterFile<Buffer> {
  slug: string;
}

async function getPosts() {

  let posts: Posts[] = [];
  const rootDirectory = path.join(process.cwd(), "/content");
  const files = await fs.readdir(rootDirectory);

  for (const filename of files) {
    let fileContents = await fs.readFile(`${rootDirectory}/${filename}`);
    const matterResult = matter(fileContents);
    let post = { ...matterResult, slug: filename.replace(".md", "") };
    posts.push(post);
  }

  return posts;

}
export default async function Blog() {
  let posts = await getPosts();
  console.log(posts);
  return (
    <>
      <div>
        {posts.map((post) => {
          return <div key={post.content}>
            <Link href={`/blog/${post.slug}`}>{String(post.data.title)}</Link>
            {post.data.date}
          </div>;
        })}
      </div>
    </>
  )
}
