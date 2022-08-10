import React, { useEffect, useState } from "react";

const ActionToken = ({ player, tokenArray, activeTokenArray, spendToken, unspendToken }) => {
    const [hasToken, setHasToken] = useState(false)
    const [tokenSpentNow, setTokenSpentNow] = useState(false)
    const hasTokenText = (hasToken ? ' action token' : ' token spent')

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



    return (
        <span>
            <span>
                <button
                    disabled={!hasToken}
                    onClick={spendToken}
                >
                    {player.charName}{hasTokenText}
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