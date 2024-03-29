import kostcoDefaultStrength from "../components/elements/ActiveGame/kostco/kostcoDefaultStrength"
import { defaultCardState } from "./cardReducer"
import { defaultKostcoCardState } from "./kostcoCardReducer"

const defaultStrength = {
    actionWarrior: 0,
    actionWizard: 0,
    assistOne: 0,
    assistTwo: 0,
    character: 0,
    kostcoMagic: 0,
    kostcoMonster: 0,
    kostcoSpooky: 0,
    kostcoTrap: 0,
    kostcoUndefined: 0,
    ongoingItem: 0,
    rollResult: 0,
    singleUseItem: 0,
    story: 0,
    total: 0,
}

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
        gameStage: 'INTRO',
        // gameStage INTRO, BRIEF, TRANSPORT, CHALLENGES, END, default
        progressVillain: null,
        progressRelic: null,
        progressLocation: null,
        ready: false,
        teamHealth: null
    },
    backstory: {
        briefingStage: 'VILLAIN',
        // briefingStage VILLAIN, RELIC, LOCATION, NEXT
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
    kostco: {
        discarded: [
            // kID
        ],
        options: [
            // kID
        ],
        selected: {
            ...defaultKostcoCardState
        },
        active: [
            kostcoDefaultStrength
        ]
    },
    surprises: [],
    strength: {
        ...defaultStrength
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
    ],
    missionNoteArray: [
        //{
        // uid
        // charID
        // charName
        // notes
        // type
        //}
    ]
}

const cloudReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATIC':
            return {
                ...defaultCloudState,
                ...state,
                static: {
                    ...defaultCloudState.static,
                    ...action.staticData
                }
            }
        case 'UPDATE_GAME_ACTIVE':
            return {
                ...defaultCloudState,
                ...state,
                active: {
                    ...defaultCloudState.active,
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
                ...defaultCloudState,
                ...state,
                static: {
                    ...state.static,
                    ...action.challengesObject
                }
            }
        case 'CLEAR_CHALLENGES_OBJECT':
            return {
                ...defaultCloudState,
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
                ...defaultCloudState,
                ...state,
                static: {
                    ...state.static,
                    host: action.host
                }
            }
        case 'UPDATE_PLAYER_LIST':
            return {
                ...defaultCloudState,
                ...state,
                playerList: action.playerList
            }
        case 'CLEAR_PLAYER_LIST':
            return {
                ...defaultCloudState,
                ...state,
                playerList: []
            }
        case 'UPDATE_PROGRESS':
            return {
                ...defaultCloudState,
                ...state,
                active: {
                    ...state.active,
                    ...action.progress
                }
            }
        case 'UPDATE_CLASS_LIST':
            return {
                ...defaultCloudState,
                ...state,
                classList: action.classList
            }
        case 'CLEAR_CLASS_LIST':
            return {
                ...defaultCloudState,
                ...state,
                classList: []
            }
        case 'UPDATE_READY_LIST':
            return {
                ...defaultCloudState,
                ...state,
                readyList: action.readyList
            }
        case 'CLEAR_READY_LIST':
            return {
                ...defaultCloudState,
                ...state,
                readyList: []
            }
        case 'UPDATE_READY_STATUS':
            return {
                ...defaultCloudState,
                ...state,
                active: {
                    ...state.active,
                    ready: action.ready
                },
            }
        case 'SET_GAME_KEY':
            return {
                ...defaultCloudState,
                ...state,
                static: {
                    ...state.static,
                    key: action.key
                }
            }
        case 'CLEAR_ACTIVE_PLAYER':
            return {
                ...defaultCloudState,
                ...state,
                active: {
                    ...state.active,
                    activeUID: null,
                    activeChar: null
                }
            }
        case 'UPDATE_GAME_STAGE':
            return {
                ...defaultCloudState,
                ...state,
                active: {
                    ...state.active,
                    gameStage: action.gameStage
                }
            }
        case 'UPDATE_TEAM_HEALTH':
            return {
                ...defaultCloudState,
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
                    ...defaultCloudState.backstory,
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
                    ...state.strength,
                    ...action.strength
                }
            }
        case 'CLEAR_STRENGTH':
            return {
                ...defaultCloudState,
                ...state,
                strength: {
                    ...defaultStrength
                }
            }
        case 'UPDATE_MISSION_NOTE_ARRAY':
            return {
                ...defaultCloudState,
                ...state,
                missionNoteArray: [
                    ...action.missionNoteArray
                ]
            }
        case 'UPDATE_KOSTCO_OPTIONS':
            return {
                ...defaultCloudState,
                ...state,
                kostco: {
                    ...state.kostco,
                    // discarded: state.kostco.discarded,
                    options: action.optionKostcoArray,
                    // selected: state.kostco.selected,
                    // active: state.kostco.active,
                }
            }
        case 'UPDATE_KOSTCO_DISCARDS':
            return {
                ...defaultCloudState,
                ...state,
                kostco: {
                    ...state.kostco,
                    discarded: action.discardKostcoArray,
                    // options: state.kostco.options,
                    // selected: state.kostco.selected,
                    // active: state.kostco.active,
                }
            }
        case 'UPDATE_KOSTCO_SELECTED':
            return {
                ...defaultCloudState,
                ...state,
                kostco: {
                    ...state.kostco,
                    // discarded: state.kostco.discarded,
                    // options: state.kostco.options,
                    selected: action.kostcoSelected,
                    // active: state.kostco.active,
                }
            }
        case 'UPDATE_KOSTCO_ACTIVE':
            return {
                ...defaultCloudState,
                ...state,
                kostco: {
                    ...state.kostco,
                    // discarded: state.kostco.discarded,
                    // options: state.kostco.options,
                    // selected: state.kostco.selected,
                    active: action.kostcoActive,
                }
            }
        default:
            return state
    }
}

export { defaultCloudState, cloudReducer }