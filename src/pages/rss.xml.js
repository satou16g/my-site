<<<<<<< HEAD
import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('./*.mdx', { eager: true });
const posts = Object.values(postImportResult).filter((post) => !post.frontmatter.draft);

export const get = () => rss({
  title: 'milk roll | by Cade Cuddy',
  description: 'Software, life, and adventure',
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    pubDate: post.frontmatter.pubDate,
  })),
  customData: `<language>en-us</language>`,
});
=======
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import { PandaConfig } from '../config.js'
const { site, description, title } = PandaConfig

export const prerender = true

const parser = new MarkdownIt()

export async function GET({ params }) {
    const blog = await getCollection('posts')
    const posts = blog
        .filter((i) => i.data.title && !i.data.draft)
        .map((post) => {
            const html = parser.render(post.body)
            return {
                ...post.data,
                link: `/posts/${post.slug}/`,
                content: html
            }
        })
    return new Response(
        (
            await rss({
                site,
                title,
                description,
                items: posts
            })
        ).body,
        {
            headers: {
                'content-type': 'application/xml'
            }
        }
    )
}
>>>>>>> 5d7ddc5 (tag)
