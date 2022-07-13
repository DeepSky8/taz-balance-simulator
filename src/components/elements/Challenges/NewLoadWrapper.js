import React, { useState } from "react";
import ChallengeSelect from "./ChallengeSelect";
import SavedGames from "../GameSetup/savedGames/SavedGames";


const NewLoadWrapper = ({ userState, gameState, savedGameArray }) => {
    const newGameText = 'Display saved missions'
    const savedGamesText = 'Select new mission'

    const [showNewGame, setShowNewGame] = useState(true)
    const [showSavedGames, setShowSavedGames] = useState(false)
    const [gameTypeButtonText, setButtonText] = useState(newGameText)

    const toggleGameType = () => {
        setShowNewGame(!showNewGame)
        setShowSavedGames(!showSavedGames)
        setButtonText(showSavedGames ? newGameText : savedGamesText)
    }

    return (
        <div>


            {showNewGame &&
                <ChallengeSelect
                    userState={userState}
                    gameState={gameState}
                    toggleGameType={toggleGameType}
                    gameTypeButtonText={gameTypeButtonText}
                    savedGameArray={savedGameArray}
                />
            }

            {showSavedGames &&
                <SavedGames
                    gameState={gameState}
                    toggleGameType={toggleGameType}
                    gameTypeButtonText={gameTypeButtonText}
                    savedGameArray={savedGameArray}
                />
            }

        </div>
    )
}

export default NewLoadWrapper

//     < button
// onClick = { toggleGameType }
//     >
//     { gameTypeButtonText }
// </button >