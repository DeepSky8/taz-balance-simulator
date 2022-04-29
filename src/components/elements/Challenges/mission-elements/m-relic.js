// import RingDeck from '../relics/r-ring'
// import { Challenge } from './m-challenge'

// const relicDecks = [
//     new RingDeck
//     // new IdolDeck = [],
//     // new HoardDeck = [],
//     // new StaffDeck = []
// ]


const relicObjectsArray = [
    {
        challengeName: 'The Ring',
        challengeCode: 'r0',
        challengeFlavor: `The Villain can use the Ring to conjure illusions and nightmares, forcing you to face your inner fears. It probably has a cool name, like "The Mind's Eye`
    },
    {
        challengeName: 'The Idol',
        challengeCode: 'r1',
        challengeFlavor: "The Idol can alter reality and twist time and space. It doesn't belong in this world."
    },
    {
        challengeName: 'The Hoard',
        challengeCode: 'r2',
        challengeFlavor: "This treasure hoard is legendary, and many greedy adventurers hope to claim it. You'll have to deal with these deadly rivals as well as curses and traps laid on the hoard itself."
    },
    {
        challengeName: 'The Staff',
        challengeCode: 'r3',
        challengeFlavor: 'The Staff grants The Villain power over the elements, allowing them to control the weather and conjure fire and ice. It probably has a cool name, like "The Staff of Endless Winter."'
    }
]


// const relicFlavorArray = [
//     `The Villain can use the Ring to conjure illusions and nightmares, forcing you to face your inner fears. It probably has a cool name, like "The Mind's Eye`
// ]
// const relicStoryPrompt1 = [`What is the name of the Ring?`]
// const relicStoryPrompt2 = [undefined]

// class Relic extends Challenge {
//     constructor(number) {
//         super();
//         this.number = number
//         this.flavor = relicFlavorArray[this.number]
//         this.storyPrompt1 = relicStoryPrompt1[this.number]
//         this.storyPrompt2 = relicStoryPrompt2[this.number]
//         this.deck = relicDecks[this.number].cards
//     }
// }

// export { relicDecks, relicFlavorArray, relicStoryPrompt1, relicStoryPrompt2, Relic }

export { relicObjectsArray }