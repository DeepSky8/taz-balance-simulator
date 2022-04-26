import LichDeck from '../villains/v-lich'
import { Challenge } from './m-challenge'

const villainDecks = [
    new LichDeck
    // cult = [],
    // dragon = [],
    // darkLord = [],
    // rogues = []
]

const villainObjectsArray = [
    {
        challengeName: 'The Lich',
        challengeCode: 'v0',
        challengeFlavor: 'The Lich is a powerful Undead wizard. It has a host of vile servants and wields foul magic.'
    },
    {
        challengeName: 'The Cult',
        challengeCode: 'v1',
        challengeFlavor: 'Temporary description'
    },
    {
        challengeName: 'The Dark Lord',
        challengeCode: 'v2',
        challengeFlavor: 'Temporary description'
    },
    {
        challengeName: 'The Dragon',
        challengeCode: 'v3',
        challengeFlavor: 'Temporary description'
    },
    {
        challengeName: 'The Band of Rogues',
        challengeCode: 'v4',
        challengeFlavor: 'Temporary description'
    }
]

const villainTitleArray = [
    'Select a Villain',
    'The Lich',
    'The Cult',
    'The Dark Lord',
    'The Dragon',
    'The Band of Rogues'
]

const villainFlavorArray = [
    'The Lich is a powerful Undead wizard. It has a host of vile servants and wields foul magic.'
]
const villainStoryPrompt1 = [`What is the Lich's name?`]
const villainStoryPrompt2 = [`What does it look like?`]

class Villain extends Challenge {
    constructor(number) {
        super();
        this.number = number
        this.flavor = villainFlavorArray[this.number]
        this.storyPrompt1 = villainStoryPrompt1[this.number]
        this.storyPrompt2 = villainStoryPrompt2[this.number]
        this.deck = villainDecks[this.number].cards
    }
}

export { villainDecks, villainFlavorArray, villainStoryPrompt1, villainStoryPrompt2, villainObjectsArray, villainTitleArray, Villain }