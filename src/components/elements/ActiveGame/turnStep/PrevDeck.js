import React from "react";
import { startUpdateBriefingStage } from "../../../../actions/cloudActions";
import { prevDeck } from "../../../functions/briefingStages";

const PrevDeck = ({ gameState }) => {
    return (
        <button
            onClick={() => {
                startUpdateBriefingStage(
                    gameState.static.host,
                    gameState.static.key,
                    prevDeck(gameState.backstory.briefingStage
                    ))
            }}
            disabled={gameState.backstory.briefingStage === 'VILLAIN'}
        >
            Previous
        </button>
    )
}

export default PrevDeck