
export const toggleJoiningGame = () => ({
    type: 'TOGGLE_JOINING_GAME',
})

export const setGameID = (gameID) => ({
    type: 'SET_GAME_ID',
    gameID
})

export const setGameCodeError = () => ({
    type: 'SET_GAME_CODE_ERROR'
})

export const clearGameCodeError = () => ({
    type: 'CLEAR_GAME_CODE_ERROR'
})

export const joiningOnly = () => ({
    type: 'JOINING_ONLY'
})

export const joiningOrHosting = () => ({
    type: 'JOINING_OR_HOSTING'
})