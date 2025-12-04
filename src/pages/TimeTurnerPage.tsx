import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Play, Square, Calendar, DollarSign, Trash2 } from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { useStore } from '../store/useStore'
import { format } from 'date-fns'

export default function TimeTurnerPage() {
  const { 
    quests, 
    activeTimer, 
    timeEntries, 
    hourlyRate, 
    startTimer, 
    stopTimer, 
    deleteTimeEntry,
    setHourlyRate 
  } = useStore()
  
  const [selectedQuestId, setSelectedQuestId] = useState<string>('')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [editingRate, setEditingRate] = useState(false)
  const [newRate, setNewRate] = useState(hourlyRate.toString())

  useEffect(() => {
    if (activeTimer) {
      const interval = setInterval(() => {
        const now = new Date()
        const start = new Date(activeTimer.startTime)
        setElapsedTime(Math.floor((now.getTime() - start.getTime()) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setElapsedTime(0)
    }
  }, [activeTimer])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartTimer = () => {
    if (selectedQuestId) {
      startTimer(selectedQuestId)
    }
  }

  const handleStopTimer = () => {
    stopTimer()
    setSelectedQuestId('')
  }

  const handleSaveRate = () => {
    const rate = parseFloat(newRate)
    if (!isNaN(rate) && rate > 0) {
      setHourlyRate(rate)
      setEditingRate(false)
    }
  }

  const getQuestById = (id: string) => quests.find(q => q.id === id)

  const totalHoursThisWeek = timeEntries
    .filter(entry => {
      const entryDate = new Date(entry.startTime)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    })
    .reduce((sum, entry) => sum + (entry.duration || 0), 0) / 60

  const estimatedEarningsThisWeek = totalHoursThisWeek * hourlyRate

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
          <Clock className="mr-3 h-10 w-10" />
          Time Turner
        </h1>
        <p className="text-parchment/70 mt-2 font-script">
          Track the hours spent on your magical endeavors
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-800">
                {totalHoursThisWeek.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 font-display">Hours This Week</div>
            </div>
            <Clock className="h-10 w-10 text-blue-600" />
          </div>
        </Card>
        
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-800">
                ${estimatedEarningsThisWeek.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600 font-display">Est. Earnings</div>
            </div>
            <DollarSign className="h-10 w-10 text-green-600" />
          </div>
        </Card>
        
        <Card variant="parchment">
          <div className="flex items-center justify-between">
            <div>
              {editingRate ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleSaveRate}
                    className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setEditingRate(true)
                    setNewRate(hourlyRate.toString())
                  }}
                  className="cursor-pointer"
                >
                  <div className="text-3xl font-bold text-amber-800">
                    ${hourlyRate}
                  </div>
                  <div className="text-sm text-gray-600 font-display">Hourly Rate (click to edit)</div>
                </div>
              )}
            </div>
            <DollarSign className="h-10 w-10 text-amber-600" />
          </div>
        </Card>
      </div>

      {/* Timer */}
      <Card>
        <h2 className="text-2xl font-display font-bold text-accent-gold mb-6">
          Active Timer
        </h2>
        
        {activeTimer ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-accent-gold font-mono mb-4 candlelight-glow">
                {formatTime(elapsedTime)}
              </div>
              <div className="text-xl text-parchment/80 mb-6">
                Working on: {getQuestById(activeTimer.questId)?.clientName || 'Unknown Quest'}
              </div>
            </div>
            
            <Button
              onClick={handleStopTimer}
              variant="danger"
              icon={<Square className="h-5 w-5" />}
              className="w-full"
            >
              Stop Timer
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-parchment/60 mb-4">
              No active timer
            </div>
            
            <select
              value={selectedQuestId}
              onChange={(e) => setSelectedQuestId(e.target.value)}
              className="spell-input"
            >
              <option value="">Select a quest...</option>
              {quests
                .filter(q => q.status === 'Active')
                .map(quest => (
                  <option key={quest.id} value={quest.id}>
                    {quest.clientName} - {quest.location}
                  </option>
                ))}
            </select>
            
            <Button
              onClick={handleStartTimer}
              disabled={!selectedQuestId}
              icon={<Play className="h-5 w-5" />}
              className="w-full"
            >
              Start Timer
            </Button>
          </div>
        )}
      </Card>

      {/* Time Entries */}
      <Card>
        <h2 className="text-2xl font-display font-bold text-accent-gold mb-4">
          Time Log
        </h2>
        
        {timeEntries.length === 0 ? (
          <div className="text-center py-12 text-parchment/60">
            <Clock className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p>No time entries yet. Start a timer to begin tracking.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {timeEntries
              .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
              .map(entry => {
                const quest = getQuestById(entry.questId)
                const hours = (entry.duration || 0) / 60
                const earnings = hours * hourlyRate
                
                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 bg-primary-dark/30 rounded-lg hover:bg-primary-dark/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-display font-bold text-parchment">
                          {quest?.clientName || 'Unknown Quest'}
                        </span>
                        <span className="text-parchment/60 text-sm">
                          {format(new Date(entry.startTime), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-parchment/70">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(entry.startTime), 'h:mm a')} - {entry.endTime && format(new Date(entry.endTime), 'h:mm a')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {hours.toFixed(2)} hrs
                        </span>
                        <span className="flex items-center text-green-400">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${earnings.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this time entry?')) {
                          deleteTimeEntry(entry.id)
                        }
                      }}
                      className="p-2 text-danger hover:bg-danger/20 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
          </div>
        )}
      </Card>
    </motion.div>
  )
}

