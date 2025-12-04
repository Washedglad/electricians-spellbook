import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  AlertTriangle,
  Lightbulb,
  Calculator,
} from 'lucide-react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import {
  calculateOhmsLaw,
  calculateWireSize,
  calculateVoltageDrop,
  calculateBreakerSize,
  calculateBoxFill,
  calculateConduitFill,
} from '../utils/calculations'
import {
  calculateDataCableLength,
  calculatePoE,
  calculateLowVoltagePower,
  calculateHVACWiring,
  calculatePLCIO,
  calculateSecurityWiring,
} from '../utils/lowVoltageCalculations'
import { CalculatorResult } from '../types'
import { soundManager } from '../utils/sounds'
import {
  DataCableCalculator,
  PoECalculator,
  LowVoltagePowerCalculator,
  HVACWiringCalculator,
  PLCIOCalculator,
  SecurityWiringCalculator,
} from './LowVoltageCalculators'

type CalculatorType =
  | 'ohms-law'
  | 'wire-size'
  | 'voltage-drop'
  | 'breaker-size'
  | 'box-fill'
  | 'conduit-fill'
  | 'data-cable'
  | 'poe'
  | 'low-voltage'
  | 'hvac-wiring'
  | 'plc-io'
  | 'security-wiring'

export default function SpellCalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('ohms-law')
  const [result, setResult] = useState<CalculatorResult | null>(null)

  const calculators = [
    { id: 'ohms-law', name: "Ohm's Law", icon: Zap, category: 'Power' },
    { id: 'wire-size', name: 'Wire Sizing', icon: Calculator, category: 'Power' },
    { id: 'voltage-drop', name: 'Voltage Drop', icon: Zap, category: 'Power' },
    { id: 'breaker-size', name: 'Breaker Sizing', icon: AlertTriangle, category: 'Power' },
    { id: 'box-fill', name: 'Box Fill', icon: Calculator, category: 'Power' },
    { id: 'conduit-fill', name: 'Conduit Fill', icon: Calculator, category: 'Power' },
    { id: 'data-cable', name: 'Data Cable', icon: Sparkles, category: 'Low Voltage' },
    { id: 'poe', name: 'PoE Power', icon: Lightbulb, category: 'Low Voltage' },
    { id: 'low-voltage', name: 'Low Voltage DC', icon: Calculator, category: 'Low Voltage' },
    { id: 'hvac-wiring', name: 'HVAC Controls', icon: Sparkles, category: 'Controls' },
    { id: 'plc-io', name: 'PLC I/O', icon: Calculator, category: 'Automation' },
    { id: 'security-wiring', name: 'Security Systems', icon: Lightbulb, category: 'Low Voltage' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-display font-bold text-accent-gold flex items-center justify-center">
          <Sparkles className="mr-3 h-10 w-10 lightning-bolt" />
          Spell Calculator
        </h1>
        <p className="text-parchment/70 font-script">
          Cast electrical calculations with precision and power
        </p>
      </div>

      {/* Calculator Selection */}
      <Card variant="parchment">
        <h2 className="text-xl font-display font-bold text-gray-800 mb-4">
          Choose Your Spell
        </h2>
        
        {/* Power Calculations */}
        <div className="mb-6">
          <h3 className="text-sm font-display font-semibold text-gray-700 mb-3">⚡ Power Circuits</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {calculators.filter(c => c.category === 'Power').map((calc) => {
              const Icon = calc.icon
              return (
                <button
                  key={calc.id}
                  onClick={() => {
                    setActiveCalculator(calc.id as CalculatorType)
                    setResult(null)
                    soundManager.playClick()
                  }}
                  className={`
                    p-4 rounded-lg font-display text-sm transition-all
                    ${activeCalculator === calc.id
                      ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg scale-105'
                      : 'bg-amber-50 text-gray-700 hover:bg-amber-100 border border-amber-200'
                    }
                  `}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  {calc.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Low Voltage & Data */}
        <div className="mb-6">
          <h3 className="text-sm font-display font-semibold text-gray-700 mb-3">📡 Low Voltage & Data</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {calculators.filter(c => c.category === 'Low Voltage').map((calc) => {
              const Icon = calc.icon
              return (
                <button
                  key={calc.id}
                  onClick={() => {
                    setActiveCalculator(calc.id as CalculatorType)
                    setResult(null)
                    soundManager.playClick()
                  }}
                  className={`
                    p-4 rounded-lg font-display text-sm transition-all
                    ${activeCalculator === calc.id
                      ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg scale-105'
                      : 'bg-blue-50 text-gray-700 hover:bg-blue-100 border border-blue-200'
                    }
                  `}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  {calc.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Controls & Automation */}
        <div>
          <h3 className="text-sm font-display font-semibold text-gray-700 mb-3">🤖 Controls & Automation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {calculators.filter(c => c.category === 'Controls' || c.category === 'Automation').map((calc) => {
              const Icon = calc.icon
              return (
                <button
                  key={calc.id}
                  onClick={() => {
                    setActiveCalculator(calc.id as CalculatorType)
                    setResult(null)
                    soundManager.playClick()
                  }}
                  className={`
                    p-4 rounded-lg font-display text-sm transition-all
                    ${activeCalculator === calc.id
                      ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg scale-105'
                      : 'bg-purple-50 text-gray-700 hover:bg-purple-100 border border-purple-200'
                    }
                  `}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  {calc.name}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Active Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          {activeCalculator === 'ohms-law' && <OhmsLawCalculator onResult={setResult} />}
          {activeCalculator === 'wire-size' && <WireSizeCalculator onResult={setResult} />}
          {activeCalculator === 'voltage-drop' && <VoltageDropCalculator onResult={setResult} />}
          {activeCalculator === 'breaker-size' && <BreakerSizeCalculator onResult={setResult} />}
          {activeCalculator === 'box-fill' && <BoxFillCalculator onResult={setResult} />}
          {activeCalculator === 'conduit-fill' && <ConduitFillCalculator onResult={setResult} />}
          {activeCalculator === 'data-cable' && <DataCableCalculator onResult={setResult} />}
          {activeCalculator === 'poe' && <PoECalculator onResult={setResult} />}
          {activeCalculator === 'low-voltage' && <LowVoltagePowerCalculator onResult={setResult} />}
          {activeCalculator === 'hvac-wiring' && <HVACWiringCalculator onResult={setResult} />}
          {activeCalculator === 'plc-io' && <PLCIOCalculator onResult={setResult} />}
          {activeCalculator === 'security-wiring' && <SecurityWiringCalculator onResult={setResult} />}
        </Card>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card variant="parchment">
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4 flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-amber-600" />
                Spell Results
              </h3>

              <div className="space-y-4">
                {Object.entries(result.outputs).map(([key, value]) => (
                  <div key={key} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-sm text-gray-600 font-display capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                      {value}
                    </div>
                  </div>
                ))}

                {result.warnings && result.warnings.length > 0 && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-bold text-red-900 mb-2">
                          Dark Magic Detected!
                        </h4>
                        <ul className="space-y-1">
                          {result.warnings.map((warning, i) => (
                            <li key={i} className="text-sm text-red-800">
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                    <div className="flex items-start">
                      <Lightbulb className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-bold text-blue-900 mb-2">
                          Magical Wisdom
                        </h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-blue-800">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Individual Calculator Components

function OhmsLawCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [voltage, setVoltage] = useState('')
  const [current, setCurrent] = useState('')
  const [resistance, setResistance] = useState('')
  const [power, setPower] = useState('')

  const handleCalculate = () => {
    const result = calculateOhmsLaw(
      voltage ? parseFloat(voltage) : undefined,
      current ? parseFloat(current) : undefined,
      resistance ? parseFloat(resistance) : undefined,
      power ? parseFloat(power) : undefined
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Ohm's Law Calculator
      </h3>
      <p className="text-parchment/70 text-sm">
        Enter any two values to calculate the rest
      </p>
      
      <Input
        label="Voltage (V)"
        type="number"
        step="0.01"
        value={voltage}
        onChange={(e) => setVoltage(e.target.value)}
        placeholder="e.g., 120"
      />
      
      <Input
        label="Current (A)"
        type="number"
        step="0.01"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="e.g., 15"
      />
      
      <Input
        label="Resistance (Ω)"
        type="number"
        step="0.01"
        value={resistance}
        onChange={(e) => setResistance(e.target.value)}
        placeholder="e.g., 8"
      />
      
      <Input
        label="Power (W)"
        type="number"
        step="0.01"
        value={power}
        onChange={(e) => setPower(e.target.value)}
        placeholder="e.g., 1800"
      />
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function WireSizeCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [amperage, setAmperage] = useState('')
  const [distance, setDistance] = useState('')
  const [voltage, setVoltage] = useState('120')
  const [tempRating, setTempRating] = useState<60 | 75 | 90>(75)

  const handleCalculate = () => {
    const result = calculateWireSize(
      parseFloat(amperage),
      parseFloat(distance),
      parseFloat(voltage),
      tempRating
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Wire Size Calculator
      </h3>
      
      <Input
        label="Load Amperage (A)"
        type="number"
        step="0.1"
        value={amperage}
        onChange={(e) => setAmperage(e.target.value)}
        placeholder="e.g., 20"
        required
      />
      
      <Input
        label="One-Way Distance (feet)"
        type="number"
        step="1"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="e.g., 100"
        required
      />
      
      <Input
        label="Voltage (V)"
        type="number"
        value={voltage}
        onChange={(e) => setVoltage(e.target.value)}
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Temperature Rating (°C)
        </label>
        <select
          value={tempRating}
          onChange={(e) => setTempRating(parseInt(e.target.value) as 60 | 75 | 90)}
          className="spell-input"
        >
          <option value="60">60°C</option>
          <option value="75">75°C</option>
          <option value="90">90°C</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function VoltageDropCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [wireGauge, setWireGauge] = useState('12')
  const [amperage, setAmperage] = useState('')
  const [distance, setDistance] = useState('')
  const [voltage, setVoltage] = useState('120')
  const [material, setMaterial] = useState<'copper' | 'aluminum'>('copper')

  const handleCalculate = () => {
    const result = calculateVoltageDrop(
      wireGauge,
      parseFloat(amperage),
      parseFloat(distance),
      parseFloat(voltage),
      material
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Voltage Drop Calculator
      </h3>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Wire Gauge (AWG)
        </label>
        <select value={wireGauge} onChange={(e) => setWireGauge(e.target.value)} className="spell-input">
          <option value="14">14 AWG</option>
          <option value="12">12 AWG</option>
          <option value="10">10 AWG</option>
          <option value="8">8 AWG</option>
          <option value="6">6 AWG</option>
          <option value="4">4 AWG</option>
          <option value="2">2 AWG</option>
          <option value="1">1 AWG</option>
          <option value="1/0">1/0 AWG</option>
          <option value="2/0">2/0 AWG</option>
        </select>
      </div>
      
      <Input
        label="Load Amperage (A)"
        type="number"
        step="0.1"
        value={amperage}
        onChange={(e) => setAmperage(e.target.value)}
        required
      />
      
      <Input
        label="One-Way Distance (feet)"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        required
      />
      
      <Input
        label="System Voltage (V)"
        type="number"
        value={voltage}
        onChange={(e) => setVoltage(e.target.value)}
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Conductor Material
        </label>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value as 'copper' | 'aluminum')}
          className="spell-input"
        >
          <option value="copper">Copper</option>
          <option value="aluminum">Aluminum</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function BreakerSizeCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [loadAmperage, setLoadAmperage] = useState('')
  const [loadType, setLoadType] = useState<'continuous' | 'non-continuous'>('non-continuous')
  const [motorLoad, setMotorLoad] = useState(false)

  const handleCalculate = () => {
    const result = calculateBreakerSize(
      parseFloat(loadAmperage),
      loadType,
      motorLoad
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Breaker Size Calculator
      </h3>
      
      <Input
        label="Load Amperage (A)"
        type="number"
        step="0.1"
        value={loadAmperage}
        onChange={(e) => setLoadAmperage(e.target.value)}
        placeholder="e.g., 16"
        required
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Load Type
        </label>
        <select
          value={loadType}
          onChange={(e) => setLoadType(e.target.value as any)}
          className="spell-input"
        >
          <option value="non-continuous">Non-Continuous</option>
          <option value="continuous">Continuous (3+ hours)</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="motorLoad"
          checked={motorLoad}
          onChange={(e) => setMotorLoad(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="motorLoad" className="text-parchment/90 font-display">
          Motor Load
        </label>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function BoxFillCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [conductorSize, setConductorSize] = useState('12')
  const [conductorCount, setConductorCount] = useState('')
  const [devices, setDevices] = useState('')
  const [clamps, setClamps] = useState('')
  const [groundWires, setGroundWires] = useState('')

  const handleCalculate = () => {
    const result = calculateBoxFill(
      [{ size: conductorSize, count: parseInt(conductorCount) || 0 }],
      parseInt(devices) || 0,
      parseInt(clamps) || 0,
      parseInt(groundWires) || 0
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Box Fill Calculator
      </h3>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Conductor Size (AWG)
        </label>
        <select value={conductorSize} onChange={(e) => setConductorSize(e.target.value)} className="spell-input">
          <option value="14">14 AWG</option>
          <option value="12">12 AWG</option>
          <option value="10">10 AWG</option>
          <option value="8">8 AWG</option>
          <option value="6">6 AWG</option>
        </select>
      </div>
      
      <Input
        label="Number of Conductors"
        type="number"
        value={conductorCount}
        onChange={(e) => setConductorCount(e.target.value)}
        placeholder="e.g., 6"
      />
      
      <Input
        label="Number of Devices"
        type="number"
        value={devices}
        onChange={(e) => setDevices(e.target.value)}
        placeholder="e.g., 2"
        helperText="Switches, receptacles, etc."
      />
      
      <Input
        label="Internal Cable Clamps"
        type="number"
        value={clamps}
        onChange={(e) => setClamps(e.target.value)}
        placeholder="0"
      />
      
      <Input
        label="Ground Wires"
        type="number"
        value={groundWires}
        onChange={(e) => setGroundWires(e.target.value)}
        placeholder="e.g., 1"
      />
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function ConduitFillCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [conductorSize, setConductorSize] = useState('12')
  const [conductorCount, setConductorCount] = useState('')
  const [conduitType, setConduitType] = useState<'EMT' | 'PVC' | 'IMC' | 'Rigid'>('EMT')

  const handleCalculate = () => {
    const result = calculateConduitFill(
      conductorSize,
      parseInt(conductorCount),
      conduitType
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Conduit Fill Calculator
      </h3>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Conductor Size (AWG)
        </label>
        <select value={conductorSize} onChange={(e) => setConductorSize(e.target.value)} className="spell-input">
          <option value="14">14 AWG</option>
          <option value="12">12 AWG</option>
          <option value="10">10 AWG</option>
          <option value="8">8 AWG</option>
          <option value="6">6 AWG</option>
        </select>
      </div>
      
      <Input
        label="Number of Conductors"
        type="number"
        value={conductorCount}
        onChange={(e) => setConductorCount(e.target.value)}
        placeholder="e.g., 6"
        required
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Conduit Type
        </label>
        <select
          value={conduitType}
          onChange={(e) => setConduitType(e.target.value as any)}
          className="spell-input"
        >
          <option value="EMT">EMT</option>
          <option value="PVC">PVC</option>
          <option value="IMC">IMC</option>
          <option value="Rigid">Rigid</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

