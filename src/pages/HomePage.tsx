import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Sparkles,
  Package,
  ScrollText,
  Clock,
  Map,
  Zap,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'
import Card from '../components/common/Card'
import { useStore } from '../store/useStore'

export default function HomePage() {
  const { quests, materials, activeTimer } = useStore()

  const activeQuests = quests.filter(q => q.status === 'Active')
  const lowStockMaterials = materials.filter(m => m.quantity <= m.lowStockThreshold)

  const quickActions = [
    {
      title: 'Cast Spells',
      description: 'Electrical calculations and wizardry',
      icon: Sparkles,
      href: '/spells',
      color: 'from-purple-600 to-purple-800',
    },
    {
      title: 'Active Quests',
      description: 'Manage your ongoing projects',
      icon: BookOpen,
      href: '/grimoire',
      color: 'from-emerald-600 to-emerald-800',
      badge: activeQuests.length,
    },
    {
      title: 'The Vault',
      description: 'Check your material inventory',
      icon: Package,
      href: '/vault',
      color: 'from-amber-600 to-amber-800',
      badge: lowStockMaterials.length > 0 ? lowStockMaterials.length : undefined,
    },
    {
      title: 'Time Turner',
      description: 'Track your working hours',
      icon: Clock,
      href: '/time-turner',
      color: 'from-blue-600 to-blue-800',
      isActive: !!activeTimer,
    },
    {
      title: 'Scroll of Codes',
      description: 'NEC reference guide',
      icon: ScrollText,
      href: '/codes',
      color: 'from-red-700 to-red-900',
    },
    {
      title: 'Map of Mischief',
      description: 'Job locations and directions',
      icon: Map,
      href: '/map',
      color: 'from-indigo-600 to-indigo-800',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="inline-block"
        >
          <Zap className="h-20 w-20 lightning-bolt mx-auto" />
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-display font-bold text-accent-gold">
          Welcome, Master Electrician
        </h1>
        
        <p className="text-xl font-script text-amber-200/90 italic max-w-2xl mx-auto leading-relaxed">
          "It is our choices that show what we truly are, far more than our abilities."
        </p>
        <p className="text-sm text-accent-gold/70 mt-1">
          — Albus Dumbledore
        </p>
      </div>

      {/* Status Overview */}
      {(activeQuests.length > 0 || lowStockMaterials.length > 0 || activeTimer) && (
        <Card variant="parchment">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6" />
            Current Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeQuests.length > 0 && (
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-3xl font-bold text-emerald-800">{activeQuests.length}</div>
                <div className="text-sm text-emerald-600 font-display">Active Quests</div>
              </div>
            )}
            
            {activeTimer && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2 animate-pulse" />
                  Timer Running
                </div>
                <div className="text-sm text-blue-600 font-display">Tracking time now</div>
              </div>
            )}
            
            {lowStockMaterials.length > 0 && (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2 text-amber-600" />
                  <div>
                    <div className="text-2xl font-bold text-amber-800">{lowStockMaterials.length}</div>
                    <div className="text-sm text-amber-600 font-display">Low Stock Items</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-3xl font-display font-bold text-parchment mb-6 text-center">
          Choose Your Path
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={action.href}>
                  <Card hover>
                    <div className="relative">
                      {action.badge !== undefined && action.badge > 0 && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-danger rounded-full flex items-center justify-center text-sm font-bold text-parchment shadow-lg">
                          {action.badge}
                        </div>
                      )}
                      
                      {action.isActive && (
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg" />
                      )}
                      
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-parchment mb-2">
                        {action.title}
                      </h3>
                      
                      <p className="text-parchment/70">
                        {action.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <Card variant="dark">
        <div className="border-l-4 border-accent-gold/50 pl-4 mb-6">
          <p className="text-lg font-script text-amber-200/90 italic">
            "Words are, in my not-so-humble opinion, our most inexhaustible source of magic."
          </p>
          <p className="text-sm text-accent-gold/70 mt-2">
            — Albus Dumbledore
          </p>
        </div>
        
        <h3 className="text-xl font-display font-bold text-accent-gold mb-4">
          ⚡ Magical Tips for Master Electricians
        </h3>
        <ul className="space-y-3 text-parchment/90">
          <li className="flex items-start">
            <Zap className="mr-3 h-5 w-5 text-accent-gold/70 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">Always verify voltage before casting electrical spells — safety first!</span>
          </li>
          <li className="flex items-start">
            <BookOpen className="mr-3 h-5 w-5 text-accent-gold/70 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">Keep your grimoire updated with quest progress and notes</span>
          </li>
          <li className="flex items-start">
            <Package className="mr-3 h-5 w-5 text-accent-gold/70 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">Check the Vault regularly to avoid running out of materials</span>
          </li>
          <li className="flex items-start">
            <Clock className="mr-3 h-5 w-5 text-accent-gold/70 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">Use the Time Turner to track billable hours accurately</span>
          </li>
          <li className="flex items-start">
            <ScrollText className="mr-3 h-5 w-5 text-accent-gold/70 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">Consult the Scroll of Codes when dark magic (code violations) is detected</span>
          </li>
        </ul>
      </Card>
    </motion.div>
  )
}

