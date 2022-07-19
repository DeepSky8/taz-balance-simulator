import React from "react";

const ActiveCharWrapper = ({ activePlayer }) => (
    <div>
        Active Char Name - color matches char type:
        {activePlayer && activePlayer.currentCharacterID}
    </div>
)



export default ActiveCharWrapper

