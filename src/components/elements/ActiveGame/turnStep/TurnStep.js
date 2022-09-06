import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase/firebase";
import clickForNext from "../../../functions/clickForNext";
import turnTextSwitcher from "../../../functions/turnTextSwitcher";
import NextDeck from './NextDeck';
import PrevDeck from './PrevDeck';

const TurnStep = ({ cloudState, localState }) => {
    const [stepText, setStepText] = useState('Welcome to TAZ Balance!')
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
                cloudState,
                localState,
                activeAssistPlayer)
        )
    }, [
        localState.activeCharacter,
        localState.currentChallenge,
        cloudState.currentTurn.turnStage,
        cloudState.currentTurn.selectedChallenge
    ])

    return (
        <div>
            {cloudState.active.gameStage === 'BRIEF' &&
                cloudState.static.host === auth.currentUser.uid &&
                <PrevDeck gameState={cloudState} />}

            <button
                onClick={() => { clickForNext({ cloudState, localState }) }}
            >
                {stepText}
            </button>

            {cloudState.active.gameStage === 'BRIEF' &&
                cloudState.static.host === auth.currentUser.uid &&
                <NextDeck gameState={cloudState} />}
        </div>
    )
}

export default TurnStep