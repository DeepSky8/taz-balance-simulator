import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase/firebase";
import clickForNext from "../../../functions/clickForNext";
import turnTextSwitcher from "../../../functions/turnTextSwitcher";
import NextDeck from './NextDeck';
import PrevDeck from './PrevDeck';
// import

const PassTurn = ({ gameState, character }) => {
    const [stepText, setStepText] = useState('Select a challenge to engage')
    // let isActivePlayer = (gameState.active.activeUID ?
    //     (gameState.active.activeUID !== auth.currentUser.uid)
    //     :
    //     true
    // )


    useEffect(() => {
        setStepText(turnTextSwitcher(gameState.active.gameStage, gameState.backstory.briefingStage, gameState.currentTurn.turnStage, character))
    }, [
        gameState.active.gameStage,
        gameState.backstory.briefingStage,
        gameState.currentTurn.turnStage,
        gameState.active.activePlayer,
        character
    ])

    return (
        <div>
            {gameState.active.gameStage === 'BRIEF' &&
                gameState.static.host === auth.currentUser.uid &&
                <PrevDeck gameState={gameState} />}

            <button
                onClick={() => { clickForNext({ gameState }) }}
            >
                {stepText}
            </button>

            {gameState.active.gameStage === 'BRIEF' &&
                gameState.static.host === auth.currentUser.uid &&
                <NextDeck gameState={gameState} />}
        </div>
    )
}

export default PassTurn