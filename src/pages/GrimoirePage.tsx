import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Flask,
} from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import { useStore } from '../store/useStore'
import { Quest, QuestStatus } from '../types'
import { format } from 'date-fns'

export default function GrimoirePage() {
  const { quests, addQuest } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<QuestStatus | 'All'>('All')
  const [formData, setFormData] = useState({
    clientName: '',
    location: '',
    address: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'Active' as QuestStatus,
    notes: '',
  })

  const filteredQuests = quests.filter(quest => {
    const matchesSearch = quest.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || quest.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      ...formData,
      materialsNeeded: [],
      photos: [],
    }
    
    addQuest(newQuest)
    setShowModal(false)
    setFormData({
      clientName: '',
      location: '',
      address: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      notes: '',
    })
  }

  const getStatusIcon = (status: QuestStatus) => {
    switch (status) {
      case 'Active':
        return <Clock className="h-5 w-5 text-blue-400" />
      case 'Completed':
        return <CheckCircle2 className="h-5 w-5 text-green-400" />
      case 'Brewing':
        return <Flask className="h-5 w-5 text-purple-400" />
    }
  }

  const getStatusColor = (status: QuestStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Brewing':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-accent-gold flex items-center">
            <BookOpen className="mr-3 h-10 w-10" />
            The Grimoire
          </h1>
          <p className="text-parchment/70 mt-2 font-script">
            Your tome of active quests and completed enchantments
          </p>
        </div>
        
        <Button onClick={() => setShowModal(true)} icon={<Plus className="h-5 w-5" />}>
          New Quest
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-parchment/50" />
            <Input
              placeholder="Search quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {(['All', 'Active', 'Brewing', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`
                  flex-1 px-4 py-2 rounded-lg font-display text-sm transition-all
                  ${statusFilter === status
                    ? 'bg-accent-gold text-primary-dark'
                    : 'bg-primary-dark/50 text-parchment/70 hover:bg-primary-dark'
                  }
                `}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-800">
                {quests.filter(q => q.status === 'Active').length}
              </div>
              <div className="text-sm text-gray-600 font-display">Active Quests</div>
            </div>
            <Clock className="h-10 w-10 text-blue-600" />
          </div>
        </Card>
        
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-800">
                {quests.filter(q => q.status === 'Brewing').length}
              </div>
              <div className="text-sm text-gray-600 font-display">In Planning</div>
            </div>
            <Flask className="h-10 w-10 text-purple-600" />
          </div>
        </Card>
        
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-800">
                {quests.filter(q => q.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600 font-display">Completed</div>
            </div>
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Quest List */}
      {filteredQuests.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-parchment/30 mx-auto mb-4" />
            <h3 className="text-xl font-display text-parchment/70 mb-2">
              No quests found
            </h3>
            <p className="text-parchment/50 mb-6">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your filters'
                : 'Begin your journey by creating a new quest'
              }
            </p>
            {!searchTerm && statusFilter === 'All' && (
              <Button onClick={() => setShowModal(true)}>
                Create Your First Quest
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/grimoire/${quest.id}`}>
                <Card hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-parchment mb-1">
                        {quest.clientName}
                      </h3>
                      <div className="flex items-center text-parchment/70 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {quest.location}
                      </div>
                    </div>
                    
                    <div className={`flex items-center px-3 py-1 rounded-full border ${getStatusColor(quest.status)}`}>
                      {getStatusIcon(quest.status)}
                      <span className="ml-2 text-sm font-display">{quest.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-parchment/60 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    Started: {format(new Date(quest.startDate), 'MMM d, yyyy')}
                  </div>
                  
                  {quest.notes && (
                    <p className="text-parchment/70 text-sm line-clamp-2">
                      {quest.notes}
                    </p>
                  )}
                  
                  {quest.materialsNeeded.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-accent-gold/20">
                      <div className="text-xs text-parchment/60">
                        {quest.materialsNeeded.length} materials needed
                      </div>
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* New Quest Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Quest"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Client Name"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
            placeholder="Enter client name"
          />
          
          <Input
            label="Location Name"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            placeholder="e.g., Residential, Commercial Site"
          />
          
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            placeholder="Full address"
          />
          
          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          
          <div>
            <label className="block text-sm font-display text-parchment/90 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as QuestStatus })}
              className="spell-input"
            >
              <option value="Active">Active</option>
              <option value="Brewing">Brewing (Planning)</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-display text-parchment/90 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="spell-input min-h-[100px]"
              placeholder="Add any initial notes..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Quest
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  )
}

