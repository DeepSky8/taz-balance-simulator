

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UID':
            return state = { uid: action.uid }
        // case 'LOGOUT':
        //     return state = {};
        default: return state
    }
}

export { authReducer as default }