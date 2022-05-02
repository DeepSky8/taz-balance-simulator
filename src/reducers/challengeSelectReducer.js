const defaultChallengeState = {
    villainDisplayed: false,
    relicDisplayed: false,
    locationDisplayed: false,
    selectedVillainObject: {
        challengeName: 'View Villains',
        challengeCode: null,
        challengeFlavor: null
    },
    selectedRelicObject: {
        challengeName: 'View Relics',
        challengeCode: null,
        challengeFlavor: null
    },
    selectedLocationObject: {
        challengeName: 'View Locations',
        challengeCode: null,
        challengeFlavor: null
    },
}

const view = 'View'
const hide = 'Hide'
const villains = ' Villains'
const relics = ' Relics'
const locations = ' Locations'

const challengeSelectReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_VILLAIN':
            const flippedVillain = !state.villainDisplayed
            return {
                ...state,
                villainDisplayed: flippedVillain,
                relicDisplayed: false,
                locationDisplayed: false,
                selectedVillainObject: {
                    ...state.selectedVillainObject,
                    challengeName:
                        state.selectedVillainObject.challengeCode ?
                            state.selectedVillainObject.challengeName
                            :
                            flippedVillain ?
                                hide + villains
                                :
                                view + villains,
                    // challengeCode: state.selectedVillainObject.challengeCode,
                    // challengeFlavor: state.selectedVillainObject.challengeFlavor
                },
                selectedRelicObject: {
                    ...state.selectedRelicObject,
                    challengeName:
                        state.selectedRelicObject.challengeCode ?
                            state.selectedRelicObject.challengeName
                            :
                            view + relics,
                    // challengeCode: state.selectedRelicObject.challengeCode,
                    // challengeFlavor: state.selectedRelicObject.challengeFlavor
                },
                selectedLocationObject: {
                    ...state.selectedLocationObject,
                    challengeName:
                        state.selectedLocationObject.challengeCode ?
                            state.selectedLocationObject.challengeName
                            :
                            view + locations,
                    // challengeCode: state.selectedLocationObject.challengeCode,
                    // challengeFlavor: state.selectedLocationObject.challengeFlavor
                }
            }
        case 'TOGGLE_RELIC':
            const flippedRelic = !state.relicDisplayed
            return {
                ...state,
                villainDisplayed: false,
                relicDisplayed: flippedRelic,
                locationDisplayed: false,
                selectedVillainObject: {
                    ...state.selectedVillainObject,
                    challengeName:
                        state.selectedVillainObject.challengeCode ?
                            state.selectedVillainObject.challengeName
                            :
                            view + villains,
                    // challengeCode: state.selectedVillainObject.challengeCode,
                    // challengeFlavor: state.selectedVillainObject.challengeFlavor
                },
                selectedRelicObject: {
                    ...state.selectedRelicObject,
                    challengeName:
                        state.selectedRelicObject.challengeCode ?
                            state.selectedRelicObject.challengeName
                            :
                            flippedRelic ?
                                hide + relics
                                :
                                view + relics,
                    // challengeCode: state.selectedRelicObject.challengeCode,
                    // challengeFlavor: state.selectedRelicObject.challengeFlavor
                },
                selectedLocationObject: {
                    ...state.selectedLocationObject,
                    challengeName:
                        state.selectedLocationObject.challengeCode ?
                            state.selectedLocationObject.challengeName
                            :
                            view + locations,
                    // challengeCode: state.selectedLocationObject.challengeCode,
                    // challengeFlavor: state.selectedLocationObject.challengeFlavor
                }
            }
        case 'TOGGLE_LOCATION':
            const flippedLocation = !state.locationDisplayed
            return {
                ...state,
                villainDisplayed: false,
                relicDisplayed: false,
                locationDisplayed: flippedLocation,
                selectedVillainObject: {
                    ...state.selectedVillainObject,
                    challengeName:
                        state.selectedVillainObject.challengeCode ?
                            state.selectedVillainObject.challengeName
                            :
                            view + villains,
                    // challengeCode: state.selectedVillainObject.challengeCode,
                    // challengeFlavor: state.selectedVillainObject.challengeFlavor
                },
                selectedRelicObject: {
                    ...state.selectedRelicObject,
                    challengeName:
                        state.selectedRelicObject.challengeCode ?
                            state.selectedRelicObject.challengeName
                            :
                            view + relics,
                    // challengeCode: state.selectedLocationObject.challengeCode,
                    // challengeFlavor: state.selectedLocationObject.challengeFlavor
                },
                selectedLocationObject: {
                    ...state.selectedLocationObject,
                    challengeName:
                        state.selectedLocationObject.challengeCode ?
                            state.selectedLocationObject.challengeName
                            :
                            flippedLocation ?
                                hide + locations
                                :
                                view + locations,
                    // challengeCode: state.selectedLocationObject.challengeCode,
                    // challengeFlavor: state.selectedLocationObject.challengeFlavor
                }
            }
        case 'SET_VILLAIN':
            return {
                ...state,
                selectedVillainObject: action.selectedVillainObject,
                villainDisplayed: false,
                relicDisplayed: false,
                locationDisplayed: false,
            }
        case 'SET_RELIC':
            return {
                ...state,
                selectedRelicObject: action.selectedRelicObject,
                villainDisplayed: false,
                relicDisplayed: false,
                locationDisplayed: false,
            }
        case 'SET_LOCATION':
            return {
                ...state,
                selectedLocationObject: action.selectedLocationObject,
                villainDisplayed: false,
                relicDisplayed: false,
                locationDisplayed: false,
            }
        case 'RECEIVE_VILLAIN':
            return {
                ...state,
                selectedVillainObject: action.receivedVillainObject
            }
        case 'RECEIVE_RELIC':
            return {
                ...state,
                selectedRelicObject: action.receivedRelicObject
            }
        case 'RECEIVE_LOCATION':
            return {
                ...state,
                selectedLocationObject: action.receivedLocationObject
            }
        default:
            return state
    }
}

export { defaultChallengeState, challengeSelectReducer }