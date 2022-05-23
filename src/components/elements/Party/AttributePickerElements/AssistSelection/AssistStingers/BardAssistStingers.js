import React from "react";
import { bardAssistMusic } from "../../../../../classes/bardInfo";
import { setBardInstrument, setBardMusicSkill } from "../../../../../../actions/charActions";

const BardAssistStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="bardMusic">
            {charState.assistCode === bardAssistMusic &&
                <input
                    value={charState.bardInstrument}
                    type="text"
                    placeholder="What do you play?"
                    maxLength={15}
                    onChange={(e) => {
                        dispatchCharState(
                            setBardInstrument(
                                e.target.value.toString()))
                    }}
                />
            }
            {charState.assistCode === bardAssistMusic &&
                <input
                    value={charState.bardMusicSkill}
                    type="text"
                    placeholder="Do you shred?"
                    maxLength={15}
                    onChange={(e) => {
                        dispatchCharState(
                            setBardMusicSkill(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>
    </div>
)

export default BardAssistStingers