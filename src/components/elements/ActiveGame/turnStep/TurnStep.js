import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase/firebase";
import clickForNext from "../../../functions/clickForNext";
import turnTextSwitcher from "../../../functions/turnTextSwitcher";
import { briefingStagesArray, directionArray, gameStageArray } from "../stageArrays/stageArrays";
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
            {cloudState.active.gameStage === gameStageArray[1] &&
                cloudState.static.host === auth.currentUser.uid &&
                <button
                    onClick={() => {
                        clickForNext({ cloudState, localState }, directionArray[1])
                    }}
                    disabled={cloudState.backstory.briefingStage === briefingStagesArray[0]}
                >
                    Previous
                </button>
            }

            <button
                onClick={() => {
                    clickForNext({ cloudState, localState })
                }}
                disabled={
                    cloudState.active.gameStage === gameStageArray[1]
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
