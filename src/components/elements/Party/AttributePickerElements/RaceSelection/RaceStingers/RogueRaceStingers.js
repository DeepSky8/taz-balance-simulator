import React from "react";
import { setGerblinRogueOrigin } from "../../../../../../actions/charActions";
import { extraLongDescription } from "../../../../../classes/charInfo";

const RogueRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="gerblinRogue">
            {charState.raceCode === 6 &&
                <input
                    value={charState.gerblinRogueOrigin}
                    type='text'
                    placeholder='I adventure because:'
                    maxLength={extraLongDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setGerblinRogueOrigin(
                                e.target.value.toString()
                            )
                        )
                    }}
                />
            }
        </div>
    </div>
)

export default RogueRaceStingers