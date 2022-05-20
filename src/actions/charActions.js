import { child, push, ref, remove, update } from "firebase/database"
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

export const showAlerts = () => ({
    type: 'SHOW_ALERTS'
})

export const hideAlerts = () => ({
    type: 'HIDE_ALERTS'
})

export const setCharClassCode = (classCode) => ({
    type: 'SET_CHAR_CLASS_CODE',
    classCode
})


export const setCharRaceCode = (raceCode) => ({
    type: 'SET_CHAR_RACE_CODE',
    raceCode
})

export const setCharToolCode = (toolCode) => ({
    type: 'SET_CHAR_TOOL_CODE',
    toolCode
})

export const setCharAttributeCode = (charAttributeCode) => ({
    type: 'SET_CHAR_ATT_CODE',
    charAttributeCode
})

export const setCharName = (charName) => ({
    type: 'SET_CHAR_NAME',
    charName
})

export const editCharacter = (charObject) => ({
    type: 'EDIT_CHARACTER',
    charObject
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

export const startSaveUpdatedCharacter = (uid, charState, charKey) => {
    const updates = {}
    updates['characters/' + uid + '/' + charKey] = { ...charState, charID: charKey };
    updates['users/' + uid + '/currentCharacterID'] = charKey
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when saving new character:', error)
        })
}

export const startSaveNewCharacter = (uid, charState) => {
    const newCharKey = push(child(ref(db), uid + '/characterList')).key
    startSaveUpdatedCharacter(uid, charState, newCharKey)
}

export const startRemoveCharacter = (uid, charID) => {
    const updates = {}
    updates['users/' + uid + '/currentCharacterID'] = null
    updates['characters/' + uid + "/" + charID] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when saving retiring character:', error)
        })
}


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

// Priest Actions

export const setDwarfPriestOrigin = (dwarfPriestOrigin) => ({
    type: 'SET_DWARF_PRIEST_ORIGIN',
    dwarfPriestOrigin
})

// Rogue Actions

export const setGerblinRogueOrigin = (gerblinRogueOrigin) => ({
    type: 'SET_GERBLIN_ROGUE_ORIGIN',
    gerblinRogueOrigin
})

// Warrior Actions

export const setHumanWarriorOrigin1 = (humanWarriorOrigin1) => ({
    type: 'SET_HUMAN_WARRIOR_ORIGIN_1',
    humanWarriorOrigin1
})

export const setHumanWarriorOrigin2 = (humanWarriorOrigin2) => ({
    type: 'SET_HUMAN_WARRIOR_ORIGIN_1',
    humanWarriorOrigin2
})

export const setHumanWarriorOrigin3 = (humanWarriorOrigin3) => ({
    type: 'SET_HUMAN_WARRIOR_ORIGIN_1',
    humanWarriorOrigin3
})

export const setDwarfWarriorBeard = (dwarfWarriorBeard) => ({
    type: 'SET_DWARF_WARRIOR_BEARD',
    dwarfWarriorBeard
})

// Wizard Actions

export const setUndeadWizardOrigin1 = (undeadWizardOrigin1) => ({
    type: 'SET_UNDEAD_WIZARD_ORIGIN_1',
    undeadWizardOrigin1
})

export const setUndeadWizardOrigin2 = (undeadWizardOrigin2) => ({
    type: 'SET_UNDEAD_WIZARD_ORIGIN_2',
    undeadWizardOrigin2
})

export const setUndeadWizardOrigin3 = (undeadWizardOrigin3) => ({
    type: 'SET_UNDEAD_WIZARD_ORIGIN_3',
    undeadWizardOrigin3
})