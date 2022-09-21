import React, { useEffect, useState } from "react";
import { startSpendActionToken, startSpendAssistToken, startUNspendActionToken, startUNspendAssistToken } from "../../../../../actions/cloudActions";
import { auth } from "../../../../../firebase/firebase";
import ActionToken from "./ActionToken";
import assistStages from "../../turnStep/turnStepArrays/assistStages";

const ActionTokens = ({ cloudState, localState }) => {
    const [isAssistToken, setIsAssistToken] = useState(false)
    const [acceptingTokens, setAcceptingTokens] = useState(false)

    // Monitor the turnStage; if an action token is spent
    // to assist another player, add this action token to a special array
    // so that the assistance can be described by the assisting player
    // in a special turnStage
    useEffect(() => {
        if (assistStages.includes(cloudState.currentTurn.turnStage)) {
            setIsAssistToken(true)
        } else {
            setIsAssistToken(false)
        }
    }, [cloudState.currentTurn.turnStage])

    // If the challenge has a noAssist flag
    // or if a player has already put in their token
    // or if it has a doubleAssist flag and _two_ players
    // have already put in their tokens
    // do not allow additional assist tokens to be added to the list
    useEffect(() => {
        setAcceptingTokens(() => {
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
            }
        })

    }, [
        localState.currentChallenge,
        cloudState.activeAssistTokens
    ])

    const actuallySpendIt = (playerUID) => {
        const updatedHasActionToken = cloudState.hasActionToken.filter((player) => {
            return player.uid !== playerUID
        })
        const spentActionToken = cloudState.hasActionToken.filter((player) => {
            return player.uid === playerUID
        })
        startSpendActionToken(
            cloudState.static.host,
            cloudState.static.key,
            updatedHasActionToken,
            spentActionToken.concat(cloudState.activeActionTokens)
        )
        if (isAssistToken) {
            startSpendAssistToken(
                cloudState.static.host,
                cloudState.static.key,
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
                cloudState.static.host,
                cloudState.static.key,
                unspendThisToken.concat(cloudState.hasActionToken),
                newSpentActionTokensArray
            )
            if (isAssistToken) {
                const newSpentAssistTokensArray = cloudState.activeAssistTokens.filter((player) => {
                    return player.uid !== playerUID
                })
                startUNspendAssistToken(
                    cloudState.static.host,
                    cloudState.static.key,
                    newSpentAssistTokensArray
                )
            }
        }
    }

    return (
        <span>
            {cloudState.playerList.map((player) => {
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