import React, { useEffect, useState } from "react";

const ActiveCharWrapper = ({ gameStage, localState }) => {
    const localChar = localState.teamCharArray[localState.localIndex]
    const activeChar = localState.teamCharArray[localState.activeIndex]
    const currentActiveChar = 'Active Character: '
    const myCharacter = `Playing as ${localChar.charName} || `

    const [actionBarText, setActionBarText] = useState(currentActiveChar)
    const missionBriefBy = "Today's briefing conducted by "
    // const createBackstory = 'Create backstory together'
    const gameEnded = 'Game Ended'

    useEffect(() => {

        switch (gameStage) {
            case 'INTRO':
                setActionBarText(myCharacter + currentActiveChar + activeChar.charName)
                break;
            case 'BRIEF':
                setActionBarText(myCharacter + missionBriefBy + activeChar.charName)
                break;
            // case 'BACKSTORY':
            //     setActionBarText(createBackstory)
            //     break;
            case 'CHALLENGES':
                setActionBarText(myCharacter + currentActiveChar + activeChar.charName)
                break;
            case 'END':
                setActionBarText(gameEnded)
                break;
            default:
                setActionBarText(currentActiveChar)
                break;
        }
    }, [gameStage, activeChar.charName, localChar.charName
    ])

    return (
        <div>
            {actionBarText}

        </div>
    )
}



export default ActiveCharWrapper

