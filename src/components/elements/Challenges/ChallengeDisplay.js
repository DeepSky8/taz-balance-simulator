import React from "react";
import challengeTransformer from "../../functions/challengeTransformer";
import { locationObjectsArray } from "./mission-elements/m-location";
import { relicObjectsArray } from "./mission-elements/m-relic";
import { villainObjectsArray } from "./mission-elements/m-villain";

const ChallengeDisplay = ({ gameState }) => {

    return (
        <div>
            {gameState.challengesObject.villainCode && challengeTransformer(villainObjectsArray, gameState.challengesObject.villainCode).challengeName + ' | '}
            {gameState.challengesObject.relicCode && challengeTransformer(relicObjectsArray, gameState.challengesObject.relicCode).challengeName + ' | '}
            {gameState.challengesObject.locationCode && challengeTransformer(locationObjectsArray, gameState.challengesObject.locationCode).challengeName}
        </div>
    )
}

export default ChallengeDisplay