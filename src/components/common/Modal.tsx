import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`relative w-full ${sizeClasses[size]} bg-gradient-to-br from-primary via-primary-dark to-primary-dark rounded-lg shadow-2xl border-2 border-accent-gold/30 overflow-hidden`}
              >
                {/* Decorative scroll top */}
                <div className="h-8 bg-gradient-to-b from-amber-900/30 to-transparent" />
                
                {/* Header */}
                <div className="px-6 pb-4 flex items-center justify-between border-b border-accent-gold/20">
                  <h2 className="text-2xl font-display font-bold text-accent-gold">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-parchment/60 hover:text-parchment hover:bg-primary-dark/50 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {children}
                </div>

                {/* Decorative scroll bottom */}
                <div className="h-8 bg-gradient-to-t from-amber-900/30 to-transparent" />
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

