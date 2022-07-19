import React from "react";
import { startMarkTurnComplete, startUpdateGameStage } from "../../../actions/gameActions";
import { auth } from "../../../firebase/firebase";

const PassTurn = ({ gameState, resetStages }) => {
    let isActivePlayer = (gameState.activePlayer ?
        (gameState.activePlayer.uid !== auth.currentUser.uid)
        :
        true
    )


    const passTurn = () => {
        startMarkTurnComplete(
            gameState.host,
            gameState.key,
            [gameState.activePlayer.uid].concat(
                gameState.readyList
            ))
    }

    return (
        <div>
            <button
                onClick={() => { passTurn() }}
                disabled={isActivePlayer}
            >
                Pass Turn
            </button>
            <button
                onClick={() => { resetStages() }}
            >Reset Stages</button>
        </div>
    )
}

export default PassTurn