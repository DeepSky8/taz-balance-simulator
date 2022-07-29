import React, { useEffect, useState } from "react";
import { startSpendActionToken, startSpendAssistToken, startUNspendActionToken, startUNspendAssistToken } from "../../../../../actions/gameActions";
import { auth } from "../../../../../firebase/firebase";
import ActionToken from "./ActionToken";

const ActionTokens = ({ gameState }) => {
    const [isAssistToken, setIsAssistToken] = useState(false)
    const assistStages = ['PREASSIST', 'POSTASSIST']

    // Monitor the turnStage; if an action token is spent
    // to assist another player, add this action token to a special array
    // so that the assistance can be described by the assisting player
    // in a special turnStage
    useEffect(() => {
        if (assistStages.includes(gameState.currentTurn.turnStage)) {
            setIsAssistToken(true)
        } else {
            setIsAssistToken(false)
        }
    }, [gameState.currentTurn.turnStage])

    const actuallySpendIt = (playerUID) => {
        const updatedHasActionToken = gameState.hasActionToken.filter((player) => {
            return player.uid !== playerUID
        })
        const spentActionToken = gameState.hasActionToken.filter((player) => {
            return player.uid === playerUID
        })
        startSpendActionToken(
            gameState.static.host,
            gameState.static.key,
            updatedHasActionToken,
            spentActionToken.concat(gameState.activeActionTokens)
        )
        if (isAssistToken) {
            startSpendAssistToken(
                gameState.static.host,
                gameState.static.key,
                spentActionToken.concat(gameState.activeAssistTokens)
            )
        }
    }

    const spendToken = (playerUID) => {
        if (playerUID === auth.currentUser.uid) {
            if (playerUID !== gameState.active.activeUID && isAssistToken) {
                actuallySpendIt(playerUID)
            } else if (playerUID === gameState.active.activeUID && !isAssistToken) {
                actuallySpendIt(playerUID)
            }
        }
    }

    const unspendToken = (playerUID) => {
        if (playerUID === auth.currentUser.uid) {
            const unspendThisToken = gameState.playerList.filter((player) => {
                return player.uid === playerUID
            })
            const newSpentActionTokensArray = gameState.activeActionTokens.filter((player) => {
                return player.uid !== playerUID
            })
            startUNspendActionToken(
                gameState.static.host,
                gameState.static.key,
                unspendThisToken.concat(gameState.hasActionToken),
                newSpentActionTokensArray
            )
            if (isAssistToken) {
                const newSpentAssistTokensArray = gameState.activeAssistTokens.filter((player) => {
                    return player.uid !== playerUID
                })
                startUNspendAssistToken(
                    gameState.static.host,
                    gameState.static.key,
                    newSpentAssistTokensArray
                )
            }
        }
    }

    return (
        <div>
            {gameState.playerList.map((player) => {
                return (
                    <ActionToken
                        key={player.uid}
                        player={player}
                        tokenArray={gameState.hasActionToken}
                        activeTokenArray={gameState.activeActionTokens}
                        spendToken={() => { spendToken(player.uid) }}
                        unspendToken={() => { unspendToken(player.uid) }}
                    />
                )
            })}
        </div>
    )
}

export default ActionTokens