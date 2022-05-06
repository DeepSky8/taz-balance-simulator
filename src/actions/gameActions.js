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