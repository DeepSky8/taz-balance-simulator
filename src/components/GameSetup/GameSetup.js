import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { off, onValue, ref, } from "firebase/database";
import { clearGameState, clearPlayerClassesArray, clearPlayerList, startJoinActiveGame, updateGameHost, updateGameState, updatePlayerClassesArray, updatePlayerList, } from "../../actions/gameActions";
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


    // Get list of active games
    useEffect(() => {
        // Listen to list of activeGame objects in Firebase
        onValue(ref(db, 'activeGames'), (snapshot) => {

            const updatedArray = [];
            if (snapshot.exists()) {

                snapshot.forEach((childSnapShot) => {
                    updatedArray.push(childSnapShot.val().gameID)
                })
            }
            // Set a new list of current game codes on GameSetup state
            // when the listener perceives a change
            setGameArray(updatedArray)

            // if (!updatedArray.includes(userState.gameID)) {
            //     // console.log('Clearing cloud gameID would have fired')
            //     startRemoveGameID(auth.currentUser.uid)
            // }
        })

        return () => {
            // Remove the listener on Active Games in the cloud
            off(ref(db, 'activeGames'))
        }
    }, [])

    // Establish listeners on Active Game
    useEffect(() => {
        if (userState.gameID) {
            console.log('userState.gameID is: ', userState.gameID)
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
                        console.log('other players list is: ', otherPlayers)
                    } 
                    else {
                        console.log('dispatched clearPlayerList')
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
                        dispatchGameState(updatePlayerClassesArray(updatedClassArray))
                    } else {
                        dispatchGameState(clearPlayerClassesArray())
                        off(ref(db, 'activeGames/' + userState.gameID + '/classStorage'))
                    }
                })
        } else {
            console.log('clearing Game State')
            dispatchGameState(clearGameState())
        }

        // If the Active Game record no longer exists, 
        // get rid of the stored gameID and clear the local player list

        // else {
        //     console.log('would have started StartRemoveGameID with auth: ', auth.currentUser.uid)
        //     dispatchGameState(clearPlayerList())
        //     off(ref(db, 'activeGames/' + userState.gameID))
        //     off(ref(db, 'activeGames/' + userState.gameID + '/playerList'))
        // }

        return () => {
            off(ref(db, 'activeGames/' + userState.gameID))
            off(ref(db, 'activeGames/' + userState.gameID + '/playerList'))
            off(ref(db, 'activeGames/' + userState.gameID + '/classStorage'))
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

    }, [userState.currentCharacterID, userState.gameID])

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
            <StartGame />
        </div>
    )

}

export { GameSetup as default }



