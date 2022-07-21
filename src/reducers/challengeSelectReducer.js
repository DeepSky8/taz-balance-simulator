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
                },
                selectedRelicObject: {
                    ...state.selectedRelicObject,
                    challengeName:
                        state.selectedRelicObject.challengeCode ?
                            state.selectedRelicObject.challengeName
                            :
                            view + relics,
                },
                selectedLocationObject: {
                    ...state.selectedLocationObject,
                    challengeName:
                        state.selectedLocationObject.challengeCode ?
                            state.selectedLocationObject.challengeName
                            :
                            view + locations,
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
                },
                selectedLocationObject: {
                    ...state.selectedLocationObject,
                    challengeName:
                        state.selectedLocationObject.challengeCode ?
                            state.selectedLocationObject.challengeName
                            :
                            view + locations,
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
                },
                selectedRelicObject: {
                    ...state.selectedRelicObject,
                    challengeName:
                        state.selectedRelicObject.challengeCode ?
                            state.selectedRelicObject.challengeName
                            :
                            view + relics,
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
                }
            }
        case 'RECEIVE_VILLAIN':
            return {
                ...state,
                villainDisplayed: false,
                selectedVillainObject: {
                    ...action.receivedVillainObject,
                    challengeName:
                        action.receivedVillainObject.challengeCode === null ?
                            view + villains
                            :
                            action.receivedVillainObject.challengeName,
                }
            }
        case 'RECEIVE_RELIC':
            return {
                ...state,
                relicDisplayed: false,
                selectedRelicObject: {
                    ...action.receivedRelicObject,
                    challengeName:
                        action.receivedRelicObject.challengeCode === null ?
                            view + relics
                            :
                            action.receivedRelicObject.challengeName,
                }
            }
        case 'RECEIVE_LOCATION':
            return {
                ...state,
                locationDisplayed: false,
                selectedLocationObject: {
                    ...action.receivedLocationObject,
                    challengeName:
                        action.receivedLocationObject.challengeCode ?
                            action.receivedLocationObject.challengeName
                            :
                            view + locations,
                }
            }
        default:
            return state
    }
}

export { defaultChallengeState, challengeSelectReducer }