import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { social } from '../data/social'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlowCard from '../components/ui/GlowCard'
import './Contact.css'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const [status, setStatus] = useState('idle')
  const lang = i18n.language

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch('https://formspree.io/f/xpznqkaq', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('contact.title')}</h1>
        <p className="page-subtitle">{t('contact.subtitle')}</p>
      </ScrollReveal>

      <div className="contact-grid">
        <GlowCard delay={100}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="contact-intro">{t('contact.intro')}</p>

            <div className="form-group">
              <label htmlFor="name">{t('contact.name')}</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.email')}</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-glow" disabled={status === 'sending'}>
              <Send size={16} />
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {status === 'success' && <p className="form-status success">{t('contact.success')}</p>}
            {status === 'error' && <p className="form-status error">{t('contact.error')}</p>}
          </form>
        </GlowCard>

        <GlowCard delay={250}>
          <div className="contact-info">
            <h3>{t('contact.or_reach')}</h3>
            <div className="contact-info-list">
              <a href={`mailto:${social.email}`} className="contact-info-item">
                <Mail size={18} /> {social.email}
              </a>
              <a href={`tel:${social.phone.replace(/\s/g, '')}`} className="contact-info-item">
                <Phone size={18} /> {social.phone}
              </a>
              <span className="contact-info-item">
                <MapPin size={18} /> {social.location[lang] || social.location.en}
              </span>
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <Github size={18} /> GitHub
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="contact-info-item">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
