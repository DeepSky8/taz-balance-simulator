import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Introductions = ({ gameState, children }) => {
    let navigate = useNavigate()

    // Monitor the ready state of the game
    // When introductions are complete, navigate to the missionBriefing page
    // after setting the ready state back to false in the cloud
    useEffect(() => {

        if (gameState.ready === true) {
            console.log('would have navigated to missionBriefing')
            // navigate('/activeGame/missionBriefing')
        }

    }, [gameState.ready])

    return (
        <div>
            {children}
        </div>
    )
}


export default Introductions