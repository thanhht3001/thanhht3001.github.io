import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, ArrowLeft } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import './WinnerForm.css'

export default function WinnerForm({ target, onBack }) {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')

  const targetLabels = { win: t('game.target_win'), draw: t('game.target_draw'), lose: t('game.target_lose') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch('https://formsubmit.co/ajax/74211834d37acc6bd94215c959145ee8', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
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
    <div className="winner-form-wrapper">
      <GlowCard>
        <form className="winner-form" onSubmit={handleSubmit}>
          <h2 className="winner-form-title">{t('game.reward_title')}</h2>
          <p className="winner-form-desc">{t('game.reward_desc')}</p>

          <input type="hidden" name="_subject" value={`XO Winner - ${targetLabels[target]}`} />
          <input type="text" name="_honey" style={{ display: 'none' }} />

          <div className="form-group">
            <label htmlFor="winner-name">{t('game.form_name')}</label>
            <input type="text" id="winner-name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="winner-email">{t('game.form_email')}</label>
            <input type="email" id="winner-email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="winner-message">{t('game.form_message')}</label>
            <textarea id="winner-message" name="message" rows="3"></textarea>
          </div>

          <div className="winner-form-actions">
            <button type="submit" className="btn btn-primary btn-glow" disabled={status === 'sending'}>
              <Send size={16} />
              {status === 'sending' ? t('game.form_sending') : t('game.form_submit')}
            </button>
            <button type="button" className="btn btn-outline" onClick={onBack}>
              <ArrowLeft size={16} />
              {t('game.back_menu')}
            </button>
          </div>

          {status === 'success' && <p className="form-status success">{t('game.form_success')}</p>}
          {status === 'error' && <p className="form-status error">{t('game.form_error')}</p>}
        </form>
      </GlowCard>
    </div>
  )
}
