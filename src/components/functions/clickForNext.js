import { updateLoot } from "../../actions/cardActions";
import { startAddStoryBonus, startCompleteChallenge, startMarkTurnComplete, startSaveDiceRoll, startToggleRollAnimation, startUNspendActionToken, startUpdateAssistBonusOne, startUpdateAssistBonusTwo, startUpdateAssistTokens, startUpdateLootPoints, startUpdateTeamHealth, startUpdateTurnStage } from "../../actions/cloudActions"
import { auth } from "../../firebase/firebase";
import tokenStages from "../elements/ActiveGame/turnStep/turnStepArrays/tokenStages";
import { stats, tokenClassesActionOne, tokenClassesActionTwo, tokenClassesReclaim } from "../elements/CharacterSheet/classes/charInfo";
import diceRoll from "./diceRoll";
import incrementTurn from "./incrementTurn";

const clickForNext = ({ cloudState, localState }) => {

    const reloadPage = () => {
        window.location.reload()
    }

    const addStoryStrength = (storyBonus) => {
        startAddStoryBonus(localState.hostKey, parseInt(storyBonus))
    }

    const addAssistBonus = (assistingCharacter, stage) => {
        const assistBonus = stats[assistingCharacter.classCode][stage]
        if (cloudState.strength.assistOne > 0) {
            startUpdateAssistBonusTwo(localState.hostKey, assistBonus)
        } else {
            startUpdateAssistBonusOne(localState.hostKey, assistBonus)
        }


    }

    const updateLoot = () => {
        const currentLoot = localState.activeCharacter.lootPoints
        const newLoot = localState.currentChallenge.loot
        const updatedLoot = currentLoot + newLoot
        startUpdateLootPoints(
            cloudState.active.activeUID,
            cloudState.active.activeCharID,
            updatedLoot
        )
    }

    const removeFirstActiveAssistToken = () => {
        const removeAssist = cloudState.activeAssistTokens.splice(0, 1)
        const updatedAssistArray = cloudState.activeAssistTokens.filter(
            ({ currentCharacterID }) => {
                return currentCharacterID !== removeAssist.currentCharacterID
            })


        startUpdateAssistTokens(localState.hostKey, updatedAssistArray)
    }

    const rollDice = (rollLocation) => {
        const newRoll = diceRoll()

        setTimeout(() => { startToggleRollAnimation(localState.hostKey, true) }, 0)
        setTimeout(() => {
            startToggleRollAnimation(localState.hostKey, false);
            startSaveDiceRoll(localState.hostKey, rollLocation, newRoll);
        }, 4000)
    }

    const completeChallenge = () => {
        const codeChallenge = () => {
            switch (cloudState.currentTurn.selectedChallenge) {
                case 'villain':
                    return 'codeVillain'
                case 'relic':
                    return 'codeRelic'
                case 'location':
                    return 'codeLocation'
                default:
                    console.log('selectedChallenge fell through', cloudState.currentTurn.selectedChallenge)
            }
        }

        const code = cloudState.static[codeChallenge()]

        startCompleteChallenge(
            localState.hostKey,
            code,
            localState.currentChallengeKey,
            cloudState.currentTurn.visible
        )
    }

    const failChallenge = () => {
        const currentHealth = cloudState.active.teamHealth
        const loseHealth = localState.currentChallenge.health
        const updatedHealth = currentHealth - loseHealth
        startUpdateTeamHealth(localState.hostKey, updatedHealth)
    }

    const turnIncrement = (stage = incrementTurn(cloudState.currentTurn.turnStage)) => {
        startUpdateTurnStage(localState.hostKey, stage)
    }

    const passTheTurn = () => {

        const bardIndex = cloudState.playerList.indexOf(player => (tokenClassesReclaim.includes(player.classCode)))

        if (bardIndex >= 0) {

            startUNspendActionToken(
                localState.hostKey,
                cloudState.hasActionToken.concat(cloudState.playerList[bardIndex]),
                []
            )
            console.log('refreshed token list', cloudState.hasActionToken.concat(cloudState.playerList[bardIndex]))
        }
        startMarkTurnComplete(
            localState.hostKey,
            [cloudState.active.activeUID].concat(
                cloudState.readyList
            ))
        turnIncrement()
    }


    if (auth.currentUser.uid === cloudState.active.activeUID) {
        switch (cloudState.active.gameStage) {
            case 'INTRO':
                passTheTurn()
                break;
            case 'BRIEF':
                break;
            case 'TRANSPORT':
                break;
            case 'CHALLENGES':
                switch (cloudState.currentTurn.turnStage) {
                    case 'DESCRIBEONE':
                        turnIncrement()
                        break;
                    case 'CHALLENGE':
                        if (cloudState.currentTurn.selectedChallenge !== '') {

                            if (
                                // If the currently selected challenge requires 
                                // that an action token be spent to engage it
                                // the rest of the logic will not fire
                                // until an active token for the active player is in the list
                                (localState.currentChallenge.requiresToken)
                                &&
                                (cloudState.activeActionTokens.filter(token => token.uid === cloudState.active.activeUID).length > 0)
                            ) {

                                if (localState.activeCharacter.charKostco &&
                                    localState.activeCharacter.charKostco.length > 0)
                                    // If the active character has KostCo card(s), 
                                    // the 'ITEMS' stage will allow them to potentially use activated elementsF
                                    turnIncrement()
                            } else if (localState.currentChallenge.storyBonus > 0) {
                                // If there are no items to use, 
                                // AND if there is a story bonus
                                // move to the Story stage
                                turnIncrement('STORY')
                            } else if (localState.currentChallenge.noAssist) {
                                // If there is no story bonus
                                // and if the challenge does not allow assistance
                                // move to the Scene stage
                                turnIncrement('SCENE')
                            } else {
                                // If all else fails, this challenge is eligible for assistance
                                // Move to the Preassist stage
                                turnIncrement('PREASSIST')
                            }
                        }

                        break;
                    case 'ITEMS':
                        console.log('did things with items')
                        if (localState.currentChallenge.storyBonus > 0) {
                            turnIncrement()
                        } else {
                            turnIncrement('PREASSIST')
                        }
                        break;
                    case 'STORY':
                        addStoryStrength(localState.currentChallenge.storyBonus)
                        if (localState.currentChallenge.noAssist) {
                            turnIncrement('SCENE')
                        } else {
                            turnIncrement()
                        }
                        break;
                    case 'PREASSIST':
                        turnIncrement()
                        break;
                    case 'SCENE':
                        if (cloudState.activeAssistTokens.length > 0) {
                            turnIncrement()
                        } else {
                            turnIncrement('ROLLONE')
                        }
                        break;
                    case 'PRE_ASSIST_SCENE':
                        if (cloudState.activeAssistTokens.length > 0) {
                            // If assist tokens have been spent
                            // clicking will add the first bonus to the current strength
                            // and remove the first token from the list of assist tokens
                            addAssistBonus(cloudState.activeAssistTokens[0], 'preAssist')
                            removeFirstActiveAssistToken()
                        }
                        if (
                            // If all of the assist tokens have been processed
                            // AND if the character class has a special Action Token ability 
                            // that could be used before
                            (cloudState.activeAssistTokens.length === 0)
                            &&
                            (tokenClassesActionOne.includes(localState.activeCharacter.classCode))
                        ) {
                            turnIncrement()
                        } else {
                            turnIncrement('ROLLONE')
                        }

                        break;
                    case 'ACTIONONE':
                        console.log('tokenStages array', tokenStages)
                        turnIncrement()
                        break;
                    case 'ROLLONE':
                        rollDice('rollOne')
                        if (localState.currentChallenge.advantage ||
                            localState.currentChallenge.disadvantage
                        ) {
                            turnIncrement()
                        } else {
                            turnIncrement('EVALUATEONE')
                        }
                        break;
                    case 'ROLLTWO':
                        rollDice('rollTwo')
                        turnIncrement()
                        break;
                    case 'EVALUATEONE':
                        if (cloudState.strength.total < 0) {
                            turnIncrement('DESCRIBETWO')
                        } else if (
                            // If total strength is greater than or equal to the difficulty of the challenge
                            cloudState.strength.total >=
                            cloudState.currentTurn.difficulty) {
                            completeChallenge()
                            turnIncrement('DESCRIBETWO')
                        } else if (
                            // Do action tokens for non active players still exist?
                            (cloudState.hasActionToken.filter(tokens => tokens.uid !== cloudState.active.activeUID).length > 0)
                            &&
                            (
                                (   // Can this challenge receive assistance, 
                                    // but has not yet had assistance applied
                                    (!localState.currentChallenge.noAssist)
                                    &&
                                    (cloudState.strength.assistOne === 0)
                                )
                                || // OR
                                (
                                    // Is this a doubleAssist challenge, 
                                    // and has not yet had a second assist applied
                                    (localState.currentChallenge.doubleAssist)
                                    &&
                                    (cloudState.strength.assistTwo === 0)
                                )

                            )
                        ) {
                            turnIncrement()
                        } else if (
                            // If the total strength does not suffice
                            // and the challenge is not eligible for assistance
                            // or no further non active player action tokens exist
                            (localState.currentChallenge.noAssist)
                            ||
                            (cloudState.hasActionToken.filter(
                                tokens => tokens.uid !== cloudState.active.activeUID
                            ).length === 0
                            )
                        ) {
                            failChallenge()
                            turnIncrement('DESCRIBETWO')
                        }
                        break;
                    case 'POSTASSIST':
                        turnIncrement()
                        break;
                    case 'POST_ASSIST_SCENE':
                        if (cloudState.activeAssistTokens.length === 0) {
                            turnIncrement()
                        } else {
                            addAssistBonus(cloudState.activeAssistTokens[0], 'postAssist')
                            removeFirstActiveAssistToken()
                            if (cloudState.activeAssistTokens.length === 0) {
                                turnIncrement()
                            }
                        }

                        break;
                    case 'EVALUATETWO':
                        if (cloudState.strength.total >= cloudState.currentTurn.difficulty) {
                            completeChallenge()
                            updateLoot()
                        } else {
                            failChallenge()
                        }
                        turnIncrement()
                        break;
                    case 'DESCRIBETWO':
                        if (localState.activeCharacter.lootPoints >= 3) {
                            turnIncrement()
                        } else if (
                            // If the character is in the list of characters with an ActionTwo token ability
                            (tokenClassesActionTwo.includes(localState.activeCharacter.classCode))
                            &&
                            // And if the character action token is available
                            (cloudState.activeActionTokens.filter(token => token.uid === cloudState.active.activeUID).length > 0)
                        ) {
                            turnIncrement('ACTIONTWO')
                        } else {
                            turnIncrement('PASS')
                        }
                        break;
                    case 'KOSTCO':
                        console.log('received KOSTCO card (two cards if Rogue)')
                        console.log('discarded one if Rogue, then decided whether to hold it or give it')
                        console.log('if this results in more than two items, decide which one to discard')
                        turnIncrement()
                        break;
                    case 'ACTIONTWO':
                        turnIncrement()
                        break;
                    case 'PASS':
                        passTheTurn()
                        break;
                    default:
                        break;
                }
                break;
            case 'END':
                break;
            default:
                console.log('hit default on clickForNext, pls fix');
                reloadPage()
        }
    }

}

export default clickForNext