import React from "react";
import { setPriestToolHolySymbol, setPriestToolMantra } from "../../../../../../actions/charActions";
import { priestToolHolySymbol, priestToolMantra } from "../../../classes/priestInfo";
import {longDescription} from '../../../classes/charInfo';

const PriestToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="priestHolySymbol">
            {charState.toolCode === priestToolHolySymbol &&
                <input
                    value={charState.priestToolHolySymbol}
                    type="text"
                    placeholder="My holy symbol is..."
                    maxLength={longDescription}
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
                    placeholder="My mantra is..."
                    maxLength={longDescription}
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


