import React from "react";
import { assistStingers, classBard, classPriest, classRogue, classWarrior, classWizard } from "../../../../classes/charInfo";
import BardAssistStingers from "./AssistStingers/BardAssistStingers";
import PriestAssistStingers from "./AssistStingers/PriestAssistStingers";
import WarriorAssistStingers from "./AssistStingers/WarriorAssistStingers";
import WizardAssistStingers from "./AssistStingers/WizardAssistStingers";

const AssistStingers = ({ charState, dispatchCharState }) => (
    <div id="assistStingers">

        {assistStingers[charState.classCode][charState.assistCode]}

        <div id="bardStingers">
            {charState.classCode === classBard &&
                <BardAssistStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="priestStingers">
            {charState.classCode === classPriest &&
                <PriestAssistStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="warriorStingers">
            {charState.classCode === classWarrior &&
                <WarriorAssistStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

        <div id="wizardStingers">
            {charState.classCode === classWizard &&
                <WizardAssistStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

    </div>
)

export default AssistStingers