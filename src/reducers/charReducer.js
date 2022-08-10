const defaultCharState = {
    showAlerts: false,
    changeClass: true,
    charID: undefined,
    charName: '',
    classCode: 5,
    raceCode: 0,
    toolCode: 7,
    assistCode: 7,
    charNotes: '',
    charKostco: [{}],
    displayChars: true,
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
    priestToolHolySymbol: '',
    priestToolMantra: '',
    rogueToolCatchphrase: '',
    warriorToolArmor: '',
    warriorToolBattlecry: '',
    wizardToolCatchphrase: '',
    priestAssistFame: '',
    priestAssistFameHelps: '',
    priestAssistHobby: '',
    warriorAssistFame: '',
    warriorAssistFameHelps: '',
    wizardAssistFame: '',
    wizardAssistFameHelps: '',
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

        case 'SET_CHAR_ASSIST_CODE':
            return {
                ...state,
                assistCode: action.assistCode
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
        case 'SET_PRIEST_TOOL_HOLY_SYMBOL':
            return {
                ...state,
                priestToolHolySymbol: action.priestToolHolySymbol
            }
        case 'SET_PRIEST_TOOL_MANTRA':
            return {
                ...state,
                priestToolMantra: action.priestToolMantra
            }
        case 'SET_PRIEST_ASSIST_FAME':
            return {
                ...state,
                priestAssistFame: action.priestAssistFame
            }
        case 'SET_PRIEST_ASSIST_FAME_HELPS':
            return {
                ...state,
                priestAssistFameHelps: action.priestAssistFameHelps
            }
        case 'SET_PRIEST_ASSIST_HOBBY':
            return {
                ...state,
                priestAssistHobby: action.priestAssistHobby
            }
        // Rogue Actions
        case 'SET_GERBLIN_ROGUE_ORIGIN':
            return {
                ...state,
                gerblinRogueOrigin: action.gerblinRogueOrigin
            }
        case 'SET_ROGUE_TOOL_CATCHPHRASE':
            return {
                ...state,
                rogueToolCatchphrase: action.rogueToolCatchphrase
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
        case 'SET_WARRIOR_TOOL_ARMOR':
            return {
                ...state,
                warriorToolArmor: action.warriorToolArmor
            }
        case 'SET_WARRIOR_TOOL_BATTLECRY':
            return {
                ...state,
                warriorToolBattlecry: action.warriorToolBattlecry
            }
        case 'SET_WARRIOR_ASSIST_FAME':
            return {
                ...state,
                warriorAssistFame: action.warriorAssistFame
            }
        case 'SET_WARRIOR_ASSIST_FAME_HELPS':
            return {
                ...state,
                warriorAssistFameHelps: action.warriorAssistFameHelps
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
        case 'SET_WIZARD_TOOL_CATCHPHRASE':
            return {
                ...state,
                wizardToolCatchphrase: action.wizardToolCatchphrase
            }
        case 'SET_WIZARD_ASSIST_FAME':
            return {
                ...state,
                wizardAssistFame: action.wizardAssistFame
            }
        case 'SET_WIZARD_ASSIST_FAME_HELPS':
            return {
                ...state,
                wizardAssistFameHelps: action.wizardAssistFameHelps
            }

        default: return state
    }
}

export { defaultCharState, charReducer }