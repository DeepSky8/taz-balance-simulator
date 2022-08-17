import React, { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";

import { startRemoveSavedGame, startLoadSavedGame } from "../../../../actions/cloudActions";
import { auth, db } from "../../../../firebase/firebase";
import SavedGame from "./SavedGame";

const SavedGames = ({ gameState, toggleGameType, gameTypeButtonText, savedGameArray }) => {
    const [hosting, setHosting] = useState(false)

    useEffect(() => {
        setHosting(gameState.static.gameID && gameState.static.host === auth.currentUser.uid)
    }, [gameState.static.gameID])

    const loadGame = (savedGameKey, challengesObject) => {
        if (hosting) {
            startLoadSavedGame(gameState.static.gameID, savedGameKey, challengesObject)
        }
    }

    return (
        <div>
            <button
                onClick={toggleGameType}
            >
                {gameTypeButtonText}
            </button>
            <h4>Your Saved Games:</h4>
            {savedGameArray.map((savedGame) => {
                return <SavedGame
                    key={savedGame.static.key}
                    savedGame={savedGame}
                    removeSavedGame={() => { startRemoveSavedGame(auth.currentUser.uid, savedGame.static.key) }}
                    resumeSavedGame={() => {
                        loadGame(
                            savedGame.static.key,
                            {
                                codeVillain: savedGame.static.codeVillain,
                                codeRelic: savedGame.static.codeRelic,
                                codeLocation: savedGame.static.codeLocation
                            })
                    }}
                    hosting={hosting}
                />
            })}

        </div>
    )
}

export default SavedGames


// <button onClick={saveGame}>SaveGame</button>

// const saveGame = () => {
//     const newKey = startGetKey(auth.currentUser.uid)

//     startSaveGame(auth.currentUser.uid, newKey, savedGame3)
// }

// const savedGame1 = {
//     challengesObject: {
//         villainCode: 'v1',
//         relicCode: 'r1',
//         locationCode: 'l1'
//     },
//     surprises: [{}],
//     progress: {
//         villain: 1,
//         relic: 1,
//         location: 1
//     },
//     teamHealth: 15,
// }

// const savedGame2 = {
//     challengesObject: {
//         villainCode: 'v2',
//         relicCode: 'r2',
//         locationCode: 'l2'
//     },
//     surprises: [{}],
//     progress: {
//         villain: 2,
//         relic: 2,
//         location: 2
//     },
//     teamHealth: 10,
// }

// const savedGame3 = {
//     challengesObject: {
//         villainCode: 'v3',
//         relicCode: 'r3',
//         locationCode: 'l3'
//     },
//     surprises: [{}],
//     progress: {
//         villain: 3,
//         relic: 3,
//         location: 3
//     },
//     teamHealth: 5,
// }