
const defaultGameSetup = {
    // Connection data
    gameID: null,
    joiningGame: true,
    host: null,
    key: null,
    gameIDArray: [],
    initialGameObjectsArray: [],

    // Challenge Deck data
    villain: null,
    relic: null,
    location: null,

    // UID
    uid: null,

}

const setupReducer = (state, action) => {
    switch (action.type) {
        case 'SET_JOINING_STATE':
            return { ...state, joiningGame: action.joiningGame, gameID: action.gameID, }
        case 'SET_GAME_ID':
            return { ...state, gameID: action.gameID }
        case 'SET_GAME_KEY':
            return { ...state, key: action.key }
        case 'SET_GAME_ID_ARRAY':
            return { ...state, gameIDArray: action.gameIDArray, initialGameObjectsArray: action.initialGameObjectsArray }
        case 'SET_VILLAIN':
            return { ...state, villain: action.villain };
        case 'SET_RELIC':
            return { ...state, relic: action.relic };
        case 'SET_LOCATION':
            return { ...state, location: action.location };
        case 'SET_UID':
            return { ...state, uid: action.uid }
        // case 'ADD_PARTY_MEMBER':
        //     const state.partyList
        //     return {...state, }
        default:
            console.log('unmatched, returning default state')
            return state
    }
}

export { defaultGameSetup, setupReducer } 