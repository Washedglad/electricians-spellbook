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

// Default NEC code references
function getDefaultCodeReferences(): CodeReference[] {
  return [
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
      section: '210.8',
      title: 'GFCI Protection Requirements',
      content: 'GFCI protection required for 125V-250V receptacles in bathrooms, kitchens, outdoors, crawl spaces, unfinished basements, garages, and other specified locations.',
      category: 'GFCI/AFCI',
      bookmarked: true,
    },
    {
      id: '3',
      section: '210.12',
      title: 'AFCI Protection Requirements',
      content: 'All 120V, single-phase, 15A and 20A branch circuits supplying outlets in dwelling unit family rooms, dining rooms, living rooms, parlors, libraries, dens, bedrooms, sunrooms, recreation rooms, closets, hallways, and similar rooms shall be protected by AFCI devices.',
      category: 'GFCI/AFCI',
      bookmarked: true,
    },
    {
      id: '4',
      section: '250.50',
      title: 'Grounding Electrode System',
      content: 'All grounding electrodes present at the building shall be bonded together to form the grounding electrode system.',
      category: 'Grounding',
      bookmarked: false,
    },
    {
      id: '5',
      section: '314.16',
      title: 'Box Fill Calculations',
      content: 'Boxes shall be of sufficient size to provide free space for all enclosed conductors. Volume calculations based on conductor sizes.',
      category: 'Box Fill',
      bookmarked: true,
    },
    {
      id: '6',
      section: '314.28',
      title: 'Pull and Junction Boxes',
      content: 'Boxes and conduit bodies containing conductors 4 AWG or larger shall meet specific sizing requirements.',
      category: 'Box Fill',
      bookmarked: false,
    },
    {
      id: '7',
      section: 'Annex C',
      title: 'Conduit Fill Tables',
      content: 'Maximum number of conductors in trade sizes of conduit or tubing.',
      category: 'Conduit Fill',
      bookmarked: true,
    },
    {
      id: '8',
      section: '110.14',
      title: 'Electrical Connections',
      content: 'Terminals for more than one conductor and terminals used to connect aluminum shall be identified for such use.',
      category: 'General',
      bookmarked: false,
    },
  ]
}

