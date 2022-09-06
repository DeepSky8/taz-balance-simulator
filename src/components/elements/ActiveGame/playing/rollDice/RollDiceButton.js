import React from "react";
import diceRoll from "../../../../functions/diceRoll";

const RollDiceButton = () => {

    return (
        <div>
            <button
                onClick={() => { diceRoll() }}
            >Roll Dice</button>
        </div>
    )
}

export default RollDiceButton