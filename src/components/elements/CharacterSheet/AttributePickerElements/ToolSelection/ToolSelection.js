import React from "react";
import { setCharToolCode } from "../../../../../actions/charActions";
import { toolBlurb, toolTitles, unselectedAttribute } from "../../classes/charInfo";

const ToolSelection = ({ charState, dispatchCharState }) => {

    // Use the CSS 'show' feature to toggle the tool selector open and closed
    const toggleToolSelections = () => {
        document.getElementById('tool-selector').classList.toggle('show')
    }

    // When the user clicks on one of the available tools
    // send that code to the new character reducer for storage
    const onClickTool = (toolCode) => {
        dispatchCharState(
            setCharToolCode(
                toolCode
            )
        )
    }

    return (
        <div id="charTool">
            <div className='pleaseChooseAlert'>
                {charState.showAlerts &&
                    !charState.charToolCode &&
                    'Please make a selection'
                }
            </div>
            <div className="dropdown">
                {toolBlurb[charState.classCode]}
                <button
                    onClick={toggleToolSelections}
                    className="dropbtn"
                >
                    {charState.toolCode === unselectedAttribute ?
                        "-select-"
                        :
                        (toolTitles[charState.classCode])[charState.toolCode]
                    }
                </button>

                <div id="tool-selector" className="dropdown-content">
                    <div className="questionHeader">{toolBlurb[charState.classCode] + '...'}</div>
                    {toolTitles[charState.classCode].map((title) => {
                        return (
                            <div
                                key={title}
                                onClick={() => { onClickTool(toolTitles[charState.classCode].indexOf(title)) }}
                            >
                                {title}
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}


export default ToolSelection