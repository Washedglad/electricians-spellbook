import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Map,
  Plus,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Trash2,
  ExternalLink,
  History,
} from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import { useStore } from '../store/useStore'
import { JobLocation } from '../types'

export default function MapOfMischiefPage() {
  const { locations, quests, addLocation, updateLocation, deleteLocation } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<JobLocation | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingLocation) {
      updateLocation(editingLocation.id, formData)
      setEditingLocation(null)
    } else {
      const newLocation: JobLocation = {
        id: crypto.randomUUID(),
        ...formData,
        questHistory: [],
      }
      addLocation(newLocation)
    }
    
    setShowModal(false)
    setFormData({
      name: '',
      address: '',
      contactPerson: '',
      phone: '',
      email: '',
      notes: '',
    })
  }

  const handleEdit = (location: JobLocation) => {
    setEditingLocation(location)
    setFormData({
      name: location.name,
      address: location.address,
      contactPerson: location.contactPerson,
      phone: location.phone,
      email: location.email || '',
      notes: location.notes || '',
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this location?')) {
      deleteLocation(id)
    }
  }

  const getDirectionsUrl = (address: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  }

  const getQuestsByLocation = (locationId: string) => {
    return quests.filter(q => q.address === locations.find(l => l.id === locationId)?.address)
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
            <Map className="mr-3 h-10 w-10" />
            Map of Mischief
          </h1>
          <p className="text-parchment/70 mt-2 font-script">
            Navigate to your quest locations with magical precision
          </p>
        </div>
        
        <Button onClick={() => {
          setEditingLocation(null)
          setFormData({
            name: '',
            address: '',
            contactPerson: '',
            phone: '',
            email: '',
            notes: '',
          })
          setShowModal(true)
        }} icon={<Plus className="h-5 w-5" />}>
          Add Location
        </Button>
      </div>

      {/* Location Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-800">
                {locations.length}
              </div>
              <div className="text-sm text-gray-600 font-display">Total Locations</div>
            </div>
            <MapPin className="h-10 w-10 text-blue-600" />
          </div>
        </Card>
        
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-800">
                {locations.filter(l => getQuestsByLocation(l.id).some(q => q.status === 'Active')).length}
              </div>
              <div className="text-sm text-gray-600 font-display">Active Sites</div>
            </div>
            <Map className="h-10 w-10 text-green-600" />
          </div>
        </Card>
        
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-800">
                {quests.length}
              </div>
              <div className="text-sm text-gray-600 font-display">Total Quests</div>
            </div>
            <History className="h-10 w-10 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Location List */}
      {locations.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Map className="h-16 w-16 text-parchment/30 mx-auto mb-4" />
            <h3 className="text-xl font-display text-parchment/70 mb-2">
              No locations yet
            </h3>
            <p className="text-parchment/50 mb-6">
              Add your job site locations to quickly navigate and track quest history
            </p>
            <Button onClick={() => setShowModal(true)}>
              Add Your First Location
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {locations.map((location, index) => {
            const locationQuests = getQuestsByLocation(location.id)
            const activeQuests = locationQuests.filter(q => q.status === 'Active')
            
            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-parchment mb-2">
                          {location.name}
                        </h3>
                        
                        <div className="flex items-start text-parchment/70 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>

                        {activeQuests.length > 0 && (
                          <div className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-display">
                            {activeQuests.length} Active Quest{activeQuests.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(location)}
                          className="p-2 text-accent-gold hover:bg-accent-gold/20 rounded transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(location.id)}
                          className="p-2 text-danger hover:bg-danger/20 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-accent-gold/20 space-y-2">
                      <div className="flex items-center text-parchment/80 text-sm">
                        <Phone className="h-4 w-4 mr-2 text-accent-gold" />
                        <span className="font-semibold mr-2">{location.contactPerson}:</span>
                        <a href={`tel:${location.phone}`} className="hover:text-accent-gold">
                          {location.phone}
                        </a>
                      </div>
                      
                      {location.email && (
                        <div className="flex items-center text-parchment/80 text-sm">
                          <Mail className="h-4 w-4 mr-2 text-accent-gold" />
                          <a href={`mailto:${location.email}`} className="hover:text-accent-gold">
                            {location.email}
                          </a>
                        </div>
                      )}
                    </div>

                    {location.notes && (
                      <p className="text-parchment/60 text-sm italic pt-2 border-t border-accent-gold/20">
                        {location.notes}
                      </p>
                    )}

                    <div className="pt-4">
                      <a
                        href={getDirectionsUrl(location.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold rounded-lg transition-colors font-display text-sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Get Directions
                      </a>
                    </div>

                    {locationQuests.length > 0 && (
                      <div className="pt-4 border-t border-accent-gold/20">
                        <div className="flex items-center text-parchment/70 text-sm">
                          <History className="h-4 w-4 mr-2" />
                          {locationQuests.length} quest{locationQuests.length !== 1 ? 's' : ''} at this location
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Location Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingLocation(null)
        }}
        title={editingLocation ? 'Edit Location' : 'Add New Location'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Location Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., Smith Residence, Downtown Office"
          />
          
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            placeholder="Full street address"
          />
          
          <Input
            label="Contact Person"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            required
            placeholder="Primary contact name"
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            placeholder="(555) 123-4567"
          />
          
          <Input
            label="Email (Optional)"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="contact@example.com"
          />
          
          <div>
            <label className="block text-sm font-display text-parchment/90 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="spell-input min-h-[100px]"
              placeholder="Access codes, parking info, special instructions..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingLocation ? 'Update Location' : 'Add Location'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowModal(false)
                setEditingLocation(null)
              }}
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

