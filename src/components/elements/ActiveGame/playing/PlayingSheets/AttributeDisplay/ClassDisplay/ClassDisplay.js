import React from "react";
import { asA, asAn, charBlurb, classBard, classPriest, classRogue, classWarrior, classWizard, modifiedByAn, raceCodes, raceStingers, raceTitles } from "../../../../../CharacterSheet/classes/charInfo";
import BardClassDisplay from "./BardClassDisplay";
import PriestClassDisplay from "./PriestClassDisplay";
import RogueClassDisplay from "./RogueClassDisplay";
import WarriorClassDisplay from "./WarriorClassDisplay";
import WizardClassDisplay from "./WizardClassDisplay";

const ClassDisplay = ({ charState }) => {


  return (
    <div>
      {(charState.raceCode > 0 && charState.classCode < 5) &&
        <span>
          <p>
            {modifiedByAn.includes(charState.raceCode) ?
              asAn
              :
              asA
            }
            {raceTitles[charState.raceCode]}
            {charBlurb[charState.classCode]}
          </p>
          <p>
            {(raceStingers[charState.classCode])[raceCodes[charState.classCode].indexOf(charState.raceCode)]}

            {charState.classCode === classBard &&
              <BardClassDisplay charState={charState} />
            }

            {charState.classCode === classPriest &&
              <PriestClassDisplay charState={charState} />
            }

            {charState.classCode === classRogue &&
              <RogueClassDisplay charState={charState} />
            }

            {charState.classCode === classWarrior &&
              <WarriorClassDisplay charState={charState} />
            }

            {charState.classCode === classWizard &&
              <WizardClassDisplay charState={charState} />
            }
          </p>


        </span>
      }
    </div>
  )
}

export default ClassDisplay