import React from "react";
import {
    assistTitles,
    charClassTitles,
    raceTitles,
    specialTargetArray,
    toolTitles
} from "../../CharacterSheet/classes/charInfo";


const IntroCharacter = ({ character }) => (
    <div>
        <div>
            {character && (`My character is named ${character.charName}`)}

        </div>
        <div>
            {character && (`I'm a ${raceTitles[character.raceCode]} ${charClassTitles[character.classCode]}`)}
        </div>
        <div>
            {(character.classCode >= 0 && character.toolCode < 7) &&
                (`I'm especially effective against ${specialTargetArray[character.classCode]} challenges because of my ${(toolTitles[character.classCode])[character.toolCode]}`)}
        </div>
        <div>
            {character.assistCode < 7 &&
                (`I usually assist teammates with my ${(assistTitles[character.classCode])[character.assistCode]}`)}
        </div>
    </div>
)

export default IntroCharacter