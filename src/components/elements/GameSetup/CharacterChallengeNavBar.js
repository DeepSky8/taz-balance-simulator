import React from "react";
import { NavLink } from "react-router-dom";

const CharacterChallengeNavBar = () => {
    return (
        <div>
            <NavLink
                to={'gameInstructions'}
                className={({isActive}) =>
                    (isActive ? "nav-link-selected" : "nav-link")}
            >
                |  Instructions  |
            </NavLink>
            <NavLink
                to={'selectCharacter'}
                className={({isActive}) =>
                    (isActive ? "nav-link-selected" : "nav-link")}
            >
                |  Character  |
            </NavLink>
            <NavLink
                to={'selectChallenges'}
                className={({isActive}) =>
                    (isActive ? "nav-link-selected" : "nav-link")}
            >
                |  Challenges  |
            </NavLink>
            <NavLink
                to={'restOfParty'}
                className={({isActive}) =>
                    (isActive ? "nav-link-selected" : "nav-link")}
            >
                |  Party  |
            </NavLink>
        </div>
    )
}

export default CharacterChallengeNavBar