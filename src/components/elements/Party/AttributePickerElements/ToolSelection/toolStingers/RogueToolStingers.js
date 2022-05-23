import React from "react";
import { setRogueCatchphrase } from "../../../../../../actions/charActions";
import { rogueToolCatchphrase } from "../../../../../classes/rogueInfo";

const RogueToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="rogueCatchphrase">
            {charState.toolCode === rogueToolCatchphrase &&
                <input
                    value={charState.rogueCatchphrase}
                    type="text"
                    placeholder="What's your catchphrase?"
                    maxLength={30}
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


