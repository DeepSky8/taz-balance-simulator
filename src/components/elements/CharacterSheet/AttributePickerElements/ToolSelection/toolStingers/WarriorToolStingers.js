import React from "react";
import { setWarriorToolArmor, setWarriorToolBattlecry } from "../../../../../../actions/charActions";
import { warriorToolArmor, warriorToolBattlecry } from "../../../../../classes/warriorInfo";
import {longDescription} from '../../../../../classes/charInfo';

const WarriorToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="warriorArmor">
            {charState.toolCode === warriorToolArmor &&
                <input
                    value={charState.warriorToolArmor}
                    type="text"
                    placeholder="Your armor looks like..."
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setWarriorToolArmor(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

        <div id="warriorBattlcry">
            {charState.toolCode === warriorToolBattlecry &&
                <input
                    value={charState.warriorToolBattlecry}
                    type="text"
                    placeholder="Your battlecry is..."
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setWarriorToolBattlecry(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

    </div>
)

export default WarriorToolStingers


