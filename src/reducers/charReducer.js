import { Action } from "history"

const defaultCharState = {
    displayChars: false,
    charName: null,
    charClass: null
}


const charReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_CHAR_DISPLAY':
            return {
                ...state,

            }
        default: return state
    }
}

export { defaultCharState, charReducer }