import React from "react";
import { NavLink } from "react-router-dom";

const CharacterChallengeNavBar = () => {
    return (
        <div>
            <NavLink
                to={'selectCharacter'}
                className={isActive =>
                    (isActive ? "nav-link" : "nav-link-unselected")}
            >
                |  Character  |  
            </NavLink>
            <NavLink
                to={'selectChallenges'}
                className={isActive =>
                    (isActive ? "nav-link" : "nav-link-unselected")}
            >
                |  Challenges  |  
            </NavLink>
            <NavLink
                to={'restOfParty'}
                className={isActive =>
                    (isActive ? "nav-link" : "nav-link-unselected")}
            >
                |  Party  |
            </NavLink>
        </div>
    )
}

export default CharacterChallengeNavBar