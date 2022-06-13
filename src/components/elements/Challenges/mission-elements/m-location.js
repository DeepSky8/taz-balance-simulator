// import CaveDeck from '../locations/l-cave'
// import { Challenge } from './m-challenge'

// const locationDecks = [
//     new CaveDeck
//     // cult = [],
//     // dragon = [],
//     // darkLord = [],
//     // rogues = []
// ]

const locationObjectsArray = [
    {
        challengeName: 'The Cave',
        challengeCode: 'l0',
        challengeFlavor: `The Cave is a maze of tunnels stretching deep below the surface. It's filled with traps, haunted ruins, and foul monsters. It might have a fancy name like "The Caves of Despair."`
    },
    {
        challengeName: 'The Temple',
        challengeCode: 'l1',
        challengeFlavor: `A foul presence has corrupted this grand temple, and sinister forces lurk in the gilded shadows. It might have a name like "The Temple of Absolute, Certain Death" but it's probably not that bad.`
    },
    {
        challengeName: 'The Tomb',
        challengeCode: 'l2',
        challengeFlavor: 'Deadly traps and vengeful ghosts guard the ancient treasures interred in this Tomb.'
    },
    {
        challengeName: 'The Train',
        challengeCode: 'l3',
        challengeFlavor: 'The Villain has stolen the Relic, and you have to catch them before the train reaches the end of the line.'
    }
]

// const locationFlavorArray = [
//     `The Cave is a maze of tunnels stretching deep below the surface. It's filled with traps, haunted ruins, and foul monsters. It might have a fancy name like "The Caves of Despair."`
// ]
// const locationStoryPrompt1 = [`Do you know its name?`]
// const locationStoryPrompt2 = [undefined]

// class Location extends Challenge {
//     constructor(number) {
//         super();
//         this.number = number
//         this.flavor = locationFlavorArray[this.number]
//         this.storyPrompt1 = locationStoryPrompt1[this.number]
//         this.storyPrompt2 = locationStoryPrompt2[this.number]
//         this.deck = locationDecks[this.number].cards
//     }
// }

// export { locationDecks, locationFlavorArray, locationStoryPrompt1, locationStoryPrompt2, Location }

export {locationObjectsArray}