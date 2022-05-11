

const defaultCharState = {
    displayChars: false,
    charName: null,
    charClass: null
}


const charReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_CHAR_DISPLAY':
            const toggledCharDisplay = !state.displayChars
            return {
                ...state,
                displayChars: toggledCharDisplay
            }
        default: return state
    }
}

export { defaultCharState, charReducer }