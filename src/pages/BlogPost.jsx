import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { ArrowLeft } from 'lucide-react'
import { loadBlogPost } from '../utils/blogLoader'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    loadBlogPost(i18n.language, slug).then(data => {
      setPost(data)
      setLoading(false)
    })
  }, [slug, i18n.language])

  if (loading) {
    return (
      <div className="page container">
        <div className="loading-screen">
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="page container">
        <p>Post not found.</p>
        <Link to="/blog">{t('blog.back')}</Link>
      </div>
    )
  }

  return (
    <div className="page container">
      <Link to="/blog" className="blog-back">
        <ArrowLeft size={16} /> {t('blog.back')}
      </Link>
      {post.meta.title && <h1 className="blogpost-title">{post.meta.title}</h1>}
      {post.meta.date && <p className="blogpost-date">{post.meta.date}</p>}
      <article className="blogpost-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
