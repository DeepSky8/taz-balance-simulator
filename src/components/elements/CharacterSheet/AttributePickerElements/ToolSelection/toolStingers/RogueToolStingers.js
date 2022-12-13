import React from "react";
import { setRogueCatchphrase } from "../../../../../../actions/charActions";
import { rogueToolCatchphrase } from "../../../classes/rogueInfo";
import {longDescription} from '../../../classes/charInfo';

const RogueToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="rogueCatchphrase">
            {charState.toolCode === rogueToolCatchphrase &&
                <input
                    value={charState.rogueToolCatchphrase}
                    type="text"
                    placeholder="What's your catchphrase?"
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setRogueCatchphrase(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>
    </div>
)

export default RogueToolStingers


