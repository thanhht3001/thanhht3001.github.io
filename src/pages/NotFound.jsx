import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home } from 'lucide-react'
import './NotFound.css'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="page container not-found">
      <div className="not-found-terminal">
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
        </div>
        <div className="not-found-body">
          <p className="not-found-code">{t('not_found.title')}</p>
          <p className="not-found-message">
            <span className="terminal-prompt">~$ </span>
            {t('not_found.message')}
          </p>
          <Link to="/" className="btn btn-outline not-found-btn">
            <Home size={16} /> {t('not_found.back')}
          </Link>
        </div>
      </div>
    </div>
  )
}
