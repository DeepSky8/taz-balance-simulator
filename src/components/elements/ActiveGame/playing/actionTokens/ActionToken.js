import React, { useEffect, useState } from "react";
import { stats } from "../../../CharacterSheet/classes/charInfo";

const ActionToken = ({ player, stage, tokenArray, activeTokenArray, spendToken, unspendToken }) => {
    const [hasToken, setHasToken] = useState(false)
    const [tokenSpentNow, setTokenSpentNow] = useState(false)
    const postAssistArray = [
        'POSTASSIST',
        'POST_ASSIST_SCENE',
        'EVALUATETWO',
        'DESCRIBE',
        'KOSTCO',
        'PASS'
    ]

    const hasTokenText = (hasToken ? ' action token' : ' token spent')
    const preAssistValue = stats[player.classCode].preAssist
    const postAssistValue = stats[player.classCode].postAssist

    const [assistValue, setAssistValue] = useState(preAssistValue)

    // Is the player UID recorded in one of the player objects
    // in the provided array: returns boolean
    const matcher = (playerObject, array) => {
        const uidArray = [];
        array.forEach(character => {
            uidArray.push(character.uid)
        });
        return uidArray.includes(playerObject.uid)
    }

    // Uses matcher function to determine if this player
    // is in the array of spendable-token players
    useEffect(() => {
        setHasToken(matcher(player, tokenArray))
    }, [tokenArray, player])

    // Uses matcher function to determine if this player
    // is in the array of players who spent their action token
    // in this turn step (allows take-backsies)
    useEffect(() => {
        setTokenSpentNow(matcher(player, activeTokenArray))
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
                    {player.charName}{hasTokenText}: +{assistValue}
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