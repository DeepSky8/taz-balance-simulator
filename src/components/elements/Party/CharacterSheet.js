import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    startSetCurrentCharacter,
    editCharacter,
    hideAlerts,
    showAlerts,
    startSaveNewCharacter,
    startSaveUpdatedCharacter,
    resetDefaultNewChar,
    setNoCurrentChar
} from "../../../actions/charActions";
import { auth } from "../../../firebase/firebase";
import { history } from "../../../routers/AppRouter";

const CharacterSheet = ({ charArray, charState, dispatchCharState }) => {
    let navigate = useNavigate()
    const editID = history.location.pathname.split("/")[3]
    const createNew = history.location.pathname.split("/")[2]
    let charObject = charArray.find(characterObject =>
        characterObject.charID === editID)
    useEffect(() => {
        if (editID && charObject) {
            startSetCurrentCharacter(auth.currentUser.uid, charObject.charID)
            dispatchCharState(editCharacter(charObject))
        } else if (createNew === 'newCharacter') {
            dispatchCharState(setNoCurrentChar())
        }
        else {
            navigate('/gameSetup')
        }
    }, [editID])
    let filledSheet = (
        charState.charName &&
        charState.charClassCode &&
        charState.charRaceCode &&
        charState.charToolCode &&
        charState.charAttributeCode
    )

    let newCharacter = charState.changeClass

    const saveCharacter = () => {
        if (filledSheet) {
            if (newCharacter) {
                console.log('confirm new character, ', newCharacter)
                dispatchCharState(hideAlerts())
                startSaveNewCharacter(auth.currentUser.uid, charState)
                navigate('/gameSetup')
            } else if (!newCharacter) {
                console.log('confirm not new character, ', newCharacter)
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

            <p>Character Sheet</p>
            {charState.changeClass && (
                <nav>
                    <NavLink
                        to='Bard'
                        className={isActive =>
                            (isActive ? "nav-link" : "nav-link-unselected")}
                    >Bard</NavLink>
                    <NavLink
                        to='Cleric'
                        className={isActive =>
                            (isActive ? "nav-link" : "nav-link-unselected")}
                    >Cleric</NavLink>
                </nav>
            )}

            <Outlet />



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

// <form id='class-select'>
// <label>Select a class: </label>
// <select
//     name='class'
//     id='class-select'
//     required
// >
//     <option value=''>--Select a class--</option>
//     <option value='bard'>Bard</option>
//     <option value='cleric'>Cleric</option>
//     <option value='rogue'>Rogue</option>
//     <option value='warrior'>Warrior</option>
//     <option value='wizard'>Wizard</option>
// </select>
// </form>


// <div className="dropdown">
// {youArePlayingA}
// <button onClick={toggleClassSelections} className="dropbtn">
//     {newCharState.charClass}
// </button>


// <div id="class-selector" className="dropdown-content">
//     {charClasses.map((charClass) => {
//         return (
//             <div
//                 className="charClass"
//                 key={charClass}
//             >
//                 {charClass}
//             </div>
//         )
//     })}
// </div>
// </div>

// {newCharState.charClass === 'Bard' &&
// <Bard
//     newCharState={newCharState}
//     dispatchNewCharState={dispatchNewCharState}
// />
// }



    // const toggleClassSelections = () => {
    //     document.getElementById('class-selector').classList.toggle('show')
    // }

    // // Close the dropdown if the user clicks outside of it
    // window.onclick = function (event) {
    //     if (!event.target.matches('.dropbtn')) {
    //         var dropdowns = document.getElementsByClassName("dropdown-content");
    //         var i;
    //         for (i = 0; i < dropdowns.length; i++) {
    //             var openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) {
    //                 openDropdown.classList.remove('show');
    //             }
    //         }
    //     }
    //     if (event.target.matches('.charClass')) {
    //         console.log('clicked on class: ', event.target.innerText)
    //         const charClass = event.target.innerText
    //         dispatchNewCharState(
    //             setCharClass(
    //                 charClass
    //             )
    //         )
    //     }
    // }


    // useEffect(() => {
    //     const charSelector = document.getElementById('class-select')

    //     charSelector.addEventListener('change', (e) => {
    //         const charClass = e.target.value

    //         dispatchNewCharState(
    //             setCharClass(
    //                 charClass
    //             )
    //         )
    //     })
    // }, [])

