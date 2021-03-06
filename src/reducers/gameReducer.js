const defaultGameState = {
    static: {
        codeVillain: null,
        codeRelic: null,
        codeLocation: null,
        gameID: null,
        host: null,
        key: null,
    },
    active: {
        activeCharID: null,
        activeUID: null,
        gameStage: '',
        progressVillain: null,
        progressRelic: null,
        progressLocation: null,
        ready: false,
        teamHealth: null
    },
    backstory: {
        briefingStage: 'VILLAIN',
        villainOne: '',
        villainTwo: '',
        relicOne: '',
        relicTwo: '',
        locationOne: '',
        locationTwo: '',
    },
    currentTurn: {
        turnStage: 'CHALLENGE'
    },
    classList: [
        // digit representing classCode
    ],
    playerList: [
        // {
        // uid
        // currentCharacterID
        // classCode
        // }
    ],
    readyList: [
        // uid
    ],
    surprises: [],
    hasActionToken: [
        //{
        // uid
        // currentCharacterID
        // classCode
        // }
    ]
}

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATIC':
            return {
                ...defaultGameState,
                ...state,
                static: {
                    ...action.staticData
                }
            }
        case 'UPDATE_GAME_ACTIVE':
            return {
                ...defaultGameState,
                ...state,
                active: {
                    ...action.activeData,
                }
            }
        case 'UPDATE_GAME_STATE_FULL':
            return {
                ...defaultGameState,
                ...action.currentActiveGameFull
            }
        case 'CLEAR_GAME_STATE':
            return {
                ...defaultGameState
            }
        case 'UPDATE_CHALLENGES_OBJECT':
            return {
                ...state,
                static: {
                    ...state.static,
                    ...action.challengesObject
                }
            }
        case 'CLEAR_CHALLENGES_OBJECT':
            return {
                ...state,
                static: {
                    ...state.static,
                    codeVillain: null,
                    codeRelic: null,
                    codeLocation: null,
                    key: null
                }
            }
        case 'UPDATE_GAME_HOST':
            return {
                ...state,
                static: {
                    ...state.static,
                    host: action.host
                }
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
        case 'UPDATE_PROGRESS':
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.progress
                }
            }
        case 'UPDATE_CLASS_LIST':
            return {
                ...state,
                classList: action.classList
            }
        case 'CLEAR_CLASS_LIST':
            return {
                ...state,
                classList: []
            }
        case 'UPDATE_READY_LIST':
            return {
                ...state,
                readyList: action.readyList
            }
        case 'CLEAR_READY_LIST':
            return {
                ...state,
                readyList: []
            }
        case 'UPDATE_READY_STATUS':
            return {
                ...state,
                active: {
                    ...state.active,
                    ready: action.ready
                },
            }
        case 'SET_GAME_KEY':
            return {
                ...state,
                static: {
                    ...state.static,
                    key: action.key
                }
            }
        case 'CLEAR_ACTIVE_PLAYER':
            return {
                ...state,
                active: {
                    ...state.active,
                    activeUID: null,
                    activeChar: null
                }
            }
        case 'UPDATE_GAME_STAGE':
            return {
                ...state,
                active: {
                    ...state.active,
                    gameStage: action.gameStage
                }
            }
        case 'UPDATE_TEAM_HEALTH':
            return {
                ...state,
                active: {
                    ...state.active,
                    teamHealth: action.teamHealth
                }
            }
        case 'UPDATE_BACKSTORY':
            return {
                ...defaultGameState,
                ...state,
                backstory: action.backstory
            }
        case 'UPDATE_CURRENT_TURN':
            return {
                ...defaultGameState,
                ...state,
                currentTurn: action.currentTurn
            }
        case 'UPDATE_ACTION_TOKENS':
            return {
                ...defaultGameState,
                ...state,
                hasActionToken: action.hasActionToken
            }
        case 'CLEAR_ACTION_TOKENS':
            return {
                ...defaultGameState,
                ...state,
                hasActionToken: []
            }
        default:
            return state
    }
}

export { defaultGameState, gameReducer }