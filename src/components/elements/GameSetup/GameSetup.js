import React, { useEffect, useReducer, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { off, onValue, ref } from "firebase/database";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
    clearGameState,
    clearClassList,
    clearPlayerList,
    startJoinActiveGame,
    updateGameState,
    updateClassList,
    updatePlayerList,
    updateReadyList,
    updateReadyStatus,
    clearReadyList,
} from "../../../actions/gameActions";
import CharacterChallengeNavBar from "./CharacterChallengeNavBar";
import PlayingAs from "./PlayingAs";
import {
    clearUserState,
    startRecordCurrentGame,
    updateUserState
} from "../../../actions/userActions";
import CharacterSelect from "./CharacterSelect/CharacterSelect";
import { setCharState, setNoCurrentChar } from "../../../actions/charActions";
import { charReducer, defaultCharState } from "../../../reducers/charReducer";
import { defaultGameState, gameReducer } from "../../../reducers/gameReducer";
import { defaultUserProfile, userReducer } from "../../../reducers/userReducer";
import NewLoadWrapper from "../Challenges/NewLoadWrapper";
import RestOfParty from "./Party/RestOfParty";
import JoiningHosting from "./JoiningHosting";
import StartGame from "./StartGame";
import GameInstructions from "./GameInstructions";
import AuthWrapper from "../../Authentication/AuthWrapper";
import ChallengeDisplay from "./ChallengeDisplay";




export const GameSetup = ({ }) => {
    let navigate = useNavigate()
    const [userState, dispatchUserState] = useReducer(userReducer, defaultUserProfile)
    const [gameArray, setGameArray] = useState([])
    const [charArray, setCharArray] = useState([])
    const [savedGameArray, setSavedGameArray] = useState([])
    const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)
    const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    // Single-fire listeners:
    // User Account
    // Game Array
    // Character Array
    // Saved Game Array
    useEffect(() => {

        // User Account listener
        onValue(ref(db, 'users/' + auth.currentUser.uid),
            (snapshot) => {
                // If there is a user account in the cloud at with this UID
                // copy it into local storage
                // and maintain listener status
                if (snapshot.exists()) {
                    dispatchUserState(updateUserState(snapshot.val()))
                } else {
                    // If no user account exists, clear local state
                    dispatchUserState(clearUserState())
                }
            })

        // gameList array listener
        onValue(ref(db, 'gameList'),
            (snapshot) => {
                const updatedArray = [];
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapShot) => {
                        updatedArray.push(childSnapShot.val().gameID)
                    })
                    setGameArray(updatedArray)
                } else {
                    setGameArray([])
                }
            })

        // current user character array listener
        onValue(ref(db, 'characters/' + auth.currentUser.uid),
            (snapshot) => {
                const characterArray = [];
                if (snapshot.exists()) {
                    snapshot.forEach(childSnapShot => {
                        characterArray.push(childSnapShot.val())
                    })
                }
                setCharArray(characterArray)
            })

        // saved game array listener
        onValue(ref(db, 'savedGames/' + auth.currentUser.uid),
            (snapshot) => {
                const userSavedGames = [];
                if (snapshot.exists()) {
                    snapshot.forEach((savedGame) => { userSavedGames.push(savedGame.val()) })
                }
                setSavedGameArray(userSavedGames)

            })

        return () => {
            // Remove the listeners when gameSetup is closed
            off(ref(db, 'users/' + auth.currentUser.uid))
            off(ref(db, 'gameList'))
            off(ref(db, 'characters/' + auth.currentUser.uid))
            off(ref(db, 'savedGames/' + auth.currentUser.uid))
        }
    }, [])

    // charState updater
    useEffect(() => {
        // Update the current character state if it changes
        // Clear local character state if no character state
        // exists in the cloud
        if (userState.currentCharacterID) {
            let charObject = charArray.find(character =>
                character.charID === userState.currentCharacterID)
            dispatchCharState(setCharState(charObject))
        } else {
            dispatchCharState(setNoCurrentChar())
        }
    }, [userState.currentCharacterID, charArray])

    // gameState listeners
    useEffect(() => {
        if (userState.gameID) {
            // When the local gameID changes, if the local gameID exists
            // start a listener to get the game information
            onValue(ref(db, 'activeGames/' + userState.gameID),
                (snapshot) => {

                    if (snapshot.exists()) {
                        // If the game information exists, copy it to local
                        dispatchGameState(updateGameState(snapshot.val()))
                    } else {
                        // If the game information does not exist,
                        if (gameState.key === null) {
                            // check for a game key.
                            // Without a key, clear the local state
                            dispatchGameState(clearGameState())
                            // then close the listener
                            off(ref(db, 'activeGames/' + userState.gameID))
                        }
                    }
                })
            // and then start a listener to get the participating players.
            onValue(ref(db, 'activeGames/' + userState.gameID + '/playerList'),
                (snapshot) => {

                    if (snapshot.exists()) {
                        const playerList = [];
                        snapshot.forEach((player) => {
                            playerList.push(player.val());
                        })
                        const otherPlayers = playerList.filter(player => player.uid !== auth.currentUser.uid)
                        if (playerList.length > 0) {
                            dispatchGameState(updatePlayerList(otherPlayers))
                        }
                    }
                    else {
                        dispatchGameState(clearPlayerList())
                        off(ref(db, 'activeGames/' + userState.gameID + '/playerList'))
                    }

                })
            // and then start a listener to get the current classes in the party
            onValue(ref(db, 'activeGames/' + userState.gameID + '/classStorage'),
                snapshot => {
                    if (snapshot.exists()) {
                        const updatedClassArray = [];
                        snapshot.forEach((playerclass) => {
                            updatedClassArray.push(playerclass.val())
                        })
                        dispatchGameState(updateClassList(updatedClassArray))

                    } else {
                        dispatchGameState(clearClassList())
                        off(ref(db, 'activeGames/' + userState.gameID + '/classStorage'))
                    }
                })
            // and then start a listener on the readyCheck list
            onValue(ref(db, 'activeGames/' + userState.gameID + '/readyCheck'),
                snapshot => {
                    if (snapshot.exists()) {
                        const updatedReadyList = [];
                        snapshot.forEach((readyPlayer) => {
                            updatedReadyList.push(readyPlayer.val())
                        })
                        // Update local state with the list of ready players
                        dispatchGameState(updateReadyList(updatedReadyList))

                        // If this player is in the list, 
                        // update local state to reflect
                        if (updatedReadyList.includes(auth.currentUser.uid)) {
                            dispatchGameState(updateReadyStatus(true))
                        } else {
                            // otherwise set this player's ready status to false
                            dispatchGameState(updateReadyStatus(false))
                        }
                    } else {
                        // if there are no ready players, clear the ready list locally
                        dispatchGameState(clearReadyList())
                        // clear the current player's ready status
                        dispatchGameState(updateReadyStatus(false))
                    }

                })

        } else {
            dispatchGameState(clearGameState())
        }

        return () => {
            off(ref(db, 'activeGames/' + userState.gameID))
            off(ref(db, 'activeGames/' + userState.gameID + '/playerList'))
            off(ref(db, 'activeGames/' + userState.gameID + '/classStorage'))
            off(ref(db, 'activeGames/' + userState.gameID + '/readyCheck'))
        }
    }, [userState.gameID])

    // The presence of a local gameState.key will
    // confirm that a game has started, and move all players to 
    // the activeGame screen
    useEffect(() => {
        // If a game key exists, 
        // and the list of ready players is the same length as the list of (other) players
        // and THIS player is ready
        // navigate to the Introductions screen on the ActiveGame
        // as the game has begun

        if (gameState.key !== null &&
            gameState.readyList.length === (gameState.playerList.length + 1) &&
            gameState.ready) {
            startRecordCurrentGame(
                auth.currentUser.uid, gameState.key, gameState.host
            )
            navigate('/activeGame/introductions')
        }

    }, [gameState.key, gameState.readyList, gameState.ready])



    // Join an active game when a character has been selected and gameID entered
    useEffect(() => {

        // Add the current character class code to the active game 
        // and the UID and current character key to the list of 
        // players on the Active Game

        if (userState.currentCharacterID && userState.gameID) {
            startJoinActiveGame(
                auth.currentUser.uid,
                userState.gameID,
                userState.currentCharacterID,
                charState.classCode
            )
        }

    }, [charState.classCode, userState.gameID])



    return (
        <div>
            <AuthWrapper />
            <JoiningHosting
                userState={userState}
                dispatchGameState={dispatchGameState}
                gameArray={gameArray}
            />
            <ChallengeDisplay
                gameState={gameState}
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
                            gameState={gameState}
                            savedGameArray={savedGameArray}
                        />
                    } />
                <Route
                    path='restOfParty'
                    element={
                        <RestOfParty
                            gameState={gameState}
                        />
                    } />
            </Routes>
            <StartGame
                userState={userState}
                gameState={gameState}
                dispatchGameState={dispatchGameState}
            />
        </div>
    )

}

export { GameSetup as default }



