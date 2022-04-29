import Card from '../mission-elements/m-card';
import { cardPicker } from '../functions/deckRandomizers';

// The Lich deck is designed to be played sequentially. 
// Based on the flip mechanic introduced by a few cards,
// the Lich deck randomly chooses 'face' or 'back' of each sequential challenge
const lichCards = [

    [
        {
            nameFlavor: `You're arguing with a`,
            name: 'Smack-Talking Skull',
            difficulty: 6,
            relicModifier: 1,
            elements: ['spooky', 'trap'],
            storyBonus: 1,
            storyPrompt: `What's this haunted skull's cruelest insult?`,
            loot: 1,
            health: 1,
            completed: false
        },

        {
            nameFlavor: `You're battling a`,
            name: 'Swarm of Rats',
            difficulty: 8,
            relicModifier: 0,
            elements: ['monster', 'double assist'],
            storyBonus: 0,
            storyPrompt: `Yeah, rats. What, you're too good to fight rats now? They spread disease, you know. It's no joke`,
            loot: 1,
            health: 2,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `You're facing a swarm of`,
            name: 'Crawling Hands',
            difficulty: 7,
            relicModifier: 0,
            elements: ['monster', 'spooky'],
            storyBonus: 0,
            storyPrompt: `What's worse than an evil, undead hand? A whole pile of them.`,
            loot: 1,
            health: 2,
            completed: false
        },

        {
            nameFlavor: `You're tormented by a`,
            name: 'Haunting Melody',
            difficulty: 8,
            relicModifier: 2,
            elements: ['magic', 'spooky'],
            storyBonus: 1,
            storyPrompt: `What's the song that's driving you insane? And you can't say Baby Shark.`,
            loot: 1,
            health: 1,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `You're encountered a`,
            name: 'Familiar Zombie',
            difficulty: 8,
            relicModifier: 0,
            elements: ['monster', 'spooky'],
            storyBonus: 1,
            storyPrompt: `Why is this zombie so familiar to you?`,
            loot: 1,
            health: 2,
            completed: false
        },

        {
            nameFlavor: `You're trying to open a`,
            name: 'Non-Sinister Coffin',
            difficulty: 8,
            relicModifier: 0,
            elements: ['trap'],
            storyBonus: 0,
            storyPrompt: `It's just a regular, not spooky coffin. It's tasteful, we swear. What is it doing here?`,
            loot: 2,
            health: 1,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `You need to solve an`,
            name: 'Arcane Riddle',
            difficulty: 7,
            relicModifier: 1,
            elements: ['magic', 'trap', 'no assist'],
            storyBonus: 1,
            storyPrompt: `What's your answer to the riddle?`,
            loot: 1,
            health: 2,
            completed: false
        },

        {
            nameFlavor: `You're fighting`,
            name: 'Sawbones',
            difficulty: 9,
            relicModifier: 0,
            elements: ['monster', 'spooky'],
            storyBonus: 0,
            storyPrompt: `These skeletons have doctorates. And saws. And, well, bones.`,
            loot: 1,
            health: 3,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `You're facing a`,
            name: 'Vengeful Ghost',
            difficulty: 10,
            relicModifier: 0,
            elements: ['double assist', 'spooky'],
            storyBonus: 1,
            storyPrompt: `Who was this ghost, and why do they want revenge on you?`,
            loot: 2,
            health: 2,
            completed: false
        },

        {
            nameFlavor: `You're dealing with a`,
            name: 'Smug Apprentice',
            difficulty: 10,
            relicModifier: 0,
            elements: ['monster', 'magic'],
            storyBonus: 1,
            storyPrompt: `This is the Lich's favorite apprentice. What's the most annoying thing about them?`,
            loot: 2,
            health: 2,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `You must get past a`,
            name: 'Terrifying Illusion',
            difficulty: 9,
            relicModifier: 2,
            elements: ['magic', 'trap'],
            storyBonus: 1,
            storyPrompt: `What horrifying image has the Lich conjured?`,
            loot: 1,
            health: 1,
            completed: false
        },

        {
            nameFlavor: `You must defeat a`,
            name: 'Sarcastic Specter',
            difficulty: 10,
            relicModifier: 1,
            elements: ['monster', 'spooky'],
            storyBonus: 1,
            storyPrompt: `This guy is spending his eternal afterlife polishing his tight five. He's devastating.`,
            loot: 2,
            health: 2,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `Can you unravel the`,
            name: 'Runes of Doom',
            difficulty: 10,
            relicModifier: 1,
            elements: ['magic', 'trap'],
            storyBonus: 0,
            storyPrompt: `It's like the final exam for wizards. Because it'll kill you if you get it wrong.`,
            loot: 2,
            health: 2,
            completed: false
        },

        {
            nameFlavor: `You're battling a pack of`,
            name: 'Hangry Ghouls',
            difficulty: 11,
            relicModifier: 0,
            elements: ['monster', 'spooky', 'double assist'],
            storyBonus: 0,
            storyPrompt: `C'mon, look at how hungry are! Really, you can't spare a single appendange? You're using BOTH ears?`,
            loot: 2,
            health: 2,
            completed: false
        }
    ],

    [
        {
            nameFlavor: `You're trapped in a`,
            name: 'Dreadful Nightmare',
            difficulty: 8,
            relicModifier: 0,
            elements: ['magic', 'trap', 'no assist'],
            storyBonus: 1,
            storyPrompt: `What's your terrifying dream?`,
            loot: 1,
            health: 2,
            completed: false
        },

        {
            nameFlavor: `You're fighting a`,
            name: 'Pretentious Vampire',
            difficulty: 11,
            relicModifier: 0,
            elements: ['monster', 'spooky'],
            storyBonus: 1,
            storyPrompt: `What's the most pretentious thing about this vampire?`,
            loot: 2,
            health: 2,
            completed: false
        }
    ]
    ,
    [
        {
            nameFlavor: `Can you escape the`,
            name: 'Living Shadow',
            difficulty: 10,
            relicModifier: 1,
            elements: ['monster', 'spooky', 'double assist'],
            storyBonus: 0,
            storyPrompt: `It wants to consume all light and joy in the world, but other than that it's quite nice.`,
            loot: 2,
            health: 1,
            completed: false
        },

        {
            nameFlavor: `You're battling an`,
            name: 'Undead Dragon',
            difficulty: 12,
            relicModifier: 0,
            elements: ['monster', 'spooky', 'double assist'],
            storyBonus: 0,
            storyPrompt: `Killing this awesome beast will turn it into a double negative, the scariest thing of all.`,
            loot: 3,
            health: 3,
            completed: false
        }
    ],

]

const lichBoss = {
    nameFlavor: `You're facing`,
    name: 'The Lich',
    difficulty: 15,
    relicModifier: 1,
    elements: ['magic', 'spooky'],
    storyBonus: 0,
    storyPrompt: `Even if you fail to defeat The Lich, you weaken it. It's difficulty will be reduced by 2`,
    loot: 3,
    health: 2,
    completed: false,
    failedAttempts: 0
}

const lichFinale = {
    nameFlavor: `You've defeated`,
    name: 'The Lich',
    relicModifier: -1
}

class LichDeck {
    constructor() {
        this.cards = this.createLichDeck()
    }
    createLichDeck() {
        const newDeck = []
        // Each element in the Lich array contains the information for the face and back of a card
        // Create the card by splitting up the elements, 
        // then pick one of those elements at random to be the default face-up challenge
        lichCards.forEach(element => {
            const card = new Card(element[0], element[1])
            card.faceBack = cardPicker()
            newDeck.push(card)
        })
        const lichEnd = new Card(lichBoss, lichFinale)
        lichEnd.faceBack = 0
        newDeck.push(lichEnd)
        // Insert an Assist card in the 4th slot of the deck
        // -- write code here --
        return newDeck
    }
}

export { LichDeck as default }


// [
//     new Card(lich1[cardPicker()]),
//     new Card(lich2[cardPicker()]),
//     new Card(lich3[cardPicker()]),
//     // 'Assist Card placed 4th'),
//     new Card(lich4[cardPicker()]),
//     new Card(lich5[cardPicker()]),
//     new Card(lich6[cardPicker()]),
//     new Card(lich7[cardPicker()]),
//     new Card(lich8[cardPicker()]),
//     new Card(lich9[cardPicker()]),
//     new Card(lichBoss),
//     new Card(lichFinale)
// ]