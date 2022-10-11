import { child, push, ref, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";
import { defaultCloudState } from "../reducers/cloudReducer";

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

export const updateStrength = (strength) => ({
    type: 'UPDATE_STRENGTH',
    strength
})

export const clearStrength = () => ({
    type: 'CLEAR_STRENGTH'
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

const startUpdatePlayerList = (uid, gameID, updatedPlayerList) => {
    const updates = {}
    updates['savedGames/' + uid + '/' + gameID + '/playerList'] = updatedPlayerList
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update player list, error: ', error)
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

export const startMarkTurnComplete = (hostKey, readyList) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/readyList'] = { ...readyList };
    updates['savedGames/' + hostKey + '/currentTurn/selectedChallenge'] = '';
    updates['savedGames/' + hostKey + `/currentTurn/difficulty`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/rollOne`] = null;
    updates['savedGames/' + hostKey + `/currentTurn/rollTwo`] = null;
    updates['savedGames/' + hostKey + `/currentTurn/chanceVillain`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/chanceRelic`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/chanceLocation`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/turnStage`] = 'DESCRIBEONE';
    updates['savedGames/' + hostKey + `/strength`] = {
        ...defaultCloudState.strength
    };

    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when marking turn complete:', error)
        })
}

export const startNullReadyList = (hostKey) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/readyList'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when starting new round:', error)
        })
}


export const startSetReadyTrue = (hostKey) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/active/ready'] = true;
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

export const startUpdateGameStage = (hostKey, gameStage) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/active/gameStage'] = gameStage;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error updating game stages:', error)
        })
}

export const startUpdateBriefingStage = (hostKey, briefingStage) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/backstory/briefingStage'] = briefingStage;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error updating briefing stage:', error)
        })
}

export const startUpdatePrompt = (hostKey, deck, number, updateText) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/backstory/${deck}${number}`] = updateText;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating ${deck}${number} text:`, error)
        })
}

export const startUpdateTurnStage = (hostKey, turnStage) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/currentTurn/turnStage`] = turnStage;
    updates['savedGames/' + hostKey + `/activeActionTokens`] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating turnStage:`, error)
        })
}

export const startResetTurnElements = (hostKey) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/currentTurn/selectedChallenge`] = '';
    updates['savedGames/' + hostKey + `/currentTurn/difficulty`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/rollOne`] = null;
    updates['savedGames/' + hostKey + `/currentTurn/rollTwo`] = null;
    updates['savedGames/' + hostKey + `/currentTurn/chanceVillain`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/chanceRelic`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/chanceLocation`] = 0;
    updates['savedGames/' + hostKey + `/currentTurn/turnStage`] = 'DESCRIBEONE';
    updates['savedGames/' + hostKey + `/strength`] = {
        ...defaultCloudState.strength
    };
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error resetting turn elements:`, error)
        })
}

export const startUnpickTokenChallenge = (hostKey) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/currentTurn/selectedChallenge`] = '';
    updates['savedGames/' + hostKey + `/currentTurn/difficulty`] = 0;
    // updates['savedGames/' + hostKey + `/strength`] = {
    //     assistOne: 0,
    //     assistTwo: 0,
    //     character: 0,
    //     ongoingItem: 0,
    //     rollResult: 0,
    //     singleUseItem: 0,
    //     story: 0,
    //     total: 0
    // };
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error unpicking challenge requiring token:`, error)
        })
}

export const startSetActivePlayer = (hostKey, activeUID, activeCharID) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/active/activeUID`] = activeUID;
    updates['savedGames/' + hostKey + `/active/activeCharID`] = activeCharID;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating turnStage:`, error)
        })
}

// Action Tokens
export const startSpendActionToken = (hostKey, updatedHasActionToken, activeActionTokens) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/hasActionToken`] = updatedHasActionToken;
    updates['savedGames/' + hostKey + `/activeActionTokens`] = activeActionTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating hasActionToken:`, error)
        })
}

export const startSpendAssistToken = (hostKey, activeAssistTokens) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/activeAssistTokens`] = activeAssistTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating hasAssistToken:`, error)
        })
}

export const startUNspendActionToken = (hostKey, updatedHasActionToken, updatedActiveActionTokens) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/hasActionToken`] = updatedHasActionToken;
    updates['savedGames/' + hostKey + `/activeActionTokens`] = updatedActiveActionTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error unspending action token:`, error)
        })
}

export const startUNspendAssistToken = (hostKey, updatedActiveAssistTokens) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/activeAssistTokens`] = updatedActiveAssistTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error unspending assist token:`, error)
        })
}

export const startUpdateAssistTokens = (hostKey, updatedActiveAssistTokens) => {
    const updates = {};
    updates['savedGames/' + hostKey + `/activeAssistTokens`] = updatedActiveAssistTokens;
    update(ref(db), updates)
        .catch((error) => {
            console.log(`Error updating assist token array:`, error)
        })
}

export const startRESETActionTokens = (hostKey, playerList) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/hasActionToken'] = playerList;
    updates['savedGames/' + hostKey + '/activeActionTokens'] = null;
    updates['savedGames/' + hostKey + '/activeAssistTokens'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting action tokens available:', error)
        })
}

const startCLEARActionTokens = (hostKey) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/activeActionTokens'] = null;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when clearing active Action Token array:', error)
        })
}
// Action Tokens

// Challenge Actions
const startSetVillainDeck = (hostKey, villainDeck) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/villainDeck'] = villainDeck;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting Villain deck:', error)
        })
}

const startSetRelicDeck = (hostKey, relicDeck) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/relicDeck'] = relicDeck;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting Relic deck:', error)
        })
}

const startSetLocationDeck = (hostKey, locationDeck) => {
    const updates = {};
    updates['savedGames/' + hostKey + '/locationDeck'] = locationDeck;
    update(ref(db), updates)
        .catch((error) => {
            console.log('Error when setting Location deck:', error)
        })
}

// Challenge Actions

export const startUploadDeckCard = (hostKey, deckCode, card) => {
    const newKey = push(child(ref(db), 'savedGames/' + hostKey + '/challenges/' + deckCode)).key
    const updates = {}
    updates['savedGames/' + hostKey + '/challenges/' + deckCode + '/' + newKey] = { ...card, challengeKey: newKey }
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not upload card to cloud: ', error)
        })
}

export const startPickActiveChallenge = (hostKey, text) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/selectedChallenge'] = text
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set active Challenge in cloud: ', error)
        })
}

export const startSetCurrentDifficulty = (hostKey, difficulty) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/difficulty'] = difficulty
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set current difficulty in cloud: ', error)
        })
}

export const startUpdateActiveVillain = (hostKey, villain, completeLength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/villain'] = villain
    updates['savedGames/' + hostKey + '/active/progressVillain'] = completeLength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set active Villain in cloud: ', error)
        })
}

export const startUpdateActiveRelic = (hostKey, relic, completeLength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/relic'] = relic
    updates['savedGames/' + hostKey + '/active/progressRelic'] = completeLength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set active Relic in cloud: ', error)
        })
}

export const startUpdateActiveLocation = (hostKey, location, completeLength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/location'] = location
    updates['savedGames/' + hostKey + '/active/progressLocation'] = completeLength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set active location in cloud: ', error)
        })
}


// Strength
export const startSetCharacterStrength = (hostKey, strength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/character'] = strength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not set character Strength: ', error)
        })
}

export const startAddStoryBonus = (hostKey, storyBonus) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/story'] = storyBonus
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not add story bonus Strength: ', error)
        })
}

export const startUpdateAssistBonusOne = (hostKey, assist) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/assistOne'] = assist
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update assistOne with bonus Strength: ', error)
        })
}

export const startUpdateAssistBonusTwo = (hostKey, assist) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/assistTwo'] = assist
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update assistTwo with bonus Strength: ', error)
        })
}

export const startUpdateSingleUseItemBonus = (hostKey, itemStrength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/singleUseItem'] = itemStrength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update single use item Strength: ', error)
        })
}

export const startUpdateOngoingItemBonus = (hostKey, itemStrength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/ongoingItem'] = itemStrength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update ongoing item Strength: ', error)
        })
}


export const startUpdateTotalStrength = (hostKey, strength) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/total'] = strength
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update total Strength: ', error)
        })
}

export const startAddWarriorActionBonus = (hostKey, updatedTeamHealth) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/active/teamHealth'] = updatedTeamHealth
    updates['savedGames/' + hostKey + '/strength/actionWarrior'] = 2
    updates['savedGames/' + hostKey + '/activeActionTokens/'] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not add Warrior Action Bonus: ', error)
        })
}

export const startAddWizardActionBonus = (hostKey) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/strength/actionWizard'] = 3
    updates['savedGames/' + hostKey + '/activeActionTokens/'] = null
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not add Wizard Action Bonus: ', error)
        })
}

// Strength

export const startSaveDiceRoll = (hostKey, rollLocation, newRoll) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/' + rollLocation] = newRoll
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not save Roll: ', error)
        })
}

export const startToggleRollAnimation = (hostKey, toggle) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/showRoll'] = toggle
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not toggle Roll animation: ', error)
        })
}

export const startUpdateLootPoints = (activePlayer, activeCharacter, newLootTotal) => {
    const updates = {}
    updates['characters/' + activePlayer + '/' + activeCharacter + '/lootPoints'] = newLootTotal
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update Loot Points: ', error)
        })
}

export const startUpdateTeamHealth = (hostKey, newHealthTotal) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/active/teamHealth'] = newHealthTotal
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update health total: ', error)
        })
}

export const startCompleteChallenge = (hostKey, code, challengeKey, visible) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/challenges/' + code + '/' + challengeKey + '/completed'] = true
    updates['savedGames/' + hostKey + '/challenges/' + code + '/' + challengeKey + '/' + visible + '/completed'] = true
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not mark challenge as completed: ', error)
        })
}

export const startCompleteBoss = (hostKey, code, challengeKey) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/challenges/' + code + '/' + challengeKey + '/visible'] = 'back'
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not mark challenge as completed: ', error)
        })
}

// export const startFailChallenge = (hostKey, updatedHealth) => {
//     const updates = {}
//     updates['savedGames/' + hostKey + '/active/teamHealth'] = updatedHealth
//     update(ref(db), updates)
//         .catch((error) => {
//             console.log('Did not mark challenge as completed: ', error)
//         })
// }

export const startUpdateChanceRoll = (hostKey, type, chanceRoll) => {
    const updates = {}
    updates['savedGames/' + hostKey + '/currentTurn/' + type] = chanceRoll
    update(ref(db), updates)
        .catch((error) => {
            console.log('Did not update Chance Roll: ', error)
        })
}

