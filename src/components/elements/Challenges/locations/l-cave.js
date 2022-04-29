import Card from '../mission-elements/m-card'
import {cardPicker} from '../../../functions/deckRandomizers';

const caveCards = [

[
    {
        nameFlavor: `and somehow opening`,
        name: 'The Great Gate',
        difficulty: 6,
        relicModifier: 0,
        elements: ['trap'],
        storyBonus: 1,
        storyPrompt: `What's your trick for opening the door?`,
        loot: 1,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `and climbing down the`,
        name: 'Bottomless Pit',
        difficulty: 6,
        relicModifier: 1,
        elements: ['trap'],
        storyBonus: 0,
        storyPrompt: undefined,
        loot: 1,
        health: 3,
        effectText: `If you fail this challenge, you will still defeat it after taking damage`,
        autoComplete: true,
        completed: false
    }
],

[
    {
        nameFlavor: `and crossing a`,
        name: 'Narrow Bridge',
        difficulty: 6,
        relicModifier: 1,
        elements: ['no assist'],
        storyBonus: 1,
        storyPrompt: `You must cross the bridge alone. Why is this so dangerous?`,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `and finding the`,
        name: 'Secret Passage',
        difficulty: 7,
        relicModifier: 0,
        elements: ['magic', 'trap'],
        storyBonus: 1,
        storyPrompt: `How is the door hidden?`,
        loot: 1,
        health: 1,
        completed: false
    }
],

[
    {
        nameFlavor: `and getting past the`,
        name: 'Gerblin Garrison',
        difficulty: 8,
        relicModifier: 0,
        elements: ['monster'],
        storyBonus: 1,
        storyPrompt: `What's an interesting fact about this group of gerblins?`,
        loot: 2,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `and escaping the`,
        name: 'Haunted Mine',
        difficulty: 8,
        relicModifier: 1,
        elements: ['trap', 'spooky'],
        storyBonus: 1,
        storyPrompt: `What ghost do you encounter in the mines?`,
        loot: 2,
        health: 2,
        completed: false
    }
],

[
    {
        nameFlavor: `and climbing down the`,
        name: 'Garbage Pit',
        difficulty: 7,
        relicModifier: 1,
        elements: ['monster'],
        storyBonus: 0,
        storyPrompt: `It smells terrible, and it's mostly unsold copies of "Mordecai" on Blu-Ray.`,
        loot: 1,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `in the depths of the`,
        name: 'Tiny Tomb',
        difficulty: 8,
        relicModifier: 0,
        elements: ['trap', 'spooky'],
        storyBonus: 0,
        storyPrompt: `The tiny gerblin sarcophagus is so darn cute you almost don't notice how haunted this place is. Almost.`,
        loot: 2,
        health: 2,
        completed: false
    }
],

[
    {
        nameFlavor: `while examining a`,
        name: 'Pile of Bones',
        difficulty: 9,
        relicModifier: 0,
        elements: ['spooky'],
        storyBonus: 1,
        storyPrompt: `Nothing creepy about finding a giant pile of bones. Normal stuff. Totally not haunted. What's the most interesting bone?`,
        loot: 2,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `and dodging wolves in the`,
        name: 'Kobold Kennels',
        difficulty: 9,
        relicModifier: 0,
        elements: ['monster'],
        storyBonus: 1,
        storyPrompt: `Who's the cutest - or scariest - wolf in this kennel?`,
        loot: 1,
        health: 2,
        completed: false
    }
],

[
    {
        nameFlavor: `while escaping the`,
        name: `Spider's Lair`,
        difficulty: 9,
        relicModifier: 1,
        elements: ['monster', 'trap'],
        storyBonus: 0,
        storyPrompt: undefined,
        effectText:`When rolling to defeat this challenge, roll twice and use the worst result`,
        requiresReroll: true,
        rerolled: false,
        loot: 1,
        health: 1,
        completed: false
    },

    {
        nameFlavor: `and surviving in the`,
        name: 'Hungry Garden',
        difficulty: 10,
        relicModifier: 0,
        elements: ['monster', 'magic'],
        storyBonus: 1,
        storyPrompt: `What's the most dangerous thing in this carnivorous garden?`,
        loot: 1,
        health: 1,
        completed: false
    }
],

[
    {
        nameFlavor: `and crossing the`,
        name: 'River of Fire',
        difficulty: 9,
        relicModifier: 0,
        elements: ['double assist'],
        storyBonus: 1,
        storyPrompt: `How do you cross this stream of lava?`,
        loot: 1,
        health: 3,
        completed: false
    },

    {
        nameFlavor: `and escaping from the`,
        name: `Ogre's Kitchen`,
        difficulty: 11,
        relicModifier: 0,
        elements: ['monster'],
        storyBonus: 1,
        storyPrompt: `What are the ogres cooking?`,
        loot: 2,
        health: 2,
        completed: false
    }
],

[
    {
        nameFlavor: `while crossing the`,
        name: 'Grand Chasm',
        difficulty: 9,
        relicModifier: 1,
        elements: ['double assist'],
        storyBonus: 0,
        storyPrompt: `This vast abyss is difficult and deadly to cross, but it is remarkably scenic. Grab a selfie if you don't die.`,
        loot: 1,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `while escaping the`,
        name: 'Vile Jelly Pits',
        difficulty: 11,
        relicModifier: 1,
        elements: ['monster', 'trap', 'double assist'],
        storyBonus: 0,
        storyPrompt: `You're in a jam! Can you solve this jelly puzzle?`,
        loot: 2,
        health: 2,
        completed: false
    }
],

[
    {
        nameFlavor: `while exploring`,
        name: 'Ancient Ruins',
        difficulty: 11,
        relicModifier: 0,
        elements: ['trap', 'double assist'],
        storyBonus: 1,
        storyPrompt: `Who built these dangerous, trap-filled ruins? Dwarves? Gerblins? Something long forgotten?`,
        loot: 3,
        health: 2,
        completed: false
    },

    {
        nameFlavor: `while surviving the`,
        name: 'Tunnel of Terrors',
        difficulty: 10,
        relicModifier: 1,
        elements: ['magic', 'spooky'],
        storyBonus: 1,
        storyPrompt: `What's the most terrifying thing about this haunted tunnel?`,
        loot: 2,
        health: 2,
        completed: false
    }
]

]

const caveBoss = {
    nameFlavor: `and escaping the`,
    name: 'Collapsing Caverns',
    difficulty: 11,
    relicModifier: 1,
    elements: ['double assist'],
    storyBonus: 0,
    storyPrompt: undefined,
    loot: 3,
    health: 0,
    effectText: `If you fail to defeat this challenge, place two counters on it. Take damage equal to the total number of counters`,
    completed: false,
    failedAttempts: 0,
    counters: 0
}

const caveFinale = {
    nameFlavor: `having escaped from`,
    name: 'The Cave',
    relicModifier: -1
}

class CaveDeck {
    constructor() {
        this.cards = this.createCaveDeck()
    }
    createCaveDeck() {
        const newDeck = []
        // Each element in the Cave array contains the information for the face and back of a card
        // Create the card by splitting up the elements, 
        // then pick one of those elements at random to be the default face-up challenge
        caveCards.forEach(element => {
            const card = new Card(element[0], element[1])
            card.faceBack = cardPicker()
            newDeck.push(card)
        })
        const caveEnd = new Card(caveBoss, caveFinale)
        caveEnd.faceBack = 0
        newDeck.push(caveEnd)
        // Insert an Assist card in the 4th slot of the deck
        // -- write code here --
        return newDeck
    }
}

export { CaveDeck as default }