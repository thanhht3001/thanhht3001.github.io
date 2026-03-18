import { useTranslation } from 'react-i18next'
import { Briefcase, GraduationCap, Award, Flag, Compass, MapPin, Navigation } from 'lucide-react'
import TechTag from '../components/ui/TechTag'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { timeline } from '../data/timeline'
import './Timeline.css'

const iconMap = {
  flag: Flag,
  building: Briefcase,
  graduation: GraduationCap,
  award: Award,
  compass: Compass,
  start: Navigation,
}

function MotorbikeSVG() {
  return (
    <svg className="road-motorbike" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="30" r="8" stroke="var(--accent)" strokeWidth="2.5" fill="none"/>
      <circle cx="12" cy="30" r="3" fill="var(--accent)"/>
      <circle cx="52" cy="30" r="8" stroke="var(--accent)" strokeWidth="2.5" fill="none"/>
      <circle cx="52" cy="30" r="3" fill="var(--accent)"/>
      <path d="M12 30 L22 16 L36 14 L42 22 L52 30" stroke="var(--terminal-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M22 16 L26 8 L34 8 L36 14" stroke="var(--terminal-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M30 8 L30 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 4 L34 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="30" cy="3" r="1.5" fill="var(--terminal-yellow)"/>
    </svg>
  )
}

function MountainSVG() {
  return (
    <svg className="road-mountains" viewBox="0 0 900 120" preserveAspectRatio="none">
      <path d="M0 120 L60 55 L110 80 L170 25 L240 70 L300 15 L370 60 L420 35 L490 75 L550 20 L620 65 L680 40 L750 80 L810 30 L870 65 L900 45 L900 120 Z"
        fill="var(--bg-tertiary)" opacity="0.25"/>
      <path d="M0 120 L80 65 L150 90 L210 45 L280 78 L350 35 L430 82 L500 50 L570 88 L640 42 L710 72 L770 48 L840 78 L900 55 L900 120 Z"
        fill="var(--bg-tertiary)" opacity="0.45"/>
    </svg>
  )
}

/* The winding road SVG — drawn to snake left-right */
function WindingRoadSVG({ stopCount }) {
  const segH = 220
  const totalH = segH * (stopCount + 1) + 80
  const W = 900
  const cx = W / 2
  const amp = 200 // how far the road curves left/right

  // Build a winding S-curve path
  let roadPath = `M ${cx} 0`
  let dashPath = `M ${cx} 0`
  for (let i = 0; i <= stopCount; i++) {
    const y1 = i * segH + segH * 0.5
    const y2 = (i + 1) * segH
    const dir = i % 2 === 0 ? 1 : -1
    roadPath += ` C ${cx} ${y1 - 40}, ${cx + amp * dir} ${y1 - 20}, ${cx + amp * dir} ${y1}`
    roadPath += ` C ${cx + amp * dir} ${y1 + 20}, ${cx} ${y2 - 40}, ${cx} ${y2}`
    dashPath += ` C ${cx} ${y1 - 40}, ${cx + amp * dir} ${y1 - 20}, ${cx + amp * dir} ${y1}`
    dashPath += ` C ${cx + amp * dir} ${y1 + 20}, ${cx} ${y2 - 40}, ${cx} ${y2}`
  }

  return (
    <svg className="winding-road-svg" viewBox={`0 0 ${W} ${totalH}`} preserveAspectRatio="none">
      {/* Road surface */}
      <path d={roadPath} stroke="var(--bg-tertiary)" strokeWidth="52" fill="none" strokeLinecap="round"/>
      {/* Road borders */}
      <path d={roadPath} stroke="var(--border-color)" strokeWidth="56" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d={roadPath} stroke="var(--bg-tertiary)" strokeWidth="50" fill="none" strokeLinecap="round"/>
      {/* Center dashes */}
      <path d={dashPath} stroke="var(--terminal-yellow)" strokeWidth="3" fill="none" strokeDasharray="16 12" opacity="0.5" strokeLinecap="round"/>
    </svg>
  )
}

function RoadSignSVG({ text }) {
  return (
    <div className="road-sign">
      <div className="road-sign-board">
        <span>{text}</span>
      </div>
      <div className="road-sign-pole" />
    </div>
  )
}

export default function Timeline() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { ref: bikeRef, isVisible: bikeVisible } = useScrollReveal()

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('timeline.title')}</h1>
        <p className="page-subtitle">{t('timeline.subtitle')}</p>
      </ScrollReveal>

      <div className="road-journey">
        <MountainSVG />

        {/* Motorbike at the top */}
        <div ref={bikeRef} className={`road-bike-wrap ${bikeVisible ? 'arrived' : ''}`}>
          <MotorbikeSVG />
          <RoadSignSVG text={lang === 'vi' ? 'Hiện tại' : 'Now'} />
        </div>

        {/* Winding road background */}
        <div className="road-svg-wrap">
          <WindingRoadSVG stopCount={timeline.length} />
        </div>

        {/* Stops along the winding road */}
        <div className="road-stops">
          {timeline.map((item, index) => {
            const Icon = iconMap[item.icon] || MapPin
            const isLeft = index % 2 === 0
            return (
              <ScrollReveal
                key={index}
                delay={index * 180}
                direction={isLeft ? 'left' : 'right'}
              >
                <div className={`road-stop ${isLeft ? 'stop-left' : 'stop-right'} ${item.type}`}>
                  {/* Pin on the road */}
                  <div className="road-pin-wrap">
                    <div className={`road-pin ${item.type}`}>
                      <Icon size={18} />
                    </div>
                    <div className="road-pin-stick" />
                    <span className="road-km">{item.km}</span>
                  </div>

                  {/* Content card */}
                  <div className="road-card">
                    <div className="road-card-arrow" />
                    <div className="road-card-header">
                      <span className="road-card-year">{item.year}</span>
                      <span className={`road-card-badge ${item.type}`}>
                        {item.type === 'work' && (lang === 'vi' ? 'Cung \u0111\u01B0\u1EDDng' : 'Work')}
                        {item.type === 'education' && (lang === 'vi' ? '\u0110i\u1EC3m d\u1EEBng' : 'Edu')}
                        {item.type === 'certificate' && (lang === 'vi' ? 'Chi\u1EBFn t\u00EDch' : 'Cert')}
                      </span>
                    </div>
                    <h3 className="road-card-title">{item.title[lang] || item.title.en}</h3>
                    {item.company && (
                      <p className="road-card-company">
                        <MapPin size={13} />
                        {item.company[lang] || item.company.en}
                      </p>
                    )}
                    <p className="road-card-desc">{item.description[lang] || item.description.en}</p>
                    {item.tech && (
                      <div className="road-card-tech">
                        {item.tech.map(t => <TechTag key={t} name={t} />)}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}

          {/* Start flag */}
          <ScrollReveal delay={timeline.length * 180}>
            <div className="road-start">
              <div className="road-start-flag">
                <Navigation size={20} />
                <span>{lang === 'vi' ? 'Kh\u1EDFi h\u00E0nh!' : 'Journey begins!'}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
