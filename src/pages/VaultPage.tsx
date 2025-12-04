import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  Plus,
  Minus,
  Edit3,
  Trash2,
  AlertTriangle,
  Search,
  ShoppingCart,
} from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import { useStore } from '../store/useStore'
import { Material, MaterialCategory } from '../types'

export default function VaultPage() {
  const { materials, addMaterial, adjustQuantity, deleteMaterial } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<MaterialCategory | 'All'>('All')
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wire/Cable' as MaterialCategory,
    quantity: '',
    unit: '',
    lowStockThreshold: '',
    notes: '',
  })

  const categories: (MaterialCategory | 'All')[] = [
    'All',
    'Wire/Cable',
    'Breakers',
    'Boxes',
    'Conduit',
    'Fixtures',
    'Tools',
    'Fasteners',
    'Other',
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || material.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const lowStockItems = materials.filter(m => m.quantity <= m.lowStockThreshold)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      name: formData.name,
      category: formData.category,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      lowStockThreshold: parseFloat(formData.lowStockThreshold),
      notes: formData.notes,
    }
    
    addMaterial(newMaterial)
    setShowModal(false)
    setFormData({
      name: '',
      category: 'Wire/Cable',
      quantity: '',
      unit: '',
      lowStockThreshold: '',
      notes: '',
    })
  }

  const generateShoppingList = () => {
    const list = lowStockItems.map(m => 
      `${m.name} - Need: ${m.lowStockThreshold - m.quantity} ${m.unit}`
    ).join('\n')
    
    const blob = new Blob([list], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shopping-list.txt'
    a.click()
    URL.revokeObjectURL(url)
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
            <Package className="mr-3 h-10 w-10" />
            The Vault
          </h1>
          <p className="text-parchment/70 mt-2 font-script">
            Your mystical repository of materials and artifacts
          </p>
        </div>
        
        <div className="flex gap-2">
          {lowStockItems.length > 0 && (
            <Button variant="secondary" onClick={generateShoppingList} icon={<ShoppingCart className="h-5 w-5" />}>
              Shopping List
            </Button>
          )}
          <Button onClick={() => setShowModal(true)} icon={<Plus className="h-5 w-5" />}>
            Add Material
          </Button>
        </div>
      </div>

      {/* Low Stock Warning */}
      {lowStockItems.length > 0 && (
        <Card variant="parchment">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-display font-bold text-gray-800 mb-2">
                Supplies Running Low!
              </h3>
              <p className="text-gray-700 mb-2">
                {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} below threshold:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {lowStockItems.slice(0, 3).map(item => (
                  <li key={item.id}>
                    • {item.name} - Only {item.quantity} {item.unit} remaining
                  </li>
                ))}
                {lowStockItems.length > 3 && (
                  <li className="italic">...and {lowStockItems.length - 3} more</li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-parchment/50" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as MaterialCategory | 'All')}
            className="spell-input"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Material List */}
      {filteredMaterials.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-parchment/30 mx-auto mb-4" />
            <h3 className="text-xl font-display text-parchment/70 mb-2">
              No materials found
            </h3>
            <p className="text-parchment/50 mb-6">
              {searchTerm || categoryFilter !== 'All'
                ? 'Try adjusting your filters'
                : 'Begin stocking your vault with materials'
              }
            </p>
            {!searchTerm && categoryFilter === 'All' && (
              <Button onClick={() => setShowModal(true)}>
                Add Your First Material
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card hover>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-bold text-parchment">
                        {material.name}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs rounded bg-accent-gold/20 text-accent-gold mt-1">
                        {material.category}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this material?')) {
                          deleteMaterial(material.id)
                        }
                      }}
                      className="p-2 text-danger hover:bg-danger/20 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="py-4 bg-primary-dark/30 rounded-lg text-center">
                    <div className={`text-3xl font-bold ${material.quantity <= material.lowStockThreshold ? 'text-danger' : 'text-accent-gold'}`}>
                      {material.quantity}
                    </div>
                    <div className="text-sm text-parchment/60">{material.unit}</div>
                    {material.quantity <= material.lowStockThreshold && (
                      <div className="text-xs text-danger mt-1">
                        ⚠️ Low Stock
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => adjustQuantity(material.id, -1)}
                      className="flex-1 px-3 py-2 bg-danger/20 hover:bg-danger/30 text-danger rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => adjustQuantity(material.id, 1)}
                      className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {material.notes && (
                    <p className="text-sm text-parchment/60 italic pt-2 border-t border-accent-gold/20">
                      {material.notes}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Material Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Material"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Material Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., 12/2 Romex"
          />
          
          <div>
            <label className="block text-sm font-display text-parchment/90 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as MaterialCategory })}
              className="spell-input"
              required
            >
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              step="0.1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              placeholder="100"
            />
            
            <Input
              label="Unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              required
              placeholder="feet, pcs, boxes"
            />
          </div>
          
          <Input
            label="Low Stock Threshold"
            type="number"
            step="0.1"
            value={formData.lowStockThreshold}
            onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
            required
            helperText="Alert when quantity falls below this number"
          />
          
          <div>
            <label className="block text-sm font-display text-parchment/90 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="spell-input min-h-[80px]"
              placeholder="Additional notes..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add to Vault
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

