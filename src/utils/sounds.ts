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

  // Spell cast sound (magical chime)
  playSpellCast() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime) // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.5, this.audioContext.currentTime + 0.1) // C6

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.3)
  }

  // Button click sound (soft magical pop)
  playClick() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  // Success sound (magical shimmer)
  playSuccess() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const notes = [659.25, 783.99, 987.77] // E5, G5, B5 - major chord
    
    notes.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator()
      const gainNode = this.audioContext!.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext!.destination)

      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime + index * 0.05)
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.15, this.audioContext!.currentTime + index * 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.4 + index * 0.05)

      oscillator.start(this.audioContext!.currentTime + index * 0.05)
      oscillator.stop(this.audioContext!.currentTime + 0.4 + index * 0.05)
    })
  }

  // Warning sound (ominous tone)
  playWarning() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime) // A3
    oscillator.type = 'sawtooth'

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.5)
  }

  // Page transition sound (whoosh)
  playTransition() {
    if (!this.enabled || !this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.2)
    oscillator.type = 'sawtooth'

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime)
    filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2)

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.2)
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

