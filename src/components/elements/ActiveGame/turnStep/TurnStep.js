import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase/firebase";
import clickForNext from "../../../functions/clickForNext";
import turnTextSwitcher from "../../../functions/turnTextSwitcher";
import { briefingStage, direction, gameStage } from "../stageObjects/stageObjects";
// import NextDeck from './NextDeck';
// import PrevDeck from './PrevDeck';

const TurnStep = ({ cloudState, localState }) => {
    const [stepText, setStepText] = useState('Welcome to TAZ Balance!')
    const [activeAssistPlayer, setActiveAssistPlayer] = useState('Friend')

    useEffect(() => {
        if (cloudState.activeAssistTokens.length > 0) {
            setActiveAssistPlayer(cloudState.activeAssistTokens[(cloudState.activeAssistTokens.length - 1)].charName)
        } else {
            setActiveAssistPlayer('Friend')
        }
    }, [cloudState.activeAssistTokens.length])

    useEffect(() => {
        setStepText(
            turnTextSwitcher(
                cloudState,
                localState,
                activeAssistPlayer)
        )
    }, [
        // localState.activeCharacterID,
        localState.activeIndex,
        localState.currentChallenge,
        cloudState.active.gameStage,
        cloudState.backstory.briefingStage,
        cloudState.currentTurn.turnStage,
        cloudState.currentTurn.selectedChallenge,
        cloudState.kostco.selected,
        activeAssistPlayer
    ])

    return (
        <div>
            {cloudState.active.gameStage === gameStage.briefing &&
                cloudState.static.host === auth.currentUser.uid &&
                <button
                    onClick={() => {
                        clickForNext({ cloudState, localState }, direction.backward)
                    }}
                    disabled={cloudState.backstory.briefingStage === briefingStage.villain}
                >
                    Previous
                </button>
            }

            <button
                onClick={() => {
                    clickForNext({ cloudState, localState })
                }}
                disabled={
                    cloudState.active.gameStage === gameStage.briefing
                    &&
                    cloudState.static.host !== auth.currentUser.uid
                }
            >
                {stepText}
            </button>


        </div>
    )
}

export default TurnStep
