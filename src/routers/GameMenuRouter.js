import React from "react"
import { Routes, Route } from "react-router-dom";
import JoiningHosting from "../components/elements/GameSetup/JoiningHosting";
import ChallengeDisplay from "../components/elements/GameSetup/ChallengeDisplay";
import PlayingAs from "../components/elements/GameSetup/PlayingAs";
import CharacterChallengeNavBar from "../components/elements/GameSetup/CharacterChallengeNavBar";
import GameInstructions from "../components/elements/GameSetup/GameInstructions";
import CharacterSelect from "../components/elements/GameSetup/CharacterSelect/CharacterSelect";
import NewLoadWrapper from "../components/elements/Challenges/NewLoadWrapper";
import RestOfParty from "../components/elements/GameSetup/Party/RestOfParty";
import StartGame from "../components/elements/GameSetup/StartGame";

const GameMenuRouter = ({
    charArray,
    charState,
    userState,
    cloudState,
    dispatchCloudState,
    gameArray,
    savedGameArray,

}) => {

    return (
        <div>
            <JoiningHosting
                userState={userState}
                dispatchGameState={dispatchCloudState}
                gameArray={gameArray}
            />
            <ChallengeDisplay
                gameState={cloudState}
            />
            <PlayingAs
                userState={userState}
                charState={charState}
            />
            <CharacterChallengeNavBar

            />
            <Routes>
                <Route index element={<GameInstructions />} />
                <Route
                    path="gameInstructions"
                    element={<GameInstructions />}
                />
                <Route
                    path='selectCharacter'
                    element={
                        <CharacterSelect
                            charState={charState}
                            charArray={charArray}
                        />
                    } />
                <Route
                    path='selectChallenges'
                    element={
                        <NewLoadWrapper
                            userState={userState}
                            gameState={cloudState}
                            savedGameArray={savedGameArray}
                        />
                    } />
                <Route
                    path='restOfParty'
                    element={
                        <RestOfParty
                            gameState={cloudState}
                        />
                    } />
            </Routes>
            <StartGame
                userState={userState}
                gameState={cloudState}
                dispatchGameState={dispatchCloudState}
                charState={charState}
            />
        </div>
    )
}

export default GameMenuRouter