import React from "react";
import { wizardToolCatchphrase } from "../../../../../CharacterSheet/classes/wizardInfo";

const WizardToolDisplay = ({ charState }) => (
  <span>
    {charState.toolCode === wizardToolCatchphrase &&
      ` My catchphrase is ${charState.wizardToolCatchphrase}.`
    }
  </span>
)

export default WizardToolDisplay