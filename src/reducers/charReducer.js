const defaultCharState = {
    showAlerts: false,
    changeClass: true,
    charID: undefined,
    charName: '',
    classCode: 5,
    raceCode: 14,
    toolCode: undefined,
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
    bardMusicSkill: ''
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
        case 'SET_CHAR_TOOL_CODE':
            return {
                ...state,
                charToolCode: action.charToolCode
            }
        case 'SET_BARD_SUPER_GOAL':
            return {
                ...state,
                bardSuperGoal: action.bardSuperGoal
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
        case 'SET_CHAR_NAME':
            return {
                ...state,
                charName: action.charName
            }
        // case 'RESET_DEFAULTS':
        //     return {
        //         ...defaultCharState
        //     }
        default: return state
    }
}

export { defaultCharState, charReducer }