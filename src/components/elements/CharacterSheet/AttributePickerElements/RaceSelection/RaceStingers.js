import React from "react";
import { classBard, classPriest, classRogue, classWarrior, classWizard, raceCodes, raceStingers } from "../../../../classes/charInfo";
import BardRaceStingers from "./RaceStingers/BardRaceStingers";
import PriestRaceStingers from "./RaceStingers/PriestRaceStingers";
import RogueRaceStingers from "./RaceStingers/RogueRaceStingers";
import WarriorRaceStingers from "./RaceStingers/WarriorRaceStingers";
import WizardRaceStingers from "./RaceStingers/WizardRaceStingers";


const RaceStingers = ({ charState, dispatchCharState }) => (
    <div className="raceStingers">

        {(raceStingers[charState.classCode])[raceCodes[charState.classCode].indexOf(charState.raceCode)]}

        <div id="bardStingers">
            {charState.classCode === classBard &&
                <BardRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="priestStingers">
            {charState.classCode === classPriest &&
                <PriestRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="rogueStingers">
            {charState.classCode === classRogue &&
                <RogueRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="warriorStingers">
            {charState.classCode === classWarrior &&
                <WarriorRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="wizardStingers">
            {charState.classCode === classWizard &&
                <WizardRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>

    </div>
)

export default RaceStingers