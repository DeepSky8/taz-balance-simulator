import React from "react";
import { setBardSuperGoal } from "../../../../../../actions/charActions";
import { bardToolBigGoal } from "../../../classes/bardInfo";
import {longDescription} from '../../../classes/charInfo';

const BardToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="bardSuperGoal">
            {charState.toolCode === bardToolBigGoal &&
                <input
                    value={charState.bardSuperGoal}
                    type="text"
                    placeholder="Your big goal is"
                    maxLength={longDescription}
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


