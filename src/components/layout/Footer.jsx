import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Mail, Heart, Coffee } from 'lucide-react'
import { social } from '../../data/social'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-social">
          <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${social.email}`} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        <p className="footer-text">
          {t('footer.made_with')} <Heart size={14} className="footer-icon heart" /> {t('footer.and')} <Coffee size={14} className="footer-icon" /> {t('footer.by')}
        </p>
        <p className="footer-copyright">
          &copy; {year} thanhht.org
        </p>
      </div>
    </footer>
  )
}
