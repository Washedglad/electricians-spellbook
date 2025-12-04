export type QuestStatus = 'Active' | 'Completed' | 'Brewing'

export interface Quest {
  id: string
  clientName: string
  location: string
  address: string
  startDate: string
  completionDate?: string
  status: QuestStatus
  materialsNeeded: string[]
  notes: string
  photos: string[]
  contactInfo?: {
    phone?: string
    email?: string
  }
  estimatedHours?: number
  hourlyRate?: number
}

export interface Material {
  id: string
  name: string
  category: MaterialCategory
  quantity: number
  unit: string
  lowStockThreshold: number
  notes?: string
}

export type MaterialCategory = 
  | 'Wire/Cable'
  | 'Breakers'
  | 'Boxes'
  | 'Conduit'
  | 'Fixtures'
  | 'Tools'
  | 'Fasteners'
  | 'Low Voltage'
  | 'Data/Network'
  | 'HVAC Controls'
  | 'Automation/PLC'
  | 'Security/Access'
  | 'Other'

export interface TimeEntry {
  id: string
  questId: string
  startTime: string
  endTime?: string
  duration?: number // in minutes
  notes?: string
}

export interface CodeReference {
  id: string
  section: string
  title: string
  content: string
  category: CodeCategory
  bookmarked: boolean
}

export type CodeCategory =
  | 'Wire Ampacity'
  | 'GFCI/AFCI'
  | 'Grounding'
  | 'Box Fill'
  | 'Conduit Fill'
  | 'General'

export interface JobLocation {
  id: string
  name: string
  address: string
  contactPerson: string
  phone: string
  email?: string
  notes?: string
  questHistory: string[] // Quest IDs
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface CalculatorResult {
  inputs: Record<string, number>
  outputs: Record<string, number | string>
  warnings?: string[]
  recommendations?: string[]
}

