import React from "react";
import { stats } from "../classes/charInfo";

const Stats = ({ charState }) => {
    let classStats = stats[charState.classCode]

    return (

        <div id="stats">
            <p>
                {'Strength against Challenges: ' + classStats.strength}<br />
                {`Strength against ${classStats.specialTarget} Challenges: ` + classStats.specialStrength}<br />
                {'Assist BEFORE die roll: ' + classStats.preAssist}<br />
                {'Assist AFTER die roll: ' + classStats.postAssist}<br />

            </p>
        </div>
    )

}
export default Stats