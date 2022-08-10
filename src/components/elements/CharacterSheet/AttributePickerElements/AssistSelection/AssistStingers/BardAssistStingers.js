import React from "react";
import { bardAssistMusic } from "../../../classes/bardInfo";
import { setBardInstrument, setBardMusicSkill } from "../../../../../../actions/charActions";
import { mediumDescription, shortDescription } from "../../../classes/charInfo";

const BardAssistStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="bardMusic">
            {charState.assistCode === bardAssistMusic &&
                <input
                    value={charState.bardInstrument}
                    type="text"
                    placeholder="What do you play?"
                    maxLength={mediumDescription}
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
                    maxLength={mediumDescription}
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