# ⚡ The Electrician's Spellbook

A mystical Harry Potter-themed web application for journeyman electricians to manage projects, perform calculations, track inventory, and more.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📖 The Grimoire (Project Management)
- Create and manage electrical jobs as "quests"
- Track project status: Active, Completed, or Brewing (planning)
- Add detailed notes, materials needed, and photos
- Search and filter by status or client name

### ⚡ Spell Calculator (Electrical Calculations)
Six powerful calculators for electrical work:
- **Ohm's Law Calculator** - Calculate V, I, R, or P
- **Wire Size Calculator** - Determine proper wire gauge
- **Voltage Drop Calculator** - Calculate voltage drop for circuits
- **Circuit Breaker Sizing** - Get recommended breaker sizes
- **Box Fill Calculator** - Calculate junction box capacity
- **Conduit Fill Calculator** - Determine conduit capacity

All calculators include:
- Real-time results with magical animations
- Safety warnings for dangerous conditions
- Code compliance recommendations

### 🏺 The Vault (Material Inventory)
- Track materials with quantities and categories
- Low stock alerts
- Quick increment/decrement buttons
- Generate shopping lists for restocking
- Multiple material categories (Wire/Cable, Breakers, Boxes, etc.)

### 📜 Scroll of Codes (NEC Reference)
- Quick reference for National Electrical Code requirements
- Searchable code sections
- Bookmark favorite codes
- Quick reference tables for wire ampacity
- Categories: Wire Ampacity, GFCI/AFCI, Grounding, Box Fill, etc.

### ⏰ Time Turner (Time Tracking)
- Start/stop timer for active projects
- Track hours per quest
- Calculate earnings based on hourly rate
- View weekly totals and earnings
- Time entry history with editing

### 🗺️ Map of Mischief (Job Locations)
- Store job site locations with contact information
- Get directions via Google Maps integration
- Track quest history per location
- Contact management (phone, email)
- Site-specific notes and access codes

## 🎨 Design Theme

The app features a dark, mystical Harry Potter aesthetic:
- Deep purple and navy color palette
- Parchment-styled cards for content
- Golden accents and magical animations
- Candlelight glow effects
- Floating magical orbs
- Lightning bolt motifs (perfect for electrical theme!)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```
   Or on Windows, double-click `install.bat`

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Or on Windows, double-click `run.bat`

3. **Open in Browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Routing**: React Router 6
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## 📱 Features

- **Responsive Design**: Mobile-first, works on all devices
- **Offline Capable**: LocalStorage persistence (PWA-ready)
- **Dark Mode Only**: Reduces eye strain, fits the mystical theme
- **Fast & Lightweight**: Built with Vite for optimal performance
- **Type-Safe**: Full TypeScript support

## 🎯 Usage Tips

1. **Quick Start**: Create your first quest from the Grimoire
2. **Track Time**: Start the Time Turner when working on a quest
3. **Stock Materials**: Add materials to the Vault before starting projects
4. **Use Calculators**: Cast spells (run calculations) as needed on job sites
5. **Reference Codes**: Bookmark frequently used NEC codes
6. **Save Locations**: Add job sites to the Map for easy navigation

## 🔮 Terminology

The app uses magical Harry Potter terminology:

| Electrical Term | Magical Term |
|----------------|--------------|
| Projects | Quests |
| Calculations | Spells |
| Materials | Artifacts/Ingredients |
| Completed Jobs | Successful Enchantments |
| Code Violations | Dark Magic Detected |
| Safety Warnings | Protective Charms |
| Estimates | Divination Scrolls |

## 📦 Data Storage

All data is stored locally in your browser using:
- **LocalStorage** for app settings
- **IndexedDB** (via Zustand persistence) for larger data

### Backup & Export
Your data persists across sessions. To backup:
1. Export from browser DevTools → Application → LocalStorage
2. Or implement the export feature (coming soon)

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
colors: {
  primary: '#2D1B4E',    // Deep purple
  'accent-gold': '#d4af37', // Gold accent
  // ... more colors
}
```

### Hourly Rate
Click the hourly rate in Time Turner to edit your default rate.

## 🔧 Development

### Project Structure
```
src/
├── components/       # React components
│   ├── common/      # Reusable UI components
│   └── Layout.tsx   # Main layout
├── pages/           # Page components
├── store/           # Zustand state management
├── utils/           # Utility functions (calculations)
├── types.ts         # TypeScript types
└── App.tsx          # Main app component
```

### Adding New Calculators

1. Create calculation function in `utils/calculations.ts`
2. Add calculator component in `SpellCalculatorPage.tsx`
3. Update the calculator selection menu

### Adding New Features

1. Define types in `types.ts`
2. Add store actions in `store/useStore.ts`
3. Create UI components and pages
4. Update routing in `App.tsx`

## 🐛 Troubleshooting

**Calculator not working?**
- Ensure all required fields are filled
- Check that numbers are valid (no letters)

**Data disappeared?**
- Check browser storage limits
- Verify LocalStorage is enabled
- Check if browser was cleared

**Styling issues?**
- Clear browser cache
- Rebuild with `npm run build`
- Check that Tailwind CSS is processing

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Harry Potter universe for inspiration
- National Electrical Code (NEC) for reference data
- Electricians everywhere keeping the lights on ⚡

## 🔮 Future Enhancements

- [ ] Photo upload and annotation
- [ ] Invoice generation (styled as Ministry documents)
- [ ] Client database
- [ ] Estimate generator
- [ ] Voice notes for job sites
- [ ] Calendar integration
- [ ] Cloud sync option
- [ ] PDF report generation
- [ ] Multiple users/accounts

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Consult NEC documentation for electrical code questions

---

*"It is our choices that show what we truly are, far more than our abilities."* - Albus Dumbledore

**Stay safe, work smart, and may your circuits always be perfectly grounded!** ⚡✨

