import React from "react";
import { setWarriorToolArmor, setWarriorToolBattlecry } from "../../../../../../actions/charActions";
import { warriorToolArmor, warriorToolBattlecry } from "../../../../../classes/warriorInfo";

const WarriorToolStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="warriorArmor">
            {charState.toolCode === warriorToolArmor &&
                <input
                    value={charState.warriorToolArmor}
                    type="text"
                    placeholder="Your armor looks like..."
                    maxLength={15}
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
                    maxLength={30}
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


