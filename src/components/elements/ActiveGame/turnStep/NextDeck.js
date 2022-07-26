import React from "react";
import { startUpdateBriefingStage } from "../../../../actions/gameActions";
import { nextDeck } from "../../../functions/briefingStages";

const NextDeck = ({ gameState }) => {
    return (
        <button
            onClick={() => {
                startUpdateBriefingStage(
                    gameState.static.host,
                    gameState.static.key,
                    nextDeck(
                        gameState.backstory.briefingStage
                    ))
            }}
            disabled={gameState.backstory.briefingStage === 'NEXT'}
        >
            Next
        </button>
    )
}

export default NextDeck