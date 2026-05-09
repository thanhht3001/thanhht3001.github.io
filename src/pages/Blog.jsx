import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Briefcase, Coffee } from 'lucide-react'
import { loadBlogIndex } from '../utils/blogLoader'
import TechTag from '../components/ui/TechTag'
import ScrollReveal from '../components/ui/ScrollReveal'
import TikTokSection from '../components/ui/TikTokSection'
import './Blog.css'

const CATEGORIES = [
  { key: 'all', icon: null },
  { key: 'work', icon: Briefcase },
  { key: 'life', icon: Coffee },
]

export default function Blog() {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState('all')
  const lang = i18n.language

  useEffect(() => {
    loadBlogIndex().then(all => {
      const filtered = all.filter(p => p.lang === lang)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(filtered)
    })
  }, [lang])

  const filtered = category === 'all'
    ? posts
    : posts.filter(p => p.category === category)

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('blog.title')}</h1>
        <p className="page-subtitle">{t('blog.subtitle')}</p>
      </ScrollReveal>

      <div className="blog-tabs">
        {CATEGORIES.map(({ key, icon: Icon }) => (
          <button
            key={key}
            className={`blog-tab ${category === key ? 'active' : ''}`}
            onClick={() => setCategory(key)}
          >
            {Icon && <Icon size={15} />}
            {t(`blog.cat_${key}`)}
          </button>
        ))}
      </div>

      {(category === 'all' || category === 'life') && (
        <TikTokSection />
      )}

      {filtered.length === 0 ? (
        <p className="blog-empty">{t('blog.no_posts')}</p>
      ) : (
        <div className="blog-list">
          {filtered.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 120}>
              <Link to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-meta">
                  <span><Calendar size={14} /> {post.date}</span>
                  {post.readTime && <span><Clock size={14} /> {post.readTime} {t('blog.min_read')}</span>}
                  <span className={`blog-card-cat cat-${post.category}`}>
                    {post.category === 'work' ? <Briefcase size={12} /> : <Coffee size={12} />}
                    {t(`blog.cat_${post.category}`)}
                  </span>
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
