import { get, onValue, push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

export const setUID = (uid) => ({
    type: 'SET_UID',
    uid
})

export const setIsAnonymous = (isAnonymous) => ({
    type: 'SET_IS_ANONYMOUS',
    isAnonymous
})

export const setGameIDArray = (gameIDArray, initialGameObjectsArray) => ({
    type: 'SET_GAME_ID_ARRAY',
    gameIDArray,
    initialGameObjectsArray
})

// const setJoiningState = (gameID, joiningGame) => ({
//     type: 'SET_JOINING_STATE',
//     gameID,
//     joiningGame
// })



// const setSetupJoiningGame = (joiningGame) => ({
//     type: 'SET_JOINING_GAME',
//     joiningGame
// })



// export const setGameKey = (key) => ({
//     type: 'SET_GAME_KEY',
//     key
// })

// export const setActiveGameKeys = (keys) => ({
//     type: 'SET_ACTIVE_GAME_KEYS',
//     keys
// })

export const setHost = (host) => ({
    type: 'SET_HOST',
    host
})

const startUpdateCloudState = (state) => {
    update(ref(db, 'user/' + state.uid), { lastActivity: Date.now(), ...state })
}



export const updateUserState = (updatedState) => ({
    type: 'UPDATE_STATE',
    updatedState
})

export const updateJoinedActiveGame = (currentActiveGame) => ({
    type: 'UPDATE_ACTIVE_GAME',
    currentActiveGame
})

const startUpdateActiveGame = (uid, activeGameSnapshot) => {
    update(ref(db, 'users/' + uid + '/currentActiveGame'), { ...activeGameSnapshot })
}

export const updateSelectedChallenges = ({ challengesObject }) => ({
    type: 'UPDATE_SELECTED_CHALLENGES',
    challengesObject
})

export const startRemoveGameID = (uid) => {
    const updates = {}
    updates['users/' + uid + '/gameID'] = null
    updates['users/' + uid + '/host'] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when removing challenge codes in cloud:', error)
        })
}

export const removeActiveGameChallengeCodes = () => ({
    type: 'REMOVE_CHALLENGE_CODES'
})

export const registerUser = (uid, isAnonymous, joiningGame) => {
    update(ref(db, 'users/' + uid), { uid, isAnonymous, joiningGame })
}

// export const setLocalState = (
//     {
//         gameID,
//         isAnonymous,
//         joiningGame,
//         host,
//         gameKeys,
//         gameIDArray,
//         currentGames,
//         characterList,
//         currentCharacter,
//         partyMembers,

//     }) => ({
//         type: 'SET_LOCAL_STATE',
//         gameID,
//         isAnonymous,
//         joiningGame,
//         host,
//         gameKeys,
//         gameIDArray,
//         currentGames,
//         characterList,
//         currentCharacter,
//         partyMembers
//     })

// currentGames: [{
//     key: null,
//     villain: null,
//     relic: null,
//     location: null,
//     surprises: [{}],
//     progress: {
//         villain: '',
//         relic: '',
//         location: ''
//     },
//     teamHealth: ''
// }],
//     characterList: [{
//         charName: '',
//         charRace: '',
//         charTool: '',
//         charAttribute: '',
//         charNotes: '',
//         charKostco: [{}]
//     }]

// const updateParty = (party) => ({
//     type: 'UPDATE_PARTY',
//     party
// })

// This listener updates the setupState to match the chosen game options
// during game setup, based on the game code entered
// export const startJoinedGameSetupListener = (shortGameID) => {
//     onValue(ref(db, 'activeGames/' + shortGameID), (snapshot) => {
//         return (setHost(snapshot.val().host),
//             updateParty(snapshot.val().party))
//     })
//         // .then(() => {

//         // })
//         .catch((error) => {
//             console.log('Error when sending game code to server:', error)
//         })
// }



// export const confirmedValidGameCode = (shortGameID) => {
//     return setJoinCode(shortGameID)
// }



// export const startEnteredJoinCode = ({ shortGameID, host }) => {
//     update(ref(db, 'activeGames/' + shortGameID), { shortGameID, host })
//         .then(() => {
//             console.log('successfully sent shortGameID to Firebase')
//             // setJoinCode(shortGameID)
//         })
//         .catch((error) => {
//             console.log('Error when sending game code to server:', error)
//         })
// }