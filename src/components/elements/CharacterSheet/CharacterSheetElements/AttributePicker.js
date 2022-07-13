import React from "react";
import { charTitles } from "../classes/charInfo";

const AttributePicker = ({ charState, children }) => {

    // Close the race selector dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    return (
        <div>
            <div className="nameDisplay">
                {!charState.changeClass &&
                    <h4>{charState.charName}{charTitles[charState.questCount]}</h4>
                }
            </div>

            {children}
        </div>)
}

export { AttributePicker as default }