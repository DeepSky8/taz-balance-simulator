import React from "react";
import { setPriestToolHolySymbol, setPriestToolMantra } from "../../../../../../actions/charActions";
import { priestToolHolySymbol, priestToolMantra } from "../../../../../classes/priestInfo";

const PriestToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="priestHolySymbol">
            {charState.toolCode === priestToolHolySymbol &&
                <input
                    value={charState.priestToolHolySymbol}
                    type="text"
                    placeholder="Your holy symbol is..."
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestToolHolySymbol(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

        <div id="priestMantra">
            {charState.toolCode === priestToolMantra &&
                <input
                    value={charState.priestToolMantra}
                    type="text"
                    placeholder="Your mantra is..."
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestToolMantra(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

    </div>
)

export default PriestToolStingers


