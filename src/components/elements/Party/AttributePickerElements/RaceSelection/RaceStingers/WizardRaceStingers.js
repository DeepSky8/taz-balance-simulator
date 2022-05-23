import React from "react";
import { setDwarfPriestOrigin, setUndeadWizardOrigin1, setUndeadWizardOrigin2, setUndeadWizardOrigin3 } from "../../../../../../actions/charActions";
import { longDescription, raceCodes } from "../../../../../classes/charInfo";
import { wizardRaceStingerLines } from "../../../../../classes/wizardInfo";

const WizardRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="undeadWizard">
            {charState.raceCode === 14 &&
                <div>
                    <input
                        value={charState.undeadWizardOrigin1}
                        type='text'
                        placeholder='I died ...'
                        maxLength={longDescription}
                        onChange={(e) => {
                            dispatchCharState(
                                setUndeadWizardOrigin1(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                    <input
                        value={charState.undeadWizardOrigin2}
                        type='text'
                        placeholder='I came back ...'
                        maxLength={longDescription}
                        onChange={(e) => {
                            dispatchCharState(
                                setUndeadWizardOrigin2(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                    <input
                        value={charState.undeadWizardOrigin3}
                        type='text'
                        placeholder='I appear to be ...'
                        maxLength={longDescription}
                        onChange={(e) => {
                            dispatchCharState(
                                setUndeadWizardOrigin3(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                </div>
            }
        </div>
    </div>
)

export default WizardRaceStingers