import { defaultNewCharState } from "./newCharReducer"


const defaultCharState = {
    displayChars: false,
    ...defaultNewCharState
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
        case 'RESET_STATE':
            return { ...defaultCharState }
        default: return state
    }
}

export { defaultCharState, charReducer }