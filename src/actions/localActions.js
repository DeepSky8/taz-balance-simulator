export const updateHostKey = (hostKey) => ({
    type: 'UPDATE_HOSTKEY',
    hostKey
})

export const updateCurrentCharacterID = (currentCharacterID) => ({
    type: 'UPDATE_CURRENT_CHARACTER_ID',
    currentCharacterID
})

export const updateCurrentChallenge = (currentChallenge) => ({
    type: 'UPDATE_CURRENT_CHALLENGE',
    currentChallenge
})

export const clearCurrentChallenge = () => ({
    type: 'CLEAR_CURRENT_CHALLENGE'
})