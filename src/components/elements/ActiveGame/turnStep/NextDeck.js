import React from "react";
import { startUpdateBriefingStage } from "../../../../actions/cloudActions";
import { nextDeck } from "../../../functions/briefingStages";

const NextDeck = ({ gameState }) => {
    return (
        <button
            onClick={() => {
                startUpdateBriefingStage(
                    gameState.hostKey,
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