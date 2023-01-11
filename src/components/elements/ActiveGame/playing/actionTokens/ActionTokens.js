import React, { useEffect, useState } from "react";
import { startSpendActionToken, startSpendAssistToken, startUnpickTokenChallenge, startUNspendActionToken, startUNspendAssistToken } from "../../../../../actions/cloudActions";
import { auth } from "../../../../../firebase/firebase";
import ActionToken from "./ActionToken";
import assistStages from "../../turnStep/turnStepItems/assistStages";
import tokenStages from "../../turnStep/turnStepItems/tokenStages";
import challengeItemStages from "../../turnStep/turnStepItems/challengeItemStages";
import actionStages from "../../turnStep/turnStepItems/actionStages";
import { tokenClassesActionOne, tokenClassesActionTwo } from "../../../CharacterSheet/classes/charInfo";
import { defaultCharState } from "../../../../../reducers/charReducer";
import turnStage from "../../turnStep/turnStepItems/turnStage";

const ActionTokens = ({ cloudState, localState }) => {
    const [isAssistToken, setIsAssistToken] = useState(false)
    const [acceptingTokens, setAcceptingTokens] = useState(false)
    const [displayActionTokens, setDisplayActionTokens] = useState(false)


    useEffect(() => {
        let activeChar = {
            ...defaultCharState
        }
        if (localState.teamCharArray && localState.activeIndex) {
            activeChar = localState.teamCharArray[localState.activeIndex]
        }

        // Monitor the turnStage; if an action token is spent
        // to assist another player, add this action token to a special array
        // so that the assistance can be described by the assisting player
        // during the appropriate turnStage
        if (assistStages.includes(cloudState.currentTurn.turnStage)) {
            setIsAssistToken(true)
        } else {
            setIsAssistToken(false)
        }


        setAcceptingTokens(() => {
            if (tokenStages.includes(cloudState.currentTurn.turnStage)) {


                const challengeRequiresToken = () => {
                    return (
                        // If the turnStage is CHALLENGE
                        (turnStage.pickChallenge === cloudState.currentTurn.turnStage)
                        &&
                        // AND the challenge requires a token to engage
                        (localState.currentChallenge.requiresToken)
                    )
                }

                const acceptAssist = () => {
                    return (
                        // If the turnStage is PREASSIST or POSTASSIST
                        (assistStages.includes(cloudState.currentTurn.turnStage))
                        &&
                        (
                            // AND the challenge allows assistance
                            !(localState.currentChallenge.noAssist)
                        )
                        &&
                        (
                            // AND the list of active assist tokens is less than 1
                            (cloudState.activeAssistTokens.length < 1)
                            ||
                            (
                                // OR the doubleAssist flag is set 
                                (localState.currentChallenge.doubleAssist)
                                &&
                                // and the list of active assist tokens is less than 2
                                (cloudState.activeAssistTokens.length < 2)
                            )

                        )

                    )
                }

                const actionSteps = () => {
                    return (
                        // If the turnStage is ACTIONONE or ACTIONTWO
                        // and the active player class code is in the list of 
                        // classes that can perform an action at that time.
                        (
                            (turnStage.actionTokenOne === cloudState.currentTurn.turnStage)
                            &&
                            (tokenClassesActionOne.includes(activeChar.classCode))
                        )
                        ||
                        (
                            (turnStage.actionTokenTwo === cloudState.currentTurn.turnStage)
                            &&
                            (tokenClassesActionTwo.includes(activeChar.classCode))
                        )
                    )
                }

                return (
                    challengeRequiresToken()
                    ||
                    acceptAssist()
                    ||
                    actionSteps()
                )

            } else {
                return false
            }
        })

    }, [
        localState.currentChallenge,
        cloudState.activeAssistTokens,
        cloudState.currentTurn.turnStage
    ])

    useEffect(() => {
        // Control when tokens are visible, based on the current turnStage
        // and/or if a particular challenge requires a token to engage
        if (
            ((assistStages.concat(actionStages)).includes(cloudState.currentTurn.turnStage))
            ||
            (
                // console.log('fired useEffect in ActionTokens', cloudState.currentTurn.turnStage, )
                (challengeItemStages.includes(cloudState.currentTurn.turnStage))
                &&
                (
                    cloudState.currentTurn.villain[cloudState.currentTurn.villain.visible].requiresToken
                    ||
                    cloudState.currentTurn.relic[cloudState.currentTurn.relic.visible].requiresToken
                    ||
                    cloudState.currentTurn.location[cloudState.currentTurn.location.visible].requiresToken
                )
            )
        ) {
            setDisplayActionTokens(true)
        } else {
            setDisplayActionTokens(false)
        }
    }, [
        cloudState.currentTurn.villain,
        cloudState.currentTurn.relic,
        cloudState.currentTurn.location,
        cloudState.currentTurn.turnStage
    ])

    const actuallySpendIt = (playerUID) => {
        const updatedHasActionToken = cloudState.hasActionToken.filter((player) => {
            return player.uid !== playerUID
        })
        const spentActionToken = cloudState.hasActionToken.filter((player) => {
            return player.uid === playerUID
        })
        startSpendActionToken(
            localState.hostKey,
            updatedHasActionToken,
            spentActionToken.concat(cloudState.activeActionTokens)
        )
        if (isAssistToken) {
            startSpendAssistToken(
                localState.hostKey,
                spentActionToken.concat(cloudState.activeAssistTokens)
            )
        }
    }

    const spendToken = (playerUID) => {
        if (playerUID === auth.currentUser.uid
            &&
            acceptingTokens
        ) {
            if (
                (
                    playerUID !== cloudState.active.activeUID &&
                    isAssistToken
                )
                ||
                (
                    playerUID === cloudState.active.activeUID &&
                    !isAssistToken
                )) {

                actuallySpendIt(playerUID)
            }
        }
    }

    const unspendToken = (playerUID) => {
        if (playerUID === auth.currentUser.uid) {
            const unspendThisToken = cloudState.playerList.filter((player) => {
                return player.uid === playerUID
            })
            const newSpentActionTokensArray = cloudState.activeActionTokens.filter((player) => {
                return player.uid !== playerUID
            })
            startUNspendActionToken(
                localState.hostKey,
                unspendThisToken.concat(cloudState.hasActionToken),
                newSpentActionTokensArray
            )
            if (turnStage.pickChallenge === cloudState.currentTurn.turnStage) {
                startUnpickTokenChallenge(localState.hostKey)
            }
            if (isAssistToken) {
                const newSpentAssistTokensArray = cloudState.activeAssistTokens.filter((player) => {
                    return player.uid !== playerUID
                })
                startUNspendAssistToken(
                    localState.hostKey,
                    newSpentAssistTokensArray
                )
            }
        }
    }

    return (
        <span>
            {displayActionTokens
                &&
                cloudState.playerList.map((player) => {
                    return (
                        <ActionToken
                            key={player.uid}
                            player={player}
                            activeUID={cloudState.active.activeUID}
                            tokenArray={cloudState.hasActionToken}
                            activeTokenArray={cloudState.activeActionTokens}
                            spendToken={() => { spendToken(player.uid) }}
                            unspendToken={() => { unspendToken(player.uid) }}
                            stage={cloudState.currentTurn.turnStage}

                        />
                    )
                })}
        </span>
    )
}

export default ActionTokens