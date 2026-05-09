import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { tiktok } from '../../data/tiktok'
import './TikTokSection.css'

export default function TikTokSection() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Load TikTok embed script
    const loadScript = () => {
      if (document.querySelector('script[src*="tiktok.com/embed"]')) {
        // Script already exists, re-render
        if (window.tiktokEmbed?.lib) {
          window.tiktokEmbed.lib.render(containerRef.current)
        }
        return
      }
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }

    if (!scriptLoaded.current) {
      loadScript()
      scriptLoaded.current = true
    } else if (window.tiktokEmbed?.lib) {
      window.tiktokEmbed.lib.render(containerRef.current)
    }
  }, [])

  return (
    <div className="tiktok-section" ref={containerRef}>
      <h3 className="tiktok-heading">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="tiktok-icon">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z"/>
        </svg>
        {t('blog.tiktok_title')}
      </h3>

      {/* TikTok Official Creator Profile Embed */}
      <div className="tiktok-embed-wrap">
        <blockquote
          className="tiktok-embed"
          cite={tiktok.profileUrl}
          data-unique-id={tiktok.username.replace('@', '')}
          data-embed-from="oembed"
          data-embed-type="creator"
          style={{ maxWidth: '780px', minWidth: '288px' }}
        >
          <section>
            <a target="_blank" rel="noopener noreferrer" href={`${tiktok.profileUrl}?refer=creator_embed`}>
              {tiktok.username}
            </a>
          </section>
        </blockquote>
      </div>
    </div>
  )
}
