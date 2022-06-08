import React from "react";
import { charClassTitles, charTitles } from "../../../classes/charInfo";

export const PlayingAs = ({ userState, charState }) => (
    <div>
        {userState.currentCharacterID ?
            'Playing as ' + charState.charName + ' the ' + charClassTitles[charState.classCode] + [charTitles[charState.questCount]]
            :
            'Please select or create a character'
        }
        {userState.host && ' (host)'}

    </div>
)

export default PlayingAs

//         {'  ' + userState.currentCharacterID}