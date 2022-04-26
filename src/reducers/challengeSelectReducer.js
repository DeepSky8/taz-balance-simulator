const defaultChallengeState = {
    villainDisplayed: false,
    relicDisplayed: false,
    locationDisplayed: false,
    selectedVillainObject: {
        challengeName: 'Select Villain',
        challengeCode: 'v0',
        challengeFlavor: ''
    },
    selectedRelicObject: {
        challengeName: 'Select Relic',
        challengeCode: 'r0',
        challengeFlavor: ''
    },
    selectedLocationObject: {
        challengeName: 'Select Location',
        challengeCode: 'l0',
        challengeFlavor: ''
    },
}

const challengeSelectReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_VILLAIN':
            const flippedVillain = !state.villainDisplayed
            return {
                ...state,
                villainDisplayed: flippedVillain,
                relicDisplayed: false,
                locationDisplayed: false
            }
        case 'TOGGLE_RELIC':
            const flippedRelic = !state.relicDisplayed
            return {
                ...state,
                villainDisplayed: false,
                relicDisplayed: flippedRelic,
                locationDisplayed: false
            }
        case 'TOGGLE_LOCATION':
            const flippedLocation = !state.locationDisplayed
            return {
                ...state,
                villainDisplayed: false,
                relicDisplayed: false,
                locationDisplayed: flippedLocation
            }
        case 'SET_VILLAIN':
            console.log('Villain selected', action.selectedVillainObject)
            return {
                ...state,
                selectedVillainObject: action.selectedVillainObject
            }
        case 'SET_RELIC':
            console.log('Relic selected', action.selectedRelicObject)
            return {
                ...state,
                selectedRelicObject: action.selectedRelicObject
            }
        case 'SET_LOCATION':
            console.log('Location selected', action.selectedLocationObject)
            return {
                ...state,
                selectedLocationObject: action.selectedLocationObject
            }
        default:
            return state
    }
}

export { defaultChallengeState, challengeSelectReducer }