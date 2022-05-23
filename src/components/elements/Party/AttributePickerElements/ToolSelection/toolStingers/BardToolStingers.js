import React from "react";
import { setBardSuperGoal } from "../../../../../../actions/charActions";
import { bardToolBigGoal } from "../../../../../classes/bardInfo";

const BardToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="bardSuperGoal">
            {charState.toolCode === bardToolBigGoal &&
                <input
                    value={charState.bardSuperGoal}
                    type="text"
                    placeholder="Your big goal"
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setBardSuperGoal(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

    </div>
)

export default BardToolStingers


