import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles, BookOpen, Package, ScrollText, Map as MapIcon } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { soundManager } from '../utils/sounds'

interface SearchResult {
  type: 'quest' | 'material' | 'calculator' | 'code' | 'location'
  id: string
  title: string
  subtitle?: string
  link: string
}

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  
  const { quests, materials, codeReferences, locations } = useStore()

  const calculators = [
    { id: 'ohms-law', name: "Ohm's Law", link: '/spells' },
    { id: 'wire-size', name: 'Wire Sizing', link: '/spells' },
    { id: 'voltage-drop', name: 'Voltage Drop', link: '/spells' },
    { id: 'breaker-size', name: 'Breaker Sizing', link: '/spells' },
    { id: 'box-fill', name: 'Box Fill', link: '/spells' },
    { id: 'conduit-fill', name: 'Conduit Fill', link: '/spells' },
    { id: 'data-cable', name: 'Data Cable', link: '/spells' },
    { id: 'poe', name: 'PoE Power', link: '/spells' },
    { id: 'low-voltage', name: 'Low Voltage DC', link: '/spells' },
    { id: 'hvac-wiring', name: 'HVAC Controls', link: '/spells' },
    { id: 'plc-io', name: 'PLC I/O', link: '/spells' },
    { id: 'security-wiring', name: 'Security Wiring', link: '/spells' },
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const newResults: SearchResult[] = []

    // Search quests
    quests.forEach(quest => {
      if (
        quest.clientName.toLowerCase().includes(searchQuery) ||
        quest.location.toLowerCase().includes(searchQuery) ||
        quest.notes?.toLowerCase().includes(searchQuery)
      ) {
        newResults.push({
          type: 'quest',
          id: quest.id,
          title: quest.clientName,
          subtitle: quest.location,
          link: `/grimoire/${quest.id}`
        })
      }
    })

    // Search materials
    materials.forEach(material => {
      if (
        material.name.toLowerCase().includes(searchQuery) ||
        material.category.toLowerCase().includes(searchQuery)
      ) {
        newResults.push({
          type: 'material',
          id: material.id,
          title: material.name,
          subtitle: `${material.quantity} ${material.unit}`,
          link: '/vault'
        })
      }
    })

    // Search calculators
    calculators.forEach(calc => {
      if (calc.name.toLowerCase().includes(searchQuery)) {
        newResults.push({
          type: 'calculator',
          id: calc.id,
          title: calc.name,
          link: calc.link
        })
      }
    })

    // Search code references
    codeReferences.forEach(code => {
      if (
        code.section.toLowerCase().includes(searchQuery) ||
        code.title.toLowerCase().includes(searchQuery) ||
        code.content.toLowerCase().includes(searchQuery)
      ) {
        newResults.push({
          type: 'code',
          id: code.id,
          title: `NEC ${code.section}`,
          subtitle: code.title,
          link: '/codes'
        })
      }
    })

    // Search locations
    locations.forEach(location => {
      if (
        location.name.toLowerCase().includes(searchQuery) ||
        location.address.toLowerCase().includes(searchQuery)
      ) {
        newResults.push({
          type: 'location',
          id: location.id,
          title: location.name,
          subtitle: location.address,
          link: '/map'
        })
      }
    })

    setResults(newResults.slice(0, 20)) // Limit to 20 results
    setSelectedIndex(0)
  }, [query, quests, materials, codeReferences, locations])

  const handleSelect = (result: SearchResult) => {
    soundManager.playSpellCast()
    navigate(result.link)
    onClose()
    setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'quest': return BookOpen
      case 'material': return Package
      case 'calculator': return Sparkles
      case 'code': return ScrollText
      case 'location': return MapIcon
      default: return Search
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      quest: 'Quest',
      material: 'Material',
      calculator: 'Spell',
      code: 'Code',
      location: 'Location'
    }
    return labels[type as keyof typeof labels] || type
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-primary border-2 border-accent-gold/30 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-accent-gold/20">
                <Search className="h-5 w-5 text-accent-gold" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Accio Information... (Type to search)"
                  className="flex-1 bg-transparent text-parchment placeholder-parchment/50 outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-primary-dark/50 rounded transition-colors"
                >
                  <X className="h-5 w-5 text-parchment/70" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {query && results.length === 0 && (
                  <div className="px-4 py-8 text-center text-parchment/60">
                    <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-display">No results found</p>
                    <p className="text-sm mt-1">Try a different spell...</p>
                  </div>
                )}

                {!query && (
                  <div className="px-4 py-8 text-center text-parchment/60">
                    <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-display">Search across all your spellbook</p>
                    <p className="text-sm mt-1">Quests • Materials • Spells • Codes • Locations</p>
                    <p className="text-xs mt-3 text-parchment/40">Tip: Press Ctrl+K anytime to open search</p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((result, index) => {
                      const Icon = getIcon(result.type)
                      const isSelected = index === selectedIndex
                      
                      return (
                        <motion.button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleSelect(result)}
                          className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                            isSelected 
                              ? 'bg-accent-gold/20 border-l-4 border-accent-gold' 
                              : 'hover:bg-primary-dark/30 border-l-4 border-transparent'
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-accent-gold' : 'text-parchment/60'}`} />
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-parchment font-display">{result.title}</span>
                              <span className="text-xs text-parchment/50 font-display">
                                {getTypeLabel(result.type)}
                              </span>
                            </div>
                            {result.subtitle && (
                              <div className="text-sm text-parchment/70 mt-0.5">
                                {result.subtitle}
                              </div>
                            )}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer Hint */}
              <div className="px-4 py-2 border-t border-accent-gold/20 bg-primary-dark/30 flex items-center justify-between text-xs text-parchment/50">
                <div className="flex gap-4">
                  <span><kbd className="px-2 py-0.5 bg-primary-dark/50 rounded">↑↓</kbd> Navigate</span>
                  <span><kbd className="px-2 py-0.5 bg-primary-dark/50 rounded">Enter</kbd> Select</span>
                  <span><kbd className="px-2 py-0.5 bg-primary-dark/50 rounded">Esc</kbd> Close</span>
                </div>
                {results.length > 0 && (
                  <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

