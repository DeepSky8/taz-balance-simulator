import React from "react";
import KostcoDisplay from "../kostco/KostcoDisplay";
import ActionTokens from "./actionTokens/ActionTokens";
import ChallengeFrame from "./challenges/ChallengeFrame";
import RollDiceAnimation from "./rollDice/RollDiceAnimation";
import StrengthFrame from "./StrengthFrame";
import TeamHealth from "./TeamHealth";

const Gameboard = ({cloudState, localState}) => {

    return (
        <span>
            <TeamHealth
                teamHealth={cloudState.active.teamHealth}
            />
            <ActionTokens
                cloudState={cloudState}
                localState={localState}
            />
            {cloudState.currentTurn.showRoll &&
                <RollDiceAnimation />
            }
            <ChallengeFrame
                cloudState={cloudState}
                localState={localState}
            />
            <StrengthFrame
                cloudState={cloudState}
            />

        </span>
    )
}

export default Gameboard

// <KostcoStore
// cloudState={cloudState}
// localState={localState}
// />