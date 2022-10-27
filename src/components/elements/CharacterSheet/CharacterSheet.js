import React, { useEffect, useReducer, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../../firebase/firebase";
import { Link,useLocation, useNavigate } from "react-router-dom";
import {
    startSetCurrentCharacter,
    editCharacter,
    hideAlerts,
    showAlerts,
    startSaveNewCharacter,
    startSaveUpdatedCharacter,
    setNoCurrentChar,
    setCharClassCode,
} from "../../../actions/charActions";
import { charClassTitles, unselectedAttribute, unselectedClass, unselectedRace } from "../CharacterSheet/classes/charInfo";
import CharSheetNavBar from "./CharacterSheetElements/CharSheetNavBar";
import { charReducer, defaultCharState } from "../../../reducers/charReducer";
import AttributePicker from "./CharacterSheetElements/AttributePicker";
import SpecialAbility from "./AttributePickerElements/SpecialAbility";
import CharStats from "./AttributePickerElements/CharStats";
import RaceSelection from "./AttributePickerElements/RaceSelection/RaceSelection";
import RaceStingers from "./AttributePickerElements/RaceSelection/RaceStingers";
import ToolSelection from "./AttributePickerElements/ToolSelection/ToolSelection";
import ToolStingers from "./AttributePickerElements/ToolSelection/ToolStingers";
import AssistSelection from "./AttributePickerElements/AssistSelection/AssistSelection";
import AssistStingers from "./AttributePickerElements/AssistSelection/AssistStingers";
import CharName from "./AttributePickerElements/CharName";

const CharacterSheet = ({ }) => {
    let navigate = useNavigate()
    let location = useLocation()
    let classAction = location.pathname.split("/")[2]
    // console.log('classAction: ', classAction)
    let editID = location.pathname.split("/")[3]
    // console.log('editID: ', editID)
    const [charArray, setCharArray] = useState([])
    const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)

    // Single-fire Listeners
    // Saved character Array, based on editID
    useEffect(() => {
        if (editID) {
            onValue(ref(db, 'characters/' + auth.currentUser.uid),
                (snapshot) => {
                    const characters = [];
                    if (snapshot.exists()) {
                        snapshot.forEach((childSnapShot) => {
                            characters.push(childSnapShot.val())
                        })
                    }
                    // console.log('characters: ', characters)
                    setCharArray(characters)
                })
        }

        return () => {
            off(ref(db, 'characters/' + auth.currentUser.uid))
        }

    }, [editID])

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

        } else {
            navigate('/gameSetup')
        }
    }, [editID, classAction, charArray])

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
        if (filledSheet) {
            if (newCharacter) {
                dispatchCharState(hideAlerts())
                startSaveNewCharacter(auth.currentUser.uid, charState)
                navigate('/gameSetup')
            } else if (!newCharacter) {
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
            <AttributePicker
                charState={charState}
                dispatchCharState={dispatchCharState}
            >
            {charState.classCode !== unselectedClass &&
                <div>
                    <SpecialAbility charState={charState} />
                    <CharStats charState={charState} />
                    <RaceSelection
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                    <RaceStingers
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                    <ToolSelection
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                    <ToolStingers
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                    <AssistSelection
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                    <AssistStingers
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                    <CharName
                        charState={charState}
                        dispatchCharState={dispatchCharState}
                    />
                </div>

            }
            </AttributePicker>




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


// <AttributePicker

//             >
                
//             </AttributePicker>