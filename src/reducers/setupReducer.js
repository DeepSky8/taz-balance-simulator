
const defaultGameSetup = {
    // Connection data
    gameID: null,
    joiningGame: true,
    host: null,
    gameKeys: [],
    gameIDArray: [],
    partyMembers: [],
    currentCharacter: null,
    currentGames: [{
        key: null,
        villain: null,
        relic: null,
        location: null,
        surprises: [{}],
        progress: {
            villain: '',
            relic: '',
            location: ''
        },
        teamHealth: ''
    }],
    characterList: [{
        charID: '',
        charName: '',
        charRace: '',
        charTool: '',
        charAttribute: '',
        charNotes: '',
        charKostco: [{}]
    }],

    // Challenge Deck data


    // UID
    uid: null,

}

const setupReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOCAL_STATE':
            return {
                ...state,
                gameID: action.gameID,
                joiningGame: action.joiningGame,
                host: action.host,
                gameKeys: action.gameKeys,
                gameIDArray: action.gameIDArray,
                villain: action.villain,
                relic: action.relic,
                location: action.location,
                currentGames: action.currentGames,
                characterList: action.characterList,
                currentCharacter: action.currentCharacter,
                partyMembers: action.partyMembers
            }
        case 'SET_JOINING_STATE':
            return {
                ...state,
                joiningGame: action.joiningGame,
                gameID: action.gameID,
            }
        case 'SET_GAME_ID':
            return {
                ...state,
                gameID: action.gameID
            }
        case 'SET_GAME_KEY':
            return {
                ...state,
                key: action.key,

            }
        case 'SET_ACTIVE_GAME_KEYS':
            return {
                ...state,
                gameKeys: state.gameKeys.concat(action.keys)
            }
        case 'SET_GAME_ID_ARRAY':
            return {
                ...state,
                gameIDArray: action.gameIDArray
            }
        case 'SET_VILLAIN':
            return {
                ...state,
                villain: action.villain
            };
        case 'SET_RELIC':
            return {
                ...state,
                relic: action.relic
            };
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.location
            };
        case 'SET_UID':
            return {
                ...state,
                uid: action.uid
            }
        // case 'ADD_PARTY_MEMBER':
        //     const state.partyList
        //     return {...state, }
        default:
            console.log('unmatched, returning default state')
            return state
    }
}

export { defaultGameSetup, setupReducer } 