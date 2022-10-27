import React from "react";
import { bardToolBigGoal } from "../../../../../CharacterSheet/classes/bardInfo";
import { toolStingers } from "../../../../../CharacterSheet/classes/charInfo";

const BardToolDisplay = ({ charState }) => (
  <span>
    {charState.toolCode === bardToolBigGoal &&
      `${(toolStingers[charState.classCode])[charState.toolCode]}. My big goal is ${charState.bardSuperGoal}`
    }
  </span>
)

export default BardToolDisplay

