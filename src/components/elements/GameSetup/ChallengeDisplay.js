import React from "react";
import challengeTransformer from "../../functions/challengeTransformer";
import { locationObjectsArray } from "../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../Challenges/mission-elements/m-villain";

const ChallengeDisplay = ({ gameState }) => {
    return (
        <div>
            {gameState.static.codeVillain && 
                challengeTransformer(
                    villainObjectsArray, gameState.static.codeVillain).challengeName + ' | '}
            {gameState.static.codeRelic && 
                challengeTransformer(
                    relicObjectsArray, gameState.static.codeRelic).challengeName + ' | '}
            {gameState.static.codeLocation && 
                challengeTransformer(
                    locationObjectsArray, gameState.static.codeLocation).challengeName}
        </div>
    )
}

export default ChallengeDisplay