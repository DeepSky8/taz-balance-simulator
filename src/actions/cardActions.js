import { child, push, ref, update } from "firebase/database"
import { db } from "../firebase/firebase"

// Local Actions

export const updateCard = (updatedCard) => ({
    type: 'UPDATE_CARD',
    updatedCard
})

export const resetCard = () => ({
    type: 'RESET_CARD'
})

export const updateCardNumber = (cardNumber) => ({
    type: 'UPDATE_CARD_NUMBER',
    cardNumber
})

export const setCardKey = (cardKey) => ({
    type: 'SET_CARD_KEY',
    cardKey
})

export const updateNameFlavor = (nameFlavor) => ({
    type: 'UPDATE_NAME_FLAVOR',
    nameFlavor
})

export const updateCardName = (cardName) => ({
    type: 'UPDATE_CARD_NAME',
    cardName
})

export const updateDifficulty = (difficulty) => ({
    type: 'UPDATE_DIFFICULTY',
    difficulty
})

export const updateVillainModifier = (villainModifier) => ({
    type: 'UPDATE_VILLAIN_MODIFIER',
    villainModifier
})

export const updateRelicModifier = (relicModifier) => ({
    type: 'UPDATE_RELIC_MODIFIER',
    relicModifier
})

export const updateLocationModifier = (locationModifier) => ({
    type: 'UPDATE_LOCATION_MODIFIER',
    locationModifier
})

export const updateLoot = (loot) => ({
    type: 'UPDATE_LOOT',
    loot
})

export const updateHealth = (health) => ({
    type: 'UPDATE_HEALTH',
    health
})

export const updateMonster = (monster) => ({
    type: 'UPDATE_MONSTER',
    monster
})

export const updateSpooky = (spooky) => ({
    type: 'UPDATE_SPOOKY',
    spooky
})

export const updateMagic = (magic) => ({
    type: 'UPDATE_MAGIC',
    magic
})

export const updateTrap = (trap) => ({
    type: 'UPDATE_TRAP',
    trap
})

export const updateNoAssist = (noAssist) => ({
    type: 'UPDATE_NO_ASSIST',
    noAssist
})

export const updateDoubleAssist = (doubleAssist) => ({
    type: 'UPDATE_DOUBLE_ASSIST',
    doubleAssist
})

export const updateStoryBonus = (storyBonus) => ({
    type: 'UPDATE_STORY_BONUS',
    storyBonus
})

export const updateStoryPrompt = (storyPrompt) => ({
    type: 'UPDATE_STORY_PROMPT',
    storyPrompt
})

export const updateEffectText = (effectText) => ({
    type: 'UPDATE_EFFECT_TEXT',
    effectText
})

export const updateAutoComplete = (autoComplete) => ({
    type: 'UPDATE_AUTO_COMPLETE',
    autoComplete
})

export const updateRequiresToken = (requiresToken) => ({
    type: 'UPDATE_REQUIRES_TOKEN',
    requiresToken
})

export const updateRequiresReroll = (requiresReroll) => ({
    type: 'UPDATE_REQUIRES_REROLL',
    requiresReroll
})

export const updateGerblin = (gerblin) => ({
    type: 'UPDATE_GERBLIN',
    gerblin
})

export const updateBoss = (boss) => ({
    type: 'UPDATE_BOSS',
    boss
})

export const updateFinale = (finale) => ({
    type: 'UPDATE_FINALE',
    finale
})

// Cloud Actions

export const startUpdateCard = (activeDeckCode, cardData, cardKey) => {
    const updates = {}
    updates['decks/' + activeDeckCode + '/' + cardKey] = { ...cardData, cardKey }
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update card: ', error)
        })
}

export const startNewCard = (activeDeckCode, cardData) => {
    const newCardKey = push(child(ref(db), 'decks/' + activeDeckCode)).key
    startUpdateCard(activeDeckCode, cardData, newCardKey)
}

export const startRemoveCard = (activeDeckCode, cardKey) => {
    const updates = {}
    updates['decks/' + activeDeckCode + '/' + cardKey] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not remove card: ', error)
        })
}
