import React from "react";
import { rogueToolCatchphrase } from "../../../../../CharacterSheet/classes/rogueInfo";

const RogueToolDisplay = ({ charState }) => (
  <span>
    {charState.toolCode === rogueToolCatchphrase &&
      ` My catchphrase is "${charState.rogueToolCatchphrase}"`
    }
  </span>
)

export default RogueToolDisplay