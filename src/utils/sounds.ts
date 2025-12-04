// Sound effects for magical interactions
// Using Web Audio API to generate wizard sounds

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    // Initialize audio context on user interaction
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  private ensureContext() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  // Spell cast sound - magical whoosh with multiple oscillators
  playSpellCast() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const now = this.audioContext.currentTime
    
    // Create multiple oscillators for rich sound
    const osc1 = this.audioContext.createOscillator()
    const osc2 = this.audioContext.createOscillator()
    const osc3 = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    osc1.type = 'sine'
    osc2.type = 'triangle'
    osc3.type = 'sine'
    
    osc1.frequency.setValueAtTime(523.25, now) // C5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.2) // C6
    
    osc2.frequency.setValueAtTime(659.25, now) // E5
    osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.2) // E6
    
    osc3.frequency.setValueAtTime(783.99, now) // G5
    osc3.frequency.exponentialRampToValueAtTime(1567.98, now + 0.2) // G6
    
    gainNode.gain.setValueAtTime(0.12, now)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
    
    osc1.connect(gainNode)
    osc2.connect(gainNode)
    osc3.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    osc1.start(now)
    osc2.start(now)
    osc3.start(now)
    osc1.stop(now + 0.3)
    osc2.stop(now + 0.3)
    osc3.stop(now + 0.3)
  }

  // Wand swish sound - magical rising pitch for button clicks
  playWandSwish() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.15)

    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.15)
  }

  // Button click sound (soft magical pop) - kept for compatibility
  playClick() {
    this.playWandSwish()
  }

  // Lumos - light spell sound
  playLumos() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(1760, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(2640, this.audioContext.currentTime + 0.2)

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.12, this.audioContext.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.25)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.25)
  }

  // Success sound - ascending magical arpeggio
  playSuccess() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const now = this.audioContext.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.5] // C, E, G, C - major chord arpeggio
    
    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator()
      const gain = this.audioContext!.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.08)
      
      gain.gain.setValueAtTime(0.15, now + i * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3)
      
      osc.connect(gain)
      gain.connect(this.audioContext!.destination)
      
      osc.start(now + i * 0.08)
      osc.stop(now + i * 0.08 + 0.3)
    })
  }

  // Warning sound - ominous descending tone
  playWarning() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(220, now) // A3
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.3)

    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)

    osc.start(now)
    osc.stop(now + 0.3)
  }

  // Page transition sound - magical shimmer
  playTransition() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1320, now)
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12)

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12)

    osc.start(now)
    osc.stop(now + 0.12)
  }

  // Toggle sounds on/off
  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }
}

// Export singleton instance
export const soundManager = new SoundManager()

