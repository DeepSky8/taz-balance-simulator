import React, { useEffect } from "react";
import { setCharClassCode, setCharRaceCode, setNoCurrentChar } from "../../../../../actions/charActions";
import { history } from "../../../../../routers/AppRouter";
import { asA, asAn, charBlurb, charClassTitles, raceCodes, raceTitles } from "../../../../classes/charInfo";

const RaceSelection = ({ charState, dispatchCharState }) => {
    let classAction = history.location.pathname.split("/")[2]
    let editID = history.location.pathname.split("/")[3]

    useEffect(() => {
        let classChoice = charClassTitles.indexOf(classAction)
        if (classChoice !== -1 && editID === undefined) {
            dispatchCharState(setNoCurrentChar())
            dispatchCharState(setCharClassCode(classChoice))
            // console.log(`Creating character of type ${classAction}`)
        }
    }, [editID, classAction])

    // Use the CSS 'show' feature to toggle the race selector open and closed
    const toggleRaceSelections = () => {
        document.getElementById('race-selector').classList.toggle('show')
    }

    // When the user clicks on one of the available races
    // send that code to the new character reducer for storage
    const onClickRace = (charRaceCode) => {
        dispatchCharState(
            setCharRaceCode(
                charRaceCode
            )
        )
    }

    return (

        <div className="raceSelection">
            <div className='pleaseChooseAlert'>
                {charState.showAlerts &&
                    !charState.charRaceCode &&
                    'Please make a selection'}
            </div>
            <div className="dropdown">
                {[4, 12, 13].includes(charState.raceCode) ?
                    asAn
                    :
                    asA
                }
                <button
                    onClick={toggleRaceSelections}
                    className="dropbtn"
                >
                    {raceTitles[charState.raceCode]}
                </button>
                {charBlurb[charState.classCode]}

                <div className="contentWrapper">
                    <div id="race-selector" className="dropdown-content">
                        <div className="questionHeader">
                            {asA + '...' + charBlurb[charState.classCode]}
                            <div className="reminderText">{'(choose one)'}</div>

                            {(raceCodes[charState.classCode]).map((code) => {
                                return (
                                    <div
                                        key={code}
                                        onClick={() => { onClickRace(code) }}
                                    >
                                        {raceTitles[code]}
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}


export default RaceSelection

// {(raceCodes[charState.classCode]).map((code) => {
//     return (
//         <div
//             key={code}
//             onClick={() => { onClickRace(code) }}
//         >
//             {raceTitles[code]}
//         </div>)
// })}