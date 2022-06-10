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