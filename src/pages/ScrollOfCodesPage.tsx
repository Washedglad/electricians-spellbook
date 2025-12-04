import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollText, Search, Bookmark, BookmarkCheck } from 'lucide-react'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import { useStore } from '../store/useStore'
import { CodeCategory } from '../types'

export default function ScrollOfCodesPage() {
  const { codeReferences, toggleBookmark } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CodeCategory | 'All' | 'Bookmarked'>('All')

  const categories: (CodeCategory | 'All' | 'Bookmarked')[] = [
    'All',
    'Bookmarked',
    'Wire Ampacity',
    'GFCI/AFCI',
    'Grounding',
    'Box Fill',
    'Conduit Fill',
    'General',
  ]

  const filteredCodes = codeReferences.filter(code => {
    const matchesSearch =
      code.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory =
      categoryFilter === 'All' ||
      (categoryFilter === 'Bookmarked' && code.bookmarked) ||
      code.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display font-bold text-accent-gold flex items-center">
          <ScrollText className="mr-3 h-10 w-10" />
          Scroll of Codes
        </h1>
        <p className="text-parchment/70 mt-2 font-script">
          The ancient texts of the National Electrical Code
        </p>
      </div>

      {/* Important Notice */}
      <Card variant="parchment">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 wax-seal">
            <ScrollText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-800 mb-2">
              Protective Charm Notice
            </h3>
            <p className="text-sm text-gray-700">
              This is a simplified reference guide. Always consult the complete NEC codebook 
              and local amendments for official requirements. When in doubt, verify with 
              the current edition of the NEC.
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-parchment/50" />
            <Input
              placeholder="Search codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CodeCategory | 'All' | 'Bookmarked')}
            className="spell-input"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Code List */}
      {filteredCodes.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <ScrollText className="h-16 w-16 text-parchment/30 mx-auto mb-4" />
            <h3 className="text-xl font-display text-parchment/70 mb-2">
              No codes found
            </h3>
            <p className="text-parchment/50">
              Try adjusting your search or filters
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCodes.map((code, index) => (
            <motion.div
              key={code.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover variant="parchment">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-amber-700 text-amber-50 rounded-full text-sm font-display font-bold">
                        NEC {code.section}
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-display">
                        {code.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                      {code.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {code.content}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => toggleBookmark(code.id)}
                    className="ml-4 p-2 hover:bg-amber-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {code.bookmarked ? (
                      <BookmarkCheck className="h-6 w-6 text-amber-600 fill-amber-600" />
                    ) : (
                      <Bookmark className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Reference Tables */}
      <Card>
        <h2 className="text-2xl font-display font-bold text-accent-gold mb-4">
          Quick Reference: Common Wire Ampacities (75°C)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-parchment">
            <thead>
              <tr className="border-b border-accent-gold/30">
                <th className="text-left py-3 px-4 font-display">Wire Size (AWG)</th>
                <th className="text-left py-3 px-4 font-display">Copper Ampacity</th>
                <th className="text-left py-3 px-4 font-display">Common Uses</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-accent-gold/10">
                <td className="py-3 px-4 font-bold">14</td>
                <td className="py-3 px-4">20A</td>
                <td className="py-3 px-4">15A branch circuits, lighting</td>
              </tr>
              <tr className="border-b border-accent-gold/10">
                <td className="py-3 px-4 font-bold">12</td>
                <td className="py-3 px-4">25A</td>
                <td className="py-3 px-4">20A branch circuits, receptacles</td>
              </tr>
              <tr className="border-b border-accent-gold/10">
                <td className="py-3 px-4 font-bold">10</td>
                <td className="py-3 px-4">35A</td>
                <td className="py-3 px-4">30A circuits, water heaters</td>
              </tr>
              <tr className="border-b border-accent-gold/10">
                <td className="py-3 px-4 font-bold">8</td>
                <td className="py-3 px-4">50A</td>
                <td className="py-3 px-4">40A circuits, ranges</td>
              </tr>
              <tr className="border-b border-accent-gold/10">
                <td className="py-3 px-4 font-bold">6</td>
                <td className="py-3 px-4">65A</td>
                <td className="py-3 px-4">50A-60A circuits, larger appliances</td>
              </tr>
              <tr className="border-b border-accent-gold/10">
                <td className="py-3 px-4 font-bold">4</td>
                <td className="py-3 px-4">85A</td>
                <td className="py-3 px-4">70A-80A circuits</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">2</td>
                <td className="py-3 px-4">115A</td>
                <td className="py-3 px-4">100A sub-panels</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}

