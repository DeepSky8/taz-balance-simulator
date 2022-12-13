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
        challengeFlavor: `The Cave is a maze of tunnels stretching deep below the surface. It's filled with traps, haunted ruins, and foul monsters. It might have a fancy name like "The Caves of Despair."`,
        promptFlavor1: `The Cave is a maze of tunnels stretching deep below the surface. It's filled with traps, haunted ruins, and foul monsters. It might have a fancy name like "The Caves of Despair."`,
        promptFlavor2: '',
        prompt1: `Do you know the name of this cave?`,
        prompt2: `What does the entrance look like?`,
    },
    {
        challengeName: 'The Temple',
        challengeCode: 'l1',
        challengeFlavor: `A foul presence has corrupted this grand temple, and sinister forces lurk in the gilded shadows. It might have a name like "The Temple of Absolute, Certain Death" but it's probably not that bad.`,
        promptFlavor1: `A foul presence has corrupted this grand temple, and sinister forces lurk in the gilded shadows. It might have a name like "The Temple of Absolute, Certain Death" but it's probably not that bad.`,
        promptFlavor2: '',
        prompt1: `What's the name of the temple?`,
        prompt2: `How big are we talking here?`,
    },
    {
        challengeName: 'The Tomb',
        challengeCode: 'l2',
        challengeFlavor: 'Deadly traps and vengeful ghosts guard the ancient treasures interred in this Tomb.',
        promptFlavor1: 'Deadly traps and vengeful ghosts guard the ancient treasures interred in this Tomb.',
        promptFlavor2: '',
        prompt1: `What is the name of the Tomb?`,
        prompt2: `Do you know who's buried here?`,
    },
    {
        challengeName: 'The Train',
        challengeCode: 'l3',
        challengeFlavor: 'The Villain has stolen the Relic, and we have to catch them before the train reaches the end of the line.',
        promptFlavor1: ' has stolen ',
        promptFlavor2: ', and we have to catch them before the train reaches the end of the line.',
        promptFlavor3: ` has tracked `,
        promptFlavor4: ` to a cargo car on this train, and we have to reclaim it before the train reaches the end of the line.`,
        prompt1: `What is the name of this fantasy train?`,
        prompt2: `Where is it going?`,
    },
    {
        challengeName: 'The Carnival',
        challengeCode: 'l4',
        challengeFlavor: "The Carnival boasts an astonishing array of fried foods, overpriced drinks, and exotic entertainment. Can we find the Relic before losing all our money playing 'Whack-A-Gerblin'?",
        promptFlavor1: "The Carnival boasts an astonishing array of fried foods, overpriced drinks, and exotic entertainment. Can we find ",
        promptFlavor2: "before losing all our money playing 'Whack-A-Gerblin'?",
        prompt1: `What's an interesting detail about the Carnival?`,
        prompt2: `What is the Carnival called?`,
    },
    {
        challengeName: 'The Race',
        challengeCode: 'l5',
        challengeFlavor: "We have to join this battlewagon race to catch the Villain -- and if the race ends, they escape!",
        promptFlavor1: 'We have to join this battlewagon race to catch ',
        promptFlavor2: ' -- and if the race ends, they escape!',
        prompt1: `What does our battlewagon look like?`,
        prompt2: `Where is the race?`,
    },
    {},
    {
        challengeName: 'Location Test',
        challengeCode: 'l99',
        challengeFlavor: "Test Deck Only",
        promptFlavor1: 'Test Deck Only',
        promptFlavor2: 'Test Deck Only',
        prompt1: 'Test Deck Only',
        prompt2: 'Test Deck Only',
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
//         this.flavor = locationObjectsArray[this.number].challengeFlavor
//         this.storyPrompt1 = locationObjectsArray[this.number].prompt1
//         this.storyPrompt2 = locationObjectsArray[this.number].prompt2
//         this.deck = locationDecks[this.number].cards
//     }
// }

// export { locationDecks, locationFlavorArray, locationStoryPrompt1, locationStoryPrompt2, Location }

export { locationObjectsArray }