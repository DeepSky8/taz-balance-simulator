
const defaultUserProfile = {
    anonymousUID: null,
    currentCharacter: null,
    characterList: [{
        charID: '',
        charName: '',
        charRace: '',
        charTool: '',
        charAttribute: '',
        charNotes: '',
        charKostco: [{}]
    }],
    gameID: null,
    host: null,
    isAnonymous: true,
    joiningGame: true,
    lastActivity: 0,
    
    savedGamesArray: [{
        key: null,
        villainCode: null,
        relicCode: null,
        locationCode: null,
        surprises: [{}],
        progress: {
            villain: '',
            relic: '',
            location: ''
        },
        teamHealth: ''
    }],
    uid: null,

}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
            let gameIDupdate;
            if(action.updatedState.gameID){
                gameIDupdate = action.updatedState.gameID
            } else {
                gameIDupdate = null;
            }
            return { 
                ...state, 
                ...action.updatedState,
                gameID: gameIDupdate
            }

        // case 'SET_JOINING_STATE':
        //     return {
        //         ...state,
        //         joiningGame: action.joiningGame,
        //         gameID: action.gameID,
        //     }
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
        // case 'SET_GAME_KEY':
        //     return {
        //         ...state,
        //         key: action.key,

        //     }
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
        // case 'SET_VILLAIN':
        //     return {
        //         ...state,
        //         currentActiveGame: {
        //             ...state.currentActiveGame,
        //             challengesObject: {
        //                 ...state.currentActiveGame.challengesObject,
        //                 villainCode: action.villainCode
        //             }
        //         }
        //     };
        // case 'SET_RELIC':
        //     return {
        //         ...state,
        //         relic: action.relic
        //     };
        // case 'SET_LOCATION':
        //     return {
        //         ...state,
        //         location: action.location
        //     };
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
        // case 'ADD_PARTY_MEMBER':
        //     const state.partyList
        //     return {...state, }
        // case 'UPDATE_SELECTED_CHALLENGES':
        //     return {
        //         ...state,
        //         currentActiveGame: {
        //             ...state.currentActiveGame,

        //         }
        //     }
        // case 'UPDATE_ACTIVE_GAME':
        //     return {
        //         ...state,
        //         currentActiveGame: action.currentActiveGame
        //     }
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
        default:
            return state
    }
}

export { defaultUserProfile, userReducer }

   // case 'SET_LOCAL_STATE':
        //     return {
        //         ...state,
        //         gameID: action.gameID,
        //         isAnonymous: action.isAnonymous,
        //         joiningGame: action.joiningGame,
        //         host: action.host,
        //         gameKeys: action.gameKeys,
        //         gameIDArray: action.gameIDArray,
        //         villain: action.villain,
        //         relic: action.relic,
        //         location: action.location,
        //         currentGames: action.currentGames,
        //         characterList: action.characterList,
        //         currentCharacter: action.currentCharacter,
        //         partyMembers: action.partyMembers
        //     }

        // currentActiveGame: {
        
        //     challengesObject: {
        //         villainCode: null,
        //         relicCode: null,
        //         locationCode: null
        //     },
        //     surprises: [{}],
        //     partyMembers: [],
        //     progress: {
        //         villain: null,
        //         relic: null,
        //         location: null
        //     },
        //     teamHealth: null
        // },