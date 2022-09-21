import { updateLoot } from "../../actions/cardActions";
import { startAddStoryBonus, startCompleteChallenge, startMarkTurnComplete, startSaveDiceRoll, startToggleRollAnimation, startUpdateAssistBonusOne, startUpdateAssistBonusTwo, startUpdateAssistTokens, startUpdateLootPoints, startUpdateTeamHealth, startUpdateTurnStage } from "../../actions/cloudActions"
import { auth } from "../../firebase/firebase";
import { stats } from "../elements/CharacterSheet/classes/charInfo";
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




                            if (localState.activeCharacter.charKostco &&
                                localState.activeCharacter.charKostco.length > 0) {
                                turnIncrement()
                            } else if (localState.currentChallenge.storyBonus > 0) {
                                console.log(localState.currentChallenge.storyBonus)
                                turnIncrement('STORY')
                            } else if (localState.currentChallenge.noAssist) {
                                turnIncrement('SCENE')
                            } else {
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
                        if (cloudState.activeAssistTokens.length === 0) {
                            turnIncrement()
                        } else {
                            addAssistBonus(cloudState.activeAssistTokens[0], 'preAssist')
                            removeFirstActiveAssistToken()
                            if (cloudState.activeAssistTokens.length === 0) {
                                turnIncrement()
                            }
                        }

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
                            (cloudState.hasActionToken.filter(tokens => tokens.uid !== cloudState.active.activeUID).length === 0)
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
    //  else if (
    //     // If the game is on pre or post assist scene stage
    //     // and at least one player is left in the assist token array
    //     // the player at the beginning of the assist token array
    //     // can click the button to indicate that they have told
    //     // how they are attempting to assist the current active player
    //     assistScenes.includes(cloudState.currentTurn.turnStage) &&
    //     cloudState.activeAssistTokens.length > 0) {

    //     console.log('Assist player(s) tell how they helped')
    //     const updatedActiveAssistTokens = cloudState.activeAssistTokens.slice(1)
    //     updateActiveAssistTokens(updatedActiveAssistTokens)
    //     if (updatedActiveAssistTokens.length === 0) {
    //         turnIncrement()
    //     }
    // }





}

export default clickForNext