import { cardPicker, shuffle } from '../functions/deckRandomizers';
import Card from '../mission-elements/m-card';

// Ring challenges are not designed to be sequential in any way
// so the Ring deck first shuffles all 18 standard Ring challenges
// then assigns them in pairs to a card before randomly selecting which 'side'
// will be the face of the challenge.
const ringCards = [
    {
        nameFlavor: `while making a`,
        name: 'Painful Sacrifice',
        difficulty: 8,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['no assist'],
        storyBonus: 1,
        storyPrompt: `Why do you have to give it up?`,
        loot: 1,
        health: 3,
        completed: false,
        effectText: `You can discard a Fantasy KostCo card to defeat this challenge without rolling the die.`,
        kostcoDiscard: true
    },

    {
        nameFlavor: `while taking an`,
        name: 'Impossible Test',
        difficulty: 9,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['magic'],
        storyBonus: 1,
        storyPrompt: `What's the nature of the test?`,
        loot: 2,
        health: 2,
        completed: false,
        effectText: `You must spend your action token to engage this challenge.`,
        requiresToken: true,
        tokenSpent: false
    },

    {
        nameFlavor: `while reliving`,
        name: 'Your Biggest Mistake',
        difficulty: 9,
        villianModifier: 1,
        locationModifier: 0,
        elements: [],
        storyBonus: 1,
        storyPrompt: `Describe the challenge, expanding on the nature of the threat.`,
        loot: 2,
        health: 2,
        completed: false,
        effectText: `When rolling to defeat this Challenge, roll twice and use the worst result. If this illusion isn't from middle school, you're probably not remembering right.`,
        requiresReroll: true,
        rerolled: false
    },

    {
        nameFlavor: `while overcoming`,
        name: 'Endless Boredom',
        difficulty: 9,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['double assist'],
        storyBonus: 1,
        storyPrompt: `You can't believe how boring this illusion is. It's like Antiques Road Show, except everyone forgot their antiques, so it's jsut old people talking about cool vases they've seen. How are you coping?`,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `while facing an`,
        name: 'Old Enemy',
        difficulty: 9,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['monster'],
        storyBonus: 1,
        storyPrompt: `This is an illusion of an old rival or long-time enemy of yours. Who is it?`,
        loot: 1,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `while surviving an`,
        name: 'Awkward Date',
        difficulty: 8,
        villianModifier: 0,
        locationModifier: 1,
        elements: [],
        storyBonus: 1,
        storyPrompt: `Who's on the date with you? Why is it so awful?`,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `while working on`,
        name: 'The Perfect Crime',
        difficulty: 10,
        villianModifier: 0,
        locationModifier: 1,
        elements: ['trap'],
        storyBonus: 1,
        storyPrompt: `What is this perfect crime?`,
        loot: 2,
        health: 2,
        effectText: `You must spend your action token to engage this challenge.`,
        requiresToken: true,
        tokenSpent: false,
        completed: false
    },

    {
        nameFlavor: `while playing a`,
        name: 'Dating Game',
        difficulty: 10,
        villianModifier: 1,
        locationModifier: 0,
        elements: ['double assist'],
        storyBonus: 1,
        storyPrompt: `What's the format of the game? Who are the other contestants? And is it one where people have to get married at the end? Because that's WILD.`,
        loot: 2,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `while surviving a`,
        name: 'Guilt Trip',
        difficulty: 10,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['spooky'],
        storyBonus: 1,
        storyPrompt: `Who's giving you this guilt trip? What are they mad/sad about? Also, would it kill you to call once in a while?`,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `while in a`,
        name: 'Dance-Off',
        difficulty: 9,
        villianModifier: 1,
        locationModifier: 0,
        elements: ['trap'],
        storyBonus: 1,
        storyPrompt: `What's your best move?`,
        loot: 2,
        health: 2,
        effectText: `You must spend your action token to engage this challenge.`,
        requiresToken: true,
        tokenSpent: false,
        completed: false
    },

    {
        nameFlavor: `while winning a`,
        name: 'Talent Show',
        difficulty: 11,
        villianModifier: 0,
        locationModifier: 1,
        elements: ['magic', 'double assist'],
        storyBonus: 1,
        storyPrompt: `What's your act?`,
        loot: 2,
        health: 2,
        effectText: `You must spend your action token to engage this challenge.`,
        requiresToken: true,
        tokenSpent: false,
        completed: false
    },

    {
        nameFlavor: `while reliving an`,
        name: 'Awful Memory',
        difficulty: 8,
        villianModifier: 0,
        locationModifier: 0,
        elements: [],
        storyBonus: 1,
        storyPrompt: `What's your worst memory? How do you overcome it?`,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `while facing a`,
        name: 'Terrifying Monster',
        difficulty: 10,
        villianModifier: 1,
        locationModifier: 0,
        elements: ['monster'],
        storyBonus: 1,
        storyPrompt: `This monster only exists in your mind? Why does it frighten you so much?`,
        loot: 2,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `while battling`,
        name: 'Stage Fright',
        difficulty: 10,
        villianModifier: 0,
        locationModifier: 1,
        elements: ['double assist'],
        storyBonus: 1,
        storyPrompt: `Who is in the audience?`,
        loot: 2,
        health: 1,
        effectText: `You must spend your action token to engage this challenge.`,
        requiresToken: true,
        tokenSpent: false,
        completed: false
    },

    {
        nameFlavor: `while haunted by a`,
        name: 'Personal Ghost',
        difficulty: 10,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['spooky'],
        storyBonus: 1,
        storyPrompt: `This is an illusion of someone you lost or left behind. Who is it?`,
        loot: 2,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `while dealing with an`,
        name: 'Embarrassing Situation',
        difficulty: 9,
        villianModifier: 0,
        locationModifier: 0,
        elements: [],
        storyBonus: 1,
        storyPrompt: `This illusion is designed to embarrass you. What is it? Is it from Middle School?`,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `while talking to`,
        name: 'Your Ex',
        difficulty: 11,
        villianModifier: 0,
        locationModifier: 0,
        elements: ['spooky', 'monster'],
        storyBonus: 1,
        storyPrompt: `What's the worst thing about your ex? What didn't it work out? And why was none of it your fault?`,
        loot: 2,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `while facing`,
        name: 'Your Worse Fear',
        difficulty: 8,
        villianModifier: 1,
        locationModifier: 0,
        elements: ['spooky', 'no assist'],
        storyBonus: 1,
        storyPrompt: `Why are you so afraid of this?`,
        loot: 1,
        health: 1,
        effectText: `You must spend your action token to engage this challenge.`,
        requiresToken: true,
        tokenSpent: false,
        completed: false
    }
]

const ringBoss = {
    nameFlavor: `while battling an`,
    name: 'Unbeatable Foe',
    difficulty: 12,
    villianModifier: 0,
    locationModifier: 0,
    elements: ['spooky', 'monster'],
    storyBonus: 1,
    storyPrompt: `This is an illusion of a creature you know you can't defeat. What do you see, and how will you beat the odds?`,
    loot: 3,
    health: 2,
    completed: false
}

const ringFinale = {
    nameFlavor: 'after claiming',
    name: 'The Ring',
    villianModifier: -1,
    locationModifier: -1
}

class RingDeck {
    constructor() {
        this.cards = this.createRingDeck()
    }
    createRingDeck() {
        const newDeck = []
        // Shuffle all the Ring challenges
        let shuffled = shuffle(ringCards)
        // Shift off the first two Ring challenges and create a card from them
        while (shuffled.length > 0) {
            let cardFace = shuffled.shift()
            let cardBack = shuffled.shift()
            let card = new Card(cardFace, cardBack)
            card.faceBack = cardPicker()
            newDeck.push(card)
        }
        // Add the ringBoss and ringFinale as a card
        const ringEnd = new Card(ringBoss, ringFinale)
        ringEnd.faceBack = 0
        // Insert an Assist card in the 4th slot of the deck
        // -- write code here --
        return newDeck
    }
}

export { RingDeck as default }