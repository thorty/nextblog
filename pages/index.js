import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import matter from 'gray-matter'
import Post from '../components/Post'
import { flushSync } from 'react-dom'
import {sortByDate} from '../utils'

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>NESGAMER</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="posts">
        {posts.map( (post, index) => (
           <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}


export async function getStaticProps() {
  // get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));
  // get slug and frontmatter from posts
  const posts = files.map(filename => {
    // create slug
    const slug = filename.replace('.md', '');

    //get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }

  })

    return {
      props: {
        posts: posts.sort(sortByDate)
      }
    }
}