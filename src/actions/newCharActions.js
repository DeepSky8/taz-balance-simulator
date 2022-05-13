import { child, push, ref, update } from "firebase/database"
import { db } from "../firebase/firebase"


// Cloud actions




export const startSaveNewCharacter = (uid, newCharState) => {
    const newCharKey = push(child(ref(db), uid + '/characterList')).key
    const updates = {}
    updates['characters/' + uid + '/' + newCharKey] =
        { ...newCharState, charID: newCharKey };
    updates['users/' + uid + '/currentCharacterID'] = newCharKey
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when saving new character:', error)
        })
}


// Local actions

export const showAlerts = () => ({
    type: 'SHOW_ALERTS'
})

export const hideAlerts = () => ({
    type: 'HIDE_ALERTS'
})

export const setCharClassCode = (charClassCode) => ({
    type: 'SET_CHAR_CLASS_CODE',
    charClassCode
})

export const setCharSpecialCode = (charSpecialCode) => ({
    type: 'SET_CHAR_SPECIAL_CODE',
    charSpecialCode
})

export const setCharRaceCode = (charRaceCode) => ({
    type: 'SET_CHAR_RACE_CODE',
    charRaceCode
})

export const setCharToolCode = (charToolCode) => ({
    type: 'SET_CHAR_TOOL_CODE',
    charToolCode
})

export const setCharAttributeCode = (charAttributeCode) => ({
    type: 'SET_CHAR_ATT_CODE',
    charAttributeCode
})

export const setCharName = (charName) => ({
    type: 'SET_CHAR_NAME',
    charName
})

export const resetDefaultNewChar = () => ({
    type: 'RESET_DEFAULTS'
})

// Bard-specific actions
export const setHumanBardBand = (humanBardBand) => ({
    type: 'SET_HUMAN_BARD_BAND',
    humanBardBand
})

export const setRobotBardCreator = (robotBardCreator) => ({
    type: 'SET_ROBOT_BARD_CREATOR',
    robotBardCreator
})

export const setRobotBardVisual = (robotBardVisual) => ({
    type: 'SET_ROBOT_BARD_VISUAL',
    robotBardVisual
})

export const setBardSuperGoal = (bardSuperGoal) => ({
    type: 'SET_BARD_SUPER_GOAL',
    bardSuperGoal
})

export const setBardInstrument = (bardInstrument) => ({
    type: 'SET_BARD_INSTRUMENT',
    bardInstrument
})

export const setBardMusicSkill = (bardMusicSkill) => ({
    type: 'SET_BARD_MUSIC_SKILL',
    bardMusicSkill
})
