import React from "react";
import { setCharRaceCode } from "../../../../../actions/charActions";
import { asA, asAn, charBlurb, modifiedByAn, raceCodes, raceTitles } from "../../classes/charInfo";

const RaceSelection = ({ charState, dispatchCharState }) => {

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
                {modifiedByAn.includes(charState.raceCode) ?
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