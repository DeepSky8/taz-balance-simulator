import React from "react";
import PassTurn from "./PassTurn";

const ActiveCharWrapper = ({ gameState, children }) => {

    return (
        <div>
            Active Char Name - color matches char type:  
            {gameState.activePlayer && gameState.activePlayer.currentCharacterID}
            {children}
        </div>
    )
}


export default ActiveCharWrapper

