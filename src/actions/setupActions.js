import { onValue, push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

export const setUID = (uid) => ({
    type: 'SET_UID',
    uid
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

export const setGameKey = (key) => ({
    type: 'SET_GAME_KEY',
    key
})

export const setActiveGameKeys = (keys) => ({
    type: 'SET_ACTIVE_GAME_KEYS',
    keys
})

export const setHost = (host) => ({
    type: 'SET_HOST',
    host
})

export const startUpdateCloudState = (state) => {
    update(ref(db, 'user/' + state.uid), { ...state })
}

export const setLocalState = (
    {
        gameID,
        joiningGame,
        host,
        gameKeys,
        gameIDArray,
        currentGames,
        characterList,
        currentCharacter,
        partyMembers,

    }) => ({
        type: 'SET_LOCAL_STATE',
        gameID,
        joiningGame,
        host,
        gameKeys,
        gameIDArray,
        currentGames,
        characterList,
        currentCharacter,
        partyMembers
    })

export const startRegisterGameID = (gameID, host, key) => {
    const updates = {};
    updates['activeGames/' + key] = { gameID, host, key };
    updates['/users/' + host] = { gameID, joiningGame: false, host };
    update(ref(db), updates)
        // update(ref(db, 'activeGames/' + key), { gameID, host, key })
        .catch((error) => {
            console.log('Error when sending game code to server:', error)
        })
}

// const removeGame

export const startRemoveGameCode = (key) => {
    remove(ref(db, 'activeGames/' + key), {})
        .catch((error) => {
            console.log('Error when cleaning game array in cloud:', error)
        })
}





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