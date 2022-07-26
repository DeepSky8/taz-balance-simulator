import React, { useEffect, useState } from "react";

const ActiveCharWrapper = ({ gameState, character, resetStages, stepStage, resetTurnStage }) => {
    const [actionBarText, setActionBarText] = useState('Active Character: ')
    const activeCharacter = 'Active Character: '
    const missionBriefBy = "Today's briefing conducted by "
    const createBackstory = 'Create backstory together'
    const gameEnded = 'Game Ended'

    useEffect(() => {
        switch (gameState.active.gameStage) {
            case 'INTRO':
                setActionBarText(activeCharacter + character.charName)
                break;
            case 'BRIEF':
                setActionBarText(missionBriefBy + character.charName)
                break;
            // case 'BACKSTORY':
            //     setActionBarText(createBackstory)
            //     break;
            case 'CHALLENGES':
                setActionBarText(activeCharacter + character.charName)
                break;
            case 'END':
                setActionBarText(gameEnded)
                break;
            default:
                setActionBarText(activeCharacter)
                break;
        }
    }, [gameState.active.gameStage, character])

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
            </div>
        </div>
    )
}



export default ActiveCharWrapper

