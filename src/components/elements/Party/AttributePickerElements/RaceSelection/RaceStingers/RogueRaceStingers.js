import React from "react";
import { setGerblinRogueOrigin } from "../../../../../../actions/charActions";
import { raceCodes } from "../../../../../classes/charInfo";
import { rogueRaceStingerLines } from "../../../../../classes/rogueInfo";

const RogueRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        {rogueRaceStingerLines[raceCodes[charState.classCode].indexOf(charState.raceCode)]}
        <div id="gerblinRogue">
            {charState.raceCode === 6 &&
                <input
                    value={charState.gerblinRogueOrigin}
                    type='text'
                    placeholder='I adventure because:'
                    maxLength={50}
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