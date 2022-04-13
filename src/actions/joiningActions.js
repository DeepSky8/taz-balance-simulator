
export const toggleJoiningGame = () => ({
    type: 'TOGGLE_JOINING_GAME',
})

export const setGameID = (gameID) => ({
    type: 'SET_GAME_ID',
    gameID
})

export const setGameIDArray = (gameIDArray) => ({
    type: 'SET_GAME_ID_ARRAY',
    gameIDArray
})

export const setGameCodeError = () => ({
    type: 'SET_GAME_CODE_ERROR'
 })

 export const clearGameCodeError = () => ({
    type: 'CLEAR_GAME_CODE_ERROR'
 })