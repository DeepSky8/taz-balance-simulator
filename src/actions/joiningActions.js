import { ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";


// Local Actions

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

// Cloud Actions

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
    updates['gameSetup/' + gameID + '/static/host'] = uid;
    updates['gameSetup/' + gameID + '/static/gameID'] = gameID;
    updates['gameList/' + gameID] = { host: uid, gameID };
    // updates['users/' + uid + '/host'] = true;
    update(ref(db), updates)
        .then(() => {
            startSaveGameID(uid, gameID)
        })
        .catch((error) => {
            console.log('Error when sending game code to server:', error)
        })
}

// If the user is disconnecting from an active game 
// (or a game that doesn't exist)
// set the cloud profile gameID to null, which will
// propagate to the userState.gameID
// joiningHosting.gameID will already be updated, as
// that is where the action was initiated
export const startExitActiveGame = (uid, gameID) => {
    const updates = {};
    updates['users/' + uid + '/gameID'] = null;
    updates['gameSetup/' + gameID + '/playerList/' + uid] = null;
    updates['gameSetup/' + gameID + '/classStorage/' + uid] = null;
    update(ref(db), updates)
}