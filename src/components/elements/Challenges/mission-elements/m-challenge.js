import { villainDecks, villainFlavorArray, villainStoryPrompt1, villainStoryPrompt2 } from './m-villain'
import { relicDecks, relicFlavorArray, relicStoryPrompt1, relicStoryPrompt2 } from './m-relic'
import { locationDecks, locationFlavorArray, locationStoryPrompt1, locationStoryPrompt2 } from './m-location'

// const flavorArrays = [
//     villainFlavorArray,
//     relicFlavorArray,
//     locationFlavorArray
// ]

// const storyPrompt1s = [
//     villainStoryPrompt1,
//     relicStoryPrompt1,
//     locationStoryPrompt1
// ]

// const storyPrompt2s = [
//     villainStoryPrompt2,
//     relicStoryPrompt2,
//     locationStoryPrompt2
// ]

// const deckBuilder = [
//     villainDecks,
//     relicDecks,
//     locationDecks
// ]

class Challenge {
    constructor(number) {
        this.number = number
        // this.flavor = flavorArrays[this.type][this.number]
        // this.storyPrompt1 = storyPrompt1s[this.type][this.number]
        // this.storyPrompt2 = storyPrompt2s[this.type][this.number]
        // this.deck = deckBuilder[this.type][this.number].cards
    }

    set challengeName(string) {
        this._challengeName = string.trim()
    }

    get challengeName() {
        return this._challengeName
    }

    set storyPrompt1answer(string) {
        this._storyPrompt1answer = string.trim()
    }

    get storyPrompt1answer() {
        return this._storyPrompt1answer
    }

    set storyPrompt2answer(string) {
        this._storyPrompt2answer = string.trim()
    }

    get storyPrompt2answer() {
        return this._storyPrompt2answer
    }

    // Returns the next card without a completed side,
    // or the Finale card if the whole deck has been completed

    get activeCard() {
        const nextCardIndex = this.deck.findIndex(card => !card.completed[card.faceBack])
        nextCardIndex === -1 ? this._activeCard = this.deck[this.deck.length - 1] : this._activeCard = this.deck[nextCardIndex]
        return this._activeCard
    }

    // Passed a deck, this method will find the first incomplete card and mark it complete
    completeChallenge() {
        const finishedChallenge = this.activeCard
        finishedChallenge.completed[finishedChallenge.faceBack] = true
    }

}


export { Challenge }