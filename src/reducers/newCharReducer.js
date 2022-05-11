
const defaultNewCharState = {
    charID: '',
    charName: '',
    charClassCode: '',
    charRaceCode: '',
    charToolCode: '',
    charAttributeCode: '',
    charSpecialCode: '',
    charNotes: '',
    charKostco: [{}],
    humanBardBand: '',
    robotBardCreator: '',
    robotBardVisual: '',
    bardSuperGoal: ''
}

const newCharReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHAR_CLASS_CODE':
            return {
                ...state,
                charClassCode: action.charClassCode
            }
        case 'SET_CHAR_RACE_CODE':
            return {
                ...state,
                charRaceCode: action.charRaceCode
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
        case 'RESET_DEFAULTS':
            return {
                ...defaultNewCharState
            }
        default: return state
    }
}

export { defaultNewCharState, newCharReducer }