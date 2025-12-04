import { CalculatorResult } from '../types'

// Cat5e/Cat6 Cable Length Calculator
export function calculateDataCableLength(
  dataRate: number, // in Mbps or Gbps
  cableType: 'Cat5e' | 'Cat6' | 'Cat6a' | 'Cat7' | 'Fiber',
  environmentalFactors: 'indoor' | 'outdoor' | 'plenum' = 'indoor'
): CalculatorResult {
  const maxLengths: Record<string, number> = {
    'Cat5e': 100, // meters
    'Cat6': 100,
    'Cat6a': 100,
    'Cat7': 100,
    'Fiber': 10000, // 10km for single-mode
  }

  const speedLimits: Record<string, number> = {
    'Cat5e': 1000, // 1 Gbps
    'Cat6': 10000, // 10 Gbps up to 55m
    'Cat6a': 10000,
    'Cat7': 10000,
    'Fiber': 100000, // 100 Gbps+
  }

  const warnings: string[] = []
  const recommendations: string[] = []

  const maxLength = maxLengths[cableType]
  const maxSpeed = speedLimits[cableType]

  if (dataRate > maxSpeed) {
    warnings.push(`⚠️ ${cableType} may not support ${dataRate} Mbps reliably!`)
    recommendations.push(`Consider upgrading to ${cableType === 'Cat5e' ? 'Cat6a' : 'Fiber'} for higher speeds`)
  }

  if (cableType === 'Cat6' && dataRate >= 10000) {
    warnings.push('⚠️ Cat6 supports 10 Gbps only up to 55 meters!')
    recommendations.push('Use Cat6a for full 100m runs at 10 Gbps')
  }

  if (environmentalFactors === 'plenum') {
    recommendations.push('Use plenum-rated cable (CMP) for air handling spaces')
  }

  if (environmentalFactors === 'outdoor') {
    recommendations.push('Use outdoor-rated cable with UV protection and moisture barrier')
  }

  return {
    inputs: { dataRate, cableType, environmentalFactors },
    outputs: {
      maxLength: `${maxLength}m (${(maxLength * 3.28084).toFixed(0)}ft)`,
      maxSpeed: `${maxSpeed >= 1000 ? maxSpeed / 1000 : maxSpeed} ${maxSpeed >= 1000 ? 'Gbps' : 'Mbps'}`,
      recommendedUse: getRecommendedUse(cableType),
    },
    warnings,
    recommendations,
  }
}

function getRecommendedUse(cableType: string): string {
  const uses: Record<string, string> = {
    'Cat5e': 'Gigabit Ethernet, VoIP, basic networking',
    'Cat6': '10 Gigabit short runs, general networking',
    'Cat6a': '10 Gigabit full distance, PoE++',
    'Cat7': 'Shielded 10G applications, high EMI areas',
    'Fiber': 'Long distance, high speed, immune to EMI',
  }
  return uses[cableType] || 'General use'
}

// PoE (Power over Ethernet) Calculator
export function calculatePoE(
  standard: 'PoE' | 'PoE+' | 'PoE++',
  deviceCount: number,
  devicePower: number // watts per device
): CalculatorResult {
  const standards = {
    'PoE': { maxPerPort: 15.4, maxPerDevice: 12.95, voltage: 48 },
    'PoE+': { maxPerPort: 30, maxPerDevice: 25.5, voltage: 48 },
    'PoE++': { maxPerPort: 60, maxPerDevice: 51, voltage: 48 },
  }

  const spec = standards[standard]
  const totalPower = devicePower * deviceCount
  const requiredPorts = deviceCount
  const switchPowerBudget = spec.maxPerPort * deviceCount

  const warnings: string[] = []
  const recommendations: string[] = []

  if (devicePower > spec.maxPerDevice) {
    warnings.push(`⚠️ Device requires ${devicePower}W but ${standard} only provides ${spec.maxPerDevice}W!`)
    const nextStandard = standard === 'PoE' ? 'PoE+' : 'PoE++'
    recommendations.push(`Use ${nextStandard} standard for higher power devices`)
  }

  if (totalPower > 370) { // Typical switch limit
    warnings.push('⚠️ Total power exceeds typical switch budget!')
    recommendations.push('Consider multiple switches or external PoE injectors')
  }

  if (standard === 'PoE++') {
    recommendations.push('Requires Cat6a or better cabling for optimal performance')
  }

  return {
    inputs: { standard, deviceCount, devicePower },
    outputs: {
      totalPower: `${totalPower.toFixed(1)}W`,
      switchBudget: `${switchPowerBudget.toFixed(1)}W`,
      portsNeeded: requiredPorts.toString(),
      voltage: `${spec.voltage}V DC`,
      perDeviceMax: `${spec.maxPerDevice}W`,
    },
    warnings,
    recommendations,
  }
}

// Low Voltage Power Supply Calculator
export function calculateLowVoltagePower(
  voltage: 12 | 24, // volts DC
  totalLoad: number, // watts
  cableLength: number, // feet
  wireGauge: string = '18'
): CalculatorResult {
  const current = totalLoad / voltage
  
  // Resistance per 1000ft (ohms)
  const resistances: Record<string, number> = {
    '18': 6.385,
    '16': 4.016,
    '14': 2.525,
    '12': 1.588,
    '10': 0.999,
  }

  const resistance = (resistances[wireGauge] || 4.016) * (cableLength / 1000) * 2 // round trip
  const voltageDrop = current * resistance
  const voltageAtLoad = voltage - voltageDrop
  const voltageDropPercent = (voltageDrop / voltage) * 100

  const warnings: string[] = []
  const recommendations: string[] = []

  if (voltageDropPercent > 3) {
    warnings.push('⚠️ Voltage drop exceeds 3% - devices may not function properly!')
    recommendations.push('Use larger wire gauge or reduce cable length')
  }

  if (voltageAtLoad < voltage * 0.9) {
    warnings.push('🚫 Voltage at load below 90% of supply!')
    recommendations.push('Critical: Increase wire size or add local power supply')
  }

  const recommendedPSU = Math.ceil(totalLoad * 1.25) // 25% overhead

  return {
    inputs: { voltage, totalLoad, cableLength, wireGauge },
    outputs: {
      current: `${current.toFixed(2)}A`,
      voltageDrop: `${voltageDrop.toFixed(2)}V`,
      voltageDropPercent: `${voltageDropPercent.toFixed(1)}%`,
      voltageAtLoad: `${voltageAtLoad.toFixed(2)}V`,
      recommendedPSU: `${recommendedPSU}W power supply`,
    },
    warnings,
    recommendations,
  }
}

// HVAC Control Wiring Calculator
export function calculateHVACWiring(
  wireCount: number, // Number of conductors needed
  maxDistance: number, // feet
  voltage: 24 | 120 | 240,
  applicationTy: 'thermostat' | 'zone-damper' | 'actuator' | 'sensor'
): CalculatorResult {
  let recommendedCable = ''
  const warnings: string[] = []
  const recommendations: string[] = []

  if (voltage === 24) {
    // Low voltage thermostat wire
    if (wireCount <= 8) {
      recommendedCable = `${wireCount}C ${wireCount <= 5 ? '18' : '20'} AWG Thermostat Cable`
    } else {
      recommendedCable = 'Multi-conductor cable with appropriate gauge'
    }

    if (maxDistance > 250) {
      warnings.push('⚠️ Long runs may require larger gauge for 24V systems')
      recommendations.push('Consider 18 AWG or 16 AWG for distances over 250 feet')
    }
  } else {
    recommendedCable = `${wireCount === 2 ? '14/2' : `14/${wireCount}`} NM-B or MC cable`
    recommendations.push('Follow NEC requirements for line voltage wiring')
  }

  if (applicationTy === 'thermostat') {
    recommendations.push('Common wires: R (24V), C (common), W (heat), Y (cool), G (fan)')
    if (wireCount < 5) {
      warnings.push('⚠️ Modern smart thermostats typically need 5+ wires including C wire')
    }
  }

  if (applicationTy === 'zone-damper') {
    recommendations.push('Verify damper voltage requirements (24V AC typical)')
  }

  return {
    inputs: { wireCount, maxDistance, voltage, application: applicationTy },
    outputs: {
      recommendedCable,
      voltage: `${voltage}V`,
      wireCount: wireCount.toString(),
      typicalAmps: voltage === 24 ? '< 2A' : 'Varies by load',
    },
    warnings,
    recommendations,
  }
}

// PLC I/O Point Calculator
export function calculatePLCIO(
  digitalInputs: number,
  digitalOutputs: number,
  analogInputs: number,
  analogOutputs: number,
  expansion: number = 20 // percentage
): CalculatorResult {
  const totalIO = digitalInputs + digitalOutputs + analogInputs + analogOutputs
  const withExpansion = Math.ceil(totalIO * (1 + expansion / 100))
  
  const warnings: string[] = []
  const recommendations: string[] = []

  // Recommend PLC size
  let plcSize = ''
  if (withExpansion <= 32) {
    plcSize = 'Micro PLC (32 I/O or less)'
  } else if (withExpansion <= 128) {
    plcSize = 'Compact PLC (32-128 I/O)'
  } else if (withExpansion <= 512) {
    plcSize = 'Modular PLC (128-512 I/O)'
  } else {
    plcSize = 'Large Modular PLC (512+ I/O)'
  }

  if (analogInputs > 0 || analogOutputs > 0) {
    recommendations.push('Consider specialized analog I/O modules for better resolution')
  }

  if (totalIO > 64) {
    recommendations.push('Plan for distributed I/O for easier wiring and troubleshooting')
  }

  if (expansion < 20) {
    warnings.push('⚠️ Recommend at least 20% expansion capacity for future growth')
  }

  const estimatedWiring = calculatePLCWiring(digitalInputs, digitalOutputs, analogInputs, analogOutputs)

  return {
    inputs: { digitalInputs, digitalOutputs, analogInputs, analogOutputs, expansion },
    outputs: {
      totalIO: totalIO.toString(),
      withExpansion: withExpansion.toString(),
      recommendedPLC: plcSize,
      estimatedWiring: estimatedWiring,
      powerRequirement: estimatePLCPower(withExpansion),
    },
    warnings,
    recommendations,
  }
}

function calculatePLCWiring(dIn: number, dOut: number, aIn: number, aOut: number): string {
  const totalWires = (dIn * 2) + (dOut * 2) + (aIn * 3) + (aOut * 3)
  return `Approx. ${totalWires} wires (includes commons and shields)`
}

function estimatePLCPower(ioCount: number): string {
  const basePower = 50 // watts for CPU
  const ioPower = ioCount * 2 // 2W per I/O point average
  const total = basePower + ioPower
  return `${total}W (${(total * 1.25).toFixed(0)}W recommended PSU)`
}

// Security/Access Control Wire Calculator
export function calculateSecurityWiring(
  system: 'camera' | 'access-control' | 'alarm' | 'intercom',
  deviceCount: number,
  avgDistance: number, // feet
  powerMethod: 'PoE' | 'local-12V' | 'local-24V' | 'separate-power'
): CalculatorResult {
  const warnings: string[] = []
  const recommendations: string[] = []
  let cableType = ''
  let estimatedLength = deviceCount * avgDistance * 1.1 // 10% slack

  switch (system) {
    case 'camera':
      if (powerMethod === 'PoE') {
        cableType = 'Cat6 or Cat6a (PoE+)'
        recommendations.push('Use Cat6a for 4K cameras or long runs')
        recommendations.push('Verify switch PoE budget for all cameras')
      } else {
        cableType = 'Siamese cable (RG59 + 18/2 power)'
        recommendations.push('Use separate power supply near camera locations')
      }
      break

    case 'access-control':
      cableType = '22/6 or 22/8 stranded, shielded'
      recommendations.push('Use shielded cable near EMI sources')
      recommendations.push('Include extra conductors for REX, door contacts')
      break

    case 'alarm':
      cableType = '22/4 or 22/6 for sensors, 18/2 for sirens'
      recommendations.push('Use different colors for different zones')
      recommendations.push('Follow NFPA 72 for fire alarm systems')
      break

    case 'intercom':
      cableType = 'Cat6 for IP intercom, 22/2 shielded for analog'
      recommendations.push('Consider IP-based systems for better quality')
      break
  }

  if (avgDistance > 300 && powerMethod !== 'PoE') {
    warnings.push('⚠️ Long runs may require voltage drop compensation')
  }

  if (estimatedLength > 1000) {
    recommendations.push('Consider ordering cable in 1000ft spools')
  }

  return {
    inputs: { system, deviceCount, avgDistance, powerMethod },
    outputs: {
      recommendedCable: cableType,
      estimatedLength: `${estimatedLength.toFixed(0)} feet`,
      spoolsNeeded: `${Math.ceil(estimatedLength / 1000)} x 1000ft spools`,
      avgPerDevice: `${avgDistance} feet`,
    },
    warnings,
    recommendations,
  }
}

