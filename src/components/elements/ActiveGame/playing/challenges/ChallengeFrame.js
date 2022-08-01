import React from "react";
import VillainChallenge from "./VillainChallenge";

const ChallengeFrame = ({ gameState }) => {

    return (
        <div>
            <VillainChallenge gameState={gameState} />
        </div>
    )
}

export default ChallengeFrame