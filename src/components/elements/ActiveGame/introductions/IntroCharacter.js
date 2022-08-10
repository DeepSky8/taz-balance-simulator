import React from "react";
import { assistTitles, charClassTitles, raceTitles, stats, toolTitles } from "../../CharacterSheet/classes/charInfo";


const IntroCharacter = ({character}) => (
    <div>
        <div>
            {character && (`My character is named ${character.charName}`)}

        </div>
        <div>
            {character && (`I'm a ${raceTitles[character.raceCode]} ${charClassTitles[character.classCode]}`)}
        </div>
        <div>
            {(character.classCode >= 0 && character.toolCode) &&
                (`I'm especially effective against ${(stats[character.classCode]).specialTarget} challenges because of my ${(toolTitles[character.classCode])[character.toolCode]}`)}
        </div>
        <div>
        {character.assistCode &&
        (`I usually assist teammates with my ${(assistTitles[character.classCode])[character.assistCode]}`)}
        </div>
    </div>
)

export default IntroCharacter