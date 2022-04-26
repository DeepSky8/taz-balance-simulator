import React from "react";

const PickChallengeObject = ({ selectChallenge, challengeName, challengeFlavor }) => (
    <div>
        <p>
            <button onClick={selectChallenge}>Battle {challengeName}</button>
        </p>
        <p>{challengeFlavor}</p>
    </div>
)

export { PickChallengeObject as default }