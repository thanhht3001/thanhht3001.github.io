import { useState, useEffect } from 'react'

export function useParallax(speed = 0.05) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationId
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationId)
      animationId = requestAnimationFrame(() => {
        const x = (e.clientX - window.innerWidth / 2) * speed
        const y = (e.clientY - window.innerHeight / 2) * speed
        setOffset({ x, y })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [speed])

  return offset
}
