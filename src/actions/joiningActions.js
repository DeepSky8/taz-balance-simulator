import { ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

// Local state actions
export const setGameID = (gameID) => ({
    type: 'SET_GAME_ID',
    gameID
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

export const joiningGame = () => ({
    type: 'JOINING_GAME'
})

export const hostingGame = () => ({
    type: 'HOSTING_GAME'
})

// Cloud state Actions

// Sets the joining/hosting status in cloud
export const startSetJoiningGame = (uid, joiningGame) => {
    const updates = {}
    updates['users/' + uid + '/joiningGame'] = joiningGame
    updates['users/' + uid + '/uid'] = uid;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set JoiningState, error: ', error)
        })
}

// Saves the gameID on the user record provided, 
// and updates the date marker for the user 
export const startSaveGameID = (uid, gameID) => {
    const updates = {}

    updates['users/' + uid + '/lastActivity'] = Date.now()
    updates['users/' + uid + '/gameID'] = gameID;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not start Save Game, error: ', error)
        })
}

// If hosting, player must register the game ID
// This involves saving the gameID in both activeGames section 
// and the Users section, along with setting the host ID in both locations
// Then calls the previous process to save the gameID to the user profile
const startRegisterGameID = (uid, gameID) => {
    const updates = {};
    updates['activeGames/' + gameID] = { host: uid, gameID };
    updates['users/' + uid + '/host'] = uid;
    updates['users/' + uid + '/uid'] = uid;
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





// not in use


const setJoiningState = (gameID) => ({
    type: 'SET_JOINING_STATE',
    gameID
})

const clearGameID = () => ({
    type: 'CLEAR_GAME_ID'
})

const toggleJoiningGame = (joiningGame, isAnonymous) => ({
    type: 'TOGGLE_JOINING_GAME',
    joiningGame,
    isAnonymous
})
