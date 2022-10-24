import React, { useState } from "react";
import ChallengeSelect from "./ChallengeSelect";
import SavedGames from "../GameSetup/savedGames/SavedGames";
import { useEffect } from "react";


const NewLoadWrapper = ({ userState, gameState, savedGameArray }) => {
    const newGameText = 'Display saved missions'
    const savedGamesText = 'New mission'

    const [showNewGame, setShowNewGame] = useState(false)
    const [showSavedGames, setShowSavedGames] = useState(true)
    const [gameTypeButtonText, setButtonText] = useState(savedGamesText)

    const toggleGameType = () => {
        setShowNewGame(!showNewGame)
        setShowSavedGames(!showSavedGames)
        setButtonText(showSavedGames ? newGameText : savedGamesText)
    }

    useEffect(() => {
        if (savedGameArray.length <= 0) {
            setShowNewGame(true)
            setShowSavedGames(false)
            setButtonText(newGameText)
        }
    }, [])

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