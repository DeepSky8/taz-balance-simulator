const defaultLocalState = {
    // The hostKey reducer concats two strings with a separating /, which serves as a drop-in
    // when accessing the savedGame in Firebase
    hostKey: '',
    currentCharacterID: '',
    currentChallenge: {
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
        storyBonus: 0,
        storyPrompt: '',
        effectText: '',

        // card effect elements
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
    },
}

const localStateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_HOSTKEY':
            return {
                ...state,
                hostKey: action.hostKey.host + '/' + action.hostKey.key
            }
        case 'UPDATE_CURRENT_CHARACTER_ID':
            return {
                ...state,
                currentCharacterID: action.currentCharacterID
            }
        case 'UPDATE_CURRENT_CHALLENGE':
            return {
                ...state,
                currentChallenge: action.currentChallenge
            }
        case 'CLEAR_CURRENT_CHALLENGE':
            return {
                ...state,
                currentChallenge: {}
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultLocalState, localStateReducer }