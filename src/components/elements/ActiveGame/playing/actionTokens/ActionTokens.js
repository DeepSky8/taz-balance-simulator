import React, { useEffect, useState } from "react";
import { startSpendActionToken, startSpendAssistToken, startUNspendActionToken, startUNspendAssistToken } from "../../../../../actions/cloudActions";
import { auth } from "../../../../../firebase/firebase";
import ActionToken from "./ActionToken";
import assistStages from "../../turnStep/turnStepArrays/assistStages";
import tokenStages from "../../turnStep/turnStepArrays/tokenStages";
import challengeItemStages from "../../turnStep/turnStepArrays/challengeItemStages";

const ActionTokens = ({ cloudState, localState }) => {
    const [isAssistToken, setIsAssistToken] = useState(false)
    const [acceptingTokens, setAcceptingTokens] = useState(false)
    const [displayActionTokens, setDisplayActionTokens] = useState(false)

    useEffect(() => {
        // Monitor the turnStage; if an action token is spent
        // to assist another player, add this action token to a special array
        // so that the assistance can be described by the assisting player
        // in a special turnStage
        if (assistStages.includes(cloudState.currentTurn.turnStage)) {
            setIsAssistToken(true)
        } else {
            setIsAssistToken(false)
        }

        // If the challenge has a noAssist flag
        // or if a player has already put in their token
        // or if it has a doubleAssist flag and _two_ players
        // have already put in their tokens
        // or if the current Challenge doesn't require a token to engage
        // do not allow additional assist tokens to be added to the list
        setAcceptingTokens(() => {
            if (tokenStages.includes(cloudState.currentTurn.turnStage)) {
                if (localState.currentChallenge.noAssist) {
                    return false
                } else if (cloudState.activeAssistTokens.length < 1) {
                    return true
                } else if (
                    (localState.currentChallenge.doubleAssist)
                    &&
                    (cloudState.activeAssistTokens.length < 2)
                ) {
                    return true
                } else if (localState.currentChallenge.requiresToken) {
                    return true
                } else {
                    return false
                }
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
        if (
            (assistStages.includes(cloudState.currentTurn.turnStage))
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
        if (playerUID === auth.currentUser.uid) {
            if ((
                playerUID !== cloudState.active.activeUID &&
                isAssistToken &&
                acceptingTokens
            )
                ||
                (
                    playerUID === cloudState.active.activeUID &&
                    !isAssistToken &&
                    acceptingTokens
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