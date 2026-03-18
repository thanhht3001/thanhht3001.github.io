import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, basename } from 'path'
import matter from 'gray-matter'

const BLOG_DIR = join(process.cwd(), 'content', 'blog')
const OUTPUT = join(process.cwd(), 'public', 'blog-index.json')

const posts = []

for (const lang of ['vi', 'en']) {
  const langDir = join(BLOG_DIR, lang)
  if (!existsSync(langDir)) continue

  for (const file of readdirSync(langDir)) {
    if (!file.endsWith('.md')) continue
    const raw = readFileSync(join(langDir, file), 'utf-8')
    const { data } = matter(raw)
    const slug = basename(file, '.md')

    // Estimate read time: ~200 words/min
    const wordCount = raw.split(/\s+/).length
    const readTime = Math.max(1, Math.round(wordCount / 200))

    posts.push({
      slug,
      lang,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      readTime
    })
  }
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date))
writeFileSync(OUTPUT, JSON.stringify(posts, null, 2))
console.log(`Generated blog index: ${posts.length} posts`)
