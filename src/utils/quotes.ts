// Harry Potter quotes themed for electricians
export const harryPotterQuotes = [
  {
    quote: "It matters not what someone is born, but what they grow to be.",
    author: "Albus Dumbledore"
  },
  {
    quote: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    author: "Albus Dumbledore"
  },
  {
    quote: "It is our choices that show what we truly are, far more than our abilities.",
    author: "Albus Dumbledore"
  },
  {
    quote: "We must all face the choice between what is right and what is easy.",
    author: "Albus Dumbledore"
  },
  {
    quote: "Dark times lie ahead of us and there will be a time when we must choose between what is easy and what is right.",
    author: "Albus Dumbledore"
  },
  {
    quote: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
    author: "Albus Dumbledore"
  },
  {
    quote: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    author: "Albus Dumbledore"
  },
  {
    quote: "Do not pity the dead, Harry. Pity the living, and above all, those who live without love.",
    author: "Albus Dumbledore"
  },
  {
    quote: "After all this time? Always.",
    author: "Severus Snape"
  },
  {
    quote: "I solemnly swear that I am up to no good.",
    author: "The Marauders"
  }
]

// Get a random quote
export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * harryPotterQuotes.length)
  return harryPotterQuotes[index]
}

// Get a specific quote by index
export const getQuoteByIndex = (index: number) => {
  return harryPotterQuotes[index % harryPotterQuotes.length]
}

