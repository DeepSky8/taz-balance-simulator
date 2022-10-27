import React from "react";
import { stats } from "../classes/charInfo";

const Stats = ({ charState }) => {
    let classStats = stats[charState.classCode]

    return (

        <div id="stats">
            <p>
                {classStats && 'Strength against Challenges: ' + classStats.strength}<br />
                {classStats && `Strength against ${classStats.specialTarget} Challenges: ` + classStats.specialStrength}<br />
                {classStats && 'Assist BEFORE die roll: ' + classStats.preAssist}<br />
                {classStats && 'Assist AFTER die roll: ' + classStats.postAssist}<br />
            </p>
        </div>
    )

}
export default Stats
