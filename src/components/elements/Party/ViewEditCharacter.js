import React, { useEffect, useReducer } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { hideAlerts, startSaveUpdatedCharacter, showAlerts } from "../../../actions/newCharActions";
import { auth } from "../../../firebase/firebase";
import { history } from "../../../routers/AppRouter";
import Bard from "../../classes/Bard";

const ViewEditCharacter = ({ newCharState, dispatchNewCharState, charArray }) => {
    let navigate = useNavigate()
    // const id = history.location.pathname.split("/")[2]

    useEffect(() => {
        charSwitch(newCharState)
    }, [])

    const saveCharacter = () => {
        if (newCharState.charName &&
            newCharState.charClassCode &&
            newCharState.charRaceCode &&
            newCharState.charToolCode &&
            newCharState.charAttributeCode) {
            dispatchNewCharState(hideAlerts())
            // startSaveUpdatedCharacter(auth.currentUser.uid, newCharState, id)
            navigate('/gameSetup')
        } else {
            dispatchNewCharState(showAlerts())
        }


    }
    let charDisplay;

    const charSwitch = (newCharState) => {
        switch (newCharState.charClassCode) {
            case 'cc0':
                charDisplay = (<Bard
                    newCharState={newCharState}
                    dispatchNewCharState={dispatchNewCharState}
                />)
                break;
            default:
                navigate('/gameSetup')
                break;
        }
    }

    return (
        <div>
            <p>View Edit Character page</p>
            {charDisplay}

        </div>
    )
}

export default ViewEditCharacter

// <nav>
// <NavLink
//     to='createBard'
//     className={isActive =>
//         (isActive ? "nav-link" : "nav-link-unselected")}
// >Bard</NavLink>
// <NavLink
//     to='createCleric'
//     className={isActive =>
//         (isActive ? "nav-link" : "nav-link-unselected")}
// >Cleric</NavLink>
// </nav>

// <Outlet />


// <p>
// <button
//     type="button"
//     id="saveCharacter"
//     onClick={() => { saveCharacter() }}
// >
//     Save Character
// </button>
// <Link to="/gameSetup">Cancel</Link>
// </p>


