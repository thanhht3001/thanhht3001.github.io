import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/sections/HeroSection'
import ProjectCard from '../components/ui/ProjectCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlowCard from '../components/ui/GlowCard'
import { projects } from '../data/projects'
import './Home.css'

export default function Home() {
  const { t } = useTranslation()
  const featured = projects.filter(p => p.featured).slice(0, 3)

  return (
    <>
      <HeroSection />

      <section className="home-about container">
        <GlowCard>
          <div className="home-about-card">
            <h2 className="section-heading">{t('home.about_title')}</h2>
            <p className="home-about-text">{t('home.about_text')}</p>
            <Link to="/about" className="home-link">
              {t('nav.about')} <ArrowRight size={16} />
            </Link>
          </div>
        </GlowCard>
      </section>

      <section className="home-projects container">
        <ScrollReveal>
          <div className="home-section-header">
            <h2 className="section-heading">{t('home.featured_projects')}</h2>
            <Link to="/projects" className="home-link">
              {t('home.view_all')} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
        <div className="projects-grid">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 150} />
          ))}
        </div>
      </section>
    </>
  )
}
