import React, { useEffect, useReducer, useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { off, onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
    clearGameState,
    clearClassList,
    clearPlayerList,
    startJoinActiveGame,
    updateClassList,
    updatePlayerList,
    updateReadyList,
    updateReadyStatus,
    clearReadyList,
    startRemoveGameCode,
    updateGameStatic,
    updateGameActive,
} from "../../../actions/cloudActions";
import {
    clearUserState,
    startRecordCurrentGame,
    updateUserState
} from "../../../actions/userActions";
import { setCharState, setNoCurrentChar } from "../../../actions/charActions";
import { charReducer, defaultCharState } from "../../../reducers/charReducer";
import { defaultCloudState, cloudReducer } from "../../../reducers/cloudReducer";
import { defaultUserProfile, userReducer } from "../../../reducers/userReducer";
import GameMenuRouter from "../../../routers/GameMenuRouter";



export const GameSetup = ({ }) => {
    let navigate = useNavigate()
    const [userState, dispatchUserState] = useReducer(userReducer, defaultUserProfile)
    const [gameArray, setGameArray] = useState([])
    const [charArray, setCharArray] = useState([])
    const [savedGameArray, setSavedGameArray] = useState([])
    const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)
    const [cloudState, dispatchCloudState] = useReducer(cloudReducer, defaultCloudState)
    // Ongoing listeners:
    // User Account
    // gameList Array
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
                    snapshot.forEach((savedGame) => {
                        userSavedGames.push(savedGame.val())
                    })
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
            // start listeners to get the game information

            // Ongoing gameState Static listener
            onValue(ref(db, 'gameSetup/' + userState.gameID + '/static'),
                (snapshot) => {

                    if (snapshot.exists()) {
                        // If the game information exists, copy it to local
                        dispatchCloudState(updateGameStatic(snapshot.val()))
                    } else {
                        // If the game information does not exist,
                        if (cloudState.static.key === null) {
                            // check for a game key.
                            // Without a key, clear the local state
                            dispatchCloudState(clearGameState())
                            // then close the listener
                            off(ref(db, 'gameSetup/' + userState.gameID + '/static'))
                        }
                    }
                })

            // Ongoing gameState Active listener
            onValue(ref(db, 'gameSetup/' + userState.gameID + '/active'),
                (snapshot) => {
                    if (snapshot.exists()) {
                        // If the game information exists, copy it to local
                        dispatchCloudState(updateGameActive(snapshot.val()))
                        // console.log('gameState singles update: ', snapshot.val())
                    }
                })

            // Ongoing playerList listener
            onValue(ref(db, 'gameSetup/' + userState.gameID + '/playerList'),
                (snapshot) => {

                    if (snapshot.exists()) {
                        const playerList = [];
                        snapshot.forEach((player) => {
                            playerList.push(player.val());
                        })
                        const otherPlayers = playerList.filter(player => player.uid !== auth.currentUser.uid)
                        if (playerList.length > 0) {
                            dispatchCloudState(updatePlayerList(otherPlayers))
                        }
                    }
                    else {
                        dispatchCloudState(clearPlayerList())
                        off(ref(db, 'gameSetup/' + userState.gameID + '/playerList'))
                    }

                })

            // Ongoing classStorage listener
            onValue(ref(db, 'gameSetup/' + userState.gameID + '/classStorage'),
                snapshot => {
                    if (snapshot.exists()) {
                        const updatedClassArray = [];
                        snapshot.forEach((playerclass) => {
                            updatedClassArray.push(playerclass.val())
                        })
                        dispatchCloudState(updateClassList(updatedClassArray))

                    } else {
                        dispatchCloudState(clearClassList())
                        off(ref(db, 'gameSetup/' + userState.gameID + '/classStorage'))
                    }
                })

            // Ongoing readyCheck listener
            onValue(ref(db, 'gameSetup/' + userState.gameID + '/readyCheck'),
                snapshot => {
                    if (snapshot.exists()) {
                        const updatedReadyList = [];
                        snapshot.forEach((readyPlayer) => {
                            updatedReadyList.push(readyPlayer.val())
                        })
                        // Update local state with the list of ready players
                        dispatchCloudState(updateReadyList(updatedReadyList))
                        // If this player is in the list, 
                        // update local state to reflect
                        if (updatedReadyList.includes(auth.currentUser.uid)) {
                            dispatchCloudState(updateReadyStatus(true))
                        } else {
                            // otherwise set this player's ready status to false
                            dispatchCloudState(updateReadyStatus(false))
                        }
                    } else {
                        // if there are no ready players, clear the ready list locally
                        dispatchCloudState(clearReadyList())
                        // clear the current player's ready status
                        dispatchCloudState(updateReadyStatus(false))
                    }

                })

        } else {
            dispatchCloudState(clearGameState())
        }

        return () => {
            off(ref(db, 'gameSetup/' + userState.gameID + '/static'))
            off(ref(db, 'gameSetup/' + userState.gameID + '/active'))
            off(ref(db, 'gameSetup/' + userState.gameID + '/playerList'))
            off(ref(db, 'gameSetup/' + userState.gameID + '/classStorage'))
            off(ref(db, 'gameSetup/' + userState.gameID + '/readyCheck'))
        }
    }, [userState.gameID])

    // The presence of a local gameState.static.key will
    // confirm that a game has started, and move all players to 
    // the activeGame screen
    useEffect(() => {
        // If a game key exists, 
        // and the list of ready players is the same length as the list of (other) players
        // and THIS player is ready
        // navigate to the Introductions screen on the ActiveGame
        // as the game has begun

        if (cloudState.static.key !== null &&
            cloudState.readyList.length === (cloudState.playerList.length + 1) &&
            cloudState.active.ready) {

            startRecordCurrentGame(
                auth.currentUser.uid,
                cloudState.static.key,
                cloudState.static.host
            )

            navigate('/activeGame/introductions')
            startRemoveGameCode(auth.currentUser.uid, cloudState.static.gameID)
        }

    }, [cloudState.static.key, cloudState.readyList, cloudState.active.ready])



    // Join an active game when a character has been selected and gameID entered
    useEffect(() => {

        // Add the current character class code to the active game 
        // and the UID, current character key, and name to the list of 
        // players on the Active Game

        if (userState.currentCharacterID && userState.gameID) {
            startJoinActiveGame(
                auth.currentUser.uid,
                userState.gameID,
                userState.currentCharacterID,
                charState.classCode,
                charState.charName
            )
        }

    }, [charState.classCode, userState.gameID])

    return (
        <div>
            <GameMenuRouter
                charArray={charArray}
                charState={charState}
                userState={userState}
                cloudState={cloudState}
                dispatchCloudState={dispatchCloudState}
                gameArray={gameArray}
                savedGameArray={savedGameArray}
            />
        </div>
    )

}

export { GameSetup as default }