import React from "react";
import { setCharToolCode } from "../../../../../actions/charActions";
import { updateUserState } from "../../../../../actions/userActions";
import { toolBlurb, toolTitles, unselectedAttribute } from "../../../../classes/charInfo";

const ToolSelection = ({ charState, dispatchCharState }) => {
    // let classAction = history.location.pathname.split("/")[2]
    // let editID = history.location.pathname.split("/")[3]

    // useEffect(() => {
    //     let classChoice = charClassTitles.indexOf(classAction)
    //     if (classChoice !== -1 && editID === undefined) {
    //         dispatchCharState(setNoCurrentChar())
    //         dispatchCharState(setCharClassCode(classChoice))
    //         // console.log(`Creating character of type ${classAction}`)
    //     }
    // }, [editID, classAction])

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

// {(raceCodes[charState.classCode]).map((code) => {
//     return (
//         <div
//             key={code}
//             onClick={() => { onClickRace(code) }}
//         >
//             {raceTitles[code]}
//         </div>)
// })}


// ---

// <div className="raceSelection">
//     <div className='pleaseChooseAlert'>
//         {charState.showAlerts &&
//             !charState.charRaceCode &&
//             'Please make a selection'}
//     </div>
//     <div className="dropdown">
//         {[4, 12, 13].includes(charState.raceCode) ?
//             asAn
//             :
//             asA
//         }
//         <button
//             onClick={toggleRaceSelections}
//             className="dropbtn"
//         >
//             {raceTitles[charState.raceCode]}
//         </button>
//         {charBlurb[charState.classCode]}

//         <div className="contentWrapper">
//             <div id="race-selector" className="dropdown-content">
//                 <div className="questionHeader">
//                     {asA + '...' + charBlurb[charState.classCode]}
//                     <div className="reminderText">{'(choose one)'}</div>

//                     {(raceCodes[charState.classCode]).map((code) => {
//                         return (
//                             <div
//                                 key={code}
//                                 onClick={() => { onClickRace(code) }}
//                             >
//                                 {raceTitles[code]}
//                             </div>)
//                     })}
//                 </div>
//             </div>
//         </div>
//     </div>

// </div>