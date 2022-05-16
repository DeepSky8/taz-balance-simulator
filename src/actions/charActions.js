import { ref, update } from "firebase/database"
import { db } from "../firebase/firebase"

// Local Actions
export const toggleCharDisplay = () => ({
    type: 'TOGGLE_CHAR_DISPLAY'
})

export const setCharState = (charObject) => ({
    type: 'SET_CHAR_STATE',
    charObject
})

export const setNoCurrentChar = () => ({
    type: 'SET_NO_CHAR'
})

export const resetCharacterState = () => ({
    type: 'RESET_STATE'
})

// Cloud Actions

export const startSetCurrentCharacter = (uid, charID) => {
    const updates = {}
    updates['users/' + uid + '/currentCharacterID'] = charID
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when choosing a character:', error)
        })
}