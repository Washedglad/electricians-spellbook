import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Quest, Material, TimeEntry, CodeReference, JobLocation } from '../types'

interface AppState {
  // Quests (Projects)
  quests: Quest[]
  addQuest: (quest: Quest) => void
  updateQuest: (id: string, quest: Partial<Quest>) => void
  deleteQuest: (id: string) => void
  getQuestById: (id: string) => Quest | undefined

  // Materials
  materials: Material[]
  addMaterial: (material: Material) => void
  updateMaterial: (id: string, material: Partial<Material>) => void
  deleteMaterial: (id: string) => void
  adjustQuantity: (id: string, amount: number) => void

  // Time Tracking
  timeEntries: TimeEntry[]
  activeTimer: TimeEntry | null
  startTimer: (questId: string) => void
  stopTimer: () => void
  addTimeEntry: (entry: TimeEntry) => void
  deleteTimeEntry: (id: string) => void

  // Code References
  codeReferences: CodeReference[]
  addCodeReference: (code: CodeReference) => void
  toggleBookmark: (id: string) => void

  // Job Locations
  locations: JobLocation[]
  addLocation: (location: JobLocation) => void
  updateLocation: (id: string, location: Partial<JobLocation>) => void
  deleteLocation: (id: string) => void

  // Settings
  hourlyRate: number
  setHourlyRate: (rate: number) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      quests: [],
      materials: [],
      timeEntries: [],
      activeTimer: null,
      codeReferences: getDefaultCodeReferences(),
      locations: [],
      hourlyRate: 75,

      // Quest actions
      addQuest: (quest) =>
        set((state) => ({ quests: [...state.quests, quest] })),
      
      updateQuest: (id, questUpdate) =>
        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === id ? { ...q, ...questUpdate } : q
          ),
        })),
      
      deleteQuest: (id) =>
        set((state) => ({
          quests: state.quests.filter((q) => q.id !== id),
        })),
      
      getQuestById: (id) => get().quests.find((q) => q.id === id),

      // Material actions
      addMaterial: (material) =>
        set((state) => ({ materials: [...state.materials, material] })),
      
      updateMaterial: (id, materialUpdate) =>
        set((state) => ({
          materials: state.materials.map((m) =>
            m.id === id ? { ...m, ...materialUpdate } : m
          ),
        })),
      
      deleteMaterial: (id) =>
        set((state) => ({
          materials: state.materials.filter((m) => m.id !== id),
        })),
      
      adjustQuantity: (id, amount) =>
        set((state) => ({
          materials: state.materials.map((m) =>
            m.id === id ? { ...m, quantity: Math.max(0, m.quantity + amount) } : m
          ),
        })),

      // Time tracking actions
      startTimer: (questId) =>
        set({
          activeTimer: {
            id: crypto.randomUUID(),
            questId,
            startTime: new Date().toISOString(),
          },
        }),
      
      stopTimer: () =>
        set((state) => {
          if (!state.activeTimer) return state
          
          const endTime = new Date()
          const startTime = new Date(state.activeTimer.startTime)
          const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 60000)
          
          const completedEntry: TimeEntry = {
            ...state.activeTimer,
            endTime: endTime.toISOString(),
            duration,
          }
          
          return {
            activeTimer: null,
            timeEntries: [...state.timeEntries, completedEntry],
          }
        }),
      
      addTimeEntry: (entry) =>
        set((state) => ({ timeEntries: [...state.timeEntries, entry] })),
      
      deleteTimeEntry: (id) =>
        set((state) => ({
          timeEntries: state.timeEntries.filter((e) => e.id !== id),
        })),

      // Code reference actions
      addCodeReference: (code) =>
        set((state) => ({ codeReferences: [...state.codeReferences, code] })),
      
      toggleBookmark: (id) =>
        set((state) => ({
          codeReferences: state.codeReferences.map((c) =>
            c.id === id ? { ...c, bookmarked: !c.bookmarked } : c
          ),
        })),

      // Location actions
      addLocation: (location) =>
        set((state) => ({ locations: [...state.locations, location] })),
      
      updateLocation: (id, locationUpdate) =>
        set((state) => ({
          locations: state.locations.map((l) =>
            l.id === id ? { ...l, ...locationUpdate } : l
          ),
        })),
      
      deleteLocation: (id) =>
        set((state) => ({
          locations: state.locations.filter((l) => l.id !== id),
        })),

      // Settings
      setHourlyRate: (rate) => set({ hourlyRate: rate }),
    }),
    {
      name: 'electricians-spellbook-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Default NEC code references - Comprehensive Edition
function getDefaultCodeReferences(): CodeReference[] {
  return [
    // Wire Ampacity
    {
      id: '1',
      section: '310.16',
      title: 'Conductor Ampacity Tables',
      content: 'Allowable ampacities of insulated conductors rated up to and including 2000 volts, 60°C through 90°C, not more than three current-carrying conductors in raceway, cable, or earth.',
      category: 'Wire Ampacity',
      bookmarked: true,
    },
    {
      id: '2',
      section: '310.15',
      title: 'Ampacity Temperature Correction',
      content: 'Ampacity correction factors for ambient temperatures other than 30°C (86°F). Temperature correction factors must be applied when ambient temperature exceeds these values.',
      category: 'Wire Ampacity',
      bookmarked: true,
    },
    {
      id: '3',
      section: '310.15(B)(3)(a)',
      title: 'Ampacity Adjustment for More Than 3 Conductors',
      content: 'Where more than three current-carrying conductors are in a raceway or cable, ampacity must be reduced. 4-6 conductors: 80%, 7-9: 70%, 10-20: 50%, 21-30: 45%, 31-40: 40%, 41+: 35%.',
      category: 'Wire Ampacity',
      bookmarked: true,
    },
    
    // GFCI/AFCI
    {
      id: '4',
      section: '210.8',
      title: 'GFCI Protection Requirements',
      content: 'GFCI protection required for 125V-250V receptacles in bathrooms, kitchens, outdoors, crawl spaces, unfinished basements, garages, and other specified locations. Includes countertops, sinks, rooftops, and within 6 feet of wet locations.',
      category: 'GFCI/AFCI',
      bookmarked: true,
    },
    {
      id: '5',
      section: '210.8(A)(9)',
      title: 'GFCI for Bathtubs and Shower Stalls',
      content: 'All 125V, 15A and 20A receptacles installed within 6 feet of the outside edge of a bathtub or shower stall shall have GFCI protection.',
      category: 'GFCI/AFCI',
      bookmarked: true,
    },
    {
      id: '6',
      section: '210.12',
      title: 'AFCI Protection Requirements',
      content: 'All 120V, single-phase, 15A and 20A branch circuits supplying outlets in dwelling unit family rooms, dining rooms, living rooms, parlors, libraries, dens, bedrooms, sunrooms, recreation rooms, closets, hallways, and similar rooms shall be protected by AFCI devices.',
      category: 'GFCI/AFCI',
      bookmarked: true,
    },
    {
      id: '7',
      section: '406.4(D)(4)',
      title: 'Tamper-Resistant Receptacles',
      content: 'All 125V, 15A and 20A receptacles in dwelling units must be tamper-resistant. Exceptions for receptacles more than 5½ feet above floor, dedicated appliances, and non-accessible locations.',
      category: 'GFCI/AFCI',
      bookmarked: false,
    },
    
    // Grounding
    {
      id: '8',
      section: '250.50',
      title: 'Grounding Electrode System',
      content: 'All grounding electrodes present at the building shall be bonded together to form the grounding electrode system. This includes metal water pipe, concrete-encased electrode, ground rings, and rod/pipe electrodes.',
      category: 'Grounding',
      bookmarked: true,
    },
    {
      id: '9',
      section: '250.52',
      title: 'Grounding Electrodes',
      content: 'Types of grounding electrodes: metal water pipe, concrete-encased (Ufer), ground ring, rod & pipe, plate, and other structures/systems. Each has specific installation requirements.',
      category: 'Grounding',
      bookmarked: false,
    },
    {
      id: '10',
      section: '250.53(A)(2)',
      title: 'Supplementary Ground Rod Requirements',
      content: 'If a single ground rod has resistance over 25 ohms, a second rod must be installed at least 6 feet away. Two rods are typically required to meet code.',
      category: 'Grounding',
      bookmarked: true,
    },
    {
      id: '11',
      section: '250.66',
      title: 'Grounding Electrode Conductor Size',
      content: 'Size of grounding electrode conductor based on largest service entrance conductor. Example: 2 AWG or smaller service = 8 AWG ground, 1/0 or 2/0 service = 6 AWG ground.',
      category: 'Grounding',
      bookmarked: true,
    },
    {
      id: '12',
      section: '250.122',
      title: 'Equipment Grounding Conductor Size',
      content: 'Size of equipment grounding conductor based on rating of overcurrent device. 15A = 14 AWG, 20A = 12 AWG, 30A = 10 AWG, 40A = 10 AWG, 60A = 10 AWG, 100A = 8 AWG.',
      category: 'Grounding',
      bookmarked: true,
    },
    
    // Box Fill
    {
      id: '13',
      section: '314.16',
      title: 'Box Fill Calculations',
      content: 'Boxes shall be of sufficient size to provide free space for all enclosed conductors. Volume per conductor: 14 AWG = 2 cu.in., 12 AWG = 2.25 cu.in., 10 AWG = 2.5 cu.in., 8 AWG = 3 cu.in., 6 AWG = 5 cu.in.',
      category: 'Box Fill',
      bookmarked: true,
    },
    {
      id: '14',
      section: '314.16(B)',
      title: 'Box Fill Conductor Count',
      content: 'Each conductor counts as one, all ground wires together count as one, each device (switch/receptacle) counts as two conductors of largest wire connected to it. Cable clamps and fixture studs count as one each.',
      category: 'Box Fill',
      bookmarked: true,
    },
    {
      id: '15',
      section: '314.28',
      title: 'Pull and Junction Boxes',
      content: 'Boxes containing conductors 4 AWG or larger: straight pulls = 8× the trade size of largest raceway, angle pulls = 6× plus other raceways on same wall.',
      category: 'Box Fill',
      bookmarked: false,
    },
    
    // Conduit Fill
    {
      id: '16',
      section: 'Annex C',
      title: 'Conduit Fill Tables',
      content: 'Maximum number of conductors in trade sizes of conduit or tubing. Never exceed 40% fill for 3+ conductors, 31% for 2 conductors, 53% for 1 conductor.',
      category: 'Conduit Fill',
      bookmarked: true,
    },
    {
      id: '17',
      section: '344.22',
      title: 'Rigid Metal Conduit Fill',
      content: 'Number of conductors permitted in RMC based on Table 1 (conduit dimensions) and Table 4 (fixture wire dimensions) of Chapter 9.',
      category: 'Conduit Fill',
      bookmarked: false,
    },
    {
      id: '18',
      section: '358.22',
      title: 'EMT Conduit Fill',
      content: 'Number of conductors in EMT shall not exceed percentage fill in Table 1, Chapter 9. Use Annex C for common combinations.',
      category: 'Conduit Fill',
      bookmarked: false,
    },
    
    // General
    {
      id: '19',
      section: '110.14',
      title: 'Electrical Connections',
      content: 'Terminals for more than one conductor and terminals used to connect aluminum shall be identified for such use. Connectors must be suitable for materials, temperature, and location.',
      category: 'General',
      bookmarked: false,
    },
    {
      id: '20',
      section: '110.14(C)',
      title: 'Temperature Limitations',
      content: 'Conductors must be sized using 60°C column unless equipment is marked for higher temperatures. Most residential devices are rated for 60°C or 75°C.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '21',
      section: '110.26',
      title: 'Working Space Around Equipment',
      content: 'Minimum 3 feet width, 30 inches depth, and 6½ feet height clearance required in front of electrical equipment. Depth varies: 0-150V = 3ft, 151-600V = 3½ft.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '22',
      section: '210.19(A)',
      title: 'Branch Circuit Conductor Sizing',
      content: 'Branch circuit conductors shall have ampacity not less than maximum load to be served. Minimum 125% for continuous loads.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '23',
      section: '210.52',
      title: 'Dwelling Unit Receptacle Outlets',
      content: 'Receptacles in habitable rooms: no point along wall more than 6 feet from receptacle. Spacing: one receptacle per 12 feet of wall. Includes countertops, hallways, and fixed room dividers.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '24',
      section: '210.70',
      title: 'Lighting Outlets Required',
      content: 'At least one wall switch-controlled lighting outlet required in every habitable room, bathroom, hallway, stairway, attached garage, and exterior doors.',
      category: 'General',
      bookmarked: false,
    },
    {
      id: '25',
      section: '220.12',
      title: 'General Lighting Load Calculations',
      content: 'Unit load per square foot for dwellings: 3 VA per sq.ft. Use outside dimensions and include all floors. Lighting and receptacles are combined.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '26',
      section: '230.79',
      title: 'Service Disconnect Rating',
      content: 'Service disconnecting means shall have rating not less than the load to be carried, minimum 100A for dwelling units. 60A minimum for other installations.',
      category: 'General',
      bookmarked: false,
    },
    {
      id: '27',
      section: '240.4',
      title: 'Overcurrent Device Rating',
      content: 'Overcurrent protection shall not exceed the ampacity of conductors. Small conductors: 14 AWG max 15A, 12 AWG max 20A, 10 AWG max 30A.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '28',
      section: '300.5',
      title: 'Underground Installation Depth',
      content: 'Burial depth requirements: Direct burial cable = 24 inches, rigid/IMC conduit = 6 inches, residential 120V GFCI with not over 20A = 12 inches.',
      category: 'General',
      bookmarked: true,
    },
    {
      id: '29',
      section: '334.80',
      title: 'NM Cable Ampacity',
      content: 'Ampacity of NM cable in thermal insulation: must use 60°C temperature rating from Table 310.15(B)(16). Subject to ambient temperature correction.',
      category: 'Wire Ampacity',
      bookmarked: true,
    },
    {
      id: '30',
      section: '406.9',
      title: 'Receptacle Faceplates',
      content: 'Faceplates shall completely cover the opening and seat against mounting surface. Metal faceplates must be grounded. Damaged faceplates must be replaced.',
      category: 'General',
      bookmarked: false,
    },
  ]
}

