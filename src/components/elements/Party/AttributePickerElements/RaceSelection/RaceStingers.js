import React from "react";
import BardRaceStingers from "./RaceStingers/BardRaceStingers";
import PriestRaceStingers from "./RaceStingers/PriestRaceStingers";
import RogueRaceStingers from "./RaceStingers/RogueRaceStingers";
import WarriorRaceStingers from "./RaceStingers/WarriorRaceStingers";
import WizardRaceStingers from "./RaceStingers/WizardRaceStingers";


const RaceStingers = ({ charState, dispatchCharState }) => (
    <div className="raceStingers">
        <div id="bardStingers">
            {charState.classCode === 0 &&
                <BardRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="priestStingers">
            {charState.classCode === 1 &&
                <PriestRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="rogueStingers">
            {charState.classCode === 2 &&
                <RogueRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="warriorStingers">
            {charState.classCode === 3 &&
                <WarriorRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>
        <div id="wizardStingers">
            {charState.classCode === 4 &&
                <WizardRaceStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />
            }
        </div>

    </div>
)

export default RaceStingers