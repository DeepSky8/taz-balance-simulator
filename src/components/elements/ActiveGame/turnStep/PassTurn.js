import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase/firebase";
import clickForNext from "../../../functions/clickForNext";
import turnTextSwitcher from "../../../functions/turnTextSwitcher";
import NextDeck from './NextDeck';
import PrevDeck from './PrevDeck';
// import

const PassTurn = ({ cloudState, character }) => {
    const [stepText, setStepText] = useState('Select a challenge to engage')
    const [activeAssistPlayer, setActiveAssistPlayer] = useState('Friend')

    useEffect(() => {
        if (cloudState.activeAssistTokens.length > 0) {
            setActiveAssistPlayer(cloudState.activeAssistTokens[0].charName)
        } else {
            setActiveAssistPlayer('Friend')
        }
    }, [cloudState.activeAssistTokens])


    useEffect(() => {
        setStepText(
            turnTextSwitcher(
                cloudState.active.gameStage,
                cloudState.backstory.briefingStage,
                cloudState.currentTurn.turnStage,
                character,
                activeAssistPlayer)
        )
    }, [
        cloudState.active.gameStage,
        cloudState.backstory.briefingStage,
        cloudState.currentTurn.turnStage,
        cloudState.active.activePlayer,
        character
    ])

    return (
        <div>
            {cloudState.active.gameStage === 'BRIEF' &&
                cloudState.static.host === auth.currentUser.uid &&
                <PrevDeck gameState={cloudState} />}

            <button
                onClick={() => { clickForNext({ gameState: cloudState, character }) }}
            >
                {stepText}
            </button>

            {cloudState.active.gameStage === 'BRIEF' &&
                cloudState.static.host === auth.currentUser.uid &&
                <NextDeck gameState={cloudState} />}
        </div>
    )
}

export default PassTurn