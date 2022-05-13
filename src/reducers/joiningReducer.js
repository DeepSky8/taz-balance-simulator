
export const defaultJoiningReducer = {
    joinHostText: 'Joining game (enter game code from host)',
    gameID: '',
    gameCodeError: '',
}

const joinOnly = 'Joining game (enter game code from host)'
const joinText = 'Joining game (click to host instead)';
const hostText = 'Hosting game (click to join instead)';
const errorText = 'Game code not found'


export const joiningReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_JOINING_GAME':
            return {
                ...state,
                gameID: (action.joiningGame ? '' : state.gameID),
                joinHostText:
                    (action.isAnonymous ?
                        joinOnly
                        :
                        action.joiningGame ?
                            joinText
                            :
                            hostText
                    )
            }
        case 'JOINING_ONLY':
            return { ...state, joinHostText: joinOnly }
        case 'JOINING_OR_HOSTING':
            return {
                ...state,
                joinHostText:
                    state.joiningGame ?
                        joinText
                        :
                        hostText
            }
        case 'SET_GAME_ID':
            return { ...state, gameID: action.gameID }
        case 'SET_JOINING_STATE':
            return {
                gameID: action.gameID,
                gameCodeError: '',
                joinHostText: joinText
            }
        case 'CLEAR_GAME_ID':
            return { ...state, gameID: '' }
        case 'SET_GAME_CODE_ERROR':
            return { ...state, gameCodeError: errorText }
        case 'CLEAR_GAME_CODE_ERROR':
            return { ...state, gameCodeError: '' }

        default: return state
    }
}