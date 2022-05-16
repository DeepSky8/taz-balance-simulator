import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { hideAlerts, showAlerts, startSaveNewCharacter } from "../../../actions/newCharActions";
import { auth } from "../../../firebase/firebase";

const CreateNewCharacter = ({ newCharState, dispatchNewCharState }) => {
    let navigate = useNavigate()



    const saveCharacter = () => {
        if (newCharState.charName &&
            newCharState.charClassCode &&
            newCharState.charRaceCode &&
            newCharState.charToolCode &&
            newCharState.charAttributeCode) {
            dispatchNewCharState(hideAlerts())
            startSaveNewCharacter(auth.currentUser.uid, newCharState)
            navigate('/gameSetup')
        } else {
            dispatchNewCharState(showAlerts())
        }

    }

    return (
        <div>

            <p>Create New Character page</p>
            <nav>
                <NavLink
                    to='createBard'
                    className={isActive =>
                        (isActive ? "nav-link" : "nav-link-unselected")}
                >Bard</NavLink>
                <NavLink
                    to='createCleric'
                    className={isActive =>
                        (isActive ? "nav-link" : "nav-link-unselected")}
                >Cleric</NavLink>
            </nav>

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

export default CreateNewCharacter

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

