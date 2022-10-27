import React from "react";
import { raceTitles } from "../../../../../CharacterSheet/classes/charInfo";

const WizardClassDisplay = ({ charState }) => (
  <span>
    {charState.raceCode === raceTitles.indexOf('Undead') &&
      ` I died ${charState.undeadWizardOrigin1}. I came back ${charState.undeadWizardOrigin2}. I appear to be ${charState.undeadWizardOrigin3}.`
    }
  </span>
)


export default WizardClassDisplay