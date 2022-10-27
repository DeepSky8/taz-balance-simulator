import React from "react";
import { bardAssistMusic } from "../../../../../CharacterSheet/classes/bardInfo";

const BardAssistDisplay = ({ charState }) => (
  <span>
    {charState.assistCode === bardAssistMusic &&
      ` I play ${charState.bardInstrument} and ${charState.bardMusicSkill}.`
    }
  </span>
)

export default BardAssistDisplay