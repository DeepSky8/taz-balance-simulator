// Local Actions
export const updateGameState = (currentActiveGame) => ({
    type: 'UPDATE_GAME_STATE',
    currentActiveGame
})

export const updateChallengesObject = (challengesObject) => ({
    type: 'UPDATE_CHALLENGES_OBJECT',
    challengesObject
})

export const clearGameState = () => ({
    type: 'CLEAR_GAME_STATE'
})

export const clearChallengesObject = () => ({
    type: 'CLEAR_CHALLENGES_OBJECT'
})

export const updateGameHost = (host) => ({
    type: 'UPDATE_GAME_HOST',
    host
})

export const updatePlayerList = (playerList) => ({
    type: 'UPDATE_PLAYER_LIST',
    playerList
})

export const clearPlayerList = () => ({
    type: 'CLEAR_PLAYER_LIST'
})