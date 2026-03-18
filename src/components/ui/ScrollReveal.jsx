import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ScrollReveal.css'

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${direction} ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
