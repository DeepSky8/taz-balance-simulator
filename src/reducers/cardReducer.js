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
    kostcoDiscard: false,
    requiresToken: false,
    requiresReroll: false,
    gerblin: false,
    failedAttempts: 0,
    counters: 0,
    flippable: true,

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
                faceUp: action.faceUp === 'true' ? true : false
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
                autoComplete: action.autoComplete === 'true' ? true : false
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
        case 'UPDATE_GERBLIN':
            return {
                ...state,
                gerblin: action.gerblin === 'true' ? true : false
            }
        case 'UPDATE_FLIPPABLE':
            return {
                ...state,
                flippable: action.flippable === 'true' ? true : false
            }
        case 'UPDATE_BOSS':
            return {
                ...state,
                boss: action.boss === 'true' ? true : false
            }
        case 'UPDATE_FINALE':
            return {
                ...state,
                finale: action.finale === 'true' ? true : false
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