import { applyActionCode } from "firebase/auth"

const defaultGameState = {
    challengesObject: {
        villainCode: null,
        relicCode: null,
        locationCode: null
    },
    classList: [],
    gameID: null,
    host: null,
    surprises: [],
    progress: {
        villain: null,
        relic: null,
        location: null
    },
    ready: false,
    readyList: [],
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
                classList: state.classList,
                readyList: state.readyList,
                ready: state.ready
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
                ready: action.ready
            }
        default:
            return state
    }
}

export { defaultGameState, gameReducer }