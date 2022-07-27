import React from "react";
import ActionTokens from "./actionTokens/ActionTokens";

const Playing = ({ gameState }) => {


    return (
        <div>
            <p>Team Health: </p>
            <p>{gameState.active.teamHealth}</p>
            <ActionTokens
                gameState={gameState}
            />
        </div>
    )
}

export default Playing