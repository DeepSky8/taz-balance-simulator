import React from "react";
import { raceTitles } from "../../../../../CharacterSheet/classes/charInfo";

const RogueClassDisplay = ({ charState }) => (
  <span>
    {charState.raceCode === raceTitles.indexOf('Gerblin') &&
      ` I adventure because ${charState.gerblinRogueOrigin}.`
    }
  </span>
)


export default RogueClassDisplay