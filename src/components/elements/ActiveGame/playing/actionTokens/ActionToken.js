import React, { useEffect, useState } from "react";
import { stats } from "../../../CharacterSheet/classes/charInfo";
import postAssistArray from "../../turnStep/turnStepArrays/postAssistArray";
import assistStages from "../../turnStep/turnStepArrays/assistStages"


const ActionToken = ({
    player,
    activeUID,
    stage,
    tokenArray,
    activeTokenArray,
    spendToken,
    unspendToken,
}) => {
    const [unspentToken, setUnspentToken] = useState(false)
    const [hasToken, setHasToken] = useState(true)
    const [tokenSpentNow, setTokenSpentNow] = useState(false)
    const preAssistValue = stats[player.classCode].preAssist
    const postAssistValue = stats[player.classCode].postAssist
    const [assistValue, setAssistValue] = useState(preAssistValue)

    const hasTokenText = () => {
        if (!unspentToken) {
            return ' token spent'
        } else {
            return ' action token'
        }
    }


    useEffect(() => {
        // If the player associated with this token has not spent the token
        // it will show up in the available 'tokenArray', matching on UID
        const tempUnspentToken = (tokenArray.filter(character => character.uid === player.uid).length > 0)
        setUnspentToken(tempUnspentToken)

        // Is the active player the owner of this token?
        const nonActiveToken = (activeUID !== player.uid)

        // Is this a stage that allows assistance?
        const assistStage = (assistStages.includes(stage))

        // Is this token unspent AND belongs to a non Active Player AND is this an assist stage?
        // If yes, this token is available to spend during an assist stage
        setHasToken((tempUnspentToken && nonActiveToken && assistStage))
        console.log('Player', player.charName, 'tempUnspentToken', tempUnspentToken, 'nonActiveToken', nonActiveToken, 'assistStage', assistStage)
    }, [tokenArray, player, activeUID])

    // Is this player in the array of players who spent their action token
    // in this turn step? (allows take-backsies)
    useEffect(() => {
        setTokenSpentNow(activeTokenArray.filter(character => character.uid === player.uid).length > 0)
    }, [activeTokenArray, player])

    // When the stage updates, check whether the roll has already occurred
    // if it has, update the assist values. Maintain the new values until 
    // the next turn
    useEffect(() => {
        setAssistValue(
            postAssistArray.includes(stage)
                ?
                postAssistValue
                :
                preAssistValue
        )
    }, [stage])

    return (
        <span>
            <span>
                <button
                    disabled={!hasToken}
                    onClick={spendToken}
                >
                    {player.charName}{hasTokenText()}: +{assistValue}
                </button>
            </span>
            <span>
                {tokenSpentNow &&
                    <button
                        onClick={unspendToken}
                    >
                        Unspend Action Token
                    </button>
                }
            </span>
        </span>

    )
}

export default ActionToken

