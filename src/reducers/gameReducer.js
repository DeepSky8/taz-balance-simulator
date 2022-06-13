
const defaultGameState = {
    challengesObject: {
        villainCode: null,
        relicCode: null,
        locationCode: null
    },
    gameID: null,
    host: null,
    surprises: [{}],
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
                playerList: state.playerList
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
        default:
            return state
    }
}

export { defaultGameState, gameReducer }