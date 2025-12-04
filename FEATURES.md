# ⚡ Features Guide - The Electrician's Spellbook

## Complete Feature Documentation

### 📖 The Grimoire (Project Management)

**Purpose**: Manage electrical jobs as mystical "quests"

**Features**:
- ✅ Create new quests with client info, location, and dates
- ✅ Three status types:
  - **Active**: Currently working on
  - **Brewing**: In planning phase
  - **Completed**: Finished projects
- ✅ Search and filter quests
- ✅ Add detailed notes with rich text
- ✅ Track materials needed per quest
- ✅ Photo placeholders (ready for implementation)
- ✅ Quest detail view with editing capability
- ✅ Quick stats dashboard

**How to Use**:
1. Click "New Quest" button
2. Enter client name, location, address
3. Set initial status (Active/Brewing)
4. Add notes and materials as needed
5. Click on any quest to view/edit details

---

### ⚡ Spell Calculator

**Purpose**: Cast electrical calculation spells with precision

**Available Calculators**:

#### 1. Ohm's Law Calculator
- Calculate any missing value from V, I, R, or P
- Enter any 2 values to find the others
- Automatic power calculations
- Safety warnings for high current/power

#### 2. Wire Size Calculator
- Input: Amperage, distance, voltage, temp rating
- Output: Recommended wire gauge
- Voltage drop calculation
- NEC compliance warnings
- Temperature derating

#### 3. Voltage Drop Calculator
- Input: Wire gauge, amperage, distance
- Output: Voltage drop (V and %)
- Material selection (copper/aluminum)
- 3% and 5% limit warnings
- Voltage at load calculation

#### 4. Circuit Breaker Sizing
- Input: Load amperage, load type
- Output: Recommended breaker size
- Continuous load factor (125%)
- Motor load calculations
- Wire size recommendations

#### 5. Box Fill Calculator
- Input: Conductors, devices, clamps
- Output: Required box volume
- Recommended box sizes
- NEC 314.16 compliance
- Multiple conductor sizes supported

#### 6. Conduit Fill Calculator
- Input: Wire size, count, conduit type
- Output: Recommended conduit size
- Fill percentage limits (40% for 3+)
- EMT, PVC, IMC, Rigid options
- Alternative size suggestions

**All Calculators Include**:
- ⚠️ Safety warnings for dangerous conditions
- 💡 Code compliance recommendations
- ✨ Magical result animations
- 🎨 Parchment-styled results display

---

### 🏺 The Vault (Material Inventory)

**Purpose**: Track materials and prevent shortages

**Features**:
- ✅ Add materials with quantities and units
- ✅ Multiple categories:
  - Wire/Cable
  - Breakers
  - Boxes
  - Conduit
  - Fixtures
  - Tools
  - Fasteners
  - Other
- ✅ Set low stock thresholds
- ✅ Visual low stock warnings
- ✅ Quick +/- buttons to adjust quantities
- ✅ Search and filter by category
- ✅ Generate shopping lists
- ✅ Material notes field

**Workflow**:
1. Add materials before starting projects
2. Set low stock thresholds (e.g., 50 feet)
3. Adjust quantities as you use materials
4. Get alerts when running low
5. Export shopping list when restocking

---

### 📜 Scroll of Codes (NEC Reference)

**Purpose**: Quick reference for National Electrical Code

**Features**:
- ✅ Pre-loaded common NEC codes
- ✅ Search by section, title, or content
- ✅ Filter by category:
  - Wire Ampacity
  - GFCI/AFCI
  - Grounding
  - Box Fill
  - Conduit Fill
  - General
- ✅ Bookmark frequently used codes
- ✅ Quick reference tables
- ✅ Parchment-styled code cards

**Included References**:
- 310.16 - Conductor Ampacity Tables
- 210.8 - GFCI Protection Requirements
- 210.12 - AFCI Protection Requirements
- 250.50 - Grounding Electrode System
- 314.16 - Box Fill Calculations
- 314.28 - Pull and Junction Boxes
- Annex C - Conduit Fill Tables
- 110.14 - Electrical Connections

**Wire Ampacity Table**:
Quick reference for 75°C copper conductors with common uses

---

### ⏰ Time Turner (Time Tracking)

**Purpose**: Track billable hours and earnings

**Features**:
- ✅ Start/stop timer for active quest
- ✅ Real-time elapsed time display
- ✅ Auto-save time entries
- ✅ Set custom hourly rate (editable)
- ✅ Weekly hours summary
- ✅ Estimated earnings calculation
- ✅ Time entry history
- ✅ Delete incorrect entries
- ✅ Per-quest time tracking

**Dashboard Stats**:
- Hours This Week
- Estimated Earnings
- Current Hourly Rate (click to edit)

**How It Works**:
1. Select an active quest
2. Click "Start Timer"
3. Timer runs with live countdown
4. Click "Stop Timer" when done
5. Entry saved automatically with:
   - Quest name
   - Start/end times
   - Duration
   - Calculated earnings

---

### 🗺️ Map of Mischief (Job Locations)

**Purpose**: Manage job sites and navigate easily

**Features**:
- ✅ Save unlimited job locations
- ✅ Full contact information:
  - Location name
  - Complete address
  - Contact person
  - Phone number
  - Email (optional)
  - Custom notes
- ✅ Google Maps integration for directions
- ✅ Track quest history per location
- ✅ Active quest indicators
- ✅ Quick call/email links
- ✅ Edit/delete locations
- ✅ Site-specific notes (access codes, parking, etc.)

**Dashboard Stats**:
- Total Locations
- Active Sites (with current quests)
- Total Quests across all locations

**Location Cards Show**:
- Location name and address
- Primary contact with click-to-call
- Active quest count
- Direct "Get Directions" button
- Edit and delete options

---

## 🎨 User Experience Features

### Visual Design
- **Dark Theme**: Reduces eye strain, mystical atmosphere
- **Parchment Cards**: Ancient grimoire aesthetic
- **Golden Accents**: Magical highlighting
- **Lightning Bolts**: Perfect electrical symbolism
- **Floating Orbs**: Animated background elements
- **Candlelight Effects**: Warm, magical glow

### Animations
- Page transitions
- Hover effects on cards
- Loading animations
- Success/error messages styled as spells
- Smooth state changes

### Responsive Design
- Mobile-first approach
- Touch-friendly buttons and inputs
- Collapsible mobile menu
- Optimized for tablets and phones
- Works great on job sites

### Data Persistence
- Auto-save all changes
- LocalStorage/IndexedDB
- Survives browser restarts
- No server required
- Export/backup ready

### User-Friendly Features
- Search across all sections
- Filter by multiple criteria
- Undo-friendly actions
- Confirmation dialogs for deletes
- Helpful placeholder text
- Validation feedback
- Loading states
- Empty state guidance

---

## 🔮 Magical Terminology

| Standard Term | Spellbook Term |
|--------------|----------------|
| Project | Quest |
| Calculation | Spell |
| Material | Artifact/Ingredient |
| Tool | Magical Implement |
| Completed Job | Successful Enchantment |
| Code Violation | Dark Magic Detected |
| Safety Warning | Protective Charm |
| Estimate | Divination Scroll |
| Invoice | Spell Contract |
| Low Stock | Supplies Running Low |
| Active | In Progress |
| Planning | Brewing |

---

## 💡 Pro Tips

1. **Start Every Project Right**: Create a quest in the Grimoire before starting work
2. **Track Your Time**: Start the Time Turner as soon as you arrive on site
3. **Stay Stocked**: Add materials to the Vault and set appropriate low stock thresholds
4. **Bookmark Codes**: Save frequently referenced NEC sections for quick access
5. **Save Locations**: Add job sites to the Map for easy navigation on return visits
6. **Use Calculators**: Verify all calculations on-site for safety and code compliance
7. **Take Notes**: Add detailed quest notes for future reference and billing
8. **Check Warnings**: Pay attention to calculator warnings - they prevent costly mistakes
9. **Set Realistic Thresholds**: Set material low stock warnings high enough to reorder in time
10. **Review Weekly**: Check Time Turner weekly to ensure accurate billing

---

## 🚀 Keyboard Shortcuts (Coming Soon)

Future enhancement: Add keyboard shortcuts for power users

---

## 📱 Mobile Optimization

- Large, touch-friendly buttons
- Simplified layouts on small screens
- Collapsible menus
- Swipe gestures (future)
- Fast load times
- Offline capable

---

## ⚡ Performance Features

- Lazy loading of images
- Optimized animations
- Fast search/filter
- Minimal re-renders
- Efficient state management
- Small bundle size

---

*"Happiness can be found, even in the darkest of times, if one only remembers to turn on the light."* - Albus Dumbledore

And in electrical work, always remember to turn OFF the power first! ⚡

