import { applyActionCode } from "firebase/auth"

const defaultGameState = {
    activePlayer: null,
    challengesObject: {
        villainCode: null,
        relicCode: null,
        locationCode: null
    },
    classList: [],
    host: null,
    key: null,
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
                ...action.challengesObject

            }
        case 'CLEAR_CHALLENGES_OBJECT':
            return {
                ...state,
                key: null,
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
        case 'SET_GAME_KEY':
            return {
                ...state,
                key: action.key
            }
        case 'SET_ACTIVE_PLAYER':
            return {
                ...state,
                activePlayer: action.activePlayer
            }
        default:
            return state
    }
}

export { defaultGameState, gameReducer }