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

export const updatePairedWith = (pairedWith) => ({
    type: 'UPDATE_PAIRED_WITH',
    pairedWith
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

export const updateFaceUp = (faceUp) => ({
    type: 'UPDATE_FACE_UP',
    faceUp
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

export const updateNoRoll = (noRoll) => ({
    type: 'UPDATE_NO_ROLL',
    noRoll
})

export const updateChance = (chance) => ({
    type: 'UPDATE_CHANCE',
    chance
})

export const updateStoryBonus = (storyBonus) => ({
    type: 'UPDATE_STORY_BONUS',
    storyBonus
})

export const updateStoryPrompt = (storyPrompt) => ({
    type: 'UPDATE_STORY_PROMPT',
    storyPrompt
})

export const updateItalicText = (italicText) => ({
    type: 'UPDATE_ITALIC_TEXT',
    italicText
})

export const updateEffectText = (effectText) => ({
    type: 'UPDATE_EFFECT_TEXT',
    effectText
})

export const updateHasEffect = (hasEffect) => ({
    type: 'UPDATE_HAS_EFFECT',
    hasEffect
})

export const updateAutoComplete = (autoComplete) => ({
    type: 'UPDATE_AUTO_COMPLETE',
    autoComplete
})

export const updateAutoDefeat = (autoDefeat) => ({
    type: 'UPDATE_AUTO_DEFEAT',
    autoDefeat
})

export const updateAutoDiscard = (autoDiscard) => ({
    type: 'UPDATE_AUTO_DISCARD',
    autoDiscard
})

export const updateAutoDamage = (autoDamage) => ({
    type: 'UPDATE_AUTO_DAMAGE',
    autoDamage
})

export const updateKostCoEffect = (kostCoEffect) => ({
    type: 'UPDATE_KOSTCO_EFFECT',
    kostCoEffect
})

export const updateDiscardKostCoDefeat = (discardKostCoDefeat) => ({
    type: 'UPDATE_DISCARD_KOSTCO_DEFEAT',
    discardKostCoDefeat
})

export const updateDiscardKostCoDraw = (discardKostCoDraw) => ({
    type: 'UPDATE_DISCARD_KOSTCO_DRAW',
    discardKostCoDraw
})

export const updateDiscardKostCoStrength = (discardKostCoStrength) => ({
    type: 'UPDATE_DISCARD_KOSTCO_STRENGTH',
    discardKostCoStrength
})
export const updateDiscardKostCoStrengthBonus = (discardKostCoStrengthBonus) => ({
    type: 'UPDATE_DISCARD_KOSTCO_STRENGTH_BONUS',
    discardKostCoStrengthBonus
})
export const updateDiscardSurprise = (discardSurprise) => ({
    type: 'UPDATE_DISCARD_SURPRISE',
    discardSurprise
})

export const updateRequiresToken = (requiresToken) => ({
    type: 'UPDATE_REQUIRES_TOKEN',
    requiresToken
})

export const updateRequiresReroll = (requiresReroll) => ({
    type: 'UPDATE_REQUIRES_REROLL',
    requiresReroll
})

export const updateReencounterGerblin = (reencounterGerblin) => ({
    type: 'REENCOUNTER_GERBLIN',
    reencounterGerblin
})

export const updateAdvantage = (advantage) => ({
    type: 'UPDATE_ADVANTAGE',
    advantage
})

export const updateDisadvantage = (disadvantage) => ({
    type: 'UPDATE_DISADVANTAGE',
    disadvantage
})



export const updateFlipEffect = (flipEffect) => ({
    type: 'UPDATE_FLIP_EFFECT',
    flipEffect
})

export const updateFlipTarget = (flipTarget) => ({
    type: 'UPDATE_FLIP_TARGET',
    flipTarget
})

export const updateFlipOnDefeat = (flipOnDefeat) => ({
    type: 'UPDATE_FLIP_ON_DEFEAT',
    flipOnDefeat
})

export const updateFlipOnDiscard = (flipOnDiscard) => ({
    type: 'UPDATE_FLIP_ON_DISCARD',
    flipOnDiscard
})

export const updateFlipOnFail = (flipOnFail) => ({
    type: 'UPDATE_FLIP_ON_FAIL',
    flipOnFail
})

export const updateFlipInsteadDefeat = (flipInsteadOfDefeat) => ({
    type: 'UPDATE_FLIP_INSTEAD_DEFEAT',
    flipInsteadOfDefeat
})

export const updateFlippable = (flippable) => ({
    type: 'UPDATE_FLIPPABLE',
    flippable
})

export const updateRandomize = (randomize) => ({
    type: 'UPDATE_RANDOMIZE',
    randomize
})

export const updateCounters = (counters) => ({
    type: 'UPDATE_COUNTERS',
    counters
})

export const updateSpecialType = (specialType) => ({
    type: 'SPECIAL_TYPE',
    specialType
})

export const updateGerblin = (gerblin) => ({
    type: 'UPDATE_GERBLIN',
    gerblin
})

export const updateCrew = (crew) => ({
    type: 'UPDATE_CREW',
    crew
})

export const updateGiant = (giant) => ({
    type: 'UPDATE_GIANT',
    giant
})

export const updateBoss = (boss) => ({
    type: 'UPDATE_BOSS',
    boss
})

export const updateFinale = (finale) => ({
    type: 'UPDATE_FINALE',
    finale
})

export const updateCompleted = (completed) => ({
    type: 'COMPLETED',
    completed
})


export const updateCounterEffect = (counterEffect) => ({
    type: 'COUNTER_EFFECT',
    counterEffect
})

export const defeatZeroCounters = (defeatZeroCounters) => ({
    type: 'DEFEAT_ZERO_COUNTERS',
    defeatZeroCounters
})

export const failingAddsCounters = (failingAddsCounters) => ({
    type: 'FAILING_ADDS_COUNTERS',
    failingAddsCounters
})

export const failingRemovesCounters = (failingRemovesCounters) => ({
    type: 'FAILING_REMOVES_COUNTERS',
    failingRemovesCounters
})

export const updateFailCounterNumber = (failCounterNumber) => ({
    type: 'FAIL_COUNTER_NUMBER',
    failCounterNumber
})

export const updateModifyEffect = (modifyEffect) => ({
    type: 'MODIFY_EFFECT',
    modifyEffect
})

export const updateModifyMonster = (modifyMonster) => ({
    type: 'MODIFY_MONSTER',
    modifyMonster
})

export const updateModifySpooky = (modifySpooky) => ({
    type: 'MODIFY_SPOOKY',
    modifySpooky
})

export const updateModifyMagic = (modifyMagic) => ({
    type: 'MODIFY_MAGIC',
    modifyMagic
})

export const updateModifyTrap = (modifyTrap) => ({
    type: 'MODIFY_TRAP',
    modifyTrap
})

export const updateGainLifeEffect = (gainLifeEffect) => ({
    type: 'GAIN_LIFE_EFFECT',
    gainLifeEffect
})

export const updateGainLifeDefeat = (gainLifeDefeat) => ({
    type: 'GAIN_LIFE_DEFEAT',
    gainLifeDefeat
})

export const updateGainLifeDiscard = (gainLifeDiscard) => ({
    type: 'GAIN_LIFE_DISCARD',
    gainLifeDiscard
})

export const updateGainLifeReveal = (gainLifeReveal) => ({
    type: 'GAIN_LIFE_REVEAL',
    gainLifeReveal
})

export const updateLoseLootEffect = (loseLootEffect) => ({
    type: 'LOSE_LOOT_EFFECT',
    loseLootEffect
})

export const updateLoseLootOnFail = (loseLootOnFail) => ({
    type: 'LOSE_LOOT_ON_FAIL',
    loseLootOnFail
})

export const updateLoseLootOnReveal = (loseLootOnReveal) => ({
    type: 'LOSE_LOOT_ON_REVEAL',
    loseLootOnReveal
})

export const updateLoseLootOnDefeat = (loseLootOnDefeat) => ({
    type: 'LOSE_LOOT_ON_DEFEAT',
    loseLootOnDefeat
})

export const updateLoseLootOnDiscard = (loseLootOnDiscard) => ({
    type: 'LOSE_LOOT_ON_DISCARD',
    loseLootOnDiscard
})

export const updateReduceKostCoCost = (reduceKostCoCost) => ({
    type: 'REDUCE_KOSTCO_COST',
    reduceKostCoCost
})

export const updateSpendLootForEffect = (spendLootforEffect) => ({
    type: 'SPEND_LOOT_FOR_EFFECT',
    spendLootforEffect
})

export const updateLoseLootPoints = (loseLootPoints) => ({
    type: 'LOSE_LOOT_POINTS',
    loseLootPoints
})



// Cloud Actions

export const startUpdateCard = (activeDeckCode, cardData, cardKey) => {
    const updates = {}

    updates['challenges/' + activeDeckCode + '/' + cardKey] = { ...cardData, cardKey }
    if (cardData.pairedWith.length > 0) {
        updates['challenges/' + activeDeckCode + '/' + cardData.pairedWith + '/pairedWith'] = cardKey
    }
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update card: ', error)
        })
}

export const startNewCard = (activeDeckCode, cardData) => {
    const newCardKey = push(child(ref(db), 'challenges/' + activeDeckCode)).key
    startUpdateCard(activeDeckCode, cardData, newCardKey)
}

export const startRemoveCard = (activeDeckCode, cardKey) => {
    const updates = {}
    updates['challenges/' + activeDeckCode + '/' + cardKey] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not remove card: ', error)
        })
}

export const startAddDeckItem = (deckCode, deckItem) => {
    const updates = {}
    updates['challenges/' + deckCode + '/' + deckItem.cardKey] = deckItem
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not create new challenge record: ', error)
        })
}