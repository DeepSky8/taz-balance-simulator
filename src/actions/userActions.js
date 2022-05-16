import { get, onValue, push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";


// Local Functions
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

export const setHost = (host) => ({
    type: 'SET_HOST',
    host
})

export const updateUserState = (updatedState) => ({
    type: 'UPDATE_STATE',
    updatedState
})

export const updateJoinedActiveGame = (currentActiveGame) => ({
    type: 'UPDATE_ACTIVE_GAME',
    currentActiveGame
})

export const updateSelectedChallenges = ({ challengesObject }) => ({
    type: 'UPDATE_SELECTED_CHALLENGES',
    challengesObject
})

export const removeActiveGameChallengeCodes = () => ({
    type: 'REMOVE_CHALLENGE_CODES'
})

export const setCharacterListArray = (characterList) => ({
    type: 'SET_CHARACTER_ARRAY',
    characterList
})

export const resetUserProfile = () => ({
    type: 'RESET_STATE'
})

// Cloud Functions

export const startRemoveGameID = (uid) => {
    const updates = {}
    updates['users/' + uid + '/gameID'] = null
    updates['users/' + uid + '/host'] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when removing challenge codes in cloud:', error)
        })
}

export const registerUser = (uid, isAnonymous, joiningGame) => {
    update(ref(db, 'users/' + uid), { uid, isAnonymous, joiningGame })
}