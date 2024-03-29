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
        challengeFlavor: `The Villain can use the Ring to conjure illusions and nightmares, forcing us to face our inner fears. It probably has a cool name, like "The Mind's Eye`,
        promptFlavor1: `'s mere presence is causing the Ring to conjure illusions and nightmares, forcing us to face our inner fears. It probably has a cool name, like "The Mind's Eye`,
        promptFlavor2: ` can use the Ring to conjure illusions and nightmares, forcing us to face our inner fears. It probably has a cool name, like "The Mind's Eye`,
        prompt1: `What is the name of the Ring?`,
        prompt2: `Shiny? Dull and battered?`,
        specialEffect: "All Ring challenges provide a Story Bonus for describing the challenge, expanding on the nature of the threat.",
        challengeDescription: "Your character will face ALL of their greatest fears and memories.",
    },
    {
        challengeName: 'The Idol',
        challengeCode: 'r1',
        challengeFlavor: "The Idol can alter reality and twist time and space. It doesn't belong in this world.",
        promptFlavor1: "The Idol can alter reality and twist time and space. It doesn't belong in this world.",
        promptFlavor2: "",
        prompt1: `Do you know its name?`,
        prompt2: `Where did it come from?`,
        specialEffect: "",
        challengeDescription: "Many Idol challenges flip other challenges. (Boss challenges cannot be flipped)",
    },
    {
        challengeName: 'The Hoard',
        challengeCode: 'r2',
        challengeFlavor: "This treasure hoard is legendary, and many greedy adventurers hope to claim it. We'll have to deal with these deadly rivals as well as curses and traps laid on the hoard itself.",
        promptFlavor1: "This treasure hoard is legendary, and many greedy adventurers hope to claim it. You'll have to deal with these deadly rivals as well as curses and traps laid on the hoard itself.",
        promptFlavor2: '',
        prompt1: `Who gathered this hoard?`,
        prompt2: `What's one thing we hope to find in it?`,
        specialEffect: "",
        challengeDescription: "Several effects add a counter to The Hoard, making later Hoard challenges more difficult.",
    },
    {
        challengeName: 'The Staff',
        challengeCode: 'r3',
        challengeFlavor: 'The Staff grants The Villain power over the elements, allowing them to control the weather and conjure fire and ice. It probably has a cool name, like "The Staff of Endless Winter."',
        promptFlavor1: 'The Staff grants ',
        promptFlavor2: ' power over the elements, allowing them to control the weather and conjure fire and ice. It probably has a cool name, like "The Staff of Endless Winter."',
        promptFlavor3: `'s mere presence is causing The Staff to react wildly, conjuring fire and ice. It probably has a cool name, like "The Staff of Endless Winter."`,
        prompt1: `Do we know its name?`,
        prompt2: `Rough-hewn? Polished and lacquered?`,
        specialEffect: "",
        challengeDescription: "",
    },
    {
        challengeName: 'The Sash',
        challengeCode: 'r4',
        challengeFlavor: "The Sash grants absolute power over nature. It lets the wielder cast big lightning bolts, and control trees and vines and stuff. There's no onion we won't be able to ... never mind.",
        promptFlavor1: "The Sash grants absolute power over nature. It lets the wielder cast big lightning bolts, and control trees and vines and stuff. There's no onion we won't be able to ... never mind.",
        promptFlavor2: '',
        prompt1: `What would our party do with the power of the Sash?`,
        prompt2: `Is it made of wool? Silk? Tiny vines?`,
        specialEffect: "",
        challengeDescription: "",
    },
    {
        challengeName: 'The Sword',
        challengeCode: 'r5',
        challengeFlavor: "The Sword inflicts brutal wounds, both literal and figurative. It cuts people down to size and leaves them with emotional scars.",
        promptFlavor1: "The Sword inflicts brutal wounds, both literal and figurative. It cuts people down to size and leaves them with emotional scars.",
        promptFlavor2: '',
        prompt1: `What's the name of the Sword?`,
        prompt2: `What would the Villain do with it?`,
        specialEffect: "All Sword challenges provide a Story Bonus for describing the challenge and the injury.",
        challengeDescription: "",
    },
    {},
    {
        challengeName: 'Relic Test',
        challengeCode: 'r99',
        challengeFlavor: "Test Deck Only",
        promptFlavor1: 'Test Deck Only',
        promptFlavor2: 'Test Deck Only',
        prompt1: 'Test Deck Only',
        prompt2: 'Test Deck Only',
        specialEffect: "",
        challengeDescription: "",
    }
]

const uniqueRelics = [
    // Hoard:

    // Paired together:
    // You may spend 2 loot points to flip this challenge
    '-N91WfsRx5j2gXWlvJ6E',
    // Flip this challenge at the end of your turn
    '-N91X1xR80-KF5r-geJ4',

    // When you defeat this challenge, place it 2 cards 
    // further down in the Relic deck and place a counter 
    // on the Hoard. This has +1 Difficulty for each 
    // counter on the Hoard.
    '-N91ZSSgvyJqt01L55eD',

    // When this challenge is revealed, 
    // the active player loses up to two loot points.
    '-N91iKZaAHWHyvWgL66-',

    // While this challenge is in play, you may purchase 
    // a Fantasy KostCo card for 2 loot points 
    // instead of 3. If you do, flip this card and place 
    // a counter on the Hoard.
    '-N93CKkxnwFFhehbEaIw',

    // This challenge gains +1 Difficulty for each counter on the Hoard.
    '-N93C_4xM0KgATCGrIaY',

    // When you defeat this challenge, you may discard a 
    // Fantasy KostCo card. If you do, draw a new 
    // Fantasy KostCo card at random.
    '-N93EnIcVqK6wrrv7cBY',

    // You may discard a Fantasy KostCo card before 
    // rolling the die to add +2 to your Strength.
    '-N93F0BjEihRsgsCK8Y_',

    // While this card is in play, you can purchase 
    // Fantasy KostCo cards for 2 loot instead of the usual 3.
    '-N93F4orChQ6LmkQZEpn',


    // The Idol

    // When you defeat this challenge, 
    // put a previous challenge (if it exists) back into play.
    '-N8iXQODhhtMdgneOP1A',




    // The Sword

    // Before rolling, sacrifice up to 6 team health
    // Gain +1 for each point of health
    '-NBSnWe7oZ1hSmQB6YlP',

    // If you fail to defeat this challenge, 
    // all players lose their action tokens.
    '-NBSAwh1_kIw_9Qd2Ltb',
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