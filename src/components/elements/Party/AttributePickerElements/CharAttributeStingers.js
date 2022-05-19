import React from "react";
import {
    setBardInstrument,
    setBardMusicSkill
} from "../../../../actions/charActions";
import classTransformer from "../../../functions/classTransformer";
import { bardAttributeStingers } from "../../../classes/bardInfo";


const CharAttributeStingers = ({ charState, dispatchCharState }) => (
    <div className="bardAttributeStingers">
        {charState.charAttributeCode &&
            classTransformer(bardAttributeStingers, charState.charAttributeCode)}

        <div>
            {charState.charAttributeCode === 'ba2' ?
                <input
                    value={charState.bardInstrument}
                    type="text"
                    placeholder="What do you play?"
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setBardInstrument(
                                e.target.value.toString())
                        )
                    }}
                />
                :
                ''}
            {charState.charAttributeCode === 'ba2' ?
                <input
                    value={charState.bardMusicSkill}
                    type="text"
                    placeholder="Scale of 1-10"
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setBardMusicSkill(
                                e.target.value.toString()
                            )
                        )
                    }}
                />
                :
                ''}
        </div>
    </div>
)

export default CharAttributeStingers