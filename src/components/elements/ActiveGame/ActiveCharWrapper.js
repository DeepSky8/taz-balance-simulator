import React, { useEffect, useState } from "react";

const ActiveCharWrapper = ({ gameState, activeCharacter, localCharacter, resetStages, stepStage, resetTurnStage, resetActionTokens }) => {
    const currentActiveChar = 'Active Character: '
    const [actionBarText, setActionBarText] = useState(currentActiveChar)
    const missionBriefBy = "Today's briefing conducted by "
    const createBackstory = 'Create backstory together'
    const gameEnded = 'Game Ended'
    const myCharacter = `Playing as ${localCharacter.charName} || `

    useEffect(() => {
        switch (gameState.active.gameStage) {
            case 'INTRO':
                setActionBarText(myCharacter + currentActiveChar + activeCharacter.charName)
                break;
            case 'BRIEF':
                setActionBarText(missionBriefBy + activeCharacter.charName + myCharacter)
                break;
            // case 'BACKSTORY':
            //     setActionBarText(createBackstory)
            //     break;
            case 'CHALLENGES':
                setActionBarText(myCharacter + currentActiveChar + activeCharacter.charName)
                break;
            case 'END':
                setActionBarText(gameEnded)
                break;
            default:
                setActionBarText(currentActiveChar)
                break;
        }
    }, [gameState.active.gameStage, activeCharacter])

    return (
        <div>
            {actionBarText}
            <div>
                <button
                    onClick={() => { resetStages() }}
                >-Reset Stages-</button>
                <button
                    onClick={() => { stepStage() }}
                >-Step Stage-</button>
                <button
                    onClick={() => { resetTurnStage() }}
                >-Reset Turn-</button>
                <button onClick={() => { resetActionTokens() }}>-Reset Action Tokens-</button>
            </div>
        </div>
    )
}



export default ActiveCharWrapper

