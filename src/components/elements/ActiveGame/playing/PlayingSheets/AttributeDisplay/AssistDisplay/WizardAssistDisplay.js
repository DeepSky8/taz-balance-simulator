import React from "react";
import { wizardAssistFame } from "../../../../../CharacterSheet/classes/wizardInfo";

const WizardAssistDisplay = ({ charState }) => (
  <span>
    {charState.assistCode === wizardAssistFame &&
      ` I'm famous because ${charState.wizardAssistFame} and it helps because ${charState.wizardAssistFameHelps}.`
    }
  </span>
)

export default WizardAssistDisplay