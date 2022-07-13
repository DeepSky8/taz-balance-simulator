import React from "react";
import { setPriestAssistFame, setPriestAssistFameHelps, setPriestAssistHobby } from "../../../../../../actions/charActions";
import { longDescription } from "../../../../../classes/charInfo";
import { priestAssistFame, priestAssistHobby } from "../../../../../classes/priestInfo";

const PriestAssistStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="priestFame">
            {charState.assistCode === priestAssistFame &&
                <input
                    value={charState.priestAssistFame}
                    type="text"
                    placeholder="Why are you famous?"
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestAssistFame(
                                e.target.value.toString()))
                    }}
                />
            }

            {charState.assistCode === priestAssistFame &&
                <input
                    value={charState.priestAssistFameHelps}
                    type="text"
                    placeholder="How does it help?"
                    maxLength={longDescription}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestAssistFameHelps(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>

        <div>
            {charState.assistCode === priestAssistHobby &&
                <input
                    value={charState.priestAssistHobby}
                    type="text"
                    placeholder="What is your hobby?"
                    maxLength={15}
                    onChange={(e) => {
                        dispatchCharState(
                            setPriestAssistHobby(
                                e.target.value.toString()))
                    }}
                />
            }
        </div>
    </div>
)

export default PriestAssistStingers