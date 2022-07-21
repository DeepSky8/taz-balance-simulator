import React from "react";
import { startMarkTurnComplete } from "../../../actions/gameActions";
import { auth } from "../../../firebase/firebase";

const PassTurn = ({ gameState}) => {
    let isActivePlayer = (gameState.active.activePlayer ?
        (gameState.active.activePlayer.uid !== auth.currentUser.uid)
        :
        true
    )


    const passTurn = () => {
        startMarkTurnComplete(
            gameState.static.host,
            gameState.static.key,
            [gameState.active.activePlayer.uid].concat(
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

        </div>
    )
}

export default PassTurn