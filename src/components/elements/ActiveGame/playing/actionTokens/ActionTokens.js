import React from "react";
import ActionToken from "./ActionToken";

const ActionTokens = ({ gameState }) => {

    return (
        <div>
            {gameState.playerList.map((player) => {
                <ActionToken
                    key={player.uid}
                    player={player}
                    tokenArray={gameState.hasActionToken}
                />
            })}
        </div>
    )
}

export default ActionTokens