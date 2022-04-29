import React from "react";

const PickChallengeObject = ({ selectChallenge, joining, challengeName, challengeFlavor }) => (
    <div>
        <div>
            {
                joining ?
                    <h4>{challengeName}</h4>
                    :
                    <button onClick={selectChallenge}>{challengeName}</button>
            }
        </div>
        <p>{challengeFlavor}</p>
    </div>
)

export { PickChallengeObject as default }