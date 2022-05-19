import React from "react";
import classTransformer from "../../../functions/classTransformer";
import { bardToolStingers } from "../../../classes/bardInfo";
import { setBardSuperGoal } from "../../../../actions/charActions";

const CharToolStingers = ({ charState, dispatchCharState }) => (
    <div className="bardToolStingers">
        {charState.charToolCode &&
            classTransformer(bardToolStingers, charState.charToolCode)}

        {charState.charToolCode === 'bt4' ?
            <input
                value={charState.bardSuperGoal}
                type="text"
                placeholder="Your big goal"
                maxLength={30}
                onChange={(e) => {
                    dispatchCharState(
                        setBardSuperGoal(
                            e.target.value.toString()))
                }}
            />
            :
            ''}
    </div>
)

export default CharToolStingers