import { useRef, useCallback } from 'react'

export function useTilt({ maxTilt = 10, scale = 1.02, speed = 400, glare = true } = {}) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`
    el.style.transition = `transform ${speed / 4}ms ease-out`

    if (glare) {
      const glareEl = el.querySelector('.tilt-glare')
      if (glareEl) {
        const percentX = (x / rect.width) * 100
        const percentY = (y / rect.height) * 100
        glareEl.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
      }
    }
  }, [maxTilt, scale, speed, glare])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    el.style.transition = `transform ${speed}ms ease-out`

    if (glare) {
      const glareEl = el.querySelector('.tilt-glare')
      if (glareEl) {
        glareEl.style.background = 'transparent'
      }
    }
  }, [speed, glare])

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}
