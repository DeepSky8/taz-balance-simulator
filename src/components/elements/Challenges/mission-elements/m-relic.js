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
        challengeFlavor: `The Villain can use the Ring to conjure illusions and nightmares, forcing you to face your inner fears. It probably has a cool name, like "The Mind's Eye`,
        promptFlavor1: `'s mere presence is causing the Ring to conjure illusions and nightmares, forcing you to face your inner fears. It probably has a cool name, like "The Mind's Eye`,
        promptFlavor2: ` can use the Ring to conjure illusions and nightmares, forcing you to face your inner fears. It probably has a cool name, like "The Mind's Eye`,
        prompt1: `What is the name of the Ring?`,
        prompt2: `Shiny? Dull and battered?`,
    },
    {
        challengeName: 'The Idol',
        challengeCode: 'r1',
        challengeFlavor: "The Idol can alter reality and twist time and space. It doesn't belong in this world.",
        promptFlavor1: "The Idol can alter reality and twist time and space. It doesn't belong in this world.",
        promptFlavor2: "",
        prompt1: `Do you know its name?`,
        prompt2: `Where did it come from?`,
    },
    {
        challengeName: 'The Hoard',
        challengeCode: 'r2',
        challengeFlavor: "This treasure hoard is legendary, and many greedy adventurers hope to claim it. You'll have to deal with these deadly rivals as well as curses and traps laid on the hoard itself.",
        promptFlavor1: "This treasure hoard is legendary, and many greedy adventurers hope to claim it. You'll have to deal with these deadly rivals as well as curses and traps laid on the hoard itself.",
        promptFlavor2: '',
        prompt1: `Who gathered this hoard?`,
        prompt2: `What's one thing you hope to find in it?`,
    },
    {
        challengeName: 'The Staff',
        challengeCode: 'r3',
        challengeFlavor: 'The Staff grants The Villain power over the elements, allowing them to control the weather and conjure fire and ice. It probably has a cool name, like "The Staff of Endless Winter."',
        promptFlavor1: 'The Staff grants ',
        promptFlavor2: ' power over the elements, allowing them to control the weather and conjure fire and ice. It probably has a cool name, like "The Staff of Endless Winter."',
        promptFlavor3: `'s mere presence is causing The Staff to react wildly, conjuring fire and ice. It probably has a cool name, like "The Staff of Endless Winter."`,
        prompt1: `Do you know its name?`,
        prompt2: `Rough-hewn? Polished and lacquered?`,
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
//         this.flavor = relicObjectsArray[this.number].challengeFlavor
//         this.storyPrompt1 = relicObjectsArray[this.number].prompt1
//         this.storyPrompt2 = relicObjectsArray[this.number].prompt2
//         this.deck = relicDecks[this.number].cards
//     }
// }

// export { relicDecks, relicFlavorArray, relicStoryPrompt1, relicStoryPrompt2, Relic }

export { relicObjectsArray }