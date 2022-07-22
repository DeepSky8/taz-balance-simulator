import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/firebase";
import NextDeck from "./missionBriefing/NextDeck";
import PrevDeck from "./missionBriefing/PrevDeck";
import PassTurn from "./PassTurn";

const ActiveCharWrapper = ({ gameState, character, resetStages, stepStage }) => {
    const [actionBarText, setActionBarText] = useState('Active Character: ')
    const activeCharacter = 'Active Character: '
    const introMission = "Today's Mission"
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
    }, [gameState.active.stage, character])

    return (
        <div>
            {gameState.active.stage === 'BRIEF' &&
                gameState.static.host === auth.currentUser.uid &&
                <PrevDeck gameState={gameState} />}
            {actionBarText}
            {gameState.active.stage !== 'BRIEF' &&
                <PassTurn gameState={gameState} />
            }
            {gameState.active.stage === 'BRIEF' &&
                gameState.static.host === auth.currentUser.uid &&
                <NextDeck gameState={gameState} />}
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

