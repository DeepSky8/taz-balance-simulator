import { shuffle } from '../functions'

class Assist {
    constructor() {
        this.flavorText = undefined
        this.ongoingAbility = false
        this.ongoingSpooky = undefined
        this.ongoingMonster = undefined
        this.ongoingMagic = undefined
        this.ongoingTrap = undefined
        this.ongoingStrength = undefined
        this.discardAbility = false
        this.discardText = undefined
        this.discardSpooky = undefined
        this.discardMonster = undefined
        this.discardMagic = undefined
        this.discardTrap = undefined
        this.discardStrength = undefined
        this.discardHealth = undefined
        this.discardNewChallenges = undefined
        this.discardDamage = undefined
        this.placed = false
    }
}

const assistCards = [
    {
        name: `Merle's Blessing`,
        flavorText: `Merle's prayers strengthen you.`,
        ongoingAbility: true,
        ongoingSpooky: 1,
        discardAbility: true,
        discardText: `Make what you think is an inspiring speech (but probably isn't) and recover 3 health.`,
        discardHealth: 3
    },

    {
        name: `Carey Scouts Ahead`,
        flavorText: `Carey Fangbattle is a rogue, and damn good at rogue-like stuff.`,
        ongoingAbility: true,
        ongoingTrap: 1,
        discardAbility: true,
        discardText: `Add +2 to the die roll when facing a trap challenge. How does Carey help?`,
        discardTrap: 2
    },

    {
        name: `Taako's Tips`,
        ongoingAbility: true,
        ongoingMagic: 1,
        discardAbility: true,
        discardText: `Taako's advice covers a surprisingly wide range of situations. Explain how he inspired or helped you to add +1 to any die roll.`,
        discardStrength: 1
    },

    {
        name: `Mysterious Vision`,
        flavorText: `Barry Bluejeans inspires you with a spooky, spectral visitation.`,
        ongoingAbility: true,
        ongoingSpooky: 1,
        discardAbility: true,
        discardText: `Add +1 to any die roll; explain how Barry's vision guides you to success.`,
        discardStrength: 1
    },

    {
        name: `Advice from Magnus`,
        flavorText: `You've learned a few tricks from Magnus Burnsides, specifically "Rush In!"`,
        ongoingAbility: true,
        ongoingMonster: 1,
        discardAbility: true,
        discardText: `Add +2 to any die roll, but suffer 1 point of damage. What was Magnus's advice?`,
        discardStrength: 2,
        discardDamage: 1
    },

    {
        name: `Killin' it with Killian`,
        flavorText: `Regulator Killian is here to lend a hand (and crossbow)`,
        ongoingAbility: true,
        ongoingMonster: 1,
        discardAbility: true,
        discardText: `Add +2 to the die roll when facing a Monster challenge. How does Killian save the day?`,
        discardMonster: 2
    },

    {
        name: `Lup's Lessons`,
        ongoingAbility: true,
        ongoingMagic: 1,
        discardAbility: true,
        discardText: `Describe her advice to add +2 Strength against any Magic challenge.`,
        discardMagic: 2
    },
]

const assistDeck = () => {
    const shuffled = shuffle(assistCards)
    const fourCards = []
    shuffled.splice(0, 4).forEach(card => {
        fourCards.push(new Assist(card))
    })
    return fourCards
}



export { assistDeck as default }

// {
//     name: `Director's Guidance`,
//     flavorText: `Madame Director provides you with vital information.`,
//     ongoingAbility: true,
//     ongoingStrength: 1,
//     discardAbility: true,
//     discardText: `Before engaging a challenge, flip any or all off the top challenge cards. Finales cannot be flipped.`,
//     discardNewChallenges: true
// }