import {
    startAddStoryBonus,
    startAddWarriorActionBonus,
    startAddWizardActionBonus,
    startCompleteBoss,
    startCompleteChallenge,
    startMarkTurnComplete,
    startNullReadyList,
    startRESETActionTokens,
    startSaveDiceRoll,
    startToggleRollAnimation,
    startUNspendActionToken,
    startUpdateAssistBonusOne,
    startUpdateAssistBonusTwo,
    startUpdateAssistTokens,
    startUpdateBriefingStage,
    startUpdateGameStage,
    startUpdateLootPoints,
    startUpdateTeamHealth,
    startUpdateTurnStage
} from "../../actions/cloudActions"
import { auth } from "../../firebase/firebase";
import turnStagesArray from "../elements/ActiveGame/turnStep/turnStepArrays/turnStagesArray";
import { gameStageArray } from "../elements/ActiveGame/gameStage/gameStageArray"
import {
    stats,
    tokenClassesActionOne,
    tokenClassesActionTwo,
    tokenClassesReclaim
} from "../elements/CharacterSheet/classes/charInfo";
import diceRoll from "./diceRoll";
import incrementTurn from "./incrementTurn";
import { briefingStagesArray, directionArray } from "../elements/ActiveGame/briefingStage/briefingStagesArray";

const clickForNext = ({ cloudState, localState }, direction = directionArray[0]) => {

    const reloadPage = () => {
        window.location.reload()
    }

    const addStoryStrength = () => {
        startAddStoryBonus(localState.hostKey, parseInt(localState.currentChallenge.storyBonus))
    }

    const updateLoot = () => {
        const currentLoot = localState.activeCharacter.lootPoints
        const newLoot = localState.currentChallenge.loot
        const updatedLoot = parseInt(currentLoot) + parseInt(newLoot)
        startUpdateLootPoints(
            cloudState.active.activeUID,
            cloudState.active.activeCharID,
            updatedLoot
        )
    }

    const addAssistBonus = () => {

        const stage = (
            (turnStagesArray.slice(11, 13).includes(cloudState.currentTurn.turnStage))
                ?
                'postAssist'
                :
                'preAssist'
        )

        const assistBonus = (
            stats[
            cloudState.activeAssistTokens[
                (cloudState.activeAssistTokens.length - 1)
            ].classCode
            ][stage])
        if (cloudState.strength.assistOne > 0) {
            startUpdateAssistBonusTwo(localState.hostKey, assistBonus)
        } else {
            startUpdateAssistBonusOne(localState.hostKey, assistBonus)
        }
    }

    const removeLastActiveAssistToken = () => {
        const removeAssist = cloudState.activeAssistTokens.pop()
        const updatedAssistArray = cloudState.activeAssistTokens.filter(
            ({ currentCharacterID }) => {
                return currentCharacterID !== removeAssist.currentCharacterID
            })


        startUpdateAssistTokens(localState.hostKey, updatedAssistArray)
    }

    const processAssist = () => {
        if (cloudState.activeAssistTokens.length > 0) {
            // If assist tokens have been spent
            // clicking will add the last bonus to the current strength
            // and remove the last token from the list of assist tokens
            addAssistBonus()
            // removeFirstActiveAssistToken()
            removeLastActiveAssistToken()
        }
    }

    const addWarriorBuff = () => {
        const updatedTeamHealth = (parseInt(cloudState.active.teamHealth) - 1)
        startAddWarriorActionBonus(localState.hostKey, updatedTeamHealth)
    }

    const addWizardBuff = () => {
        startAddWizardActionBonus(localState.hostKey)
    }

    const rollDice = () => {

        const rollLocation = (
            cloudState.currentTurn.rollOne === null
                ?
                'rollOne'
                :
                'rollTwo'
        )

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
                    break;
            }
        }

        const code = cloudState.static[codeChallenge()]

        if (localState.currentChallenge.boss) {
            startCompleteBoss(
                localState.hostKey,
                code,
                localState.currentChallengeKey
            )
        }

        startCompleteChallenge(
            localState.hostKey,
            code,
            localState.currentChallengeKey,
            cloudState.currentTurn[cloudState.currentTurn.selectedChallenge].visible
        )
    }

    const failChallenge = () => {
        const currentHealth = cloudState.active.teamHealth
        const loseHealth = localState.currentChallenge.health
        const updatedHealth = currentHealth - loseHealth
        startUpdateTeamHealth(localState.hostKey, updatedHealth)
    }

    // const turnIncrement = (stage = incrementTurn(cloudState.currentTurn.turnStage)) => {
    //     startUpdateTurnStage(localState.hostKey, stage)
    // }

    const passTheTurn = () => {

        // The Bard action token is returned at the end of every player's turn
        const bardIndex = cloudState.playerList.indexOf(player => (tokenClassesReclaim.includes(player.classCode)))

        if (bardIndex >= 0) {

            startUNspendActionToken(
                localState.hostKey,
                cloudState.hasActionToken.concat(cloudState.playerList[bardIndex]),
                []
            )
        }

        const tempNewReadyList = [cloudState.active.activeUID].concat(cloudState.readyList)

        // Add current active player to the Ready list
        // indicating that they are ready for the next turn cycle
        startMarkTurnComplete(
            localState.hostKey,
            tempNewReadyList
        )

        // Check to see if all players are ready for the next turn cycle
        if (
            (cloudState.playerList.length !== 0) &&
            (cloudState.playerList.length <= tempNewReadyList.length)
        ) {
            // If yes, clear the ready list
            // and return everyone's action tokens
            startNullReadyList(localState.hostKey)
            startRESETActionTokens(localState.hostKey, cloudState.playerList)

        }

        // turnIncrement()
    }

    const activePlayerChecker = () => {
        return (
            // Only accept input from the active player
            (auth.currentUser.uid === cloudState.active.activeUID)
        )
    }

    // Increment Briefing Stages, Briefing Actions
    const briefingStageActions = (newStage) => {
        switch (newStage) {
            case 'NEXT':
                startUpdateGameStage(localState.hostKey, gameStageArray[2])
                break;
            default:
                break;
        }
    }

    const briefingStageSelection = (direction) => {

        const setVILLAIN = () => {
            return (
                // If current briefingStage is RELIC
                (briefingStagesArray[1] === cloudState.backstory.briefingStage)
                &&
                (direction === directionArray[1])
            )
        }

        const setRELIC = () => {
            return (
                (
                    // If current briefingStage is VILLAIN
                    (briefingStagesArray[0] === cloudState.backstory.briefingStage)
                    &&
                    // and direction is FORWARD
                    (directionArray[0] === direction)
                )
                ||
                (
                    // If current briefingStage is LOCATION
                    (briefingStagesArray[2] === cloudState.backstory.briefingStage)
                    &&
                    // and direction is BACKWARD
                    (directionArray[1] === direction)
                )
            )
        }

        const setLOCATION = () => {
            return (
                // If current briefingStage is RELIC
                (briefingStagesArray[1] === cloudState.backstory.briefingStage)
                &&
                // and direction is FORWARD
                (direction === directionArray[0])
            )
        }

        const setTRANSPORT = () => {
            return (
                // If current briefingStage is LOCATION
                (briefingStagesArray[2] = cloudState.backstory.briefingStage)
                &&
                (direction === directionArray[0])
            )
        }

        if (activePlayerChecker()) {
            const trueArray = [
                setVILLAIN(),
                setRELIC(),
                setLOCATION(),
                setTRANSPORT()
            ]

            const returnIndex = trueArray.findIndex(returnValue => returnValue === true)
            return (returnIndex >= briefingStagesArray.length ? 'NEXT' : briefingStagesArray[returnIndex])
        }

    }


    // Increment Turn Stages, Turn Actions
    const turnStageActions = () => {

        if (activePlayerChecker()) {
            switch (cloudState.currentTurn.turnStage) {
                case turnStagesArray[3]:
                    addStoryStrength()
                    break;

                // ActionOne
                case turnStagesArray[7]:
                    if (
                        (cloudState.activeActionTokens.filter(
                            tokens => tokens.uid === cloudState.active.activeUID
                        ).length > 0
                        )
                    ) {
                        if (localState.activeCharacter.classCode === 3) {
                            addWarriorBuff()
                        } else if (localState.activeCharacter.classCode === 4) {
                            addWizardBuff()
                        }
                    }
                    break;
                // Roll Dice
                case turnStagesArray[8]:
                case turnStagesArray[9]:
                    rollDice()
                    break;

                // Evaluate stages
                case turnStagesArray[10]:
                    if (
                        // If Strength beats Difficulty
                        cloudState.strength.total >=
                        cloudState.currentTurn.difficulty) {
                        completeChallenge()
                        updateLoot()
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
                    }
                    break;
                case turnStagesArray[13]:
                    if (cloudState.strength.total >= cloudState.currentTurn.difficulty) {
                        completeChallenge()
                        updateLoot()
                    } else {
                        failChallenge()
                    }
                    break;
                // Pass Turn
                case turnStagesArray[17]:
                    passTheTurn()
                    break;

                // Add assist
                case turnStagesArray[6]:
                case turnStagesArray[12]:
                    processAssist()
                    break;

                default:
                    break;
            }
        }
    }

    const turnStageSelection = () => {

        const passesActionTokenChecker = () => {
            return (
                (
                    (
                        // If turn stage is CHALLENGE
                        turnStagesArray.slice(1, 2).includes(cloudState.currentTurn.stage)
                    )
                    &&
                    (
                        (
                            // If the current challenge does NOT require
                            // that the active player spend their action token
                            // to engage the challenge
                            !localState.currentChallenge.requiresToken
                        )
                        ||
                        (
                            (
                                // If the current challenge DOES require
                                // that the active player spend their action token
                                // to engage the challenge
                                localState.currentChallenge.requiresToken)
                            &&
                            (
                                // AND the active player HAS spent their action token
                                // in order to engage the challenge
                                (cloudState.activeActionTokens.filter(
                                    token => token.uid === cloudState.active.activeUID
                                ).length > 0)
                            )
                        )
                    )
                )
                ||
                (
                    // OR if turn stage is NOT CHALLENGE
                    !turnStagesArray.slice(1, 2).includes(cloudState.currentTurn.stage)
                )
            )
        }

        // DESCRIBEONE
        const setDESCRIBEONE = () => {
            return (
                // If turn stage is PASS or 'default'
                ([turnStagesArray[17], turnStagesArray[19]].includes(cloudState.currentTurn.turnStage))
                ||
                // or if step stage is TRANSPORT
                (gameStageArray[2] === (cloudState.active.gameStage))
            )
        }

        // CHALLENGE
        const setCHALLENGE = () => {
            return (
                // If turn stage is DESCRIBEONE
                // then stage CHALLENGE becomes available
                turnStagesArray[0] === (cloudState.currentTurn.turnStage)
            )
        }

        // ITEMS
        const setITEMS = () => {
            return (
                (passesActionTokenChecker())
                &&
                (
                    (
                        // If turn stage is CHALLENGE
                        turnStagesArray[1] === (cloudState.currentTurn.turnStage)
                    )
                    &&
                    (
                        (
                            // and the active character has any items
                            // this will likely need to be updated
                            // (text at the very least)
                            // once items have been implemented
                            // to indicate whether there are active
                            // item options, or just reviewing the bonuses from 
                            // current items
                            localState.activeCharacter.charKostco
                            &&
                            localState.activeCharacter.charKostco.length > 0
                        )
                    )
                )
            )
        }

        // STORY
        const setSTORY = () => {
            // This method relies on fall-through
            // from the ITEMS stage
            return (
                (passesActionTokenChecker())
                &&
                (
                    (
                        // If turn stage is CHALLENGE or ITEMS
                        turnStagesArray.slice(1, 3).includes(cloudState.currentTurn.turnStage)
                    )
                    &&
                    (
                        // and the current challenge has a story bonus
                        localState.currentChallenge.storyBonus > 0
                    )
                )
            )
        }

        // PREASSIST
        const setPREASSIST = () => {
            // This method relies heavily on fall-through logic
            // It captures all challenges that allow assist
            // and aren't explicitly directly elsewhere
            return (
                (passesActionTokenChecker())
                &&
                (
                    (
                        // If turn stage is CHALLENGE or ITEMS or STORY
                        turnStagesArray.slice(1, 4).includes(cloudState.currentTurn.turnStage)
                    )
                    &&
                    (
                        // and if the current challenge DOES allow assists
                        !localState.currentChallenge.noAssist
                    )
                )
            )
        }

        // SCENE
        const setSCENE = () => {
            return (
                (passesActionTokenChecker())
                &&
                // If turn stage is PREASSIST
                // then SCENE becomes available
                (
                    (turnStagesArray[4] === (cloudState.currentTurn.turnStage))
                    ||
                    (
                        // If turn stage is CHALLENGE or STORY
                        ([turnStagesArray[1], turnStagesArray[3]].includes(cloudState.currentTurn.turnStage))
                        &&
                        // and if the challenge does not allow assistance
                        // move to the Scene stage
                        (localState.currentChallenge.noAssist)
                    )
                )
            )
        }

        // PRE_ASSIST_SCENE
        const setPRE_ASSIST_SCENE = () => {
            return (
                // Accessible from SCENE AND PRE_ASSIST_SCENE
                ([turnStagesArray[5], turnStagesArray[6]].includes(cloudState.currentTurn.turnStage))
                &&
                (cloudState.activeAssistTokens.length > 0)
            )
        }

        // ACTIONONE
        const setACTIONONE = () => {
            return (
                // If current stage is SCENE, PRE_ASSIST_SCENE
                (turnStagesArray.slice(5, 7).includes(cloudState.currentTurn.turnStage))
                &&
                (
                    // If all of the assist tokens have been processed

                    (cloudState.activeAssistTokens.length === 0)
                    &&
                    // AND if the character class has a special Action Token ability
                    // that could be used before the roll
                    (tokenClassesActionOne.includes(parseInt(localState.activeCharacter.classCode)))
                    &&
                    // AND if the active character hasn't yet used their action token
                    (
                        (cloudState.hasActionToken.filter(tokens => tokens.uid === cloudState.active.activeUID).length > 0)
                    )
                )
            )
        }

        // ROLLONE
        const setROLLONE = () => {
            return (
                // SCENE, PRE_ASSIST_SCENE, ACTIONONE
                (turnStagesArray.slice(5, 8).includes(cloudState.currentTurn.turnStage))
                &&
                (
                    (cloudState.activeAssistTokens.length === 0)
                )
                &&
                (
                    !localState.currentChallenge.noRoll
                )
            )
        }

        // ROLLTWO
        const setROLLTWO = () => {
            return (
                // If turn stage is ROLLONE
                (turnStagesArray[8] === cloudState.currentTurn.turnStage)
                &&
                (
                    // If the currently selected challenge 
                    // is marked with advantage or disadvantage
                    // then stage ROLLTWO becomes available
                    localState.currentChallenge.advantage
                    ||
                    localState.currentChallenge.disadvantage
                )
                &&
                (
                    !localState.currentChallenge.noRoll
                )
                &&
                (
                    cloudState.currentTurn.rollTwo === null
                )
            )
        }

        // EVALUATEONE
        const setEVALUATEONE = () => {
            return (
                (
                    // If turn stage is ROLLONE or ROLLTWO
                    (turnStagesArray.slice(8, 10).includes(cloudState.currentTurn.turnStage))
                    &&
                    !(
                        // and if the currently selected challenge 
                        // is NOT marked with advantage or disadvantage
                        localState.currentChallenge.advantage
                        ||
                        localState.currentChallenge.disadvantage
                    )
                )
                ||
                (
                    // If turn stage is ROLLTWO
                    (turnStagesArray[9] === cloudState.currentTurn.turnStage)
                    &&
                    (
                        // and if the currently selected challenge 
                        // IS marked with advantage or disadvantage
                        localState.currentChallenge.advantage
                        ||
                        localState.currentChallenge.disadvantage
                    )
                )
                ||
                (
                    // If turn stage is SCENE
                    (turnStagesArray[5] === (cloudState.currentTurn.turnStage))
                    &&
                    // and the current challenge does not allow rolling
                    (localState.currentChallenge.noRoll)
                )
            )
        }

        // POSTASSIST
        const setPOSTASSIST = () => {
            return (
                // If current stage is EVALUATEONE
                (turnStagesArray[10] === (cloudState.currentTurn.turnStage))
                &&
                (
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
                )
                &&
                (
                    cloudState.strength.total < cloudState.currentTurn.difficulty
                )
            )
        }

        // POST_ASSIST_SCENE
        const setPOST_ASSIST_SCENE = () => {
            return (
                // Available from POSTASSIST and POST_ASSIST_SCENE
                ([turnStagesArray[11], turnStagesArray[12]].includes(cloudState.currentTurn.turnStage))
                &&
                (cloudState.activeAssistTokens.length > 0)
            )
        }

        // EVALUATETWO
        const setEVALUATETWO = () => {
            // After all players assisting after the roll have described how they help
            // move to the second evaluation stage
            return (
                // If the current stage is POST_ASSIST_SCENE
                // then stage EVALUATETWO becomes available
                (turnStagesArray[12] === (cloudState.currentTurn.turnStage))
                &&
                // There must be no activeAssistTokens left in the list
                (cloudState.activeAssistTokens.length === 0)
            )
        }

        // DESCRIBETWO
        const setDESCRIBETWO = () => {
            return (
                (
                    // If the current stage is EVALUATEONE or EVALUATETWO
                    // then stage DESCRIBETWO becomes available
                    [turnStagesArray[10], turnStagesArray[13]].includes(cloudState.currentTurn.turnStage)
                )
                &&
                (// Evaluating roll results (via being applied to strength), if it's a critical failure
                    (cloudState.strength.total < 0)
                    ||
                    // If total strength is greater than or equal to the difficulty of the challenge
                    (cloudState.strength.total >= cloudState.currentTurn.difficulty)
                    ||
                    (
                        // If total strength is less than the difficulty
                        (cloudState.strength.total < cloudState.currentTurn.difficulty)
                        &&
                        // If there are no further assists to apply
                        // (either because the challenge is a noAssist or if no teammates have
                        // available action tokens)
                        (
                            (localState.currentChallenge.noAssist)
                            ||
                            (cloudState.hasActionToken.filter(
                                tokens => tokens.uid !== cloudState.active.activeUID
                            ).length === 0
                            )
                        )
                    ))
            )
        }

        // KOSTCO
        const setKOSTCO = () => {
            return (
                // If the current stage is DESCRIBETWO
                // then stage KOSTCO is available
                (turnStagesArray[14] === (cloudState.currentTurn.turnStage))
                &&
                (localState.activeCharacter.lootPoints >= 3)
            )
        }

        // ACTIONTWO
        const setACTIONTWO = () => {

            return (
                // If the current stage is either DESCRIBETWO or KOSTCO
                // then stage ACTIONTWO can be accessed
                (turnStagesArray.slice(14, 16).includes(cloudState.currentTurn.turnStage))
                &&
                // If the character is in the list of characters with an ActionTwo token ability
                (tokenClassesActionTwo.includes(localState.activeCharacter.classCode))
                &&
                // And if the character action token is available
                (cloudState.activeActionTokens.filter(token => token.uid === cloudState.active.activeUID).length > 0)
            )
        }

        // PASS
        const setPASS = () => {
            // If current turn is DESCRIBETWO, KOSTCO, or ACTIONTWO
            // then stage PASS can be accessed
            return (turnStagesArray.slice(14, 17).includes(cloudState.currentTurn.turnStage))
        }


        if (activePlayerChecker()) {
            const trueArray = [
                setDESCRIBEONE(),
                setCHALLENGE(),
                setITEMS(),
                setSTORY(),
                setPREASSIST(),
                setSCENE(),
                setPRE_ASSIST_SCENE(),
                setACTIONONE(),
                setROLLONE(),
                setROLLTWO(),
                setEVALUATEONE(),
                setPOSTASSIST(),
                setPOST_ASSIST_SCENE(),
                setEVALUATETWO(),
                setDESCRIBETWO(),
                setKOSTCO(),
                setACTIONTWO(),
                setPASS(),
                true
            ]
            const returnIndex = trueArray.findIndex(returnValue => returnValue === true)
            return (returnIndex >= turnStagesArray.length ? 'default' : turnStagesArray[returnIndex])
        }
    }


    // Increment Game Stages, Game Actions
    const gameStageActions = () => {
        if (activePlayerChecker()) {
            switch (cloudState.active.gameStage) {
                case 'INTRO':
                    passTheTurn()
                    break;
                case 'BRIEF':
                    break;
                case 'TRANSPORT':
                case 'CHALLENGES':
                    startNullReadyList(localState.hostKey)
                    startRESETActionTokens(localState.hostKey, cloudState.playerList)
                    break;
                default:
                    console.log('hit default game stage on clickForNext, pls fix')
                    break;
            }
        }
    }

    const gameStageSelection = () => {

        const setINTRO = () => {
            return (
                // If the game is in INTRO stage
                (gameStageArray[0] === cloudState.active.gameStage)
                &&
                // If NOT all players have indicated they are ready
                (cloudState.readyList.length !== cloudState.playerList.length)
            )
        }

        const setBRIEF = () => {
            return (
                // If current gameStage is INTRO
                (gameStageArray[0] === cloudState.active.gameStage)
                &&
                // If all players have indicated they are ready
                (cloudState.readyList.length === cloudState.playerList.length)
            )
        }

        const setTRANSPORT = () => {
            return (
                // If current gameStage is BRIEF
                (gameStageArray[1] === cloudState.active.gameStage)
                &&
                // If current briefingStage is LOCATION
                (briefingStagesArray[2] === cloudState.backstory.briefingStage)
            )
        }

        // const setCHALLENGES = () => { 
        //     return (
        //         // If current gameStage is TRANSPORT
        //         (gameStageArray[2] === cloudState.active.gameStage)

        //     )
        // }

        const setEND = () => {

            return (
                // If current gameStage is CHALLENGES
                (gameStageArray[3] === cloudState.active.gameStage)
                &&
                (
                    (
                        // If relic deck is complete
                        (cloudState.active.progressRelic > 10)
                        &&
                        (
                            // If Villin or Location deck is complete
                            cloudState.active.progressVillain > 10
                            ||
                            cloudState.active.progressLocation > 10
                        )
                    )
                    ||
                    (cloudState.active.teamHealth <= 0)
                )
            )
        }

        if (activePlayerChecker()) {
            const trueArray = [
                setINTRO(),
                setBRIEF(),
                setTRANSPORT(),
                false,
                setEND(),
                false
            ]
            console.log('game stage true array', trueArray)
            const returnIndex = trueArray.findIndex(returnValue => returnValue === true)
            return (returnIndex >= gameStageArray.length ? 'default' : gameStageArray[returnIndex])
        }

    }







    if (activePlayerChecker()) {
        switch (cloudState.active.gameStage) {
            case 'TRANSPORT':
                break;
            case 'CHALLENGES':
                turnStageActions()
                const newTurnStage = turnStageSelection()
                startUpdateTurnStage(localState.hostKey, newTurnStage)
                break;
            case 'INTRO':
            case 'END':
                gameStageActions()
                const newGameStage = gameStageSelection()
                startUpdateGameStage(localState.hostKey, newGameStage)
                break;
            case 'BRIEF':
                const newBriefingStage = briefingStageSelection(direction)
                startUpdateBriefingStage(localState.hostKey, newBriefingStage)
                briefingStageActions(newBriefingStage)
                break;
            default:
                console.log('hit default on clickForNext, pls fix');
                // reloadPage()
                break;
        }
    }


}

export default clickForNext

// if (auth.currentUser.uid === cloudState.active.activeUID) {
//     switch (cloudState.active.gameStage) {
//         case 'INTRO':
//             passTheTurn()
//             break;
//         case 'BRIEF':
//             break;
//         case 'TRANSPORT':
//             break;
//         case 'CHALLENGES':
//             switch (cloudState.currentTurn.turnStage) {
//                 case 'DESCRIBEONE':
//                     turnIncrement('CHALLENGE')
//                     break;
//                 case 'CHALLENGE':
//                     if (cloudState.currentTurn.selectedChallenge !== '') {

//                         if (
//                             // If the currently selected challenge requires
//                             // that an action token be spent to engage it
//                             // the rest of the logic will not fire
//                             // until an active token for the active player is in the list
//                             (localState.currentChallenge.requiresToken)
//                             &&
//                             (cloudState.activeActionTokens.filter(token => token.uid === cloudState.active.activeUID).length > 0)
//                         ) {

//                             if (localState.activeCharacter.charKostco &&
//                                 localState.activeCharacter.charKostco.length > 0)
//                                 // If the active character has KostCo card(s),
//                                 // the 'ITEMS' stage will allow them to potentially use activated elementsF
//                                 turnIncrement('ITEMS')
//                         } else if (localState.currentChallenge.storyBonus > 0) {
//                             // If there are no items to use,
//                             // AND if there is a story bonus
//                             // move to the Story stage
//                             turnIncrement('STORY')
//                         } else if (localState.currentChallenge.noAssist) {
//                             // If there is no story bonus
//                             // and if the challenge does not allow assistance
//                             // move to the Scene stage
//                             turnIncrement('SCENE')
//                         } else {
//                             // If all else fails, this challenge is eligible for assistance
//                             // Move to the Preassist stage
//                             turnIncrement('PREASSIST')
//                         }
//                     }
//                     // Need to implement code to handle No Assist, No Roll
//                     break;
//                 case 'ITEMS':
//                     console.log('did things with items')
//                     if (localState.currentChallenge.storyBonus > 0) {
//                         turnIncrement('STORY')
//                     } else {
//                         turnIncrement('PREASSIST')
//                     }
//                     break;
//                 case 'STORY':
//                     addStoryStrength(localState.currentChallenge.storyBonus)
//                     if (localState.currentChallenge.noAssist) {
//                         turnIncrement('SCENE')
//                     } else {
//                         turnIncrement('PREASSIST')
//                     }
//                     break;
//                 case 'PREASSIST':
//                     turnIncrement('SCENE')
//                     break;
//                 case 'SCENE':
//                     if (cloudState.activeAssistTokens.length > 0) {
//                         turnIncrement('PRE_ASSIST_SCENE')
//                     } else {
//                         turnIncrement('ROLLONE')
//                     }
//                     break;
//                 case 'PRE_ASSIST_SCENE':
//                     if (cloudState.activeAssistTokens.length > 0) {
//                         // If assist tokens have been spent
//                         // clicking will add the first bonus to the current strength
//                         // and remove the first token from the list of assist tokens
//                         addAssistBonus(cloudState.activeAssistTokens[0], 'preAssist')
//                         removeFirstActiveAssistToken('ROLLONE')
//                     }
//                     if (
//                         // If all of the assist tokens have been processed
//                         // AND if the character class has a special Action Token ability
//                         // that could be used before
//                         (cloudState.activeAssistTokens.length === 0)
//                         &&
//                         (tokenClassesActionOne.includes(localState.activeCharacter.classCode))
//                     ) {
//                         turnIncrement('ACTIONONE')
//                     } else {
//                         turnIncrement('ROLLONE')
//                     }

//                     break;
//                 case 'ACTIONONE':
//                     console.log('tokenStages array', tokenStages)
//                     turnIncrement('ROLLONE')
//                     break;
//                 case 'ROLLONE':
//                     rollDice('rollOne')
//                     if (localState.currentChallenge.advantage ||
//                         localState.currentChallenge.disadvantage
//                     ) {
//                         turnIncrement('ROLLTWO')
//                     } else {
//                         turnIncrement('EVALUATEONE')
//                     }
//                     break;
//                 case 'ROLLTWO':
//                     rollDice('rollTwo')
//                     turnIncrement('EVALUATEONE')
//                     break;
//                 case 'EVALUATEONE':
//                     if (cloudState.strength.total < 0) {
//                         turnIncrement('DESCRIBETWO')
//                     } else if (
//                         // If total strength is greater than or equal to the difficulty of the challenge
//                         cloudState.strength.total >=
//                         cloudState.currentTurn.difficulty) {
//                         completeChallenge()
//                         turnIncrement('DESCRIBETWO')
//                     } else if (
//                         // Do action tokens for non active players still exist?
//                         (cloudState.hasActionToken.filter(tokens => tokens.uid !== cloudState.active.activeUID).length > 0)
//                         &&
//                         (
//                             (   // Can this challenge receive assistance,
//                                 // but has not yet had assistance applied
//                                 (!localState.currentChallenge.noAssist)
//                                 &&
//                                 (cloudState.strength.assistOne === 0)
//                             )
//                             || // OR
//                             (
//                                 // Is this a doubleAssist challenge,
//                                 // and has not yet had a second assist applied
//                                 (localState.currentChallenge.doubleAssist)
//                                 &&
//                                 (cloudState.strength.assistTwo === 0)
//                             )

//                         )
//                     ) {
//                         turnIncrement('POSTASSIST')
//                     } else if (
//                         // If the total strength does not suffice
//                         // and the challenge is not eligible for assistance
//                         // or no further non active player action tokens exist
//                         (localState.currentChallenge.noAssist)
//                         ||
//                         (cloudState.hasActionToken.filter(
//                             tokens => tokens.uid !== cloudState.active.activeUID
//                         ).length === 0
//                         )
//                     ) {
//                         failChallenge()
//                         turnIncrement('DESCRIBETWO')
//                     }
//                     break;
//                 case 'POSTASSIST':
//                     turnIncrement('POST_ASSIST_SCENE')
//                     break;
//                 case 'POST_ASSIST_SCENE':
//                     if (cloudState.activeAssistTokens.length === 0) {
//                         turnIncrement('EVALUATETWO')
//                     } else {
//                         addAssistBonus(cloudState.activeAssistTokens[0], 'postAssist')
//                         removeFirstActiveAssistToken()
//                         if (cloudState.activeAssistTokens.length === 0) {
//                             turnIncrement('EVALUATETWO')
//                         }
//                     }

//                     break;
//                 case 'EVALUATETWO':
//                     if (cloudState.strength.total >= cloudState.currentTurn.difficulty) {
//                         completeChallenge()
//                         updateLoot()
//                     } else {
//                         failChallenge()
//                     }
//                     turnIncrement('DESCRIBETWO')
//                     break;
//                 case 'DESCRIBETWO':
//                     if (localState.activeCharacter.lootPoints >= 3) {
//                         turnIncrement('KOSTCO')
//                     } else if (
//                         // If the character is in the list of characters with an ActionTwo token ability
//                         (tokenClassesActionTwo.includes(localState.activeCharacter.classCode))
//                         &&
//                         // And if the character action token is available
//                         (cloudState.activeActionTokens.filter(token => token.uid === cloudState.active.activeUID).length > 0)
//                     ) {
//                         console.log('tokenClassesActionTwo', tokenClassesActionTwo, localState.activeCharacter.classCode)
//                         turnIncrement('ACTIONTWO')
//                     } else {
//                         turnIncrement('PASS')
//                     }
//                     break;
//                 case 'KOSTCO':
//                     console.log('received KOSTCO card (two cards if Rogue)')
//                     console.log('discarded one if Rogue, then decided whether to hold it or give it')
//                     console.log('if this results in more than two items, decide which one to discard')
//                     if (
//                         // If the character is in the list of characters with an ActionTwo token ability
//                         (tokenClassesActionTwo.includes(localState.activeCharacter.classCode))
//                         &&
//                         // And if the character action token is available
//                         (cloudState.activeActionTokens.filter(token => token.uid === cloudState.active.activeUID).length > 0)
//                     ) {
//                         console.log('tokenClassesActionTwo', tokenClassesActionTwo, localState.activeCharacter.classCode)
//                         turnIncrement('ACTIONTWO')
//                     } else {
//                         turnIncrement('PASS')
//                     }
//                     break;
//                 case 'ACTIONTWO':
//                     turnIncrement('PASS')
//                     break;
//                 case 'PASS':
//                     passTheTurn()
//                     break;
//                 default:
//                     break;
//             }
//             break;
//         case 'END':
//             break;
//         default:
//             console.log('hit default on clickForNext, pls fix');
//             reloadPage()
//     }
// }