import { child, push, ref, update } from "firebase/database"
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

export const setCharAssistCode = (assistCode) => ({
    type: 'SET_CHAR_ASSIST_CODE',
    assistCode
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
        .then(() => {
            const updates = {}
            updates['characters/' + uid + '/' + charKey + '/changeClass'] = false;
            update(ref(db), updates)
        })
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


// Bard actions
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

export const setPriestToolHolySymbol = (priestToolHolySymbol) => ({
    type: 'SET_PRIEST_TOOL_HOLY_SYMBOL',
    priestToolHolySymbol
})

export const setPriestToolMantra = (priestToolMantra) => ({
    type: 'SET_PRIEST_TOOL_MANTRA',
    priestToolMantra
})

export const setPriestAssistFame = (priestAssistFame) => ({
    type: 'SET_PRIEST_ASSIST_FAME',
    priestAssistFame
})

export const setPriestAssistFameHelps = (priestAssistFameHelps) => ({
    type: 'SET_PRIEST_ASSIST_FAME_HELPS',
    priestAssistFameHelps
})

export const setPriestAssistHobby = (priestAssistHobby) => ({
    type: 'SET_PRIEST_ASSIST_HOBBY',
    priestAssistHobby
})

// Rogue Actions

export const setGerblinRogueOrigin = (gerblinRogueOrigin) => ({
    type: 'SET_GERBLIN_ROGUE_ORIGIN',
    gerblinRogueOrigin
})

export const setRogueCatchphrase = (rogueCatchphrase) => ({
    type: 'SET_ROGUE_CATCHPHRASE',
    rogueCatchphrase
})

// Warrior Actions

export const setHumanWarriorOrigin1 = (humanWarriorOrigin1) => ({
    type: 'SET_HUMAN_WARRIOR_ORIGIN_1',
    humanWarriorOrigin1
})

export const setHumanWarriorOrigin2 = (humanWarriorOrigin2) => ({
    type: 'SET_HUMAN_WARRIOR_ORIGIN_2',
    humanWarriorOrigin2
})

export const setHumanWarriorOrigin3 = (humanWarriorOrigin3) => ({
    type: 'SET_HUMAN_WARRIOR_ORIGIN_3',
    humanWarriorOrigin3
})

export const setDwarfWarriorBeard = (dwarfWarriorBeard) => ({
    type: 'SET_DWARF_WARRIOR_BEARD',
    dwarfWarriorBeard
})

export const setWarriorToolArmor = (warriorToolArmor) => ({
    type: 'SET_WARRIOR_TOOL_ARMOR',
    warriorToolArmor
})

export const setWarriorToolBattlecry = (warriorToolBattlecry) => ({
    type: 'SET_WARRIOR_TOOL_BATTLECRY',
    warriorToolBattlecry
})

export const setWarriorAssistFame = (warriorAssistFame) => ({
    type: 'SET_WARRIOR_ASSIST_FAME',
    warriorAssistFame
})

export const setWarriorAssistFameHelps = (warriorAssistFameHelps) => ({
    type: 'SET_WARRIOR_ASSIST_FAME_HELPS',
    warriorAssistFameHelps
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

export const setWizardToolCatchphrase = (wizardToolCatchphrase) => ({
    type: 'SET_WIZARD_TOOL_CATCHPHRASE',
    wizardToolCatchphrase
})

export const setWizardAssistFame = (wizardAssistFame) => ({
    type: 'SET_WIZARD_ASSIST_FAME',
    wizardAssistFame
})

export const setWizardAssistFameHelps = (wizardAssistFameHelps) => ({
    type: 'SET_WIZARD_ASSIST_FAME_HELPS',
    wizardAssistFameHelps
})