// import LichDeck from '../villains/v-lich'
// import { Challenge } from './m-challenge'

// const villainDecks = [
//     new LichDeck
//     // cult = [],
//     // dragon = [],
//     // darkLord = [],
//     // rogues = []
// ]

const villainObjectsArray = [
    {
        challengeName: 'The Lich',
        challengeCode: 'v0',
        challengeFlavor: 'The Lich is a powerful Undead wizard. It has a host of vile servants and wields foul magic.'
    },
    {
        challengeName: 'The Cult',
        challengeCode: 'v1',
        challengeFlavor: 'The Cult is a nefarious conspiracy with ties to dark powers. They could be summoning ghosts, fiends, or strange creatures from beyond time and space.'
    },
    {
        challengeName: 'The Dark Lord',
        challengeCode: 'v2',
        challengeFlavor: 'The Dark Lord is a cruel tyrant with an army of monstrous minions. They are searching for the Relic, and if they claim it before you do, the world is doomed!'
    },
    {
        challengeName: 'The Dragon',
        challengeCode: 'v3',
        challengeFlavor: 'The Dragon is ancient and powerful, and it is determined to destroy you. You must survive its attacks and press forward until you have an opportunity to defeat it once and for all.'
    },
    {
        challengeName: 'The Band of Rogues',
        challengeCode: 'v4',
        challengeFlavor: 'Why settle for one villain when you can have ten? A host of enemies stand between you and your goal.'
    }
]

// const villainTitleArray = [
//     'Select a Villain',
//     'The Lich',
//     'The Cult',
//     'The Dark Lord',
//     'The Dragon',
//     'The Band of Rogues'
// ]

// const villainFlavorArray = [
//     'The Lich is a powerful Undead wizard. It has a host of vile servants and wields foul magic.'
// ]
// const villainStoryPrompt1 = [`What is the Lich's name?`]
// const villainStoryPrompt2 = [`What does it look like?`]

// class Villain extends Challenge {
//     constructor(number) {
//         super();
//         this.number = number
//         this.flavor = villainFlavorArray[this.number]
//         this.storyPrompt1 = villainStoryPrompt1[this.number]
//         this.storyPrompt2 = villainStoryPrompt2[this.number]
//         this.deck = villainDecks[this.number].cards
//     }
// }

// export { villainDecks, villainFlavorArray, villainStoryPrompt1, villainStoryPrompt2, villainObjectsArray, villainTitleArray, Villain }

export {villainObjectsArray}