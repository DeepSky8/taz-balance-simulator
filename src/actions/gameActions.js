import { push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";

// Local Actions
export const updateGameStatic = (staticData) => ({
    type: 'UPDATE_GAME_STATIC',
    staticData
})

export const updateGameActive = (activeData) => ({
    type: 'UPDATE_GAME_ACTIVE',
    activeData
})

export const updateGameStateFull = (currentActiveGameFull) => ({
    type: 'UPDATE_GAME_STATE',
    currentActiveGameFull
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

export const updateProgress = (progress) => ({
    type: 'UPDATE_PROGRESS',
    progress
})

export const updateClassList = (classList) => ({
    type: 'UPDATE_CLASS_LIST',
    classList
})

export const clearClassList = () => ({
    type: 'CLEAR_CLASS_LIST'
})

export const updateReadyList = (readyList) => ({
    type: 'UPDATE_READY_LIST',
    readyList
})

export const clearReadyList = () => ({
    type: 'CLEAR_READY_LIST'
})

export const updateReadyStatus = (ready) => ({
    type: 'UPDATE_READY_STATUS',
    ready
})

export const setGameKey = (key) => ({
    type: 'SET_GAME_KEY',
    key
})

export const clearActivePlayer = () => ({
    type: 'CLEAR_ACTIVE_PLAYER'
})

export const updateGameStage = (gameStage) => ({
    type: 'UPDATE_GAME_STAGE',
    gameStage
})

export const updateTeamHealth = (teamHealth) => ({
    type: 'UPDATE_TEAM_HEALTH',
    teamHealth
})

export const updateBackstory = (backstory) => ({
    type: 'UPDATE_BACKSTORY',
    backstory
})

export const updateCurrentTurn = (currentTurn) => ({
    type: 'UPDATE_CURRENT_TURN',
    currentTurn
})

export const updateActionTokenList = (hasActionToken) => ({
    type: 'UPDATE_ACTION_TOKENS',
    hasActionToken
})

export const clearActionTokenList = () => ({
    type: 'CLEAR_ACTION_TOKENS'
})

export const updateActiveTokensList = (activeActionTokens) => ({
    type: 'UPDATE_ACTIVE_TOKENS',
    activeActionTokens
})

export const updateAssistTokensList = (activeAssistTokens) => ({
    type: 'UPDATE_ASSIST_TOKENS',
    activeAssistTokens
})

// Cloud Actions

export const startGetKey = (uid) => {
    return push(ref(db, 'savedGames/' + uid)).key;
}

export const startRemoveSavedGame = (uid, key) => {
    remove(ref(db, 'savedGames/' + uid + '/' + key))
        .catch((error) => {
            console.log('Did not remove Saved Game, error: ', error)
        })
}

export const startLoadSavedGame = (gameID, key, challengesObject) => {
    const updates = {}
    updates['gameSetup/' + gameID + '/static/key'] = key
    updates['gameSetup/' + gameID + '/static/codeVillain'] = challengesObject.codeVillain
    updates['gameSetup/' + gameID + '/static/codeRelic'] = challengesObject.codeRelic
    updates['gameSetup/' + gameID + '/static/codeLocation'] = challengesObject.codeLocation
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not start Load Game, error: ', error)
        })
}

export const startJoinActiveGame = (uid, gameID, currentCharacterID, classCode, charName) => {
    const updates = {}
    updates['gameSetup/' + gameID + '/playerList/' + uid + '/uid'] = uid
    updates['gameSetup/' + gameID + '/playerList/' + uid + '/currentCharacterID'] = currentCharacterID
    updates['gameSetup/' + gameID + '/playerList/' + uid + '/classCode'] = classCode
    updates['gameSetup/' + gameID + '/playerList/' + uid + '/charName'] = charName
    updates['gameSetup/' + gameID + '/classStorage/' + uid] = classCode
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not join active game, error: ', error)
        })
}

export const startReadyCheck = (uid, gameID) => {
    const updates = {}
    updates['gameSetup/' + gameID + '/readyCheck/' + uid] = uid
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not successfully Ready Check, error: ', error)
        })
}

export const startStopReadyCheck = (uid, gameID) => {
    const updates = {}
    updates['gameSetup/' + gameID + '/readyCheck/' + uid] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not successfully stop Ready Check, error: ', error)
        })
}

// Clears the activeGame with local userState gameID
// then sets the gameID under the user UID to null
export const startRemoveGameCode = (uid, gameID) => {
    const updates = {};
    updates['gameSetup/' + gameID] = null;
    updates['gameList/' + gameID] = null;
    updates['users/' + uid + '/gameID'] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when cleaning game array in cloud:', error)
        })
}

export const startSavedGame = (uid, gameID, key, playerList) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/playerList'] = playerList;
    updates['savedGames/' + uid + '/' + key + '/static/key'] = key;
    updates['savedGames/' + uid + '/' + key + '/static/host'] = uid;
    update(ref(db), updates)
        .then(() => {
            startRemoveGameCode(uid, gameID)
        })
        .catch((error) => {
            console.log('Error when starting game (saved):', error)
        })
}

export const startNewGame = (uid, gameID, playerList, challengesObject, teamHealth) => {
    const key = startGetKey(uid)
    const updates = {};
    updates['gameSetup/' + gameID + '/static/key'] = key;

    updates['savedGames/' + uid + '/' + key + '/static/key'] = key;
    updates['savedGames/' + uid + '/' + key + '/static/host'] = uid;
    updates['savedGames/' + uid + '/' + key + '/static/codeVillain'] = challengesObject.codeVillain;
    updates['savedGames/' + uid + '/' + key + '/static/codeRelic'] = challengesObject.codeRelic;
    updates['savedGames/' + uid + '/' + key + '/static/codeLocation'] = challengesObject.codeLocation;

    updates['savedGames/' + uid + '/' + key + '/active/teamHealth'] = teamHealth;
    updates['savedGames/' + uid + '/' + key + '/active/gameStage'] = 'INTRO';
    updates['savedGames/' + uid + '/' + key + '/active/ready'] = false;
    updates['savedGames/' + uid + '/' + key + '/active/progressVillain'] = 0
    updates['savedGames/' + uid + '/' + key + '/active/progressRelic'] = 0
    updates['savedGames/' + uid + '/' + key + '/active/progressLocation'] = 0

    updates['savedGames/' + uid + '/' + key + '/playerList'] = playerList;

    update(ref(db), updates)
        // .then(() => {
        //     startRemoveGameCode(uid, gameID)
        // })
        .catch((error) => {
            console.log('Error when starting game (new):', error)
        })
}

export const startMarkTurnComplete = (uid, key, readyList) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/readyList'] = { ...readyList };
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when marking turn complete:', error)
        })
}

export const startNewRound = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/readyList'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when starting new round:', error)
        })
}


export const startSetReadyTrue = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/active/ready'] = true;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error setting Ready to true:', error)
        })
}

export const startSetReadyFalse = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/active/ready'] = false;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error setting Ready to false:', error)
        })
}

export const startUpdateGameStage = (uid, key, gameStage) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/active/gameStage'] = gameStage;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error updating game stages:', error)
        })
}

export const startUpdateBriefingStage = (uid, key, briefingStage) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/backstory/briefingStage'] = briefingStage;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error updating briefing stage:', error)
        })
}

export const startUpdatePrompt = (uid, key, deck, number, updateText) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/backstory/${deck}${number}`] = updateText;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating ${deck}${number} text:`, error)
        })
}

export const startUpdateTurnStage = (uid, key, turnStage) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/currentTurn/turnStage`] = turnStage;
    updates['savedGames/' + uid + '/' + key + `/activeActionTokens`] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating turnStage:`, error)
        })
}

export const startSetActivePlayer = (uid, key, activeUID, activeCharID) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/active/activeUID`] = activeUID;
    updates['savedGames/' + uid + '/' + key + `/active/activeCharID`] = activeCharID;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating turnStage:`, error)
        })
}

// Action Tokens
export const startSpendActionToken = (uid, key, updatedHasActionToken, activeActionTokens) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/hasActionToken`] = updatedHasActionToken;
    updates['savedGames/' + uid + '/' + key + `/activeActionTokens`] = activeActionTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating hasActionToken:`, error)
        })
}

export const startSpendAssistToken = (uid, key, activeAssistTokens) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/activeAssistTokens`] = activeAssistTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating hasAssistToken:`, error)
        })
}

export const startUNspendActionToken = (uid, key, updatedHasActionToken, updatedActiveActionTokens) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/hasActionToken`] = updatedHasActionToken;
    updates['savedGames/' + uid + '/' + key + `/activeActionTokens`] = updatedActiveActionTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error unspending action token:`, error)
        })
}

export const startUNspendAssistToken = (uid, key, updatedActiveAssistTokens) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/activeAssistTokens`] = updatedActiveAssistTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error unspending assist token:`, error)
        })
}

export const startUpdateAssistTokens = (uid, key, updatedActiveAssistTokens) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + `/activeAssistTokens`] = updatedActiveAssistTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating assist token array:`, error)
        })
}

export const startRESETActionTokens = (uid, key, playerList) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/hasActionToken'] = playerList;
    updates['savedGames/' + uid + '/' + key + '/activeActionTokens'] = null;
    updates['savedGames/' + uid + '/' + key + '/activeAssistTokens'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting action tokens available:', error)
        })
}

export const startCLEARActionTokens = (uid, key) => {
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/activeActionTokens'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when clearing active Action Token array:', error)
        })
}
// Action Tokens

// Challenge Actions
export const startSetVillainDeck = (uid, key, villainDeck) => { 
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/villainDeck'] = villainDeck;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting Villain deck:', error)
        })
}

export const startSetRelicDeck = (uid, key, relicDeck) => { 
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/relicDeck'] = relicDeck;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting Relic deck:', error)
        })
}

export const startSetLocationDeck = (uid, key, locationDeck) => { 
    const updates = {};
    updates['savedGames/' + uid + '/' + key + '/locationDeck'] = locationDeck;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting Location deck:', error)
        })
}

// Challenge Actions