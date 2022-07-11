import React from "react";
import PassTurn from "../../functions/PassTurn";

const ActiveCharWrapper = ({ gameState }) => {

    return (
        <div>
            Active Char Name - color matches char type:  
            {gameState.activePlayer && gameState.activePlayer.currentCharacterID}
            {<PassTurn gameState={gameState} />}
        </div>
    )
}


export default ActiveCharWrapper

