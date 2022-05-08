import React from "react";
import PickChallengeObject from './PickChallengeObject';

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
                selectChallenge={() => { challengeDispatch(challenge.challengeCode) }}
                joining={joining}
                {...challenge}
            />
        })}
    </div>
)

export { ChallengeOptionsList as default }