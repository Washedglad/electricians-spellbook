import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GrimoirePage from './pages/GrimoirePage'
import SpellCalculatorPage from './pages/SpellCalculatorPage'
import VaultPage from './pages/VaultPage'
import ScrollOfCodesPage from './pages/ScrollOfCodesPage'
import TimeTurnerPage from './pages/TimeTurnerPage'
import MapOfMischiefPage from './pages/MapOfMischiefPage'
import QuestDetailPage from './pages/QuestDetailPage'

function App() {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grimoire" element={<GrimoirePage />} />
          <Route path="/grimoire/:id" element={<QuestDetailPage />} />
          <Route path="/spells" element={<SpellCalculatorPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/codes" element={<ScrollOfCodesPage />} />
          <Route path="/time-turner" element={<TimeTurnerPage />} />
          <Route path="/map" element={<MapOfMischiefPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App

