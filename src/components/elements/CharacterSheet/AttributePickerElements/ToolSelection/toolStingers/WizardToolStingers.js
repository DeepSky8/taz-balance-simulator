import React from "react";
import { setWizardToolCatchphrase } from "../../../../../../actions/charActions";
import { wizardToolCatchphrase } from "../../../classes/wizardInfo";
import {longDescription} from '../../../classes/charInfo';

const WizardToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="wizardCatchphrase">
            {charState.toolCode === wizardToolCatchphrase &&
                <input
                    value={charState.wizardToolCatchphrase}
                    type="text"
                    placeholder="What's your catchphrase?"
                    maxLength={longDescription}
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


