import React, { useEffect, useState } from "react";
import { stats } from "../../../CharacterSheet/classes/charInfo";
import postAssistArray from "../../turnStep/turnStepArrays/postAssistArray";
import assistStages from "../../turnStep/turnStepArrays/assistStages"

// Is the player UID recorded in one of the player objects
// in the provided array: returns boolean
const matcher = (playerObject, array) => {
    const uidArray = [];
    array.forEach(character => {
        uidArray.push(character.uid)
    });
    return uidArray.includes(playerObject.uid)
}



const ActionToken = ({ 
    player, 
    activeUID, 
    stage, 
    tokenArray, 
    activeTokenArray, 
    spendToken, 
    unspendToken,
    doubleAssist,
    noAssist 
}) => {
    const [hasToken, setHasToken] = useState(false)
    const [tokenSpentNow, setTokenSpentNow] = useState(false)
    const preAssistValue = stats[player.classCode].preAssist
    const postAssistValue = stats[player.classCode].postAssist
    const [assistValue, setAssistValue] = useState(preAssistValue)
    const unspentToken = matcher(player, tokenArray)

    const hasTokenText = () => {
        if(!unspentToken){
            return ' token spent'
        } else {
            return ' action token'
        }
    }

    // Uses matcher function to determine if this player
    // is in the array of spendable-token players
    useEffect(() => {
        // const unspentToken = matcher(player, tokenArray)
        const notOwnToken = (activeUID !== player.uid)
        const assistStage = (assistStages.includes(stage))
        setHasToken((unspentToken && notOwnToken && assistStage))
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