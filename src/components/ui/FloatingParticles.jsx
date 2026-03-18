import { useEffect, useRef } from 'react'
import './FloatingParticles.css'

export default function FloatingParticles({ count = 30 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'

      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const y = Math.random() * 100
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * -20
      const opacity = Math.random() * 0.4 + 0.1

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
      `
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [count])

  return <div ref={containerRef} className="floating-particles" />
}
