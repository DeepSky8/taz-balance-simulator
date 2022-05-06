
export const defaultJoiningReducer = {
    joiningGame: true,
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
            const toggledJoiningGame = !state.joiningGame
            return {
                ...state,
                joiningGame: toggledJoiningGame,
                gameID: (toggledJoiningGame ? '' : state.gameID),
                joinHostText:
                    (toggledJoiningGame ?
                        joinText
                        :
                        hostText
                    )
            }
        case 'JOINING_ONLY':
            return { ...state, joinHostText: joinOnly, joiningGame: true }
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
        case 'CLEAR_GAME_ID':
            return { ...state, gameID: '' }
        case 'SET_GAME_CODE_ERROR':
            return { ...state, gameCodeError: errorText }
        case 'CLEAR_GAME_CODE_ERROR':
            return { ...state, gameCodeError: '' }

        default: return state
    }
}