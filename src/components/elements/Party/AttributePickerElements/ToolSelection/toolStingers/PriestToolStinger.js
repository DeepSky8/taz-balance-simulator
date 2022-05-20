import React from "react";
import { setPriestHolySymbol, setPriestMantra } from "../../../../../../actions/charActions";

const PriestToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="priestHolySymbol">
            {charState.toolCode === 0 &&
                <input
                    value={charState.priestHolySymbol}
                    type="text"
                    placeholder="Your holy symbol is..."
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestHolySymbol(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

        <div id="priestMantra">
            {charState.toolCode === 2 &&
                <input
                    value={charState.priestMantra}
                    type="text"
                    placeholder="Your mantra is..."
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestMantra(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

    </div>
)

export default PriestToolStingers


