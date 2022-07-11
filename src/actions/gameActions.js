import { push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

// Local Actions
export const updateGameState = (currentActiveGame) => ({
    type: 'UPDATE_GAME_STATE',
    currentActiveGame
})

export const updateGameStateFull = (currentActiveGameFull) => ({
    type: 'UPDATE_GAME_STATE',
    currentActiveGameFull
})

export const updateChallengesObject = (challengesObject) => ({
    type: 'UPDATE_CHALLENGES_OBJECT',
    challengesObject
})

export const clearGameState = () => ({
    type: 'CLEAR_GAME_STATE'
})

export const clearChallengesObject = () => ({
    type: 'CLEAR_CHALLENGES_OBJECT'
})

export const updateGameHost = (host) => ({
    type: 'UPDATE_GAME_HOST',
    host
})

export const updatePlayerList = (playerList) => ({
    type: 'UPDATE_PLAYER_LIST',
    playerList
})

export const clearPlayerList = () => ({
    type: 'CLEAR_PLAYER_LIST'
})

export const updateClassList = (classList) => ({
    type: 'UPDATE_CLASS_LIST',
    classList
})

export const clearClassList = () => ({
    type: 'CLEAR_CLASS_LIST'
})

export const updateReadyList = (readyList) => ({
    type: 'UPDATE_READY_LIST',
    readyList
})

export const clearReadyList = () => ({
    type: 'CLEAR_READY_LIST'
})

export const updateReadyStatus = (ready) => ({
    type: 'UPDATE_READY_STATUS',
    ready
})

export const setGameKey = (key) => ({
    type: 'SET_GAME_KEY',
    key
})

export const setActivePlayer = (activePlayer) => ({
    type: 'SET_ACTIVE_PLAYER',
    activePlayer
})

// Cloud Actions

// const actuallySaveGame = (uid, key, gameData) => {

// }

export const startGetKey = (uid) => {
    return push(ref(db, 'savedGames/' + uid)).key;
}

export const startSaveGame = (uid, key, gameState) => {
    const updates = {}
    updates['savedGames/' + uid + '/' + key] = { ...gameState, key }
    return update(ref(db), updates)

    // .catch((error) => {
    //     console.log('Did not start Save Game, error: ', error)
    // })
}

export const startRemoveSavedGame = (uid, key) => {
    remove(ref(db, 'savedGames/' + uid + '/' + key))
        .catch((error) => {
            console.log('Did not remove Saved Game, error: ', error)
        })
}

export const startLoadSavedGame = (gameID, key, challengesObject) => {
    const updates = {}
    updates['activeGames/' + gameID + '/key'] = key
    updates['activeGames/' + gameID + '/challengesObject'] = { ...challengesObject }
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not start Load Game, error: ', error)
        })
}

export const startJoinActiveGame = (uid, gameID, currentCharacterID, classCode) => {
    const updates = {}
    updates['activeGames/' + gameID + '/playerList/' + uid + '/uid'] = uid
    updates['activeGames/' + gameID + '/playerList/' + uid + '/currentCharacterID'] = currentCharacterID
    updates['activeGames/' + gameID + '/classStorage/' + uid] = classCode
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not join active game, error: ', error)
        })
}

export const startReadyCheck = (uid, gameID) => {
    const updates = {}
    updates['activeGames/' + gameID + '/readyCheck/' + uid] = uid
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not successfully Ready Check, error: ', error)
        })
}

export const startStopReadyCheck = (uid, gameID) => {
    const updates = {}
    updates['activeGames/' + gameID + '/readyCheck/' + uid] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not successfully stop Ready Check, error: ', error)
        })
}

// Clears the activeGame with local userState gameID
// then sets the gameID under the user UID to null
export const startRemoveGameCode = (uid, gameID) => {
    const updates = {};
    updates['activeGames/' + gameID] = null;
    updates['gameList/' + gameID] = null;
    // updates['users/' + uid + '/host'] = null
    updates['users/' + uid + '/gameID'] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when cleaning game array in cloud:', error)
        })
}

export const startSavedGame = (uid, gameID, key, playerList) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/playerList'] = playerList;
    updates['savedGames/' + uid + '/' + key + '/key'] = key;
    updates['savedGames/' + uid + '/' + key + '/host'] = uid;
    updates['savedGames/' + uid + '/' + key + '/ready'] = false;
    update(ref(db), updates)
        .then(() => {
            startRemoveGameCode(uid, gameID)
        })
        .catch((error) => {
            console.log('Error when starting game (saved):', error)
        })
}

export const startNewGame = (uid, gameID, playerList, challengesObject, teamHealth) => {
    const key = startGetKey(uid)
    const updates = {};
    updates['activeGames/' + gameID + '/key'] = key;
    updates['savedGames/' + uid + '/' + key + '/key'] = key;
    updates['savedGames/' + uid + '/' + key + '/host'] = uid;
    updates['savedGames/' + uid + '/' + key + '/playerList'] = playerList;
    updates['savedGames/' + uid + '/' + key + '/challengesObject'] = { ...challengesObject };
    updates['savedGames/' + uid + '/' + key + '/teamHealth'] = teamHealth;
    updates['savedGames/' + uid + '/' + key + '/progress'] = { location: 0, relic: 0, villain: 0 };
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when starting game (new):', error)
        })
}

export const startMarkTurnComplete = (uid, key, readyList) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/readyList'] = { ...readyList };
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when marking turn complete:', error)
        })
}

export const startNewRound = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/readyList'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when starting new round:', error)
        })
}

export const startSetReadyTrue = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/ready'] = true;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error setting Ready to true:', error)
        })
}

export const startSetReadyFalse = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/ready'] = false;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error setting Ready to false:', error)
        })
}

// updates['users/' + uid + '/currentGame'] = { host: uid, key };