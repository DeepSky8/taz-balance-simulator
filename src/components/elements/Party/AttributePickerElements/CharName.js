import React from "react";
import { setCharName } from "../../../../actions/charActions";

const ClassName = ({ charState, dispatchCharState }) => (
    <div className="enterName">
        <label>Character Name: </label>
        <input
            value={charState.charName}
            type='text'
            placeholder='My character is named'
            maxLength={15}
            onChange={(e) => {
                dispatchCharState(
                    setCharName(
                        e.target.value.toString()
                    )
                )
            }}
        />
    </div>
)

export default ClassName