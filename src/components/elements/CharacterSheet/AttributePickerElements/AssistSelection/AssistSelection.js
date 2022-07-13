import React from "react";
import { setCharAssistCode } from "../../../../../actions/charActions";
import { assistPrompt, assistTitles, unselectedAttribute } from "../../classes/charInfo";

export const AssistPicker = ({ charState, dispatchCharState }) => {


    const toggleAssistSelections = () => {
        document.getElementById('assist-selector').classList.toggle('show')
    }

    // When the user clicks on one of the available assist titles
    // send that code to the character reducer for storage
    const onClickAssist = (assistCode) => {
        dispatchCharState(
            setCharAssistCode(
                assistCode
            )
        )
    }


    return (
        <div id="assistSelection">
            <div className='pleaseChooseAlert'>
                {charState.showAlerts &&
                    !charState.charRaceCode &&
                    'Please make a selection'}
            </div>
            {assistPrompt[charState.classCode]}
            <button
                onClick={toggleAssistSelections}
                className="dropbtn"
            >
                {charState.assistCode === unselectedAttribute ?
                    "-select-"
                    :
                    (assistTitles[charState.classCode])[charState.assistCode]}
            </button>

            <div className="contentWrapper">
                <div id="assist-selector" className="dropdown-content">
                    <div className="questionHeader">
                        {assistPrompt[charState.classCode] + '...'}
                        <div className="reminderText">{'(choose one)'}</div>
                    </div>
                    {(assistTitles[charState.classCode]).map((title) => {
                        return (
                            <div
                                key={title}
                                onClick={() => {
                                    onClickAssist(
                                        assistTitles[charState.classCode].indexOf(title)
                                    )
                                }}
                            >
                                {title}
                            </div>)
                    })}
                </div>
            </div>





        </div>

    )
}

export default AssistPicker