import React, { useEffect, useState } from "react";

const ActionToken = ({player, tokenArray}) => {
    const [hasToken, setHasToken] = useState(false)

    const matcher = (playerObject, array) => {
        const uidArray = [];
        array.forEach(character => {
            uidArray.push(character.uid)
        });
        return uidArray.includes(playerObject.uid)
    }

    useEffect(() => {
        setHasToken(matcher(player, tokenArray))
    }, [tokenArray])

    const tokenAvailable = (
        <div>
            {player.classCode}
            : Token is available
        </div>
    )

    const tokenSpent = (
        <div>
            {player.classCode}
            : Token is spent
        </div>
    )

    return (
        <div>
            {hasToken ?
                tokenAvailable
                :
                tokenSpent
            }
        </div>
    )
}

export default ActionToken