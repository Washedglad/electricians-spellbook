import { CalculatorResult } from '../types'

// Ohm's Law Calculator
export function calculateOhmsLaw(
  voltage?: number,
  current?: number,
  resistance?: number,
  power?: number
): CalculatorResult {
  const results: Record<string, number> = {}
  const warnings: string[] = []
  const recommendations: string[] = []

  // V = I × R, P = V × I, P = I² × R, P = V² / R
  
  if (voltage !== undefined && current !== undefined) {
    results.resistance = voltage / current
    results.power = voltage * current
  } else if (voltage !== undefined && resistance !== undefined) {
    results.current = voltage / resistance
    results.power = (voltage * voltage) / resistance
  } else if (current !== undefined && resistance !== undefined) {
    results.voltage = current * resistance
    results.power = current * current * resistance
  } else if (power !== undefined && voltage !== undefined) {
    results.current = power / voltage
    results.resistance = (voltage * voltage) / power
  } else if (power !== undefined && current !== undefined) {
    results.voltage = power / current
    results.resistance = power / (current * current)
  } else if (power !== undefined && resistance !== undefined) {
    results.voltage = Math.sqrt(power * resistance)
    results.current = Math.sqrt(power / resistance)
  }

  // Add warnings for dangerous conditions
  if (results.current > 20) {
    warnings.push('⚠️ High current detected - ensure proper wire gauge!')
  }
  if (results.power > 5000) {
    warnings.push('⚠️ High power load - verify circuit capacity!')
  }

  return {
    inputs: { voltage, current, resistance, power } as Record<string, number>,
    outputs: results,
    warnings,
    recommendations,
  }
}

// Wire Size Calculator
export function calculateWireSize(
  amperage: number,
  distance: number,
  voltage: number = 120,
  temperatureRating: 60 | 75 | 90 = 75
): CalculatorResult {
  const wireCapacities: Record<string, { [key in 60 | 75 | 90]: number }> = {
    '14': { 60: 15, 75: 20, 90: 25 },
    '12': { 60: 20, 75: 25, 90: 30 },
    '10': { 60: 30, 75: 35, 90: 40 },
    '8': { 60: 40, 75: 50, 90: 55 },
    '6': { 60: 55, 75: 65, 90: 75 },
    '4': { 60: 70, 75: 85, 90: 95 },
    '3': { 60: 85, 75: 100, 90: 115 },
    '2': { 60: 95, 75: 115, 90: 130 },
    '1': { 60: 110, 75: 130, 90: 150 },
    '1/0': { 60: 125, 75: 150, 90: 170 },
    '2/0': { 60: 145, 75: 175, 90: 195 },
    '3/0': { 60: 165, 75: 200, 90: 225 },
    '4/0': { 60: 195, 75: 230, 90: 260 },
  }

  let recommendedSize = '14'
  const warnings: string[] = []
  const recommendations: string[] = []

  // Find appropriate wire size based on amperage
  for (const [gauge, ratings] of Object.entries(wireCapacities)) {
    if (ratings[temperatureRating] >= amperage * 1.25) {
      recommendedSize = gauge
      break
    }
  }

  // Calculate voltage drop
  const voltageDrop = (2 * 12.9 * amperage * distance) / 1000 // Approximate for copper
  const voltageDropPercent = (voltageDrop / voltage) * 100

  if (voltageDropPercent > 3) {
    warnings.push('⚠️ Voltage drop exceeds 3% - consider larger wire size!')
    recommendations.push('Increase wire gauge to reduce voltage drop')
  }

  if (amperage > 100) {
    recommendations.push('Consider consulting NEC Table 310.16 for exact requirements')
  }

  return {
    inputs: { amperage, distance, voltage, temperatureRating },
    outputs: {
      recommendedSize,
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercent: voltageDropPercent.toFixed(2) + '%',
      minAmpacity: (amperage * 1.25).toFixed(1),
    },
    warnings,
    recommendations,
  }
}

// Voltage Drop Calculator
export function calculateVoltageDrop(
  wireGauge: string,
  amperage: number,
  distance: number,
  voltage: number = 120,
  material: 'copper' | 'aluminum' = 'copper'
): CalculatorResult {
  // Resistance in ohms per 1000 feet at 75°C
  const resistances: Record<string, { copper: number; aluminum: number }> = {
    '14': { copper: 3.14, aluminum: 5.17 },
    '12': { copper: 1.98, aluminum: 3.25 },
    '10': { copper: 1.24, aluminum: 2.04 },
    '8': { copper: 0.778, aluminum: 1.28 },
    '6': { copper: 0.491, aluminum: 0.808 },
    '4': { copper: 0.308, aluminum: 0.508 },
    '3': { copper: 0.245, aluminum: 0.403 },
    '2': { copper: 0.194, aluminum: 0.319 },
    '1': { copper: 0.154, aluminum: 0.253 },
    '1/0': { copper: 0.122, aluminum: 0.201 },
    '2/0': { copper: 0.0967, aluminum: 0.159 },
    '3/0': { copper: 0.0766, aluminum: 0.126 },
    '4/0': { copper: 0.0608, aluminum: 0.100 },
  }

  const resistance = resistances[wireGauge]?.[material] || 1.98
  const voltageDrop = (2 * resistance * amperage * distance) / 1000
  const voltageDropPercent = (voltageDrop / voltage) * 100
  const voltageAtLoad = voltage - voltageDrop

  const warnings: string[] = []
  const recommendations: string[] = []

  if (voltageDropPercent > 3) {
    warnings.push('⚠️ Voltage drop exceeds recommended 3% limit!')
    recommendations.push('Use larger wire gauge or reduce circuit length')
  }

  if (voltageDropPercent > 5) {
    warnings.push('🚫 Voltage drop exceeds maximum 5% limit per NEC!')
  }

  return {
    inputs: { amperage, distance, voltage },
    outputs: {
      voltageDrop: voltageDrop.toFixed(2) + 'V',
      voltageDropPercent: voltageDropPercent.toFixed(2) + '%',
      voltageAtLoad: voltageAtLoad.toFixed(2) + 'V',
      wireResistance: resistance.toFixed(4) + ' Ω/1000ft',
    },
    warnings,
    recommendations,
  }
}

// Circuit Breaker Sizing
export function calculateBreakerSize(
  loadAmperage: number,
  loadType: 'continuous' | 'non-continuous' = 'non-continuous',
  motorLoad: boolean = false
): CalculatorResult {
  const standardBreakerSizes = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200]
  
  let requiredAmpacity = loadAmperage
  const warnings: string[] = []
  const recommendations: string[] = []

  // Continuous loads require 125% capacity
  if (loadType === 'continuous') {
    requiredAmpacity = loadAmperage * 1.25
    recommendations.push('Continuous load factor (125%) applied')
  }

  // Motor loads have special requirements
  if (motorLoad) {
    requiredAmpacity = loadAmperage * 1.25
    recommendations.push('Motor load factor applied - verify with NEC 430.52')
  }

  // Find next standard breaker size
  const breakerSize = standardBreakerSizes.find(size => size >= requiredAmpacity) || 200

  if (breakerSize > 100) {
    warnings.push('⚠️ Large breaker size - verify panel capacity!')
  }

  // Calculate wire size needed
  const wireRecommendation = breakerSize <= 15 ? '14 AWG' :
                            breakerSize <= 20 ? '12 AWG' :
                            breakerSize <= 30 ? '10 AWG' :
                            breakerSize <= 40 ? '8 AWG' :
                            breakerSize <= 55 ? '6 AWG' :
                            breakerSize <= 70 ? '4 AWG' : '2 AWG or larger'

  return {
    inputs: { loadAmperage, continuous: loadType === 'continuous', motorLoad },
    outputs: {
      breakerSize: breakerSize + 'A',
      requiredAmpacity: requiredAmpacity.toFixed(1) + 'A',
      recommendedWire: wireRecommendation,
    },
    warnings,
    recommendations,
  }
}

// Box Fill Calculator
export function calculateBoxFill(
  conductors: { size: string; count: number }[],
  devices: number = 0,
  clamps: number = 0,
  groundWires: number = 0
): CalculatorResult {
  // Volume per conductor (cubic inches)
  const volumePerConductor: Record<string, number> = {
    '14': 2.0,
    '12': 2.25,
    '10': 2.5,
    '8': 3.0,
    '6': 5.0,
    '4': 6.0,
    '3': 6.0,
    '2': 6.0,
  }

  let totalVolume = 0

  // Calculate conductor volume
  conductors.forEach(({ size, count }) => {
    const volume = volumePerConductor[size] || 2.25
    totalVolume += volume * count
  })

  // Add device volume (count largest conductor twice per device)
  if (devices > 0) {
    const largestConductor = conductors.reduce((max, c) => {
      const vol = volumePerConductor[c.size] || 2.25
      return vol > (volumePerConductor[max] || 0) ? c.size : max
    }, '14')
    totalVolume += (volumePerConductor[largestConductor] || 2.25) * 2 * devices
  }

  // Add clamp volume
  if (clamps > 0) {
    const largestConductor = conductors.reduce((max, c) => {
      const vol = volumePerConductor[c.size] || 2.25
      return vol > (volumePerConductor[max] || 0) ? c.size : max
    }, '14')
    totalVolume += (volumePerConductor[largestConductor] || 2.25) * clamps
  }

  // Add ground wire volume (count as one conductor of largest size)
  if (groundWires > 0) {
    const largestConductor = conductors.reduce((max, c) => {
      const vol = volumePerConductor[c.size] || 2.25
      return vol > (volumePerConductor[max] || 0) ? c.size : max
    }, '14')
    totalVolume += volumePerConductor[largestConductor] || 2.25
  }

  // Common box sizes (cubic inches)
  const boxSizes = [
    { name: '4" Square (1-1/4" deep)', volume: 18.0 },
    { name: '4" Square (1-1/2" deep)', volume: 21.0 },
    { name: '4" Square (2-1/8" deep)', volume: 30.3 },
    { name: '4-11/16" Square (1-1/4" deep)', volume: 25.5 },
    { name: '4-11/16" Square (1-1/2" deep)', volume: 29.5 },
    { name: '4-11/16" Square (2-1/8" deep)', volume: 42.0 },
    { name: 'Single Gang (3" x 2" x 2-1/2")', volume: 12.5 },
    { name: 'Single Gang (3" x 2" x 3-1/2")', volume: 18.0 },
    { name: 'Double Gang (3" x 2" x 2-1/2")', volume: 25.0 },
    { name: 'Double Gang (3" x 2" x 3-1/2")', volume: 36.0 },
  ]

  const recommendedBox = boxSizes.find(box => box.volume >= totalVolume) || boxSizes[boxSizes.length - 1]

  const warnings: string[] = []
  const recommendations: string[] = []

  if (totalVolume > 42) {
    warnings.push('⚠️ Large volume required - may need multiple boxes or larger enclosure!')
  }

  if (devices > 2) {
    recommendations.push('Consider using a larger gang box for easier installation')
  }

  return {
    inputs: { devices, clamps, groundWires } as Record<string, number>,
    outputs: {
      requiredVolume: totalVolume.toFixed(1) + ' cu.in.',
      recommendedBox: recommendedBox.name,
      boxVolume: recommendedBox.volume.toFixed(1) + ' cu.in.',
      fillPercentage: ((totalVolume / recommendedBox.volume) * 100).toFixed(1) + '%',
    },
    warnings,
    recommendations,
  }
}

// Conduit Fill Calculator
export function calculateConduitFill(
  conductorSize: string,
  conductorCount: number,
  conduitType: 'EMT' | 'PVC' | 'IMC' | 'Rigid' = 'EMT'
): CalculatorResult {
  // Simplified conduit fill - actual NEC tables are more complex
  const maxFillPercentages = {
    '1': 53, // 1 conductor
    '2': 31, // 2 conductors
    '3+': 40, // 3 or more conductors
  }

  const fillPercentage = conductorCount === 1 ? maxFillPercentages['1'] :
                        conductorCount === 2 ? maxFillPercentages['2'] :
                        maxFillPercentages['3+']

  // Simplified recommendations
  const recommendedSizes: Record<number, string[]> = {
    14: ['1/2"', '3/4"', '1"', '1-1/4"'],
    12: ['1/2"', '3/4"', '1"', '1-1/4"'],
    10: ['3/4"', '1"', '1-1/4"', '1-1/2"'],
    8: ['3/4"', '1"', '1-1/4"', '1-1/2"', '2"'],
    6: ['1"', '1-1/4"', '1-1/2"', '2"'],
  }

  const sizeNum = parseInt(conductorSize)
  const sizeOptions = recommendedSizes[sizeNum] || ['1"', '1-1/4"', '1-1/2"', '2"']
  
  const recommendations: string[] = [
    'Consult NEC Annex C for exact conduit fill requirements',
    'Consider derating factors for more than 3 current-carrying conductors',
  ]

  const warnings: string[] = []

  if (conductorCount > 9) {
    warnings.push('⚠️ High conductor count - verify derating requirements!')
  }

  return {
    inputs: { conductorSize, conductorCount, conduitType },
    outputs: {
      maxFillPercentage: fillPercentage + '%',
      recommendedSize: sizeOptions[Math.min(Math.floor(conductorCount / 3), sizeOptions.length - 1)],
      alternativeSizes: sizeOptions.join(', '),
    },
    warnings,
    recommendations,
  }
}

