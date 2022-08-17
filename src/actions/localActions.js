export const updateCurrentGameID = (hostKey) => ({
    type: 'UPDATE_GAME_ID',
    hostKey
})

export const updateCurrentCharacterID = (currentCharacterID) => ({
    type: 'UPDATE_CURRENT_CHARACTER_ID',
    currentCharacterID
})

export const updateUncompletedVillain = (uncompletedVillain) => ({
    type: 'UPDATE_UNCOMPLETED_VILLAIN',
    uncompletedVillain
})

export const updateCompletedVillain = (completedVillain) => ({
    type: 'UPDATE_COMPLETED_VILLAIN',
    completedVillain
})

export const updateUncompletedRelic = (uncompletedRelic) => ({
    type: 'UPDATE_UNCOMPLETED_RELIC',
    uncompletedRelic
})

export const updateCompletedRelic = (completedRelic) => ({
    type: 'UPDATE_COMPLETED_RELIC',
    completedRelic
})

export const updateUncompletedLocation = (uncompletedLocation) => ({
    type: 'UPDATE_UNCOMPLETED_LOCATION',
    uncompletedLocation
})

export const updateCompletedLocation = (completedLocation) => ({
    type: 'UPDATE_COMPLETED_LOCATION',
    completedLocation
})