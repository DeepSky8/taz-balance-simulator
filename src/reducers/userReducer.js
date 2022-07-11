
const defaultUserProfile = {
    anonymousUID: null,
    currentCharacterID: null,
    currentGame:{
        host: null,
        key: null
    },
    gameID: '',
    // host: null,
    isAnonymous: true,
    joiningGame: true,
    lastActivity: 0,
    adminCode: null,
    savedGamesArray: [],
    uid: null,

}

// Game Object
// {
//     key: null,
//     villainCode: null,
//     relicCode: null,
//     locationCode: null,
//     surprises: [{}],
//     progress: {
//         villain: '',
//         relic: '',
//         location: ''
//     },
//     teamHealth: ''
// }

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
            // let gameIDupdate;
            // if (action.updatedState.gameID) {
            //     gameIDupdate = action.updatedState.gameID
            // } else {
            //     gameIDupdate = null;
            // }
            return {
                ...defaultUserProfile,
                ...action.updatedState,
                // gameID: gameIDupdate
            }
        case 'SET_JOINING_GAME':
            return {
                ...state,
                joiningGame: action.joiningGame
            }
        case 'SET_GAME_ID':
            return {
                ...state,
                gameID: action.gameID
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
        case 'SET_UID':
            return {
                ...state,
                uid: action.uid
            }
        case 'SET_IS_ANONYMOUS':
            return {
                ...state,
                isAnonymous: action.isAnonymous
            }
        case 'REMOVE_CHALLENGE_CODES':
            return {
                ...state,
                currentActiveGame: {
                    ...state.currentActiveGame,
                    gameID: null,
                    challengesObject: {
                        villainCode: null,
                        relicCode: null,
                        locationCode: null
                    }
                }
            }
        case 'SET_CHARACTER_ARRAY':
            return {
                ...state,
                characterList: action.characterList
            }
        default:
            return state
    }
}

export { defaultUserProfile, userReducer }

