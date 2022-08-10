import React from "react";
import ActionTokens from "./actionTokens/ActionTokens";
import ChallengeFrame from "./challenges/ChallengeFrame";

const Playing = ({ gameState }) => {


    return (
        <div>
            <span>Team Health: {gameState.active.teamHealth}</span>
            <ActionTokens
                gameState={gameState}
            />
            <ChallengeFrame
                gameState={gameState}
            />
        </div>
    )
}

export default Playing

//style={{ align: 'right' }}