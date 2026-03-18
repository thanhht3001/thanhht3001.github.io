import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { loadBlogIndex } from '../utils/blogLoader'
import TechTag from '../components/ui/TechTag'
import ScrollReveal from '../components/ui/ScrollReveal'
import './Blog.css'

export default function Blog() {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState([])
  const lang = i18n.language

  useEffect(() => {
    loadBlogIndex().then(all => {
      const filtered = all.filter(p => p.lang === lang)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(filtered)
    })
  }, [lang])

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('blog.title')}</h1>
        <p className="page-subtitle">{t('blog.subtitle')}</p>
      </ScrollReveal>

      {posts.length === 0 ? (
        <p className="blog-empty">{t('blog.no_posts')}</p>
      ) : (
        <div className="blog-list">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 120}>
              <Link to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-meta">
                  <span><Calendar size={14} /> {post.date}</span>
                  {post.readTime && <span><Clock size={14} /> {post.readTime} {t('blog.min_read')}</span>}
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                {post.tags && (
                  <div className="blog-card-tags">
                    {post.tags.map(tag => <TechTag key={tag} name={tag} />)}
                  </div>
                )}
                <span className="blog-card-read">
                  {t('blog.read_more')} <ArrowRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
