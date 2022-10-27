import React from "react";
import { raceTitles } from "../../../../../CharacterSheet/classes/charInfo";

const PriestClassDisplay = ({ charState }) => (
  <span>
    {charState.raceCode === raceTitles.indexOf('Dwarf') &&
      ` I am from ${charState.dwarfPriestOrigin}.`
    }
  </span>
)


export default PriestClassDisplay