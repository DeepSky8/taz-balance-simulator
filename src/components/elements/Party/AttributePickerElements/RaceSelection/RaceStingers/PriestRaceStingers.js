import React from "react";
import { setDwarfPriestOrigin } from "../../../../../../actions/charActions";
import { longDescription } from "../../../../../classes/charInfo";

const PriestRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="dwarfPriest">
            {charState.raceCode === 4 &&
                <input
                    value={charState.dwarfPriestOrigin}
                    type='text'
                    placeholder='I am from:'
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setDwarfPriestOrigin(
                                e.target.value.toString()
                            )
                        )
                    }}
                />
            }
        </div>
    </div>
)

export default PriestRaceStingers