import {
    startAddStoryBonus,
    startAddWarriorActionBonus,
    startAddWizardActionBonus,
    startClearKostcoCardsOptions,
    startClearKostcoSelected,
    startCompleteBoss,
    startCompleteChallenge,
    startMarkTurnComplete,
    startNullReadyList,
    startRESETActionTokens,
    startSaveDiceRoll,
    //startSaveKostcoToCharacter,
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
import {
    stats,
    tokenClassesActionOne,
    tokenClassesActionTwo,
    tokenClassesReclaim
} from "../elements/CharacterSheet/classes/charInfo";
import diceRoll from "./diceRoll";
import { startUpdateKostcoOnCharacter } from "../../actions/charActions";
import turnStage from "../elements/ActiveGame/turnStep/turnStepArrays/turnStage";
import { briefingStage, gameStage } from "../elements/ActiveGame/stageObjects/stageObjects";

const clickForNext = ({ cloudState, localState }, direction = direction.forward) => {
    const activeChar = localState.teamCharArray[localState.activeIndex]

    // const reloadPage = () => {
    //     window.location.reload()
    // }

    const addStoryStrength = () => {
        startAddStoryBonus(localState.hostKey, parseInt(localState.currentChallenge.storyBonus))
    }

    const updateLoot = () => {
        const currentLoot = activeChar.lootPoints
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
            (
                [
                    turnStage.postrollAssist,
                    turnStage.postrollAssistScene,
                    turnStage.evaluateTwo
                ]
                    .includes(cloudState.currentTurn.turnStage)
            )
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

    const buySelectedKostco = () => {
        const prevKostcoArray = localState
            .teamCharArray[localState.activeIndex]
            .charKostco
            .filter((kard) => kard.kID !== '0')

        const newKostcoArray = prevKostcoArray.concat([cloudState.kostco.selected])

        const newLootPoints = parseInt(localState
            .teamCharArray[localState.activeIndex]
            .lootPoints) - 3


        startUpdateKostcoOnCharacter(
            cloudState.active.activeUID,
            cloudState.active.activeCharID,
            newKostcoArray
        )

        startUpdateLootPoints(
            cloudState.active.activeUID,
            cloudState.active.activeCharID,
            newLootPoints
        )

        startClearKostcoCardsOptions(localState.hostKey)
        startClearKostcoSelected(localState.hostKey)
    }

    const passTheTurn = () => {

        // The Bard action token is returned at the end of every player's turn
        const bardIndex = cloudState
            .playerList
            .indexOf(
                player =>
                (tokenClassesReclaim
                    .includes(player.classCode)
                )
            )

        if (bardIndex >= 0) {

            startUNspendActionToken(
                localState.hostKey,
                cloudState
                    .hasActionToken
                    .concat(
                        cloudState
                            .playerList[bardIndex]
                    ),
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
        // AND if the current gameStage is CHALLENGES
        if (
            (cloudState.playerList.length !== 0) &&
            (cloudState.playerList.length <= tempNewReadyList.length)
            // &&
            // (cloudState.active.gameState === gameStageArray[3])
        ) {
            // If yes, clear the ready list
            // and return everyone's action tokens

            startNullReadyList(localState.hostKey)
            startRESETActionTokens(localState.hostKey, cloudState.playerList)
            // startSetReadyTrue(localState.hostKey)
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
            case 'TRANSPORT':
                startUpdateGameStage(localState.hostKey, gameStage.transport)
                startUpdateBriefingStage(localState.hostKey, briefingStage.display)
                break;
            default:
                break;
        }
    }

    const briefingStageSelection = (direction) => {

        const setVILLAIN = () => {
            return (
                (
                    (cloudState.backstory.briefingStage === briefingStage.relic)
                    &&
                    (direction === direction.backward)
                )
                    ?
                    briefingStage.villain
                    :
                    false
            )
        }

        const setRELIC = () => {
            return (
                (
                    (
                        (cloudState.backstory.briefingStage === briefingStage.villain)
                        &&
                        (direction === direction.forward)
                    )
                    ||
                    (
                        (cloudState.backstory.briefingStage === briefingStage.location)
                        &&
                        (direction === direction.backward)
                    )
                )
                    ?
                    briefingStage.relic
                    :
                    false
            )
        }

        const setLOCATION = () => {
            return (
                (
                    (cloudState.backstory.briefingStage === briefingStage.relic)
                    &&
                    (direction === direction.forward)
                )
                    ?
                    briefingStage.location
                    :
                    false
            )
        }

        const setTRANSPORT = () => {
            return (
                (
                    (cloudState.backstory.briefingStage === briefingStage.location)
                    &&
                    (direction === direction.forward)
                )
                    ?
                    briefingStage.transport
                    :
                    false
            )
        }

        const setDISPLAY = () => {
            return (
                (
                    (
                        [
                            briefingStage.transport,
                            briefingStage.display
                        ]
                            .includes
                            (
                                cloudState.backstory.briefingStage
                            )
                    )
                    &&
                    (
                        [
                            gameStage.transport,
                            gameStage.challenges
                        ]
                            .includes
                            (
                                cloudState.active.gameStage
                            )
                    )
                )
                    ?
                    briefingStage.display
                    :
                    false
            )
        }

        if (activePlayerChecker()) {
            const trueArray = [
                setVILLAIN(),
                setRELIC(),
                setLOCATION(),
                setTRANSPORT(),
                setDISPLAY()
            ]
            const returnIndex = trueArray
                .findIndex
                (
                    returnValue => returnValue !== false
                )
            return (trueArray[returnIndex])
        }

    }


    // Increment Turn Stages, Turn Actions
    const turnStageActions = () => {

        if (activePlayerChecker()) {
            switch (cloudState.currentTurn.turnStage) {
                case turnStage.storyBonus:
                    addStoryStrength()
                    break;

                case turnStage.actionTokenOne:
                    if (
                        (cloudState.activeActionTokens.filter(
                            tokens => tokens.uid === cloudState.active.activeUID
                        ).length > 0
                        )
                    ) {
                        if (activeChar.classCode === 3) {
                            addWarriorBuff()
                        } else if (activeChar.classCode === 4) {
                            addWizardBuff()
                        }
                    }
                    break;

                case turnStage.rollOne:
                case turnStage.rollTwo:
                    rollDice()
                    break;

                case turnStage.evaluateOne:
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

                case turnStage.evaluateTwo:
                    if (cloudState.strength.total >= cloudState.currentTurn.difficulty) {
                        completeChallenge()
                        updateLoot()
                    } else {
                        failChallenge()
                    }
                    break;

                case turnStage.prerollAssistScene:
                case turnStage.postrollAssistScene:
                    processAssist()
                    break;
                case turnStage.describeSceneTwo:
                    // evaluate whether active player can afford a Kostco Kard
                    // populate kostco.options
                    // This is currently handled by a useEffect
                    // on ActiveGame
                    break;
                case turnStage.kostcoBuy:
                    buySelectedKostco()
                    break;
                // KOSTCO_GIVE
                // case turnStage.kostcoGive:
                //     break;
                case turnStage.kostcoDiscard:
                case turnStage.actionTokenTwo:
                    startClearKostcoCardsOptions(localState.hostKey)
                    startClearKostcoSelected(localState.hostKey)
                    break;
                case turnStage.passTurn:
                    passTheTurn()
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
                        // If picking challenge
                        turnStage.pickChallenge === cloudState.currentTurn.stage
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
                    // OR if NOT picking CHALLENGE
                    turnStage.pickChallenge !== cloudState.currentTurn.stage
                )
            )
        }

        const setDESCRIBE_SCENE_ONE = () => {
            return (
                (
                    // If turn stage is PASS or 'default'
                    ([turnStage.passTurn, turnStage.default].includes(cloudState.currentTurn.turnStage))
                    ||
                    // or if step stage is TRANSPORT
                    (gameStage.transport === cloudState.active.gameStage)
                )
                    ?
                    turnStage.describeSceneOne
                    :
                    false
            )
        }

        const setPICK_CHALLENGE = () => {
            return (
                // If turn stage is DESCRIBE_SCENE_ONE or PICK_CHALLENGE
                // then stage PICK_CHALLENGE becomes available
                // Must have selected a challenge deck before moving to next stage
                (
                    (
                        [
                            turnStage.describeSceneOne,
                            turnStage.pickChallenge
                        ]
                            .includes(cloudState.currentTurn.turnStage)
                    )
                    &&
                    (
                        cloudState.currentTurn.selectedChallenge === ''
                    )
                )
                    ?
                    turnStage.pickChallenge
                    :
                    false
            )
        }

        const setPREROLL_ITEMS = () => {

            return (
                (
                    (passesActionTokenChecker())
                    &&
                    (
                        (
                            // If turn stage is PICK_CHALLENGE
                            turnStage.pickChallenge === cloudState.currentTurn.turnStage
                        )
                        &&
                        (
                            (
                                // and the active character has any items
                                // that target self and 
                                // that can be used any time 
                                // or before rolling
                                activeChar.charKostco.length > 0
                                &&
                                (
                                    activeChar
                                        .charKostco
                                        .filter(kard => kard.t.targetSelf)
                                        .filter(kard => (kard.t.anyTime || kard.t.combatPreroll))
                                        .length > 0
                                )
                            )
                        )
                    )
                )
                    ?
                    turnStage.prerollItems
                    :
                    false
            )
        }

        const setSTORY_BONUS = () => {

            return (
                (
                    (passesActionTokenChecker())
                    &&
                    (
                        (
                            // If turn stage is PICK_CHALLENGE or PREROLL_ITEMS
                            [
                                turnStage.pickChallenge,
                                turnStage.prerollItems
                            ]
                                .includes(cloudState.currentTurn.turnStage)
                        )
                        &&
                        (
                            // and the current challenge has a story bonus
                            localState.currentChallenge.storyBonus > 0
                        )
                        &&
                        (
                            // and a challenge has been selected
                            cloudState.currentTurn.selectedChallenge !== ''
                        )
                    )
                )
                    ?
                    turnStage.storyBonus
                    :
                    false
            )
        }

        const setPREROLL_ASSIST = () => {
            // This method relies heavily on fall-through logic
            // It captures all challenges that allow assist
            // and aren't explicitly captured elsewhere
            return (
                (
                    (passesActionTokenChecker())
                    &&
                    (
                        (
                            // If turn stage is PICK_CHALLENGE or PREROLL_ITEMS or STORY_BONUS
                            [
                                turnStage.pickChallenge,
                                turnStage.prerollItems,
                                turnStage.storyBonus
                            ]
                                .includes(cloudState.currentTurn.turnStage)
                        )
                        &&
                        (
                            // and if the current challenge DOES allow assists
                            !localState.currentChallenge.noAssist
                        )
                        &&
                        (
                            // and if a challenge HAS been selected
                            cloudState.currentTurn.selectedChallenge !== ''
                        )
                    )
                )
                    ?
                    turnStage.prerollAssist
                    :
                    false
            )
        }

        const setCHALLENGE_SCENE = () => {
            return (
                (
                    (passesActionTokenChecker())
                    &&
                    // If turn stage is PREROLL_ASSIST
                    // then CHALLENGE_SCENE becomes available
                    (
                        (turnStage.prerollAssist === cloudState.currentTurn.turnStage)
                        ||
                        (
                            // If turn stage is PICK_CHALLENGE or STORY_BONUS
                            (
                                [
                                    turnStage.pickChallenge,
                                    turnStage.storyBonus
                                ]
                                    .includes(cloudState.currentTurn.turnStage))
                            &&
                            // and if the challenge does not allow assistance
                            // move to the CHALLENGE_SCENE stage
                            (localState.currentChallenge.noAssist)
                        )
                    )
                )
                    ?
                    turnStage.challengeScene
                    :
                    false
            )
        }

        const setPREROLL_ASSIST_SCENE = () => {
            return (
                (
                    // Accessible from CHALLENGE_SCENE AND PREROLL_ASSIST_SCENE
                    (
                        [
                            turnStage.challengeScene,
                            turnStage.prerollAssistScene
                        ]
                            .includes(cloudState.currentTurn.turnStage))
                    &&
                    // repeat this stage until all assisting players
                    // have expended their active assist token 
                    // (by telling how they will assist)
                    (cloudState.activeAssistTokens.length > 0)
                )
                    ?
                    turnStage.prerollAssistScene
                    :
                    false
            )
        }

        const setACTION_TOKEN_ONE = () => {
            return (
                (
                    // If current stage is CHALLENGE_SCENE, PREROLL_ASSIST_SCENE
                    (
                        [
                            turnStage.challengeScene,
                            turnStage.prerollAssistScene
                        ]
                            .includes(cloudState.currentTurn.turnStage))
                    &&
                    (
                        // If all of the assist tokens have been processed
                        (cloudState.activeAssistTokens.length === 0)
                        &&
                        // AND if the character class has a special Action Token ability
                        // that could be used before the roll
                        (tokenClassesActionOne.includes(parseInt(activeChar.classCode)))
                        &&
                        // AND if the active character hasn't yet used their action token
                        (
                            (cloudState
                                .hasActionToken
                                .filter(
                                    tokens => tokens.uid === cloudState.active.activeUID
                                )
                                .length > 0
                            )
                        )
                    )
                )
                    ?
                    turnStage.actionTokenOne
                    :
                    false
            )
        }

        const setROLL_ONE = () => {
            return (
                (
                    (
                        // CHALLENGE_SCENE, PREROLL_ASSIST_SCENE, ACTION_TOKEN_ONE
                        [
                            turnStage.challengeScene,
                            turnStage.prerollAssistScene,
                            turnStage.actionTokenOne
                        ]
                            .includes(cloudState.currentTurn.turnStage))
                    &&
                    (
                        // If no further active assist tokens remain
                        cloudState.activeAssistTokens.length === 0
                    )
                    &&
                    (
                        // If the current challenge allows rolling
                        !localState.currentChallenge.noRoll
                    )
                )
                    ?
                    turnStage.rollOne
                    :
                    false
            )

        }

        const setROLL_TWO = () => {
            return (
                (
                    // If turn stage is ROLL_ONE
                    (turnStage.rollOne === cloudState.currentTurn.turnStage)
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
                        // If the current challenge allows rolling
                        !localState.currentChallenge.noRoll
                    )
                    &&
                    (
                        // If a second roll has not yet been produced
                        cloudState.currentTurn.rollTwo === null
                    )
                )
                    ?
                    turnStage.rollTwo
                    :
                    false
            )
        }

        const setEVALUATE_ONE = () => {
            return (
                (
                    (
                        // If turn stage is ROLL_ONE or ROLL_TWO
                        (
                            [
                                turnStage.rollOne,
                                turnStage.rollTwo
                            ]
                                .includes(cloudState.currentTurn.turnStage))
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
                        // OR If turn stage is ROLL_TWO
                        (
                            turnStage.rollTwo === cloudState.currentTurn.turnStage
                        )
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
                        // OR if turn stage is CHALLENGE_SCENE
                        (turnStage.challengeScene === cloudState.currentTurn.turnStage)
                        &&
                        // and the current challenge does not allow rolling
                        (localState.currentChallenge.noRoll)
                    )
                )
                    ?
                    turnStage.evaluateOne
                    :
                    false
            )
        }

        const setPOSTROLL_ASSIST = () => {
            return (
                (
                    // If current stage is EVALUATE_ONE
                    (turnStage.evaluateOne === cloudState.currentTurn.turnStage)
                    &&
                    (
                        // Do action tokens for non active players still exist?
                        (
                            cloudState
                                .hasActionToken
                                .filter(
                                    tokens => tokens.uid !== cloudState.active.activeUID
                                )
                                .length > 0
                        )
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
                        // Is the strength total not yet 
                        // high enough to defeat the challenge?
                        cloudState.strength.total < cloudState.currentTurn.difficulty
                    )
                )
                    ?
                    turnStage.postrollAssist
                    :
                    false
            )
        }

        const setPOSTROLL_ASSIST_SCENE = () => {
            return (
                (
                    // Available from POSTROLL_ASSIST and POSTROLL_ASSIST_SCENE
                    (
                        [
                            turnStage.postrollAssist,
                            turnStage.postrollAssistScene
                        ]
                            .includes(cloudState.currentTurn.turnStage)
                    )
                    &&
                    (cloudState.activeAssistTokens.length > 0)
                )
                    ?
                    turnStage.postrollAssistScene
                    :
                    false
            )
        }

        const setEVALUATE_TWO = () => {
            // After all players assisting after the roll have described how they help
            // move to the second evaluation stage
            return (
                (
                    // If the current stage is POSTROLL_ASSIST_SCENE
                    // then stage EVALUATE_TWO becomes available
                    (turnStage.postrollAssistScene === cloudState.currentTurn.turnStage)
                    &&
                    // There must be no activeAssistTokens left in the list
                    (cloudState.activeAssistTokens.length === 0)
                )
                    ?
                    turnStage.evaluateTwo
                    :
                    false
            )
        }

        const setDESCRIBE_SCENE_TWO = () => {
            return (
                (
                    (
                        // If the current stage is EVALUATE_ONE or EVALUATE_TWO
                        // then stage DESCRIBE_SCENE_TWO becomes available
                        [
                            turnStage.evaluateOne,
                            turnStage.evaluateTwo
                        ]
                            .includes(cloudState.currentTurn.turnStage)
                    )
                    &&
                    // Evaluating roll results (via being applied to strength)
                    (
                        // If roll is a critical failure
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
                            // (either because the challenge is a noAssist or 
                            // if no teammates have available action tokens)
                            (
                                (localState.currentChallenge.noAssist)
                                ||
                                (cloudState.hasActionToken.filter(
                                    tokens => tokens.uid !== cloudState.active.activeUID
                                ).length === 0
                                )
                            )
                        )
                    )
                )
                    ?
                    turnStage.describeSceneTwo
                    :
                    false
            )
        }

        const setKOSTCO_BUY = () => {
            return (
                (
                    // If the current stage is DESCRIBE_SCENE_TWO 
                    // then stage KOSTCO_BUY is available
                    (turnStage.describeSceneTwo === cloudState.currentTurn.turnStage)
                    &&
                    (activeChar.lootPoints >= 3)
                )
                    ?
                    turnStage.kostcoBuy
                    :
                    false
            )
        }

        const setKOSTCO_GIVE = () => {
            return (
                (
                    // If the current stage is KOSTCO_BUY
                    // then stage KOSTCO_GIVE is available
                    (turnStage.kostcoBuy === cloudState.currentTurn.turnStage)
                )
                    ?
                    turnStage.kostcoGive
                    :
                    false
            )
        }

        const setKOSTCO_DISCARD = () => {
            return (
                (
                    // If the current stage is KOSTCO_GIVE
                    // and any player has more than two kards
                    // then stage KOSTCO_DISCARD is available
                    (turnStage.kostcoGive === cloudState.currentTurn.turnStage)
                    &&
                    (
                        (
                            localState
                                .teamCharArray
                                .filter(char =>
                                    char.charKostco.length > 2)
                                .length > 0
                        )
                        ||
                        (
                            cloudState.kostco.options.length > 0
                        )
                    )
                )
                    ?
                    turnStage.kostcoDiscard
                    :
                    false
            )
        }

        const setACTION_TOKEN_TWO = () => {

            return (
                (
                    // If the current stage is DESCRIBE_SCENE_TWO or a KOSTCO stage,
                    // then stage ACTION_TOKEN_TWO can be accessed
                    (
                        [
                            turnStage.describeSceneTwo,
                            turnStage.kostcoBuy,
                            turnStage.kostcoGive,
                            turnStage.kostcoDiscard
                        ]
                            .includes(cloudState.currentTurn.turnStage)
                    )
                    &&
                    // If the character is in the list of characters with an ActionTwo token ability
                    (tokenClassesActionTwo.includes(activeChar.classCode))
                    &&
                    // And if the character action token is available
                    (
                        cloudState
                            .activeActionTokens
                            .filter(
                                token => token.uid === cloudState.active.activeUID
                            )
                            .length > 0

                    )
                )
                    ?
                    turnStage.actionTokenTwo
                    :
                    false
            )
        }

        const setPASS_TURN = () => {
            // If current turn is DESCRIBE_SCENE_TWO, a KOSTCO stage, or ACTION_TOKEN_TWO
            // then stage PASS_TURN can be accessed
            return (
                (
                    [
                        turnStage.describeSceneTwo,
                        turnStage.kostcoBuy,
                        turnStage.kostcoGive,
                        turnStage.kostcoDiscard,
                        turnStage.actionTokenTwo
                    ]
                        .includes(cloudState.currentTurn.turnStage)
                )
                    ?
                    turnStage.passTurn
                    :
                    false
            )
        }




        if (activePlayerChecker()) {
            const trueArray = [
                setDESCRIBE_SCENE_ONE(),
                setPICK_CHALLENGE(),
                setPREROLL_ITEMS(),
                setSTORY_BONUS(),
                setPREROLL_ASSIST(),
                setCHALLENGE_SCENE(),
                setPREROLL_ASSIST_SCENE(),
                setACTION_TOKEN_ONE(),
                setROLL_ONE(),
                setROLL_TWO(),
                setEVALUATE_ONE(),
                setPOSTROLL_ASSIST(),
                setPOSTROLL_ASSIST_SCENE(),
                setEVALUATE_TWO(),
                setDESCRIBE_SCENE_TWO(),
                setKOSTCO_BUY(),
                setKOSTCO_GIVE(),
                setKOSTCO_DISCARD(),
                setACTION_TOKEN_TWO(),
                setPASS_TURN(),
                'default'
            ]
            const returnIndex = trueArray.findIndex(returnValue => returnValue !== false)
            return (trueArray[returnIndex])
        }
    }


    // Increment Game Stages, Game Actions
    const gameStageActions = () => {
        if (activePlayerChecker()) {
            switch (cloudState.active.gameStage) {
                case gameStage.intro:
                case gameStage.briefing:
                    passTheTurn()
                    break;
                case gameStage.transport:
                case gameStage.challenges:
                    // startNullReadyList(localState.hostKey)
                    // startRESETActionTokens(localState.hostKey, cloudState.playerList)
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
                (
                    (cloudState.active.gameStage === gameStage.intro)
                    &&
                    (cloudState.playerList.length > (cloudState.readyList.length + 1))
                )
                    ?
                    gameStage.intro
                    :
                    false
            )
        }

        const setBRIEF = () => {
            return (
                (
                    (cloudState.active.gameStage === gameStage.intro)
                    &&
                    // If all but one players have indicated they are ready
                    // (as this is clicked by the last player to indicate they too are ready to move on)
                    (cloudState.playerList.length <= (cloudState.readyList.length + 1))

                )
                    ?
                    gameStage.briefing
                    :
                    false
            )
        }

        const setTRANSPORT = () => {
            return (
                (
                    (cloudState.active.gameStage === gameStage.briefing)
                    &&
                    (cloudState.backstory.briefingStage === briefingStage.location)
                )
                    ?
                    gameStage.transport
                    :
                    false
            )
        }

        // const setCHALLENGES = () => { 
        //     return (
        //         (cloudState.active.gameStage === gameStage.challenges)
        //         &&
        //         ()

        //     )
        // }

        const setVICTORY = () => {

            return (
                (
                    (cloudState.active.gameStage === gameStage.challenges)
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
                    ?
                    gameStage.victory
                    :
                    false
            )
        }

        const setFAILURE = () => {

            return (
                (
                    (cloudState.active.gameStage === gameStage.challenges)
                    &&
                    (
                        (
                            // If relic deck is NOT complete
                            (cloudState.active.progressRelic < 10)
                            // &&
                            // (
                            //     // If Villin or Location deck is complete
                            //     cloudState.active.progressVillain > 10
                            //     ||
                            //     cloudState.active.progressLocation > 10
                            // )
                        )
                        &&
                        (cloudState.active.teamHealth <= 0)
                    )
                )
                    ?
                    gameStage.failure
                    :
                    false
            )
        }

        const setEND = () => {
            return (
                (
                    [
                        gameStage.victory,
                        gameStage.failure
                    ]
                        .includes
                        (
                            cloudState.active.gameStage
                        )
                )
                    ?
                    gameStage.end
                    :
                    false
            )
        }

        if (activePlayerChecker()) {
            const trueArray = [
                setINTRO(),
                setBRIEF(),
                setTRANSPORT(),
                false,  // setCHALLENGES(),
                setVICTORY(),
                setFAILURE(),
                setEND(),
                gameStage.default
            ]
            const returnIndex = trueArray
                .findIndex
                (
                    returnValue => returnValue !== false
                )
            return (trueArray[returnIndex])
        }

    }







    if (activePlayerChecker()) {
        const newGameStage = gameStageSelection()
        const newBriefingStage = briefingStageSelection(direction)

        switch (cloudState.active.gameStage) {
            case gameStage.intro:
                startUpdateGameStage(localState.hostKey, newGameStage)
                gameStageActions()
                break;
            case gameStage.briefing:
                startUpdateBriefingStage(localState.hostKey, newBriefingStage)
                briefingStageActions(newBriefingStage)
                break;
            // case gameStage.transport:
            //     break;
            case gameStage.challenges:
                turnStageActions()
                const newTurnStage = turnStageSelection()
                startUpdateTurnStage(localState.hostKey, newTurnStage)
                if ([gameStage.victory, gameStage.failure].includes(newGameStage)) {
                    startUpdateGameStage(localState.hostKey, newGameStage)
                }
                break;
            case gameStage.victory:
            case gameStage.failure:
                startUpdateGameStage(localState.hostKey, newGameStage)
                break;
            default:
                console.log('hit default on clickForNext, pls fix');
                // reloadPage()
                break;
        }
    }


}

export default clickForNext