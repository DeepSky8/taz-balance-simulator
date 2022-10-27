export const updateHostKey = (hostKey) => ({
    type: 'UPDATE_HOSTKEY',
    hostKey
})

export const updateLocalCharacterID = (localCharacterID) => ({
    type: 'UPDATE_LOCAL_CHARACTER_ID',
    localCharacterID
})

export const updateActiveCharacterID = (activeCharacterID) => ({
    type: 'UPDATE_ACTIVE_CHARACTER_ID',
    activeCharacterID
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

export const updateCurrentChallengeKey = (currentChallengeKey) => ({
    type: 'UPDATE_CURRENT_CHALLENGE_KEY',
    currentChallengeKey
})

export const clearCurrentChallengeKey = () => ({
    type: 'CLEAR_CURRENT_CHALLENGE_KEY'
})
// export const resetLocalReducer = () => ({ 
//     type: 'RESET_REDUCER'
// })

export const updateCompletedChallengesVillain = (completedChallengeArrayVillain) => ({
    type: 'UPDATE_COMPLETED_CHALLENGES_VILLAIN',
    completedChallengeArrayVillain
})

export const updateUncompletedChallengesVillain = (uncompletedChallengeArrayVillain) => ({
    type: 'UPDATE_UNCOMPLETED_CHALLENGES_VILLAIN',
    uncompletedChallengeArrayVillain
})

export const updateCompletedChallengesRelic = (completedChallengeArrayRelic) => ({
    type: 'UPDATE_COMPLETED_CHALLENGES_RELIC',
    completedChallengeArrayRelic
})

export const updateUncompletedChallengesRelic = (uncompletedChallengeArrayRelic) => ({
    type: 'UPDATE_UNCOMPLETED_CHALLENGES_RELIC',
    uncompletedChallengeArrayRelic
})

export const updateCompletedChallengesLocation = (completedChallengeArrayLocation) => ({
    type: 'UPDATE_COMPLETED_CHALLENGES_LOCATION',
    completedChallengeArrayLocation
})

export const updateUncompletedChallengesLocation = (uncompletedChallengeArrayLocation) => ({
    type: 'UPDATE_UNCOMPLETED_CHALLENGES_LOCATION',
    uncompletedChallengeArrayLocation
})

export const updateTeamArrayCharObject = (charObject) => ({
    type: 'UPDATE_TEAM_CHAR',
    charObject
})

export const removeTeamArrayCharObject = (charID) => ({
    type: 'REMOVE_TEAM_CHAR',
    charID
})