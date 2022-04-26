import React, { useContext, useEffect, useState } from "react";
import { useReducer } from "react";
// import PickChallengeObject from "./Challenges/PickChallengeObject";
import { villainFlavorArray, villainObjectsArray, villainTitleArray } from "../mission-elements/m-villain";
import { setVillainObject } from "../../actions/challengeSelectActions";
import challengeTransformer from "../../reducers/challengeTransformer";
import PickChallengeObject from './Challenges/PickChallengeObject';

const ChallengeOptions = (
    {
        challengeObjectArray,
        challengeDispatch
    }
) => {

    const onClick = (challengeCode) => {
        // When the button for one of the 
        const challengeObject =
            challengeTransformer(challengeObjectArray, challengeCode)

        challengeDispatch(challengeObject)
    }

    return (
        <div>
            {challengeObjectArray.map((challenge) => {
                return <PickChallengeObject
                    key={challenge.challengeCode}
                    selectChallenge={() => { onClick(challenge.challengeCode) }}
                    {...challenge}
                />
            })}

        </div>
    )

}

export { ChallengeOptions as default }

// <button onClick={selectVillain}>Set villain</button>