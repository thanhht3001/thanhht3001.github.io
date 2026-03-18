import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import TerminalText from '../ui/TerminalText'
import FloatingParticles from '../ui/FloatingParticles'
import MagneticButton from '../ui/MagneticButton'
import ScrollReveal from '../ui/ScrollReveal'
import './HeroSection.css'

export default function HeroSection() {
  const { t, i18n } = useTranslation()

  const terminalTexts = i18n.language === 'vi'
    ? [
        'echo "Xin chào! Mình là Thành 👋"',
        'cat skills.txt → .NET, Blazor, React',
        'echo "Đam mê code & đi phượt 🏍️"',
      ]
    : [
        'echo "Hi there! I\'m Thanh 👋"',
        'cat skills.txt → .NET, Blazor, React',
        'echo "Passionate about code & road trips 🏍️"',
      ]

  return (
    <section className="hero">
      <FloatingParticles count={35} />
      <div className="container hero-inner">
        <div className="hero-content">
          <ScrollReveal direction="left">
            <p className="hero-greeting">{t('hero.greeting')}</p>
            <h1 className="hero-name">{t('hero.name')}</h1>
            <p className="hero-role">{t('hero.role')}</p>
          </ScrollReveal>
          <ScrollReveal delay={200} direction="left">
            <p className="hero-desc">{t('hero.description')}</p>
          </ScrollReveal>
          <ScrollReveal delay={400} direction="up">
            <div className="hero-actions">
              <MagneticButton>
                <Link to="/projects" className="btn btn-primary btn-glow">
                  {t('hero.cta_projects')} <ArrowRight size={16} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="btn btn-outline">
                  <Mail size={16} /> {t('hero.cta_contact')}
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={300} direction="right">
          <div className="hero-terminal">
            <TerminalText texts={terminalTexts} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
