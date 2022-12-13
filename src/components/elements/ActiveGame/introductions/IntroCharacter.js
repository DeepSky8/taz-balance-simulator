import React from "react";
import {
    assistTitles,
    charClassTitles,
    raceTitles,
    specialTargetArray,
    toolTitles
} from "../../CharacterSheet/classes/charInfo";


const IntroCharacter = ({ localState }) => {
    let activeChar = localState.teamCharArray[localState.activeIndex]

    return (
        <div>
            <div>
                {activeChar && (`My character is named ${activeChar.charName}`)}

            </div>
            <div>
                {activeChar && (`I'm a ${raceTitles[activeChar.raceCode]} ${charClassTitles[activeChar.classCode]}`)}
            </div>
            <div>
                {(activeChar.classCode >= 0 && activeChar.toolCode < 7) &&
                    (`I'm especially effective against ${specialTargetArray[activeChar.classCode]} challenges because of my ${(toolTitles[activeChar.classCode])[activeChar.toolCode]}`)}
            </div>
            <div>
                {activeChar.assistCode < 7 &&
                    (`I usually assist teammates with my ${(assistTitles[activeChar.classCode])[activeChar.assistCode]}`)}
            </div>
        </div>
    )
}

export default IntroCharacter