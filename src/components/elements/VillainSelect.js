import React, { useContext } from "react";
import setupContext from "../../context/setupContext";


const VillainSelect = () => {
    
    const villain = 'temporary villain placeholder'


    const selectVillain = () => {
        // dispatchSetupState({ type: 'SET_VILLAIN', villain })
    }

    return (
        <div>
            <button onClick={selectVillain}>Set villain</button>

        </div>
    )
}

export { VillainSelect as default }