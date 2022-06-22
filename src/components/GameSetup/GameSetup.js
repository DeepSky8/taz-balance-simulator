import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { off, onValue, ref, } from "firebase/database";
import { clearGameState, clearClassList, clearPlayerList, startJoinActiveGame, updateGameHost, updateGameState, updateClassList, updatePlayerList, updateReadyList, updateReadyStatus, clearReadyList, } from "../../actions/gameActions";
import { startRemoveGameID } from "../../actions/userActions";
import AuthWrapper from "../Authentication/AuthWrapper";
import JoiningHosting from "./JoiningHosting";
import ChallengeDisplay from "../elements/Challenges/ChallengeDisplay";
import { Outlet } from "react-router-dom";
import CharacterChallengeNavBar from "./CharacterChallengeNavBar";
import PlayingAs from "../elements/Party/partyMembers/PlayingAs";
import StartGame from "./StartGame";

export const GameSetup = ({ dispatchGameState, userState, gameState, charState, setSavedGameArray }) => {
    const [gameArray, setGameArray] = useState([])


    // Listener on the gameList element
    useEffect(() => {
        // Listen to list of activeGame objects in Firebase
        onValue(ref(db, 'gameList'), (snapshot) => {
            const updatedArray = [];
            if (snapshot.exists()) {

                snapshot.forEach((childSnapShot) => {
                    updatedArray.push(childSnapShot.val().gameID)
                })
            } else {
                setGameArray([])
            }
            // Set a new list of current game codes on GameSetup state
            // when the listener perceives a change
            setGameArray(updatedArray)
            // console.log('game array is now: ', updatedArray)

            // if (!updatedArray.includes(userState.gameID)) {
            //     // console.log('Clearing cloud gameID would have fired')
            //     startRemoveGameID(auth.currentUser.uid)
            // }
        })

        return () => {
            // Remove the listener on Active Games in the cloud
            off(ref(db, 'gameList'))
        }
    }, [])

    // Establish listeners on Active Game
    useEffect(() => {
        if (userState.gameID) {
            // When the local gameID changes, if the local gameID exists
            // start a listener to get the game information
            onValue(ref(db, 'activeGames/' + userState.gameID), (snapshot) => {
                if (snapshot.exists()) {
                    dispatchGameState(updateGameState(snapshot.val()))
                    // dispatchGameState(updateGameHost(snapshot.val()))
                } else {
                    dispatchGameState(clearGameState())
                    off(ref(db, 'activeGames/' + userState.gameID))
                }
            })
            // and then start a listener to get the participating players.
            onValue(ref(db, 'activeGames/' + userState.gameID + '/playerList'),
                snapshot => {

                    if (snapshot.exists()) {
                        const playerList = [];
                        snapshot.forEach((player) => {
                            playerList.push(player.val());
                        })
                        const otherPlayers = playerList.filter(player => player.uid !== auth.currentUser.uid)
                        dispatchGameState(updatePlayerList(otherPlayers))
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
                        // console.log('classList is now: ', updatedClassArray)
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
                            // console.log('player ready: ', charState.charName)
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

                        // off(ref(db, 'activeGames/' + userState.gameID + '/readyCheck'))
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

    // Join an active game when a character has been selected and gameID entered
    // This must occurr on AppRouter so that the whole app is rerendered
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

    // Get list of saved games for this user
    useEffect(() => {
        onValue(ref(db, 'savedGames/' + auth.currentUser.uid), (snapshot) => {
            const userSavedGames = [];
            if (snapshot.exists()) {
                snapshot.forEach((savedGame) => { userSavedGames.push(savedGame.val()) })
            }
            setSavedGameArray(userSavedGames)

        })

        return () => {
            off(ref(db, 'savedGames/' + auth.currentUser.uid))
        }
    }, [])

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
            <Outlet />
            <StartGame
                userState={userState}
                gameState={gameState}
            />
        </div>
    )

}

export { GameSetup as default }



