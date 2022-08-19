import React from "react";
import ActionTokens from "./actionTokens/ActionTokens";
import ChallengeFrame from "./challenges/ChallengeFrame";

const Playing = ({ cloudState, children }) => {


    return (
        <div>
            <span>Team Health: {cloudState.active.teamHealth}</span>
            <ActionTokens
                gameState={cloudState}
            />
            {children}
        </div>
    )
}

export default Playing

//style={{ align: 'right' }}

// <ChallengeFrame
// gameState={gameState}
// deckUncompletedVillain={deckUncompletedVillain}
// deckUncompletedRelic={deckUncompletedRelic}
// deckUncompletedLocation={deckUncompletedLocation}
// />