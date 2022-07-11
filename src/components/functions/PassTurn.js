import React from "react";
import { startMarkTurnComplete } from "../../actions/gameActions";

const PassTurn = ({ gameState }) => {

    const passTurn = () => {
        startMarkTurnComplete(
            gameState.host,
            gameState.key,
            [gameState.activePlayer.uid].concat(
                gameState.readyList
            ))
    }

    return (
        <button
            onClick={() => { passTurn() }}>
            Pass Turn
        </button>
    )
}

export default PassTurn