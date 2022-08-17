const defaultLocalState = {
    currentCharacterID: '',
    // The hostKey reducer concats two strings with a separating /, which serves as a drop-in
    // when accessing the savedGame in Firebase
    hostKey: '',
    deckVillain: {
        uncompleted: [
            // {}
        ],
        completed: [
            // {}    
        ]
    },
    deckRelic: {
        uncompleted: [
            // {}
        ],
        completed: [
            // {}    
        ]
    },
    deckLocation: {
        uncompleted: [
            // {}
        ],
        completed: [
            // {}    
        ]
    },
}

const localReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_ID':
            return {
                ...state,
                hostKey: action.hostKey.host + '/' + action.hostKey.key
            }
        case 'UPDATE_CURRENT_CHARACTER_ID':
            return {
                ...state,
                currentCharacterID: action.currentCharacterID
            }
        case 'UPDATE_UNCOMPLETED_VILLAIN':
            return {
                ...state,
                deckVillain: {
                    uncompleted: action.uncompletedVillain,
                    completed: state.deckVillain.completed
                }
            }
        case 'UPDATE_COMPLETED_VILLAIN':
            return {
                ...state,
                deckVillain: {
                    uncompleted: state.deckVillain.uncompleted,
                    completed: action.completedVillain
                }
            }
        case 'UPDATE_UNCOMPLETED_RELIC':
            return {
                ...state,
                deckRelic: {
                    uncompleted: action.uncompletedRelic,
                    completed: state.deckRelic.completed
                }
            }
        case 'UPDATE_COMPLETED_RELIC':
            return {
                ...state,
                deckRelic: {
                    uncompleted: state.deckRelic.uncompleted,
                    completed: action.completedRelic
                }
            }
        case 'UPDATE_UNCOMPLETED_LOCATION':
            return {
                ...state,
                deckLocation: {
                    uncompleted: action.uncompletedLocation,
                    completed: state.deckLocation.completed
                }
            }
        case 'UPDATE_COMPLETED_LOCATION':
            return {
                ...state,
                deckLocation: {
                    uncompleted: state.deckLocation.uncompleted,
                    completed: action.completedLocation
                }
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultLocalState, localReducer }