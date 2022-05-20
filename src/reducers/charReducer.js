const defaultCharState = {
    showAlerts: false,
    changeClass: true,
    charID: undefined,
    charName: '',
    classCode: 5,
    raceCode: 0,
    toolCode: 7,
    attributeCode: undefined,
    charNotes: '',
    charKostco: [{}],
    displayChars: false,
    questCount: 0,
    humanBardBand: '',
    robotBardCreator: '',
    robotBardVisual: '',
    bardSuperGoal: '',
    bardInstrument: '',
    bardMusicSkill: '',
    dwarfPriestOrigin: '',
    gerblinRogueOrigin: '',
    humanWarriorOrigin1: '',
    humanWarriorOrigin2: '',
    humanWarriorOrigin3: '',
    dwarfWarriorBeard: '',
    undeadWizardOrigin1: '',
    undeadWizardOrigin2: '',
    undeadWizardOrigin3: '',
    priestHolySymbol: '',
    priestMantra: '',
}


const charReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_CHAR_DISPLAY':
            const toggledCharDisplay = !state.displayChars
            return {
                ...state,
                displayChars: toggledCharDisplay
            }
        case 'SET_CHAR_STATE':
            return {
                ...state,
                ...action.charObject,
                displayChars: false
            }
        case 'SET_NO_CHAR':
            return {
                ...defaultCharState
            }
        case 'SHOW_ALERTS':
            return {
                ...state,
                showAlerts: true
            }
        case 'HIDE_ALERTS':
            return {
                ...state,
                showAlerts: false
            }
        case 'SET_CHAR_CLASS_CODE':
            return {
                ...state,
                classCode: action.classCode
            }
        case 'SET_CHAR_RACE_CODE':
            return {
                ...state,
                raceCode: action.raceCode
            }

        case 'SET_CHAR_TOOL_CODE':
            return {
                ...state,
                toolCode: action.toolCode
            }

        case 'SET_CHAR_ATT_CODE':
            return {
                ...state,
                charAttributeCode: action.charAttributeCode
            }
        case 'EDIT_CHARACTER':
            return {
                ...defaultCharState,
                ...action.charObject,
                changeClass: false
            }

        case 'SET_CHAR_NAME':
            return {
                ...state,
                charName: action.charName
            }
        // Bard Actions
        case 'SET_BARD_INSTRUMENT':
            return {
                ...state,
                bardInstrument: action.bardInstrument
            }
        case 'SET_BARD_MUSIC_SKILL':
            return {
                ...state,
                bardMusicSkill: action.bardMusicSkill
            }
        case 'SET_BARD_SUPER_GOAL':
            return {
                ...state,
                bardSuperGoal: action.bardSuperGoal
            }
        case 'SET_HUMAN_BARD_BAND':
            return {
                ...state,
                humanBardBand: action.humanBardBand
            }
        case 'SET_ROBOT_BARD_CREATOR':
            return {
                ...state,
                robotBardCreator: action.robotBardCreator
            }
        case 'SET_ROBOT_BARD_VISUAL':
            return {
                ...state,
                robotBardVisual: action.robotBardVisual
            }
        // Priest Actions
        case 'SET_DWARF_PRIEST_ORIGIN':
            return {
                ...state,
                dwarfPriestOrigin: action.dwarfPriestOrigin
            }
        case 'SET_PRIEST_HOLY_SYMBOL':
            return {
                ...state,
                priestHolySymbol: action.priestHolySymbol
            }
        case 'SET_PRIEST_MANTRA':
            return {
                ...state,
                priestMantra: action.priestMantra
            }
        // Rogue Actions
        case 'SET_GERBLIN_ROGUE_ORIGIN':
            return {
                ...state,
                gerblinRogueOrigin: action.gerblinRogueOrigin
            }
        // Warrior Actions
        case 'SET_HUMAN_WARRIOR_ORIGIN_1':
            return {
                ...state,
                humanWarriorOrigin1: action.humanWarriorOrigin1
            }
        case 'SET_HUMAN_WARRIOR_ORIGIN_2':
            return {
                ...state,
                humanWarriorOrigin2: action.humanWarriorOrigin2
            }
        case 'SET_HUMAN_WARRIOR_ORIGIN_3':
            return {
                ...state,
                humanWarriorOrigin3: action.humanWarriorOrigin3
            }
        case 'SET_DWARF_WARRIOR_BEARD':
            return {
                ...state,
                dwarfWarriorBeard: action.dwarfWarriorBeard
            }
        // Wizard Actions
        case 'SET_UNDEAD_WIZARD_ORIGIN_1':
            return {
                ...state,
                undeadWizardOrigin1: action.undeadWizardOrigin1
            }
        case 'SET_UNDEAD_WIZARD_ORIGIN_2':
            return {
                ...state,
                undeadWizardOrigin2: action.undeadWizardOrigin2
            }
        case 'SET_UNDEAD_WIZARD_ORIGIN_3':
            return {
                ...state,
                undeadWizardOrigin3: action.undeadWizardOrigin3
            }
        default: return state
    }
}

export { defaultCharState, charReducer }