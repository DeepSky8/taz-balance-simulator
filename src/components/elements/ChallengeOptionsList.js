import React from "react";
import challengeTransformer from "../../reducers/challengeTransformer";
import PickChallengeObject from './Challenges/PickChallengeObject';

const ChallengeOptionsList = (
    {
        challengeObjectArray,
        challengeDispatch,
        joining
    }
) => (
    <div>
        {challengeObjectArray.map((challenge) => {
            return <PickChallengeObject
                key={challenge.challengeCode}
                selectChallenge={() => { challengeDispatch(challenge) }}
                joining={joining}
                {...challenge}
            />
        })}
    </div>
)

export { ChallengeOptionsList as default }