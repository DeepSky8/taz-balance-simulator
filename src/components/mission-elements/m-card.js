
class Card {
    constructor(face, back) {
        // Use the faceBack field to determine which of the info slots to return
        // when using the activeSide() method
        this.faceBack = undefined
        this.nameFlavor = [face.nameFlavor, back.nameFlavor]
        this.name = [face.name, back.name]
        this.difficulty = [face.difficulty, back.difficulty]
        this.villainModifier = [face.villainModifier, back.villainModifier]
        this.relicModifier = [face.relicModifier, back.relicModifier]
        this.locationModifier = [face.locationModifier, back.locationModifier]
        this.elements = [face.elements, back.elements]
        this.storyBonus = [face.storyBonus, back.storyBonus]
        this.storyPrompt = [face.storyPrompt, back.storyPrompt]
        this.effectText = [face.effectText, back.effectText]
        this.autoComplete = [face.autoComplete, back.autoComplete]
        this.kostcoDiscard = [face.kostcoDiscard, back.kostcoDiscard]
        this.requiresToken = [face.requiresToken, back.requiresToken]
        this.tokenSpent = [face.tokenSpent, back.tokenSpent]
        this.requiresReroll = [face.requiresReroll, back.requiresReroll]
        this.rerolled = [face.rerolled, back.rerolled]
        this.loot = [face.loot, back.loot]
        this.health = [face.health, back.health]
        this.completed = [face.completed, back.completed]
        this.gerblin = [face.gerblin, back.gerblin]
        this.failedAttempts = [face.failedAttempts, back.failedAttempts]
        this.counters = [face.counters, back.counters]
    }
    activeSide() {
        const activeSide = {
            nameFlavor: this.nameFlavor[this.faceBack],
            name: this.name[this.faceBack],
            difficulty: this.difficulty[this.faceBack],
            villainModifier: this.villainModifier[this.faceBack],
            relicModifier: this.relicModifier[this.faceBack],
            locationModifier: this.locationModifier[this.faceBack],
            elements: this.elements[this.faceBack],
            storyBonus: this.storyBonus[this.faceBack],
            storyPrompt: this.storyPrompt[this.faceBack],
            effectText: this.effectText[this.faceBack],
            autoComplete: this.autoComplete[this.faceBack],
            kostcoDiscard: this.kostcoDiscard[this.faceBack],
            requiresToken: this.requiresToken[this.faceBack],
            tokenSpent: this.tokenSpent[this.faceBack],
            requiresReroll: this.requiresReroll[this.faceBack],
            rerolled: this.rerolled[this.faceBack],
            loot: this.loot[this.faceBack],
            health: this.health[this.faceBack],
            completed: this.completed[this.faceBack],
            gerblin: this.gerblin[this.faceBack],
            failedAttempts: this.failedAttempts[this.faceBack],
            counters: this.counters[this.faceBack]
        }
        return activeSide
    }
}

export { Card as default }

// class Card {
//     constructor(data) {
//         this.nameFlavor = data.nameFlavor
//         this.name = data.name
//         this.difficulty = data.difficulty
//         this.relicModifier = 0
//         this.villainModifier = 0
//         this.locationModifier = 0
//         this.elements = data.elements
//         this.storyBonus = data.storyBonus
//         this.storyPrompt = data.storyPrompt
//         this.effectText = data.effectText
//         this.autoComplete = false
//         this.kostcoDiscard = false
//         this.requiresToken = false
//         this.tokenSpent = false
//         this.requiresReroll = false
//         this.rerolled = false
//         this.loot = data.loot
//         this.health = data.health
//         this.completed = data.completed
//         this.gerblin = false
//         this.failedAttempts = data.failedAttempts
//         this.counters = 0
//     }
// }