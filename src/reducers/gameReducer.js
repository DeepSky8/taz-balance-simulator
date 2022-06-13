
const defaultGameState = {
    challengesObject: {
        villainCode: null,
        relicCode: null,
        locationCode: null
    },
    classArray: [],
    gameID: null,
    host: null,
    surprises: [],
    progress: {
        villain: null,
        relic: null,
        location: null
    },
    teamHealth: null,
    playerList: []
}

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATE':
            return {
                ...defaultGameState,
                ...action.currentActiveGame,
                playerList: state.playerList,
                classArray: state.classArray
            }
        case 'CLEAR_GAME_STATE':
            return {
                ...defaultGameState
            }
        case 'UPDATE_CHALLENGES_OBJECT':
            return {
                ...state,
                ...action.challengesObject

            }
        case 'CLEAR_CHALLENGES_OBJECT':
            return {
                ...state,
                gameID: null,
                challengesObject: {
                    villainCode: null,
                    relicCode: null,
                    locationCode: null
                }
            }
        case 'UPDATE_GAME_HOST':
            return {
                ...state,
                host: action.host
            }
        case 'UPDATE_PLAYER_LIST':
            return {
                ...state,
                playerList: action.playerList
            }
        case 'CLEAR_PLAYER_LIST':
            return {
                ...state,
                playerList: []
            }
        case 'UPDATE_CLASS_ARRAY':
            return {
                ...state,
                classArray: action.classArray
            }
        case 'CLEAR_PLAYER_CLASSES':
            return {
                ...state,
                classArray: []
            }
        default:
            return state
    }
}

export { defaultGameState, gameReducer }