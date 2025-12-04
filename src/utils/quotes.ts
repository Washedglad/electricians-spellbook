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
  },
  {
    quote: "It does not do to dwell on dreams and forget to live.",
    author: "Albus Dumbledore"
  },
  {
    quote: "The truth. It is a beautiful and terrible thing, and should therefore be treated with great caution.",
    author: "Albus Dumbledore"
  },
  {
    quote: "It is the unknown we fear when we look upon death and darkness, nothing more.",
    author: "Albus Dumbledore"
  },
  {
    quote: "Working hard is important. But there is something that matters even more: believing in yourself.",
    author: "Harry Potter"
  },
  {
    quote: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    author: "Sirius Black"
  },
  {
    quote: "Things we lose have a way of coming back to us in the end, if not always in the way we expect.",
    author: "Luna Lovegood"
  },
  {
    quote: "We've all got both light and dark inside us. What matters is the part we choose to act on.",
    author: "Sirius Black"
  },
  {
    quote: "Don't let the muggles get you down.",
    author: "Ron Weasley"
  },
  {
    quote: "When in doubt, go to the library.",
    author: "Hermione Granger"
  },
  {
    quote: "Just because you have the emotional range of a teaspoon doesn't mean we all have.",
    author: "Hermione Granger"
  },
  {
    quote: "It is impossible to manufacture or imitate love.",
    author: "Horace Slughorn"
  },
  {
    quote: "Youth cannot know how age thinks and feels. But old men are guilty if they forget what it was to be young.",
    author: "Albus Dumbledore"
  },
  {
    quote: "Fear of a name increases fear of the thing itself.",
    author: "Hermione Granger"
  },
  {
    quote: "The ones that love us never really leave us.",
    author: "Sirius Black"
  },
  {
    quote: "Wit beyond measure is man's greatest treasure.",
    author: "Luna Lovegood"
  },
  {
    quote: "You sort of start thinking anything's possible if you've got enough nerve.",
    author: "Ginny Weasley"
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

