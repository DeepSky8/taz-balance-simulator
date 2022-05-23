import React from "react";
import { setWizardToolCatchphrase } from "../../../../../../actions/charActions";
import { wizardToolCatchphrase } from "../../../../../classes/wizardInfo";

const WizardToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="wizardCatchphrase">
            {charState.toolCode === wizardToolCatchphrase &&
                <input
                    value={charState.wizardToolCatchphrase}
                    type="text"
                    placeholder="What's your catchphrase?"
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setWizardToolCatchphrase(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>
    </div>
)

export default WizardToolStingers


