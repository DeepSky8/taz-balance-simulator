import { push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

// Local Actions
export const updateGameState = (currentActiveGame) => ({
    type: 'UPDATE_GAME_STATE',
    currentActiveGame
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

// Cloud Actions

// const actuallySaveGame = (uid, key, gameData) => {

// }

export const startGetKey = (uid) => {
    return push(ref(db, 'savedGames/' + uid)).key;
}

export const startSaveGame = (uid, key, gameData) => {
    const updates = {}
    updates['savedGames/' + uid + '/' + key] = { ...gameData, key }
    update(ref(db), updates)

        .catch((error) => {
            console.log('Did not start Save Game, error: ', error)
        })
}

export const startRemoveSavedGame = (uid, key) => {
    remove(ref(db, 'savedGames/' + uid + '/' + key))
        .catch((error) => {
            console.log('Did not remove Saved Game, error: ', error)
        })
}

export const startResumeSavedGame = (gameID, key, challengesObject) => {
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

// export const startChangeActiveCharacter = () => { 
//     const updates = {}
//     updates['activeGames/' + gameID + '/readyCheck/' + uid] = null
//     update(ref(db), updates)
//         .catch((error) => {
//             console.log('Did not successfully stop Ready Check, error: ', error)
//         })
// }