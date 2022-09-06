import React, { useEffect, useState } from "react";

const ActiveCharWrapper = ({ cloudState, activeCharacter, localCharacter }) => {
    const currentActiveChar = 'Active Character: '
    const [actionBarText, setActionBarText] = useState(currentActiveChar)
    const missionBriefBy = "Today's briefing conducted by "
    const createBackstory = 'Create backstory together'
    const gameEnded = 'Game Ended'
    const myCharacter = `Playing as ${localCharacter.charName} || `

    useEffect(() => {
        switch (cloudState.active.gameStage) {
            case 'INTRO':
                setActionBarText(myCharacter + currentActiveChar + activeCharacter.charName)
                break;
            case 'BRIEF':
                setActionBarText(myCharacter + missionBriefBy + activeCharacter.charName)
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
    }, [cloudState.active.gameStage, activeCharacter])

    return (
        <div>
            {actionBarText}

        </div>
    )
}



export default ActiveCharWrapper

