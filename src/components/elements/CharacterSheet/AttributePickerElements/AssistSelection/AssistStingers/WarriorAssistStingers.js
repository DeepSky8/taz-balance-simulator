import React from "react";
import { setWarriorAssistFame, setWarriorAssistFameHelps } from "../../../../../../actions/charActions";
import { longDescription } from "../../../classes/charInfo";
import { warriorAssistFame } from "../../../classes/warriorInfo";

const WarriorAssistStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="warriorFame">
            {charState.assistCode === warriorAssistFame &&
                <input
                    value={charState.warriorAssistFame}
                    type="text"
                    placeholder="Why are you famous?"
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setWarriorAssistFame(
                                e.target.value.toString()))
                    }}
                />
            }

            {charState.assistCode === warriorAssistFame &&
                <input
                    value={charState.warriorAssistFameHelps}
                    type="text"
                    placeholder="How does it help?"
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setWarriorAssistFameHelps(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>
    </div>
)

export default WarriorAssistStingers