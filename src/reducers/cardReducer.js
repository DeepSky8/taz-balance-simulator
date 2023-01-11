import { counterTarget } from "../actions/cardActions"

const defaultCardState = {
    // deck creation flags
    cardNumber: 0,
    cardKey: '',
    pairedWith: '',
    randomize: false,
    faceUp: true,
    boss: false,
    finale: false,

    // card display elements
    nameFlavor: '',
    cardName: '',
    difficulty: 0,
    villainModifier: 0,
    relicModifier: 0,
    locationModifier: 0,
    loot: 0,
    health: 0,

    monster: false,
    spooky: false,
    magic: false,
    trap: false,
    noAssist: false,
    doubleAssist: false,
    noRoll: false,
    chance: false,
    storyBonus: 0,
    storyPrompt: '',
    italicText: '',
    effectText: '',

    completed: false,

    // card effect elements
    hasEffect: false,

    requiresReroll: false,
    advantage: false,
    disadvantage: false,
    discardSurprise: false,
    requiresToken: false,

    reencounterGerblin: false,

    kostCoEffect: false,
    discardKostCoDefeat: false,
    discardKostCoDraw: false,
    discardKostCoStrength: false,
    discardKostCoStrengthBonus: 0,

    specialType: false,
    gerblin: false,
    crew: false,
    giant: false,

    flipEffect: false,
    flipTarget: '',
    flipOnDefeat: false,
    flipOnDiscard: false,
    flipOnFail: false,
    flipInsteadOfDefeat: false,
    flippable: true,

    autoComplete: false,
    autoDefeat: false,
    autoDiscard: false,
    autoDamage: false,

    modifyEffect: false,
    modifyMonster: 0,
    modifySpooky: 0,
    modifyMagic: 0,
    modifyTrap: 0,

    gainLifeEffect: false,
    gainLifeDefeat: 0,
    gainLifeDiscard: 0,
    gainLifeReveal: 0,

    loseLootEffect: false,
    loseLootOnFail: false,
    loseLootOnReveal: false,
    loseLootOnDefeat: false,
    loseLootOnDiscard: false,
    reduceKostCoCost: false,
    spendLootForEffect: false,
    loseLootPoints: 0,

    counterEffect: false,
    counters: 0,
    counterInDeCrease: 'do',
    counterTarget: 'nothing',
    defeatRemovesCounters: false,
    failingAddsCounters: false,
    failingRemovesCounters: false,
    failCounterNumber: 0,
    failedAttempts: 0,
    defeatCounterNumber: 0,
}

const cardReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CARD':
            return {
                ...state,
                ...action.updatedCard
            }
        case 'RESET_CARD':
            return {
                ...defaultCardState
            }
        case 'UPDATE_CARD_NUMBER':
            return {
                ...state,
                cardNumber: action.cardNumber
            }
        case 'SET_CARD_KEY':
            return {
                ...state,
                cardKey: action.cardKey
            }
        case 'UPDATE_PAIRED_WITH':
            return {
                ...state,
                pairedWith: action.pairedWith
            }
        case 'UPDATE_NAME_FLAVOR':
            return {
                ...state,
                nameFlavor: action.nameFlavor
            }
        case 'UPDATE_CARD_NAME':
            return {
                ...state,
                cardName: action.cardName
            }
        case 'UPDATE_DIFFICULTY':
            return {
                ...state,
                difficulty: action.difficulty
            }
        case 'UPDATE_VILLAIN_MODIFIER':
            return {
                ...state,
                villainModifier: action.villainModifier
            }
        case 'UPDATE_RELIC_MODIFIER':
            return {
                ...state,
                relicModifier: action.relicModifier
            }
        case 'UPDATE_LOCATION_MODIFIER':
            return {
                ...state,
                locationModifier: action.locationModifier
            }
        case 'UPDATE_LOOT':
            return {
                ...state,
                loot: action.loot
            }
        case 'UPDATE_HEALTH':
            return {
                ...state,
                health: action.health
            }
        case 'UPDATE_FACE_UP':
            return {
                ...state,
                faceUp: action.faceUp === 'true' ? true : false,
                finale: action.faceUp === 'true' ? false : state.finale
            }
        case 'UPDATE_MONSTER':
            return {
                ...state,
                monster: action.monster === 'true' ? true : false
            }
        case 'UPDATE_SPOOKY':
            return {
                ...state,
                spooky: action.spooky === 'true' ? true : false
            }
        case 'UPDATE_MAGIC':
            return {
                ...state,
                magic: action.magic === 'true' ? true : false
            }
        case 'UPDATE_TRAP':
            return {
                ...state,
                trap: action.trap === 'true' ? true : false
            }
        case 'UPDATE_NO_ASSIST':
            return {
                ...state,
                noAssist: action.noAssist === 'true' ? true : false,
                doubleAssist: action.noAssist === 'true' ? false : state.doubleAssist
            }
        case 'UPDATE_DOUBLE_ASSIST':
            return {
                ...state,
                doubleAssist: action.doubleAssist === 'true' ? true : false,
                noAssist: action.doubleAssist === 'true' ? false : state.noAssist
            }
        case 'UPDATE_NO_ROLL':
            return {
                ...state,
                noRoll: action.noRoll === 'true' ? true : false,
                chance: action.noRoll === 'true' ? false : state.chance
            }
        case 'UPDATE_CHANCE':
            return {
                ...state,
                chance: action.chance === 'true' ? true : false,
                noRoll: action.chance === 'true' ? false : state.noRoll
            }
        case 'UPDATE_STORY_BONUS':
            return {
                ...state,
                storyBonus: action.storyBonus
            }
        case 'UPDATE_STORY_PROMPT':
            return {
                ...state,
                storyPrompt: action.storyPrompt
            }
        case 'UPDATE_ITALIC_TEXT':
            return {
                ...state,
                italicText: action.italicText
            }
        case 'UPDATE_EFFECT_TEXT':
            return {
                ...state,
                effectText: action.effectText
            }
        case 'UPDATE_HAS_EFFECT':
            return {
                ...state,
                hasEffect: action.hasEffect === 'true' ? true : false
            }
        case 'UPDATE_AUTO_COMPLETE':
            return {
                ...state,
                autoComplete: action.autoComplete === 'true' ? true : false,
                autoDefeat: action.autoComplete === 'true' ? state.autoDefeat : false,
                autoDiscard: action.autoComplete === 'true' ? state.autoDiscard : false,
                autoDamage: action.autoComplete === 'true' ? state.autoDamage : false,
            }
        case 'UPDATE_AUTO_DEFEAT':
            return {
                ...state,
                autoDefeat: action.autoDefeat === 'true' ? true : false,
                autoComplete: action.autoDefeat === 'true' ? true : state.autoComplete,
                autoDiscard: action.autoDefeat === 'true' ? false : state.autoDiscard,
            }
        case 'UPDATE_AUTO_DISCARD':
            return {
                ...state,
                autoDiscard: action.autoDiscard === 'true' ? true : false,
                autoComplete: action.autoDiscard === 'true' ? true : state.autoComplete,
                autoDefeat: action.autoDiscard === 'true' ? false : state.autoDefeat
            }
        case 'UPDATE_AUTO_DAMAGE':
            return {
                ...state,
                autoDamage: action.autoDamage
            }
        case 'UPDATE_KOSTCO_EFFECT':
            return {
                ...state,
                kostCoEffect: action.kostCoEffect === 'true' ? true : false,
                discardKostCoDefeat: action.kostCoEffect === 'true' ? state.discardKostCoDefeat : false,
                discardKostCoDraw: action.kostCoEffect === 'true' ? state.discardKostCoDraw : false,
                discardKostCoStrength: action.kostCoEffect === 'true' ? state.discardKostCoStrength : false,
                discardKostCoStrengthBonus: action.kostCoEffect === 'true' ? state.discardKostCoStrengthBonus : 0,
            }
        case 'UPDATE_DISCARD_KOSTCO_DEFEAT':
            return {
                ...state,
                discardKostCoDefeat: action.discardKostCoDefeat === 'true' ? true : false,
                kostCoEffect: action.discardKostCoDefeat === 'true' ? true : state.kostCoEffect,
                discardKostCoDraw: action.discardKostCoDefeat === 'true' ? false : state.discardKostCoDraw,
                discardSurprise: action.discardKostCoDefeat === 'true' ? false : state.discardSurprise,
                discardKostCoStrength: action.discardKostCoDefeat === 'true' ? false : state.discardKostCoStrength,
                discardKostCoStrengthBonus: action.discardKostCoDefeat === 'true' ? false : state.discardKostCoStrengthBonus,
            }
        case 'UPDATE_DISCARD_KOSTCO_DRAW':
            return {
                ...state,
                discardKostCoDraw: action.discardKostCoDraw === 'true' ? true : false,
                kostCoEffect: action.discardKostCoDraw === 'true' ? true : state.kostCoEffect,

                discardKostCoDefeat: action.discardKostCoDraw === 'true' ? false : state.discardKostCoDefeat,
                discardSurprise: action.discardKostCoDraw === 'true' ? false : state.discardSurprise,
                discardKostCoStrength: action.discardKostCoDraw === 'true' ? false : state.discardKostCoStrength,
                discardKostCoStrengthBonus: action.discardKostCoDraw === 'true' ? false : state.discardKostCoStrengthBonus,
            }
        case 'UPDATE_DISCARD_KOSTCO_STRENGTH':
            return {
                ...state,
                discardKostCoStrength: action.discardKostCoStrength === 'true' ? true : false,
                kostCoEffect: action.discardKostCoStrength === 'true' ? true : state.kostCoEffect,

                discardKostCoDefeat: action.discardKostCoStrength === 'true' ? false : state.discardKostCoDefeat,
                discardSurprise: action.discardKostCoStrength === 'true' ? false : state.discardSurprise,
                discardKostCoStrengthBonus: action.discardKostCoStrength === 'true' ? 2 : 0,
            }
        case 'UPDATE_DISCARD_KOSTCO_STRENGTH_BONUS':
            return {
                ...state,
                discardKostCoStrengthBonus: action.discardKostCoStrengthBonus,
                discardKostCoStrength: action.discardKostCoStrengthBonus > 0 ? true : false,
                kostCoEffect: action.discardKostCoStrengthBonus > 0 ? true : state.kostCoEffect,

                discardKostCoDefeat: action.discardKostCoStrengthBonus > 0 ? false : state.discardKostCoDefeat,
                discardSurprise: action.discardKostCoStrengthBonus > 0 ? false : state.discardSurprise,

            }
        case 'UPDATE_DISCARD_SURPRISE':
            return {
                ...state,
                discardSurprise: action.discardSurprise === 'true' ? true : false,
            }
        case 'UPDATE_REQUIRES_TOKEN':
            return {
                ...state,
                requiresToken: action.requiresToken === 'true' ? true : false
            }
        case 'UPDATE_REQUIRES_REROLL':
            return {
                ...state,
                requiresReroll: action.requiresReroll === 'true' ? true : false,
                advantage: action.requiresReroll === 'true' ? state.advantage : false,
                disadvantage: action.requiresReroll === 'true' ? state.disadvantage : false,
            }
        case 'REENCOUNTER_GERBLIN':
            return {
                ...state,
                reencounterGerblin: action.reencounterGerblin === 'true' ? true : false
            }
        case 'UPDATE_ADVANTAGE':
            return {
                ...state,
                advantage: action.advantage === 'true' ? true : false,
                disadvantage: action.advantage === 'true' ? false : state.disadvantage,
                requiresReroll: action.advantage === 'true' ? true : state.requiresReroll,
            }
        case 'UPDATE_DISADVANTAGE':
            return {
                ...state,
                disadvantage: action.disadvantage === 'true' ? true : false,
                advantage: action.disadvantage === 'true' ? false : state.advantage,
                requiresReroll: action.disadvantage === 'true' ? true : state.requiresReroll,
            }
        case 'SPECIAL_TYPE':
            return {
                ...state,
                specialType: action.specialType === 'true' ? true : false,
                gerblin: action.specialType === 'true' ? state.gerblin : false,
                crew: action.specialType === 'true' ? state.crew : false,
                giant: action.specialType === 'true' ? state.giant : false,
            }
        case 'UPDATE_GERBLIN':
            return {
                ...state,
                gerblin: action.gerblin === 'true' ? true : false,
                crew: action.gerblin === 'true' ? false : state.crew,
                giant: action.gerblin === 'true' ? false : state.giant,
                specialType: action.gerblin === 'true' ? true : state.specialType
            }
        case 'UPDATE_CREW':
            return {
                ...state,
                crew: action.crew === 'true' ? true : false,
                gerblin: action.crew === 'true' ? false : state.gerblin,
                giant: action.crew === 'true' ? false : state.giant,
                specialType: action.crew === 'true' ? true : state.specialType
            }
        case 'UPDATE_GIANT':
            return {
                ...state,
                giant: action.giant === 'true' ? true : false,
                crew: action.giant === 'true' ? false : state.crew,
                gerblin: action.giant === 'true' ? false : state.gerblin,
                specialType: action.giant === 'true' ? true : state.specialType
            }
        case 'COMPLETED':
            return {
                ...state,
                completed: action.completed === 'true' ? true : false,
            }
        case 'UPDATE_FLIP_EFFECT':
            return {
                ...state,
                flipEffect: action.flipEffect === 'true' ? true : false,
                flipTarget: action.flipEffect === 'true' ? state.flipTarget : '',
                flipOnDefeat: action.flipEffect === 'true' ? state.flipOnDefeat : false,
                flipOnDiscard: action.flipEffect === 'true' ? state.flipOnDiscard : false,
                flipOnFail: action.flipEffect === 'true' ? state.flipOnFail : false,
            }
        case 'UPDATE_FLIP_TARGET':
            return {
                ...state,
                flipTarget: action.flipTarget,
                flipEffect: action.flipTarget !== '' ? true : state.flipTarget
            }
        case 'UPDATE_FLIP_ON_DEFEAT':
            return {
                ...state,
                flipOnDefeat: action.flipOnDefeat === 'true' ? true : false,
                flipEffect: action.flipOnDefeat === 'true' ? true : state.flipEffect,
                flipOnDiscard: action.flipOnDefeat === 'true' ? false : state.flipOnDiscard,
                flipOnFail: action.flipOnDefeat === 'true' ? false : state.flipOnFail,
            }
        case 'UPDATE_FLIP_ON_DISCARD':
            return {
                ...state,
                flipOnDiscard: action.flipOnDiscard === 'true' ? true : false,
                flipEffect: action.flipOnDiscard === 'true' ? true : state.flipEffect,
                flipOnDefeat: action.flipOnDiscard === 'true' ? false : state.flipOnDefeat,
                flipOnFail: action.flipOnDiscard === 'true' ? false : state.flipOnFail,

            }
        case 'UPDATE_FLIP_ON_FAIL':
            return {
                ...state,
                flipOnFail: action.flipOnFail === 'true' ? true : false,
                flipEffect: action.flipOnFail === 'true' ? true : state.flipEffect,
                flipOnDiscard: action.flipOnFail === 'true' ? false : state.flipOnDiscard,
                flipOnDefeat: action.flipOnDefeat === 'true' ? false : state.flipOnDefeat,

            }
        case 'UPDATE_FLIP_INSTEAD_DEFEAT':
            return {
                ...state,
                flipInsteadOfDefeat: action.flipInsteadOfDefeat === 'true' ? true : false,
                flipEffect: action.flipInsteadOfDefeat === 'true' ? true : state.flipEffect,
                flipOnDiscard: action.flipOnFail === 'true' ? false : state.flipOnDiscard,
                flipOnDefeat: action.flipOnDefeat === 'true' ? false : state.flipOnDefeat,
                flipOnFail: action.flipOnDiscard === 'true' ? false : state.flipOnFail,
            }
        case 'UPDATE_FLIPPABLE':
            return {
                ...state,
                flippable: action.flippable === 'true' ? true : false
            }
        case 'UPDATE_RANDOMIZE':
            return {
                ...state,
                randomize: action.randomize === 'true' ? true : false,
                boss: action.randomize === 'true' ? false : state.boss,
                finale: action.finale === 'true' ? false : state.finale,
            }
        case 'UPDATE_BOSS':
            return {
                ...state,
                boss: action.boss === 'true' ? true : false,
                finale: action.boss === 'true' ? false : state.finale,
                flippable: action.boss === 'true' ? false : state.flippable,
                faceUp: action.boss === 'true' ? true : state.faceUp,
                randomize: action.boss === 'true' ? false : state.randomize,
            }
        case 'UPDATE_FINALE':
            return {
                ...state,
                finale: action.finale === 'true' ? true : false,
                flippable: action.finale === 'true' ? false : state.flippable,
                faceUp: action.finale === 'true' ? false : state.faceUp,
                boss: action.finale === 'true' ? false : state.boss,
                randomize: action.finale === 'true' ? false : state.randomize,
            }
        case 'COUNTER_EFFECT':
            return {
                ...state,
                counterEffect: action.counterEffect === 'true' ? true : false,
                counters: action.counterEffect === 'true' ? state.counters : 0,
                defeatRemovesCounters: action.counterEffect === 'true' ? state.defeatRemovesCounters : false,
                failingAddsCounters: action.counterEffect === 'true' ? state.failingAddsCounters : false,
                failCounterNumber: action.counterEffect === 'true' ? state.failCounterNumber : 0,
                counterInDeCrease: action.counterEffect === 'true' ? state.counterInDeCrease : 'do',
                defeatCounterNumber: action.counterEffect === 'true' ? state.defeatCounterNumber : 0,
            }
        case 'UPDATE_COUNTERS':
            return {
                ...state,
                counters: action.counters
            }
        case 'COUNTER_INDE_CREASE':
            return {
                ...state,
                counterInDeCrease: action.counterInDeCrease,
                counterTarget: action.counterInDeCrease === 'do' ? 'nothing' : state.counterTarget
            }
        case 'COUNTER_TARGET':
            return {
                ...state,
                counterTarget: action.counterTarget,
                counterInDeCrease: action.counterTarget === 'nothing' ? 'do' : state.counterInDeCrease,
            }
        case 'DEFEAT_REMOVES_COUNTERS':
            return {
                ...state,
                defeatRemovesCounters: action.defeatRemovesCounters === 'true' ? true : false,
                failingAddsCounters: action.defeatRemovesCounters === 'true' ? false : state.failingAddsCounters
            }
        case 'FAILING_ADDS_COUNTERS':
            return {
                ...state,
                failingAddsCounters: action.failingAddsCounters === 'true' ? true : false,
                defeatRemovesCounters: action.failingAddsCounters === 'true' ? false : state.defeatRemovesCounters,
                failingRemovesCounters: action.failingAddsCounters === 'true' ? false : state.failingRemovesCounters,
            }
        case 'FAILING_REMOVES_COUNTERS':
            return {
                ...state,
                failingRemovesCounters: action.failingRemovesCounters === 'true' ? true : false,
                defeatRemovesCounters: action.failingRemovesCounters === 'true' ? false : state.defeatRemovesCounters,
                failingAddsCounters: action.failingRemovesCounters === 'true' ? false : state.failingAddsCounters,

            }
        case 'FAIL_COUNTER_NUMBER':
            return {
                ...state,
                failCounterNumber: action.failCounterNumber
            }
        case 'DEFEAT_COUNTER_NUMBER':
            return {
                ...state,
                defeatCounterNumber: action.defeatCounterNumber,
            }
        case 'MODIFY_EFFECT':
            return {
                ...state,
                modifyEffect: action.modifyEffect === 'true' ? true : false,
                modifyMonster: action.modifyEffect === 'true' ? state.modifyMonster : 0,
                modifySpooky: action.modifyEffect === 'true' ? state.modifySpooky : 0,
                modifyMagic: action.modifyEffect === 'true' ? state.modifyMagic : 0,
                modifyTrap: action.modifyEffect === 'true' ? state.modifyTrap : 0,
            }
        case 'MODIFY_MONSTER':
            return {
                ...state,
                modifyMonster: action.modifyMonster
            }
        case 'MODIFY_SPOOKY':
            return {
                ...state,
                modifySpooky: action.modifySpooky
            }
        case 'MODIFY_MAGIC':
            return {
                ...state,
                modifyMagic: action.modifyMagic
            }
        case 'MODIFY_TRAP':
            return {
                ...state,
                modifyTrap: action.modifyTrap
            }
        case 'GAIN_LIFE_EFFECT':
            return {
                ...state,
                gainLifeEffect: action.gainLifeEffect === 'true' ? true : false,
                gainLifeDefeat: action.gainLifeEffect === 'true' ? state.gainLifeDefeat : 0,
                gainLifeDiscard: action.gainLifeEffect === 'true' ? state.gainLifeDiscard : 0,
                gainLifeReveal: action.gainLifeEffect === 'true' ? state.gainLifeReveal : 0,
            }
        case 'GAIN_LIFE_DEFEAT':
            return {
                ...state,
                gainLifeDefeat: action.gainLifeDefeat
            }
        case 'GAIN_LIFE_DISCARD':
            return {
                ...state,
                gainLifeDiscard: action.gainLifeDiscard
            }
        case 'GAIN_LIFE_REVEAL':
            return {
                ...state,
                gainLifeReveal: action.gainLifeReveal
            }
        case 'LOSE_LOOT_EFFECT':
            return {
                ...state,
                loseLootEffect: action.loseLootEffect === 'true' ? true : false,
                loseLootOnFail: action.loseLootEffect === 'true' ? state.loseLootOnFail : false,
                loseLootOnReveal: action.loseLootEffect === 'true' ? state.loseLootOnReveal : false,
                loseLootOnDefeat: action.loseLootEffect === 'true' ? state.loseLootOnDefeat : false,
                loseLootOnDiscard: action.loseLootEffect === 'true' ? state.loseLootOnDiscard : false,
                reduceKostCoCost: action.loseLootEffect === 'true' ? state.reduceKostCoCost : false,
                spendLootForEffect: action.loseLootEffect === 'true' ? state.spendLootForEffect : false,
                loseLootPoints: action.loseLootEffect === 'true' ? state.loseLootPoints : 0
            }
        case 'LOSE_LOOT_ON_FAIL':
            return {
                ...state,
                loseLootOnFail: action.loseLootOnFail === 'true' ? true : false,
                loseLootEffect: action.loseLootOnFail === 'true' ? true : state.loseLootEffect,

                loseLootOnReveal: action.loseLootOnFail === 'true' ? false : state.loseLootOnReveal,
                loseLootOnDefeat: action.loseLootOnFail === 'true' ? false : state.loseLootOnDefeat,
                loseLootOnDiscard: action.loseLootOnFail === 'true' ? false : state.loseLootOnDiscard,
                reduceKostCoCost: action.loseLootOnFail === 'true' ? false : state.reduceKostCoCost,
                spendLootForEffect: action.loseLootOnFail === 'true' ? false : state.spendLootForEffect,
            }
        case 'LOSE_LOOT_ON_REVEAL':
            return {
                ...state,
                loseLootOnReveal: action.loseLootOnReveal === 'true' ? true : false,
                loseLootEffect: action.loseLootOnReveal === 'true' ? true : state.loseLootEffect,
                loseLootOnFail: action.loseLootOnReveal === 'true' ? false : state.loseLootOnFail,
                loseLootOnDefeat: action.loseLootOnReveal === 'true' ? false : state.loseLootOnDefeat,
                loseLootOnDiscard: action.loseLootOnReveal === 'true' ? false : state.loseLootOnDiscard,
                reduceKostCoCost: action.loseLootOnReveal === 'true' ? false : state.reduceKostCoCost,
                spendLootForEffect: action.loseLootOnReveal === 'true' ? false : state.spendLootForEffect,
            }
        case 'LOSE_LOOT_ON_DEFEAT':
            return {
                ...state,
                loseLootOnDefeat: action.loseLootOnDefeat === 'true' ? true : false,
                loseLootEffect: action.loseLootOnDefeat === 'true' ? true : state.loseLootEffect,
                loseLootOnReveal: action.loseLootOnDefeat === 'true' ? false : state.loseLootOnReveal,
                loseLootOnFail: action.loseLootOnDefeat === 'true' ? false : state.loseLootOnFail,
                loseLootOnDiscard: action.loseLootOnDefeat === 'true' ? false : state.loseLootOnDiscard,
                reduceKostCoCost: action.loseLootOnDefeat === 'true' ? false : state.reduceKostCoCost,
                spendLootForEffect: action.loseLootOnDefeat === 'true' ? false : state.spendLootForEffect,
            }
        case 'LOSE_LOOT_ON_DEFEAT':
            return {
                ...state,
                loseLootOnDiscard: action.loseLootOnDiscard === 'true' ? true : false,
                loseLootEffect: action.loseLootOnDiscard === 'true' ? true : state.loseLootEffect,
                loseLootOnDefeat: action.loseLootOnDiscard === 'true' ? false : state.loseLootOnDefeat,
                loseLootOnReveal: action.loseLootOnDiscard === 'true' ? false : state.loseLootOnReveal,
                loseLootOnFail: action.loseLootOnDiscard === 'true' ? false : state.loseLootOnFail,
                reduceKostCoCost: action.loseLootOnDiscard === 'true' ? false : state.reduceKostCoCost,
                spendLootForEffect: action.loseLootOnDiscard === 'true' ? false : state.spendLootForEffect,
            }
        case 'REDUCE_KOSTCO_COST':
            return {
                ...state,
                reduceKostCoCost: action.reduceKostCoCost === 'true' ? true : false,
                loseLootEffect: action.reduceKostCoCost === 'true' ? true : state.loseLootEffect,
                loseLootOnDiscard: action.reduceKostCoCost === 'true' ? false : state.loseLootOnDiscard,
                loseLootOnDefeat: action.reduceKostCoCost === 'true' ? false : state.loseLootOnDefeat,
                loseLootOnReveal: action.reduceKostCoCost === 'true' ? false : state.loseLootOnReveal,
                loseLootOnFail: action.reduceKostCoCost === 'true' ? false : state.loseLootOnFail,
            }
        case 'SPEND_LOOT_FOR_EFFECT':
            return {
                ...state,
                spendLootForEffect: action.spendLootForEffect === 'true' ? true : false,
                loseLootEffect: action.spendLootForEffect === 'true' ? true : state.loseLootEffect,
                reduceKostCoCost: action.spendLootForEffect === 'true' ? false : state.reduceKostCoCost,
                loseLootOnDiscard: action.spendLootForEffect === 'true' ? false : state.loseLootOnDiscard,
                loseLootOnDefeat: action.spendLootForEffect === 'true' ? false : state.loseLootOnDefeat,
                loseLootOnReveal: action.spendLootForEffect === 'true' ? false : state.loseLootOnReveal,
                loseLootOnFail: action.spendLootForEffect === 'true' ? false : state.loseLootOnFail,
            }
        case 'LOSE_LOOT_POINTS':
            return {
                ...state,
                loseLootPoints: action.loseLootPoints
            }
        default:
            return state
    }
}

export { defaultCardState, cardReducer }