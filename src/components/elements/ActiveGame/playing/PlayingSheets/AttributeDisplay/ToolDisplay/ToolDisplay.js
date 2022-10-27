import React from "react";
import {
  classBard,
  classPriest,
  classRogue,
  classWarrior,
  classWizard,
  stingerQuestions,
  toolBlurb,
  toolStingers,
  toolTitles
} from "../../../../../CharacterSheet/classes/charInfo";
import BardToolDisplay from "./BardToolDisplay";
import PriestToolDisplay from "./PriestToolDisplay";
import RogueToolDisplay from "./RogueToolDisplay";
import WarriorToolDisplay from "./WarriorToolDisplay";
import WizardToolDisplay from "./WizardToolDisplay";

const ToolDisplay = ({ charState }) => (
  <div>
    {(charState.toolCode < 7 && charState.classCode < 5) &&
      <span>
        <p>
          {toolBlurb[charState.classCode]}{(toolTitles[charState.classCode])[charState.toolCode]}. {!(((stingerQuestions[charState.classCode]).tool).includes(charState.toolCode)) && (toolStingers[charState.classCode])[charState.toolCode]}
        </p>
        {(((stingerQuestions[charState.classCode]).tool).includes(charState.toolCode)) &&
          <p>
            {(toolStingers[charState.classCode])[charState.toolCode]}

            {charState.classCode === classBard &&
              <BardToolDisplay charState={charState} />
            }

            {charState.classCode === classPriest &&
              <PriestToolDisplay charState={charState} />
            }

            {charState.classCode === classRogue &&
              <RogueToolDisplay charState={charState} />
            }

            {charState.classCode === classWarrior &&
              <WarriorToolDisplay charState={charState} />
            }

            {charState.classCode === classWizard &&
              <WizardToolDisplay charState={charState} />
            }
          </p>}


      </span>
    }
  </div>
)


export default ToolDisplay