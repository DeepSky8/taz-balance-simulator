import React, { useEffect, useState } from "react";

const ActiveCharWrapper = ({ cloudState, activeCharacter, localCharacter }) => {
    const currentActiveChar = 'Active Character: '
    const myCharacter = `Playing as ${localCharacter.charName} || `
    const activeCharName = activeCharacter.charName.toString()
    const [actionBarText, setActionBarText] = useState(currentActiveChar)
    const missionBriefBy = "Today's briefing conducted by "
    // const createBackstory = 'Create backstory together'
    const gameEnded = 'Game Ended'

    useEffect(() => {
        switch (cloudState.active.gameStage) {
            case 'INTRO':
                setActionBarText(myCharacter + currentActiveChar + activeCharName)
                break;
            case 'BRIEF':
                setActionBarText(myCharacter + missionBriefBy + activeCharName)
                break;
            // case 'BACKSTORY':
            //     setActionBarText(createBackstory)
            //     break;
            case 'CHALLENGES':
                setActionBarText(myCharacter + currentActiveChar + activeCharName)
                break;
            case 'END':
                setActionBarText(gameEnded)
                break;
            default:
                setActionBarText(currentActiveChar)
                break;
        }
    }, [cloudState.active.gameStage, activeCharacter, localCharacter])

    return (
        <div>
            {actionBarText}

        </div>
    )
}



export default ActiveCharWrapper

