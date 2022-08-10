const defaultCardState = {
    cardKey: '',
    pairedWith: '',
    cardNumber: 0,
    nameFlavor: '',
    cardName: '',
    difficulty: 0,
    villainModifier: 0,
    relicModifier: 0,
    locationModifier: 0,
    loot: 0,
    health: 1,
    faceUp: true,

    monster: false,
    spooky: false,
    magic: false,
    trap: false,
    noAssist: false,
    doubleAssist: false,
    storyBonus: 0,
    storyPrompt: '',
    effectText: '',
    hasEffect: false,

    completed: false,
    autoComplete: false,
    autoDefeat: false,
    autoDiscard: false,
    autoDamage: false,
    kostcoDiscard: false,
    requiresToken: false,
    requiresReroll: false,
    gerblin: false,

    flipEffect: false,
    flipTarget: '',
    flipOnDefeat: false,
    flipOnDiscard: false,
    flipOnFail: false,

    failedAttempts: 0,
    counters: 0,
    advantage: false,
    disadvantage: false,
    flippable: true,
    randomize: false,

    boss: false,
    finale: false
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
                autoDiscard: action.autoComplete === 'true' ? state.autoDiscard : false

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
        case 'UPDATE_REQUIRES_TOKEN':
            return {
                ...state,
                requiresToken: action.requiresToken === 'true' ? true : false
            }
        case 'UPDATE_REQUIRES_REROLL':
            return {
                ...state,
                requiresReroll: action.requiresReroll === 'true' ? true : false
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
        case 'UPDATE_GERBLIN':
            return {
                ...state,
                gerblin: action.gerblin === 'true' ? true : false
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
        case 'UPDATE_FLIPPABLE':
            return {
                ...state,
                flippable: action.flippable === 'true' ? true : false
            }
        case 'UPDATE_RANDOMIZE':
            return {
                ...state,
                randomize: action.randomize === 'true' ? true : false
            }
        case 'UPDATE_BOSS':
            return {
                ...state,
                boss: action.boss === 'true' ? true : false,
                flippable: action.boss === 'true' ? false : state.flippable
            }
        case 'UPDATE_FINALE':
            return {
                ...state,
                finale: action.finale === 'true' ? true : false,
                flippable: action.finale === 'true' ? false : state.flippable,
                faceUp: action.finale === 'true' ? false : state.faceUp
            }
        case 'UPDATE_COUNTERS':
            return {
                ...state,
                counters: action.counters
            }
        default:
            return state
    }
}

export { defaultCardState, cardReducer }