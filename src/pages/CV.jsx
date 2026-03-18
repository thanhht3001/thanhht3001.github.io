import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, FileText } from 'lucide-react'
import './CV.css'

export default function CV() {
  const { t, i18n } = useTranslation()
  const [viewLang, setViewLang] = useState(i18n.language)

  const cvMap = {
    vi: { html: '/cv/CV_HoTanThanh.html', pdf: '/cv/CV-HoTanThanh.pdf' },
    en: { html: '/cv/CV_HoTanThanh_EN.html', pdf: '/cv/CV-HoTanThanh-EN.pdf' }
  }

  const current = cvMap[viewLang]

  return (
    <div className="page container">
      <h1 className="page-title">{t('cv.title')}</h1>
      <p className="page-subtitle">{t('cv.subtitle')}</p>

      <div className="cv-actions">
        <div className="cv-lang-toggle">
          <button
            className={`cv-lang-btn ${viewLang === 'vi' ? 'active' : ''}`}
            onClick={() => setViewLang('vi')}
          >
            {t('cv.view_vi')}
          </button>
          <button
            className={`cv-lang-btn ${viewLang === 'en' ? 'active' : ''}`}
            onClick={() => setViewLang('en')}
          >
            {t('cv.view_en')}
          </button>
        </div>
        <a href={current.pdf} download className="btn btn-primary">
          <Download size={16} /> {t('cv.download')}
        </a>
      </div>

      <div className="cv-iframe-wrap">
        <iframe
          key={viewLang}
          src={current.html}
          title="CV"
          className="cv-iframe"
        />
      </div>
    </div>
  )
}
