import React from "react";
import { setDwarfPriestOrigin } from "../../../../../../actions/charActions";

const PriestRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="dwarfPriest">
            {charState.raceCode === 4 &&
                <input
                    value={charState.dwarfPriestOrigin}
                    type='text'
                    placeholder='I am from:'
                    maxLength={30}
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