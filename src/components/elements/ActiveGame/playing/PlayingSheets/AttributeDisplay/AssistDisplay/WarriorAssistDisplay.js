import React from "react";
import { warriorAssistFame } from "../../../../../CharacterSheet/classes/warriorInfo";

const WarriorAssistDisplay = ({ charState }) => (
  <span>
    {charState.assistCode === warriorAssistFame &&
      ` I'm famous because ${charState.warriorAssistFame} and it helps because ${charState.warriorAssistFameHelps}.`
    }
  </span>
)

export default WarriorAssistDisplay