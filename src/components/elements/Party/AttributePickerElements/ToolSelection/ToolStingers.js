import React from "react";
import { classBard, classPriest, classRogue, classWarrior, classWizard, toolStingers } from "../../../../classes/charInfo";
import BardToolStingers from "./toolStingers/BardToolStingers";
import PriestToolStingers from "./toolStingers/PriestToolStinger";
import RogueToolStingers from "./toolStingers/RogueToolStingers";
import WarriorToolStingers from "./toolStingers/WarriorToolStingers";
import WizardToolStingers from "./toolStingers/WizardToolStingers";

const ToolStingers = ({ charState, dispatchCharState }) => (
    <div id="toolStingers">

        {toolStingers[charState.classCode][charState.toolCode]}

        <div id="bardStingers">
            {charState.classCode === classBard &&
                <BardToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="priestStingers">
            {charState.classCode === classPriest &&
                <PriestToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="rogueStingers">
            {charState.classCode === classRogue &&
                <RogueToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="warriorStingers">
            {charState.classCode === classWarrior &&
                <WarriorToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="wizardStingers">
            {charState.classCode === classWizard &&
                <WizardToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

    </div>
)

export default ToolStingers