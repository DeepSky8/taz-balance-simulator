import React from "react";
import { toolStingers } from "../../../../classes/charInfo";
import BardToolStingers from "./toolStingers/BardToolStingers";
import PriestToolStingers from "./toolStingers/PriestToolStinger";

const ToolStingers = ({ charState, dispatchCharState }) => (
    <div id="toolStingers">
        {toolStingers[charState.classCode][charState.toolCode]}
        <div id="bardStingers">
            {charState.classCode === 0 &&
                <BardToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>
        <div id="priestStingers">
            {charState.classCode === 1 &&
                <PriestToolStingers
                    charState={charState}
                    dispatchCharState={dispatchCharState}
                />}
        </div>

    </div>
)

export default ToolStingers