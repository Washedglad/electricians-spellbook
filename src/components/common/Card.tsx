import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  variant?: 'dark' | 'parchment'
  className?: string
  hover?: boolean
}

export default function Card({ 
  children, 
  variant = 'dark',
  className = '',
  hover = false 
}: CardProps) {
  const baseVariant = variant === 'parchment' ? 'parchment-card' : 'dark-card'
  
  const cardContent = (
    <div className={`${baseVariant} ${className}`}>
      {/* Decorative corner ornaments */}
      {variant === 'dark' && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-gold/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-gold/30 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-gold/30 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-gold/30 rounded-br-lg" />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )

  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return cardContent
}

