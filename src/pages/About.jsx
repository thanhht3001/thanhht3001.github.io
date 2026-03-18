import { useTranslation } from 'react-i18next'
import { MapPin, Code, Coffee, Bike } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlowCard from '../components/ui/GlowCard'
import './About.css'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('about.title')}</h1>
        <p className="page-subtitle">{t('about.subtitle')}</p>
      </ScrollReveal>

      <div className="about-grid">
        <div className="about-main">
          <GlowCard>
            <div className="about-intro">
              <img src="/images/avatar.jpg" alt="Ho Tan Thanh" className="about-avatar" />
              <div>
                <p className="about-intro-text">{t('about.intro')}</p>
                <p className="about-location">
                  <MapPin size={16} /> Ho Chi Minh City, Vietnam
                </p>
              </div>
            </div>
          </GlowCard>

          <ScrollReveal delay={100}>
            <section className="about-section">
              <h2 className="section-heading">
                <Code size={20} /> {t('about.story_title')}
              </h2>
              <p>{t('about.story_p1')}</p>
              <p>{t('about.story_p2')}</p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <section className="about-section">
              <h2 className="section-heading">
                <Coffee size={20} /> {t('about.philosophy_title')}
              </h2>
              <p>{t('about.philosophy')}</p>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <section className="about-section">
              <h2 className="section-heading">
                <Bike size={20} /> {t('about.hobbies_title')}
              </h2>
              <p>{t('about.hobbies')}</p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
