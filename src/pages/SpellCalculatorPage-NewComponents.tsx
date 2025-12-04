// Append these to SpellCalculatorPage.tsx before the last closing brace

// Low Voltage & Data Calculators

function DataCableCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [dataRate, setDataRate] = useState('')
  const [cableType, setCableType] = useState<'Cat5e' | 'Cat6' | 'Cat6a' | 'Cat7' | 'Fiber'>('Cat6')
  const [environment, setEnvironment] = useState<'indoor' | 'outdoor' | 'plenum'>('indoor')

  const handleCalculate = () => {
    const result = calculateDataCableLength(
      parseFloat(dataRate),
      cableType,
      environment
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Data Cable Calculator
      </h3>
      
      <Input
        label="Data Rate (Mbps)"
        type="number"
        value={dataRate}
        onChange={(e) => setDataRate(e.target.value)}
        placeholder="e.g., 1000"
        required
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Cable Type
        </label>
        <select value={cableType} onChange={(e) => setCableType(e.target.value as any)} className="spell-input">
          <option value="Cat5e">Cat 5e</option>
          <option value="Cat6">Cat 6</option>
          <option value="Cat6a">Cat 6a</option>
          <option value="Cat7">Cat 7</option>
          <option value="Fiber">Fiber Optic</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Environment
        </label>
        <select value={environment} onChange={(e) => setEnvironment(e.target.value as any)} className="spell-input">
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="plenum">Plenum</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function PoECalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [standard, setStandard] = useState<'PoE' | 'PoE+' | 'PoE++'>('PoE+')
  const [deviceCount, setDeviceCount] = useState('')
  const [devicePower, setDevicePower] = useState('')

  const handleCalculate = () => {
    const result = calculatePoE(
      standard,
      parseInt(deviceCount),
      parseFloat(devicePower)
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        PoE Power Calculator
      </h3>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          PoE Standard
        </label>
        <select value={standard} onChange={(e) => setStandard(e.target.value as any)} className="spell-input">
          <option value="PoE">PoE (15.4W per port)</option>
          <option value="PoE+">PoE+ (30W per port)</option>
          <option value="PoE++">PoE++ (60W per port)</option>
        </select>
      </div>
      
      <Input
        label="Number of Devices"
        type="number"
        value={deviceCount}
        onChange={(e) => setDeviceCount(e.target.value)}
        placeholder="e.g., 8"
        required
      />
      
      <Input
        label="Power per Device (W)"
        type="number"
        step="0.1"
        value={devicePower}
        onChange={(e) => setDevicePower(e.target.value)}
        placeholder="e.g., 12.5"
        required
      />
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function LowVoltagePowerCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [voltage, setVoltage] = useState<12 | 24>(24)
  const [totalLoad, setTotalLoad] = useState('')
  const [cableLength, setCableLength] = useState('')
  const [wireGauge, setWireGauge] = useState('18')

  const handleCalculate = () => {
    const result = calculateLowVoltagePower(
      voltage,
      parseFloat(totalLoad),
      parseFloat(cableLength),
      wireGauge
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Low Voltage Power Calculator
      </h3>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          System Voltage
        </label>
        <select value={voltage} onChange={(e) => setVoltage(parseInt(e.target.value) as 12 | 24)} className="spell-input">
          <option value="12">12V DC</option>
          <option value="24">24V DC</option>
        </select>
      </div>
      
      <Input
        label="Total Load (W)"
        type="number"
        step="0.1"
        value={totalLoad}
        onChange={(e) => setTotalLoad(e.target.value)}
        placeholder="e.g., 48"
        required
      />
      
      <Input
        label="Cable Length (feet)"
        type="number"
        value={cableLength}
        onChange={(e) => setCableLength(e.target.value)}
        placeholder="e.g., 100"
        required
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Wire Gauge (AWG)
        </label>
        <select value={wireGauge} onChange={(e) => setWireGauge(e.target.value)} className="spell-input">
          <option value="18">18 AWG</option>
          <option value="16">16 AWG</option>
          <option value="14">14 AWG</option>
          <option value="12">12 AWG</option>
          <option value="10">10 AWG</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function HVACWiringCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [wireCount, setWireCount] = useState('')
  const [maxDistance, setMaxDistance] = useState('')
  const [voltage, setVoltage] = useState<24 | 120 | 240>(24)
  const [applicationType, setApplicationType] = useState<'thermostat' | 'zone-damper' | 'actuator' | 'sensor'>('thermostat')

  const handleCalculate = () => {
    const result = calculateHVACWiring(
      parseInt(wireCount),
      parseFloat(maxDistance),
      voltage,
      applicationType
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        HVAC Control Wiring
      </h3>
      
      <Input
        label="Number of Wires Needed"
        type="number"
        value={wireCount}
        onChange={(e) => setWireCount(e.target.value)}
        placeholder="e.g., 5"
        required
      />
      
      <Input
        label="Maximum Distance (feet)"
        type="number"
        value={maxDistance}
        onChange={(e) => setMaxDistance(e.target.value)}
        placeholder="e.g., 150"
        required
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          System Voltage
        </label>
        <select value={voltage} onChange={(e) => setVoltage(parseInt(e.target.value) as any)} className="spell-input">
          <option value="24">24V (Thermostat)</option>
          <option value="120">120V (Line voltage)</option>
          <option value="240">240V (Line voltage)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Application Type
        </label>
        <select value={applicationType} onChange={(e) => setApplicationType(e.target.value as any)} className="spell-input">
          <option value="thermostat">Thermostat</option>
          <option value="zone-damper">Zone Damper</option>
          <option value="actuator">Actuator</option>
          <option value="sensor">Sensor</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function PLCIOCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [digitalInputs, setDigitalInputs] = useState('')
  const [digitalOutputs, setDigitalOutputs] = useState('')
  const [analogInputs, setAnalogInputs] = useState('')
  const [analogOutputs, setAnalogOutputs] = useState('')
  const [expansion, setExpansion] = useState('20')

  const handleCalculate = () => {
    const result = calculatePLCIO(
      parseInt(digitalInputs) || 0,
      parseInt(digitalOutputs) || 0,
      parseInt(analogInputs) || 0,
      parseInt(analogOutputs) || 0,
      parseInt(expansion)
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        PLC I/O Calculator
      </h3>
      
      <Input
        label="Digital Inputs"
        type="number"
        value={digitalInputs}
        onChange={(e) => setDigitalInputs(e.target.value)}
        placeholder="e.g., 16"
      />
      
      <Input
        label="Digital Outputs"
        type="number"
        value={digitalOutputs}
        onChange={(e) => setDigitalOutputs(e.target.value)}
        placeholder="e.g., 12"
      />
      
      <Input
        label="Analog Inputs"
        type="number"
        value={analogInputs}
        onChange={(e) => setAnalogInputs(e.target.value)}
        placeholder="e.g., 4"
      />
      
      <Input
        label="Analog Outputs"
        type="number"
        value={analogOutputs}
        onChange={(e) => setAnalogOutputs(e.target.value)}
        placeholder="e.g., 2"
      />
      
      <Input
        label="Expansion Capacity (%)"
        type="number"
        value={expansion}
        onChange={(e) => setExpansion(e.target.value)}
        placeholder="20"
        helperText="Recommended: 20-30%"
      />
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

function SecurityWiringCalculator({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [system, setSystem] = useState<'camera' | 'access-control' | 'alarm' | 'intercom'>('camera')
  const [deviceCount, setDeviceCount] = useState('')
  const [avgDistance, setAvgDistance] = useState('')
  const [powerMethod, setPowerMethod] = useState<'PoE' | 'local-12V' | 'local-24V' | 'separate-power'>('PoE')

  const handleCalculate = () => {
    const result = calculateSecurityWiring(
      system,
      parseInt(deviceCount),
      parseFloat(avgDistance),
      powerMethod
    )
    onResult(result)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display font-bold text-accent-gold">
        Security System Wiring
      </h3>
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          System Type
        </label>
        <select value={system} onChange={(e) => setSystem(e.target.value as any)} className="spell-input">
          <option value="camera">Security Camera</option>
          <option value="access-control">Access Control</option>
          <option value="alarm">Alarm System</option>
          <option value="intercom">Intercom</option>
        </select>
      </div>
      
      <Input
        label="Number of Devices"
        type="number"
        value={deviceCount}
        onChange={(e) => setDeviceCount(e.target.value)}
        placeholder="e.g., 8"
        required
      />
      
      <Input
        label="Average Cable Distance (feet)"
        type="number"
        value={avgDistance}
        onChange={(e) => setAvgDistance(e.target.value)}
        placeholder="e.g., 150"
        required
      />
      
      <div>
        <label className="block text-sm font-display text-parchment/90 mb-2">
          Power Method
        </label>
        <select value={powerMethod} onChange={(e) => setPowerMethod(e.target.value as any)} className="spell-input">
          <option value="PoE">Power over Ethernet (PoE)</option>
          <option value="local-12V">Local 12V Power Supply</option>
          <option value="local-24V">Local 24V Power Supply</option>
          <option value="separate-power">Separate Power Wiring</option>
        </select>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">
        Cast Spell
      </Button>
    </div>
  )
}

