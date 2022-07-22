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
        challengeFlavor: 'The Lich is a powerful Undead wizard. It has a host of vile servants and wields foul magic.',
        promptFlavor1: 'The Lich is a powerful Undead wizard. It has a host of vile servants and wields foul magic.',
        promptFlavor2: '',
        prompt1: `What is the Lich's name?`,
        prompt2: `What does it look like?`,
    },
    {
        challengeName: 'The Cult',
        challengeCode: 'v1',
        challengeFlavor: 'The Cult is a nefarious conspiracy with ties to dark powers. They could be summoning ghosts, fiends, or strange creatures from beyond time and space.',
        promptFlavor1: 'The Cult is a nefarious conspiracy with ties to dark powers. They could be summoning ghosts, fiends, or strange creatures from beyond time and space.',
        promptFlavor2: '',
        prompt1: 'What is the name of the Cult?',
        prompt2: "What's their sinister goal?",
    },
    {
        challengeName: 'The Dark Lord',
        challengeCode: 'v2',
        challengeFlavor: 'The Dark Lord is a cruel tyrant with an army of monstrous minions. They are searching for the Relic, and if they claim it before you do, the world is doomed!',
        promptFlavor1: 'The Dark Lord is a cruel tyrant with an army of monstrous minions. They are searching for ',
        promptFlavor2: ', and if they claim it before you do, the world is doomed!',
        prompt1: 'What is the name of the Dark Lord?',
        prompt2: 'What is their connection to the Relic?',
    },
    {
        challengeName: 'The Dragon',
        challengeCode: 'v3',
        challengeFlavor: 'The Dragon is ancient and powerful, and it is determined to destroy you. You must survive its attacks and press forward until you have an opportunity to defeat it once and for all.',
        promptFlavor1: 'The Dragon is ancient and powerful, and it is determined to destroy you. You must survive its attacks and press forward until you have an opportunity to defeat it once and for all.',
        promptFlavor2: '',
        prompt1: "What is the Dragon's name?",
        prompt2: 'What does it look like?',
    },
    {
        challengeName: 'The Band of Rogues',
        challengeCode: 'v4',
        challengeFlavor: 'Why settle for one villain when you can have ten? A host of enemies stand between you and your goal.',
        promptFlavor1: 'Why settle for one villain when you can have ten? A host of enemies stand between you and ',
        promptFlavor2: '.',
        prompt1: 'Are these villains working together, or are they independent?',
        prompt2: 'Do they have a cool team name?'
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
// const villainStoryPrompt1 = [
//     // Lich

//     // Cult

//     // Dark Lord

//     // Dragon

//     // Band of Rogues

// ]
// const villainStoryPrompt2 = [
//     // Lich
//     `What does it look like?`,
//     // Cult
//     "What's their sinister goal?",
//     // Dark Lord
//     'What is their connection to the Relic?',
//     // Dragon
//     'What does it look like?',
//     // Band of Rogues
//     'Do they have a cool team name?'
// ]

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

export { villainObjectsArray }