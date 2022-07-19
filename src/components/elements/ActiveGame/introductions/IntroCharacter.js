import React from "react";
import { charClassTitles, raceTitles, stats, toolTitles } from "../../CharacterSheet/classes/charInfo";


const IntroCharacter = ({ character}) => (
        <div>
            <div>
                {character && (`My character is named ${character.charName}`)}

            </div>
            <div>
                {character && (`I'm a ${raceTitles[character.raceCode]} ${charClassTitles[character.classCode]}`)}
            </div>
            <div>
                {(character.classCode && character.toolCode) &&
                    (`I'm especially effective against ${(stats[character.classCode]).specialTarget} challenges because of my ${(toolTitles[character.classCode])[character.toolCode]}`)}
            </div>
        </div>
    )

export default IntroCharacter