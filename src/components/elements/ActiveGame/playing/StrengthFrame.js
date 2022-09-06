import React from "react";

const displayRoll = (roll) => {
    if (roll > 90) {
        return 'Success'
    } else if (roll < 0) {
        return 'Critical Failure'
    } else {
        return roll
    }
}

const StrengthFrame = ({ cloudState }) => {
    const { assist, character, ongoingItem, singleUseItem, story, total } = cloudState.strength
    const { rollOne, rollTwo } = cloudState.currentTurn
    // Implement tooltip that explains what numbers are used to calculate the current strength
    return (
        <span>
            Strength: {(
                total
                && displayRoll(total))
            }
            {rollOne &&
                'Roll Result: ' + displayRoll(rollOne)}
            {rollTwo &&
                'Second Roll Result: ' + displayRoll(rollTwo)}
        </span>
    )
}


export default StrengthFrame