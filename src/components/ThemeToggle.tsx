import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { soundManager } from '../utils/sounds'

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme()

  const handleToggle = () => {
    soundManager.playSpellCast()
    toggleTheme()
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-2 rounded-lg hover:bg-primary-dark/50 transition-colors group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Lumos (Light Mode)' : 'Nox (Dark Mode)'}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{ 
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
            scale: isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-6 h-6 text-accent-gold" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
            scale: isDark ? 0.5 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-6 h-6 text-accent-gold" />
        </motion.div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-dark rounded-lg text-parchment text-xs font-display whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isDark ? 'Lumos' : 'Nox'}
      </span>
    </motion.button>
  )
}

