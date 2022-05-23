import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    startSetCurrentCharacter,
    editCharacter,
    hideAlerts,
    showAlerts,
    startSaveNewCharacter,
    startSaveUpdatedCharacter,
    setNoCurrentChar,
    setCharClassCode,
} from "../../../../actions/charActions";
import { auth } from "../../../../firebase/firebase";
import { history } from "../../../../routers/AppRouter";
import { charClassTitles, unselectedAttribute, unselectedClass, unselectedRace } from "../../../classes/charInfo";
import CharSheetNavBar from "./CharSheetNavBar";


const CharacterSheet = ({ charArray, charState, dispatchCharState, children }) => {
    let navigate = useNavigate()
    let classAction = history.location.pathname.split("/")[2]
    let editID = history.location.pathname.split("/")[3]


    useEffect(() => {
        const charObject = charArray.find(characterObject =>
            characterObject.charID === editID)
        let classChoice = charClassTitles.indexOf(classAction)

        if (editID && charObject) {
            startSetCurrentCharacter(auth.currentUser.uid, charObject.charID)
            dispatchCharState(editCharacter(charObject))
        } else if (classAction === 'newCharacter') {
            dispatchCharState(setNoCurrentChar())
        } else if (classChoice !== -1) {
            dispatchCharState(setNoCurrentChar())
            dispatchCharState(setCharClassCode(classChoice))
            // console.log(`Creating character of type ${classAction}`)
            // console.log(`position in CharClassTitles is ${classChoice}`)
        } else {
            navigate('/gameSetup')
        }
    }, [editID, classAction])

    let filledSheet = (
        charState.charName &&
        charState.classCode !== unselectedClass &&
        charState.raceCode !== unselectedRace &&
        charState.toolCode !== unselectedAttribute &&
        charState.assistCode !== unselectedAttribute &&
        true
    )

    let newCharacter = charState.changeClass

    const saveCharacter = () => {
        // console.log('save button clicked, charState is: ', charState)
        // console.log('Filled sheet is: ', filledSheet)
        if (filledSheet) {
            if (newCharacter) {
                // console.log('confirm new character, ', newCharacter)
                dispatchCharState(hideAlerts())
                startSaveNewCharacter(auth.currentUser.uid, charState)
                navigate('/gameSetup')
            } else if (!newCharacter) {
                // console.log('confirm not new character, ', newCharacter)
                dispatchCharState(hideAlerts())
                startSaveUpdatedCharacter(auth.currentUser.uid, charState, charState.charID)
                navigate('/gameSetup')
            }
        } else {
            dispatchCharState(showAlerts())
        }
    }

    return (
        <div>
            <CharSheetNavBar charState={charState} />

            {children}



            <p>
                <button
                    type="button"
                    id="saveCharacter"
                    onClick={() => { saveCharacter() }}
                >
                    Save Character
                </button>
                <Link to="/gameSetup">Cancel</Link>
            </p>
        </div>
    )
}

export default CharacterSheet
