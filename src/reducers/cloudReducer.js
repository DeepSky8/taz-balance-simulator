import { defaultCardState } from "./cardReducer"

const defaultCloudState = {
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
        // gameStage INTRO, BRIEF, TRANSPORT, CHALLENGES, END
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
        difficulty: 0,
        chanceVillain: 0,
        chanceRelic: 0,
        chanceLocation: 0,
        turnStage: 'default',
        selectedChallenge: '',
        // selectedChallenge contains text 'villain' or 'relic' or 'location' or ''
        showRoll: false,
        rollOne: null,
        rollTwo: null,
        villain: {
            back: defaultCardState,
            challengeKey: '',
            completed: false,
            front: defaultCardState,
            visible: 'front'
            // visible contains text 'front' or 'back'
        },
        relic: {
            back: defaultCardState,
            challengeKey: '',
            completed: false,
            front: defaultCardState,
            visible: 'front'
            // visible contains text 'front' or 'back'
        },
        location: {
            back: defaultCardState,
            challengeKey: '',
            completed: false,
            front: defaultCardState,
            visible: 'front'
            // visible contains text 'front' or 'back'
        }
    },
    classList: [
        // digit representing classCode
    ],
    playerList: [
        // {
        // uid
        // currentCharacterID
        // classCode
        // charName
        // }
    ],
    readyList: [
        // uid
    ],
    surprises: [],
    strength: {
        actionWarrior: 0,
        actionWizard: 0,
        assistOne: 0,
        assistTwo: 0,
        character: 0,
        ongoingItem: 0,
        rollResult: 0,
        singleUseItem: 0,
        story: 0,
        total: 0
    },
    hasActionToken: [
        //{
        // uid
        // currentCharacterID
        // classCode
        // charName
        // }
    ],
    activeActionTokens: [
        //{
        // uid
        // currentCharacterID
        // classCode
        // charName
        // }
    ],
    activeAssistTokens: [
        //{
        // uid
        // currentCharacterID
        // classCode
        // charName
        // }
    ]
}

const cloudReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATIC':
            return {
                ...defaultCloudState,
                ...state,
                static: {
                    ...action.staticData
                }
            }
        case 'UPDATE_GAME_ACTIVE':
            return {
                ...defaultCloudState,
                ...state,
                active: {
                    ...action.activeData,
                }
            }
        case 'UPDATE_GAME_STATE_FULL':
            return {
                ...defaultCloudState,
                ...action.currentActiveGameFull
            }
        case 'CLEAR_GAME_STATE':
            return {
                ...defaultCloudState
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
                ...defaultCloudState,
                ...state,
                backstory: {
                    ...state.backstory,
                    ...action.backstory
                }
            }
        case 'UPDATE_CURRENT_TURN':
            return {
                ...defaultCloudState,
                ...state,
                currentTurn: {
                    ...defaultCloudState.currentTurn,
                    ...action.currentTurn
                }
            }
        case 'UPDATE_ACTION_TOKENS':
            return {
                ...defaultCloudState,
                ...state,
                hasActionToken: action.hasActionToken
            }
        case 'CLEAR_ACTION_TOKENS':
            return {
                ...defaultCloudState,
                ...state,
                hasActionToken: []
            }
        case 'UPDATE_ACTIVE_TOKENS':
            return {
                ...defaultCloudState,
                ...state,
                activeActionTokens: action.activeActionTokens
            }
        case 'UPDATE_ASSIST_TOKENS':
            return {
                ...defaultCloudState,
                ...state,
                activeAssistTokens: action.activeAssistTokens
            }
        case 'UPDATE_STRENGTH':
            return {
                ...defaultCloudState,
                ...state,
                strength: {
                    ...action.strength
                }
            }
        case 'CLEAR_STRENGTH':
            return {
                ...defaultCloudState,
                ...state,
                strength: {
                    character: 0,
                    story: 0,
                    assist: 0,
                    singleUseItem: 0,
                    ongoingItem: 0,
                    total: 0
                }
            }
        default:
            return state
    }
}

export { defaultCloudState, cloudReducer }