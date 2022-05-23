import React from "react";
import { setWizardAssistFame, setWizardAssistFameHelps } from "../../../../../../actions/charActions";
import { wizardAssistFame } from "../../../../../classes/wizardInfo";

const WizardAssistStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="warriorFame">
            {charState.assistCode === wizardAssistFame &&
                <input
                    value={charState.wizardAssistFame}
                    type="text"
                    placeholder="Why are you famous?"
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setWizardAssistFame(
                                e.target.value.toString()))
                    }}
                />
            }

            {charState.assistCode === wizardAssistFame &&
                <input
                    value={charState.wizardAssistFameHelps}
                    type="text"
                    placeholder="How does it help?"
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setWizardAssistFameHelps(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>
    </div>
)

export default WizardAssistStingers