import React, { useEffect, useState } from "react";

const ActiveCharWrapper = ({ gameState, character, resetStages, stepStage }) => {
    const [actionBarText, setActionBarText] = useState('Active Character: ')
    const activeCharacter = 'Active Character: '
    const introMission = 'Introduce the Mission, fill in details together'
    const createBackstory = 'Create backstory together'
    const gameEnded = 'Game Ended'
    useEffect(() => {
        switch (gameState.active.stage) {
            case 'INTRO':
                setActionBarText(activeCharacter + character.charName)
                break;
            case 'BRIEF':
                setActionBarText(introMission)
                break;
            case 'BACKSTORY':
                setActionBarText(createBackstory)
                break;
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
    }, [gameState.active.stage, character])

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
            </div>
        </div>
    )
}



export default ActiveCharWrapper

