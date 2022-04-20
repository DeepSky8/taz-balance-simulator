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


export const setJoiningState = (gameID, joiningGame) => ({
    type: 'SET_JOINING_STATE',
    gameID,
    joiningGame
})

export const setSetupJoiningGame = (joiningGame) => ({
    type: 'SET_JOINING_GAME',
    joiningGame
})

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

export const startUpdateCloudState = (state) => {
    update(ref(db, 'user/' + state.uid), { lastActivity: Date.now(), ...state })
}

export const startRegisterGameID = (host, gameID, state ) => {
    const updates = {};
    updates['activeGames/' + host] = { gameID, host };
    updates['/users/' + host] = {
        ...state,
        gameID,
        host,
        lastActivity: Date.now(),
        uid: host
    };
    update(ref(db), updates)

        .catch((error) => {
            console.log('Error when sending game code to server:', error)
        })
}

// Clears the cloud record location under activeGames that matches the UID
// then sets the gameID under the user UID to null
export const startRemoveGameCode = (host) => {
    remove(ref(db, 'activeGames/' + host))
        .then(() => {
            update(ref(db, 'users/' + host), { gameID: null })
        })
        .catch((error) => {
            console.log('Error when cleaning game array in cloud:', error)
        })
}

export const setState = (updatedState) => ({
    type: 'SET_STATE',
    updatedState
})


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