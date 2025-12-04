import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Trash2,
  Image as ImageIcon,
  Plus,
  CheckCircle2,
} from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useStore } from '../store/useStore'
import { QuestStatus } from '../types'
import { format } from 'date-fns'

export default function QuestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getQuestById, updateQuest, deleteQuest } = useStore()
  
  const quest = id ? getQuestById(id) : undefined
  const [isEditing, setIsEditing] = useState(false)
  const [newMaterial, setNewMaterial] = useState('')
  const [editedQuest, setEditedQuest] = useState(quest)

  if (!quest) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-display text-parchment">Quest not found</h2>
        <Link to="/grimoire">
          <Button className="mt-4">Return to Grimoire</Button>
        </Link>
      </div>
    )
  }

  const handleSave = () => {
    if (editedQuest && id) {
      updateQuest(id, editedQuest)
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this quest?')) {
      deleteQuest(id!)
      navigate('/grimoire')
    }
  }

  const handleAddMaterial = () => {
    if (newMaterial.trim() && editedQuest) {
      setEditedQuest({
        ...editedQuest,
        materialsNeeded: [...editedQuest.materialsNeeded, newMaterial.trim()],
      })
      setNewMaterial('')
    }
  }

  const handleRemoveMaterial = (index: number) => {
    if (editedQuest) {
      setEditedQuest({
        ...editedQuest,
        materialsNeeded: editedQuest.materialsNeeded.filter((_, i) => i !== index),
      })
    }
  }

  const handleStatusChange = (status: QuestStatus) => {
    if (editedQuest) {
      const updates: any = { status }
      if (status === 'Completed' && !editedQuest.completionDate) {
        updates.completionDate = new Date().toISOString()
      }
      setEditedQuest({ ...editedQuest, ...updates })
    }
  }

  const currentQuest = isEditing ? editedQuest! : quest

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/grimoire">
          <Button variant="ghost" icon={<ArrowLeft className="h-5 w-5" />}>
            Back to Grimoire
          </Button>
        </Link>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} icon={<Save className="h-5 w-5" />}>
                Save Changes
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditedQuest(quest)
                  setIsEditing(false)
                }}
                icon={<X className="h-5 w-5" />}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} icon={<Edit3 className="h-5 w-5" />}>
                Edit Quest
              </Button>
              <Button variant="danger" onClick={handleDelete} icon={<Trash2 className="h-5 w-5" />}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Info */}
      <Card variant="parchment">
        <div className="space-y-4">
          {isEditing ? (
            <>
              <Input
                label="Client Name"
                value={currentQuest.clientName}
                onChange={(e) => setEditedQuest({ ...currentQuest, clientName: e.target.value })}
              />
              <Input
                label="Location Name"
                value={currentQuest.location}
                onChange={(e) => setEditedQuest({ ...currentQuest, location: e.target.value })}
              />
              <Input
                label="Address"
                value={currentQuest.address}
                onChange={(e) => setEditedQuest({ ...currentQuest, address: e.target.value })}
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-display font-bold text-gray-900">
                {currentQuest.clientName}
              </h1>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-2" />
                <div>
                  <div className="font-semibold">{currentQuest.location}</div>
                  <div className="text-sm text-gray-600">{currentQuest.address}</div>
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-300">
            <div>
              <label className="text-sm text-gray-600 font-display">Start Date</label>
              {isEditing ? (
                <Input
                  type="date"
                  value={currentQuest.startDate}
                  onChange={(e) => setEditedQuest({ ...currentQuest, startDate: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <div className="flex items-center text-gray-800 mt-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(currentQuest.startDate), 'MMMM d, yyyy')}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 font-display">Status</label>
              {isEditing ? (
                <select
                  value={currentQuest.status}
                  onChange={(e) => handleStatusChange(e.target.value as QuestStatus)}
                  className="mt-1 w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-amber-600 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Brewing">Brewing (Planning)</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-display
                    ${currentQuest.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                      currentQuest.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {currentQuest.status === 'Completed' && <CheckCircle2 className="h-4 w-4 mr-1" />}
                    {currentQuest.status}
                  </span>
                </div>
              )}
            </div>
          </div>

          {currentQuest.completionDate && (
            <div className="pt-2">
              <label className="text-sm text-gray-600 font-display">Completion Date</label>
              <div className="flex items-center text-gray-800 mt-1">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                {format(new Date(currentQuest.completionDate), 'MMMM d, yyyy')}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Notes */}
      <Card>
        <h2 className="text-2xl font-display font-bold text-accent-gold mb-4">
          Quest Notes
        </h2>
        {isEditing ? (
          <textarea
            value={currentQuest.notes}
            onChange={(e) => setEditedQuest({ ...currentQuest, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border-2 border-accent-gold/30 text-parchment min-h-[150px] focus:border-accent-gold focus:outline-none"
            placeholder="Add notes about this quest..."
          />
        ) : (
          <p className="text-parchment/80 whitespace-pre-wrap">
            {currentQuest.notes || 'No notes yet. Click Edit Quest to add notes.'}
          </p>
        )}
      </Card>

      {/* Materials Needed */}
      <Card>
        <h2 className="text-2xl font-display font-bold text-accent-gold mb-4">
          Materials Needed
        </h2>
        
        {isEditing && (
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add material..."
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial()}
              className="flex-1"
            />
            <Button onClick={handleAddMaterial} icon={<Plus className="h-5 w-5" />}>
              Add
            </Button>
          </div>
        )}

        {currentQuest.materialsNeeded.length === 0 ? (
          <p className="text-parchment/60 italic">
            No materials listed yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {currentQuest.materialsNeeded.map((material, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-primary-dark/30 rounded-lg"
              >
                <span className="text-parchment">{material}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveMaterial(index)}
                    className="p-1 text-danger hover:bg-danger/20 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Photos Section */}
      <Card>
        <h2 className="text-2xl font-display font-bold text-accent-gold mb-4 flex items-center">
          <ImageIcon className="mr-2 h-6 w-6" />
          Quest Photos
        </h2>
        
        <div className="text-center py-8 text-parchment/60">
          <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>Photo upload feature - Coming soon!</p>
          <p className="text-sm mt-2">
            This feature will allow you to capture job site images
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

