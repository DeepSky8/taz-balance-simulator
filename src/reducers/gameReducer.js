
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
    characterList: [{
        charID: '',
        charName: '',
        charRace: '',
        charTool: '',
        charAttribute: '',
        charNotes: '',
        charKostco: [{}]
    }]
}

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATE':
            return {
                ...state,
                ...action.currentActiveGame
            }
        case 'CLEAR_GAME_STATE':
            return {
                state: defaultGameState
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
        default:
            return state
    }
}

export { defaultGameState, gameReducer }