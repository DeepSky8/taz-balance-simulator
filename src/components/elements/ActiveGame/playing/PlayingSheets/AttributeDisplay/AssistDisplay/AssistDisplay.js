import React from "react";
import { assistPrompt, assistStingers, assistTitles, classBard, classPriest, classRogue, classWarrior, classWizard, stingerQuestions } from "../../../../../CharacterSheet/classes/charInfo";
import BardAssistDisplay from "./BardAssistDisplay";
import PriestAssistDisplay from "./PriestAssistDisplay";
import WarriorAssistDisplay from "./WarriorAssistDisplay";
import WizardAssistDisplay from "./WizardAssistDisplay";

const AssistDisplay = ({ charState }) => {

  return (
    <span>

      {(charState.assistCode < 7 && charState.classCode < 5) &&
        <span>
          <p>
            {assistPrompt[charState.classCode]}{(assistTitles[charState.classCode])[charState.assistCode]}. {!(((stingerQuestions[charState.classCode]).assist).includes(charState.assistCode)) && (assistStingers[charState.classCode])[charState.assistCode]}
          </p>
          {(((stingerQuestions[charState.classCode]).assist).includes(charState.assistCode)) &&
            <p>
              {(assistStingers[charState.classCode])[charState.assistCode]}

              {charState.classCode === classBard &&
                <BardAssistDisplay charState={charState} />
              }

              {charState.classCode === classPriest &&
                <PriestAssistDisplay charState={charState} />
              }

              {charState.classCode === classWarrior &&
                <WarriorAssistDisplay charState={charState} />
              }

              {charState.classCode === classWizard &&
                <WizardAssistDisplay charState={charState} />
              }
            </p>}
        </span>
      }

    </span>
  )
}

export default AssistDisplay