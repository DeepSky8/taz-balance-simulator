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
        specialEffect: "",
        challengeDescription: "",
    },
    {
        challengeName: 'The Cult',
        challengeCode: 'v1',
        challengeFlavor: 'The Cult is a nefarious conspiracy with ties to dark powers. They could be summoning ghosts, fiends, or strange creatures from beyond time and space.',
        promptFlavor1: 'The Cult is a nefarious conspiracy with ties to dark powers. They could be summoning ghosts, fiends, or strange creatures from beyond time and space.',
        promptFlavor2: '',
        prompt1: 'What is the name of the Cult?',
        prompt2: "What's their sinister goal?",
        specialEffect: "",
        challengeDescription: "Several Cult challenges flip themselves or other challenges.",
    },
    {
        challengeName: 'The Dark Lord',
        challengeCode: 'v2',
        challengeFlavor: 'The Dark Lord is a cruel tyrant with an army of monstrous minions. They are searching for the Relic, and if they claim it before we do, the world is doomed!',
        promptFlavor1: 'The Dark Lord is a cruel tyrant with an army of monstrous minions. They are searching for ',
        promptFlavor2: ', and if they claim it before we do, the world is doomed!',
        prompt1: 'What is the name of the Dark Lord?',
        prompt2: 'What is their connection to the Relic?',
        specialEffect: "",
        challengeDescription: "Several Dark Lord challenges return Gerblin challenges to the challenge deck.",
    },
    {
        challengeName: 'The Dragon',
        challengeCode: 'v3',
        challengeFlavor: 'The Dragon is ancient and powerful, and it is determined to destroy us. We must survive its attacks and press forward until we have an opportunity to defeat it once and for all.',
        promptFlavor1: 'The Dragon is ancient and powerful, and it is determined to destroy us. We must survive its attacks and press forward until we have an opportunity to defeat it once and for all.',
        promptFlavor2: '',
        prompt1: "What is the Dragon's name?",
        prompt2: 'What does it look like?',
        specialEffect: "Every time you fail to defeat a Dragon challenge (other than the Final challenge), discard the card after you take damage.",
        challengeDescription: "",
    },
    {
        challengeName: 'The Band of Rogues',
        challengeCode: 'v4',
        challengeFlavor: 'Why settle for one villain when you can have ten? A host of enemies stand between us and our goal.',
        promptFlavor1: 'Why settle for one villain when you can have ten? A host of enemies stand between us and ',
        promptFlavor2: '.',
        prompt1: 'Are these villains working together, or are they operating independently?',
        prompt2: 'Do they have a cool team name?',
        specialEffect: "",
        challengeDescription: "",
    },
    {
        challengeName: 'The Crew',
        challengeCode: 'v5',
        challengeFlavor: 'The Crew are a bunch of bullies with matching outfits and a shared love of battlewagons and inappropriate calendars.',
        promptFlavor1: 'The Crew are a bunch of bullies with matching outfits and a shared love of battlewagons and inappropriate calendars.',
        promptFlavor2: '.',
        prompt1: "What's the distinctive theme of the Crew?",
        prompt2: 'What do they call themselves?',
        specialEffect: "When you defeat a Crew challenge, you may immediately take another turn.",
        challengeDescription: "Several Crew challenges require that you face them twice.",
    },
    {
        challengeName: 'The Giant',
        challengeCode: 'v6',
        challengeFlavor: "The Giant is a big problem ... because they're a giant, get it? To find the Relic, we must make our way through the Giant's home, which is filled with enormous threats!",
        promptFlavor1: "The Giant is a big problem ... because they're a giant, get it? To find ",
        promptFlavor2: ", we must make our way through the Giant's home, which is filled with enormous threats!",
        prompt1: "What does the Giant look like?",
        prompt2: "What's their name?",
        specialEffect: "When facing a Giant challenge, each character that assists you grants an additional +1 strength.",
        challengeDescription: "",
    },
    {
        challengeName: 'Villain Test',
        challengeCode: 'v99',
        challengeFlavor: "Test Deck Only",
        promptFlavor1: 'Test Deck Only',
        promptFlavor2: 'Test Deck Only',
        prompt1: 'Test Deck Only',
        prompt2: 'Test Deck Only',
        specialEffect: "",
        challengeDescription: "",
    }
]

const uniqueVillains = [
    // Band of Rogues

    // When you defeat this challenge, return it to the deck. 
    // (three cards later, take Finale into account)
    '-N96iFu7Onl7Vexblr7R',

    // If you fail to defeat this challenge, 
    // it will show up on the deck to the left)
    '-N96jp2fy4SEKdWBDY-3',

    // Each player asks the player to their left a question; 
    // you get +1 strength for each correct answer!
    '-N96k3ixG_0q9YeEVdx_',

    // Legion's Difficulty is increased by 2 
    // for each additional Spooky challenge in play.
    '-N96kJ5fZhwkSxYnxDEv',

    // If you fail to defeat this challenge, 
    // return another challenge to play.
    '-N96mASuKgqoyie_emui',

    // When you defeat this challenge, you lose 3 health (to a minimum of 1)
    '-N96mfmE7qSnZNAZtdZU',


    // The Crew

    // When you defeat any challenge, you may immediately take another turn
    // (essentially provides Crew bonus to all other challenges)
    '-NBNzBtM5XCo09xjXBlE',

    // Discard any active Surprise when this Challenge is revealed. 
    '-NBNy7A9IBw2VWIIb6O-',








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
//         this.flavor = villainObjectsArray[this.number].challengeFlavor
//         this.storyPrompt1 = villainObjectsArray[this.number].prompt1
//         this.storyPrompt2 = villainObjectsArray[this.number].prompt2
//         this.deck = villainDecks[this.number].cards
//     }
// }

// export { villainDecks, villainFlavorArray, villainStoryPrompt1, villainStoryPrompt2, villainObjectsArray, villainTitleArray, Villain }

export { villainObjectsArray }