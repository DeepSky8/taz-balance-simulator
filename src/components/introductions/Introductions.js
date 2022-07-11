import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startSetReadyFalse } from "../../actions/gameActions";
import ActiveCharWrapper from "../elements/ActiveGame/ActiveCharWrapper";
import IntroDescription from "./IntroDescription";


const Introductions = ({ gameState, dispatchGameState }) => {
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
            {<ActiveCharWrapper
                gameState={gameState}
                dispatchGameState={dispatchGameState}
            />}
            {<IntroDescription />}

        </div>
    )
}


export default Introductions