import { ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

export const toggleJoiningGame = (joiningGame, isAnonymous) => ({
    type: 'TOGGLE_JOINING_GAME',
    joiningGame,
    isAnonymous
})

export const setGameID = (gameID) => ({
    type: 'SET_GAME_ID',
    gameID
})

export const clearGameID = () => ({
    type: 'CLEAR_GAME_ID'
})

export const setGameCodeError = () => ({
    type: 'SET_GAME_CODE_ERROR'
})

export const clearGameCodeError = () => ({
    type: 'CLEAR_GAME_CODE_ERROR'
})

export const joiningOnly = () => ({
    type: 'JOINING_ONLY'
})

export const joiningOrHosting = () => ({
    type: 'JOINING_OR_HOSTING'
})

export const setJoiningState = (gameID) => ({
    type: 'SET_JOINING_STATE',
    gameID
})

export const startSetJoiningGame = (uid, joiningGame) => {
    const updates = {}
    updates['users/' + uid + '/joiningGame'] = joiningGame
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set JoiningState, error: ', error)
        })
}

export const startSaveGameID = (uid, gameID) => {
    const updates = {}

    updates['users/' + uid + '/lastActivity'] = Date.now()
    updates['users/' + uid + '/uid'] = uid;
    updates['users/' + uid + '/gameID'] = gameID;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not start Save Game, error: ', error)
        })
}

export const startRegisterGameID = (uid, gameID) => {
    const updates = {};
    updates['activeGames/' + gameID] = { host: uid, gameID };
    updates['users/' + uid + '/host'] = uid;
    update(ref(db), updates)
        .then(() => {
            startSaveGameID(uid, gameID)
        })
        .catch((error) => {
            console.log('Error when sending game code to server:', error)
        })
}


// Clears the cloud record location under activeGames that matches the UID
// then sets the gameID under the user UID to null
export const startRemoveGameCode = (uid, gameID) => {
    remove(ref(db, 'activeGames/' + gameID))
        .then(() => {
            const updates = {}
            updates['users/' + uid + '/host'] = null
            updates['users/' + uid + '/gameID'] = null
            update(ref(db), updates)
        })
        .catch((error) => {
            console.log('Error when cleaning game array in cloud:', error)
        })
}