import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
}

export default function MagicalParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 5; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
        })
      }
      setParticles(prev => [...prev, ...newParticles])

      // Remove particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
      }, 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle, index) => {
          const angle = (index / 5) * Math.PI * 2
          const distance = 50
          const targetX = Math.cos(angle) * distance
          const targetY = Math.sin(angle) * distance

          return (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-accent-gold rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: targetX,
                y: targetY,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

