export async function loadBlogIndex() {
  try {
    const res = await fetch('/blog-index.json')
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export async function loadBlogPost(lang, slug) {
  try {
    const res = await fetch(`/blog/${lang}/${slug}.md`)
    if (!res.ok) return null
    const text = await res.text()
    // Parse simple frontmatter
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return { content: text, meta: {} }

    const frontmatter = match[1]
    const content = match[2]
    const meta = {}
    frontmatter.split('\n').forEach(line => {
      const [key, ...vals] = line.split(':')
      if (key && vals.length) {
        const value = vals.join(':').trim().replace(/^["']|["']$/g, '')
        meta[key.trim()] = value
      }
    })
    return { content, meta }
  } catch {
    return null
  }
}
