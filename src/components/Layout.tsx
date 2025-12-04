import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { soundManager } from '../utils/sounds'
import { getRandomQuote } from '../utils/quotes'
import {
  BookOpen,
  Sparkles,
  Package,
  ScrollText,
  Clock,
  Map,
  Menu,
  X,
  Zap,
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote())
  const location = useLocation()

  // Play transition sound on route change
  useEffect(() => {
    soundManager.playTransition()
  }, [location.pathname])

  // Change quote periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(getRandomQuote())
    }, 30000) // Change quote every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Zap },
    { name: 'Grimoire', href: '/grimoire', icon: BookOpen },
    { name: 'Spells', href: '/spells', icon: Sparkles },
    { name: 'Vault', href: '/vault', icon: Package },
    { name: 'Codes', href: '/codes', icon: ScrollText },
    { name: 'Time Turner', href: '/time-turner', icon: Clock },
    { name: 'Map', href: '/map', icon: Map },
  ]

  return (
    <div className="min-h-screen">
      {/* Floating magical orbs background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl floating-orb" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-secondary-green/10 rounded-full blur-3xl floating-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-secondary-burgundy/10 rounded-full blur-3xl floating-orb" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-accent-gold/20 bg-primary/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Zap className="h-8 w-8 lightning-bolt" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-accent-gold">
                  The Electrician's
                </h1>
                <p className="text-sm font-script text-parchment/80">Spellbook</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      relative px-4 py-2 rounded-lg flex items-center space-x-2
                      transition-all duration-200
                      ${isActive
                        ? 'text-accent-gold'
                        : 'text-parchment/70 hover:text-parchment hover:bg-primary-dark/50'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-accent-gold/20 to-amber-500/20 rounded-lg border border-accent-gold/30"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <Icon className="h-5 w-5 relative z-10" />
                    <span className="font-display text-sm relative z-10">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Sound toggle */}
            <button
              onClick={() => {
                const enabled = soundManager.toggle()
                setSoundEnabled(enabled)
              }}
              className="hidden md:block p-2 rounded-lg text-parchment hover:bg-primary-dark/50 transition-colors"
              title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
            >
              <span className="text-xl">{soundEnabled ? '🔊' : '🔇'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-parchment hover:bg-primary-dark/50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-accent-gold/20 bg-primary-dark/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-accent-gold/20 to-amber-500/20 text-accent-gold border border-accent-gold/30'
                        : 'text-parchment/70 hover:bg-primary-dark/50'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-display">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-accent-gold/30 bg-gradient-to-b from-primary/90 to-primary-dark/95 backdrop-blur-md shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            key={currentQuote.quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Decorative top border */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent w-full max-w-md"></div>
            </div>
            
            {/* Quote */}
            <p className="font-script text-lg text-amber-200/90 italic max-w-2xl mx-auto leading-relaxed">
              "{currentQuote.quote}"
            </p>
            
            {/* Author */}
            <p className="mt-3 font-serif text-accent-gold/80 text-sm tracking-wide">
              — {currentQuote.author}
            </p>
            
            {/* Decorative separator */}
            <div className="flex items-center justify-center my-6">
              <Zap className="h-4 w-4 text-accent-gold/40" />
              <div className="h-px bg-accent-gold/20 w-12 mx-2"></div>
              <Sparkles className="h-4 w-4 text-accent-gold/40" />
              <div className="h-px bg-accent-gold/20 w-12 mx-2"></div>
              <Zap className="h-4 w-4 text-accent-gold/40" />
            </div>
            
            {/* Copyright */}
            <p className="text-xs text-parchment/50 font-display tracking-wider">
              The Electrician's Spellbook © 2025
            </p>
            <p className="text-xs text-parchment/40 mt-1">
              ⚡ Where Magic Meets Electrical Mastery ⚡
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

