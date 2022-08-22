export const updateHostKey = (hostKey) => ({
    type: 'UPDATE_HOSTKEY',
    hostKey
})

export const updateCurrentCharacterID = (currentCharacterID) => ({
    type: 'UPDATE_CURRENT_CHARACTER_ID',
    currentCharacterID
})

export const updateLocalCharacter = (localCharacter) => ({
    type: 'UPDATE_LOCAL_CHARACTER',
    localCharacter
})

export const updateActiveCharacter = (activeCharacter) => ({
    type: 'UPDATE_ACTIVE_CHARACTER',
    activeCharacter
})

export const clearActiveCharacter = () => ({ 
    type: 'CLEAR_ACTIVE_CHARACTER'
})

export const updateCurrentChallenge = (currentChallenge) => ({
    type: 'UPDATE_CURRENT_CHALLENGE',
    currentChallenge
})

export const clearCurrentChallenge = () => ({
    type: 'CLEAR_CURRENT_CHALLENGE'
})