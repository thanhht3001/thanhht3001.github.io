import { useTilt } from '../../hooks/useTilt'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './GlowCard.css'

export default function GlowCard({ children, className = '', delay = 0, tiltOptions = {} }) {
  const tilt = useTilt({ maxTilt: 8, scale: 1.03, ...tiltOptions })
  const { ref: revealRef, isVisible } = useScrollReveal()

  return (
    <div
      ref={(el) => {
        tilt.ref.current = el
        revealRef.current = el
      }}
      className={`glow-card ${className} ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="glow-card-border" />
      <div className="tilt-glare" />
      <div className="glow-card-content">
        {children}
      </div>
    </div>
  )
}
