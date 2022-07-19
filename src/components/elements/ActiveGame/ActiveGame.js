import React, { useEffect, useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { off, onValue, ref } from "firebase/database";
import {
    setActivePlayer,
    startNewRound,
    startUpdateGameStage,
    updateGameState,
    updatePlayerList,
    updateReadyList,
    updateReadyStatus,
    updateStage
} from "../../../actions/gameActions";
import { auth, db } from "../../../firebase/firebase";
import { defaultGameState, gameReducer } from "../../../reducers/gameReducer";
import AuthWrapper from "../../Authentication/AuthWrapper";
import ActiveCharWrapper from "./ActiveCharWrapper";
import PassTurn from "./PassTurn";
import IntroDescription from "./introductions/IntroDescription";
import IntroCharacter from './introductions/IntroCharacter';
import incrementStage from "../../functions/incrementStage";

const ActiveGame = ({ }) => {
    let navigate = useNavigate()
    const introStages = ['INTRO', 'BRIEF', 'BACKSTORY']
    const [currentGameID, dispatchCurrentGameID] = useState({})
    const [localCharID, dispatchLocalCharID] = useState('')
    const [activeCharacterObject, dispatchActiveCharacterObject] = useState({})
    const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    const [localCharObject, dispatchLocalCharObject] = useState({})

    const resetStages = () => {
        startUpdateGameStage(currentGameID.host, currentGameID.key, 'INTRO')
    }

    // User listener, updated a single time:
    // Current Game: host and key
    // Current Character ID (localCharID)
    useEffect(() => {
        onValue(ref(db, 'users/' + auth.currentUser.uid + '/currentGame'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchCurrentGameID(snapshot.val())
                } else {
                    navigate('/')
                }
            }, {
            onlyOnce: true
        })

        onValue(ref(db, 'users/' + auth.currentUser.uid + '/currentCharacterID'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchLocalCharID(snapshot.val())
                } else {
                    navigate('/gameSetup')
                }
            }, {
            onlyOnce: true
        })
        return () => {
            off(ref(db, 'users/' + auth.currentUser.uid + '/currentGame'))
            off(ref(db, 'users/' + auth.currentUser.uid + '/currentCharacterID'))
        }
    }, [])

    // GameState listeners, monitoring most game elements and updating local gameState
    // Updated a single time: playerList
    // Not updated: classList
    useEffect(() => {
        // Overall ongoing saved game state listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key),
            (snapshot) => {
                if (snapshot.exists()) {
                    // If a gameState exists at this address, sync the local gameState
                    dispatchGameState(updateGameState(snapshot.val()))
                } else if (auth.currentUser.uid !== null) {
                    // If a gamestate doesn't exist, but there IS a user signed in
                    // navigate to the gameSetup
                    navigate('/gameSetup')
                } else {
                    // If there is not a user signed in, navigate to the main welcome screen
                    navigate('/')
                }
            })

        // Single-time playerList listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/playerList'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const playerList = [];
                    snapshot.forEach((player) => {
                        playerList.push(player.val())
                    })
                    // console.log('playerList: ', playerList)
                    dispatchGameState(updatePlayerList(playerList))
                } else {

                }
            }, {
            onlyOnce: true
        })

        // Ongoing readyList listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/readyList'),
            (snapshot) => {
                const readyList = []
                if (snapshot.exists()) {
                    snapshot.forEach((readyPlayer) => {
                        readyList.push(readyPlayer.val())
                    })
                }
                dispatchGameState(updateReadyList(readyList))
            })

        // // Ongoing ready (gameState) listener
        // onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/ready'),
        //     (snapshot) => {
        //         if (snapshot.exists()) {
        //             dispatchGameState(updateReadyStatus(snapshot.val()))
        //         }
        //     })

        // Ongoing stage listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/stage'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchGameState(updateStage(snapshot.val()))
                }
            })

        return () => {
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/playerList'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/readyList'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/ready'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/stage'))
        }

    }, [currentGameID])

    // Ongoing local character listener
    useEffect(() => {
        if (localCharID !== '') {
            onValue(ref(db, 'characters/' + auth.currentUser.uid + '/' + localCharID), (snapshot) => {
                if (snapshot.exists()) {
                    dispatchLocalCharObject(snapshot.val())
                }
            })
        }

        return () => {
            if (localCharID !== '') {
                off(ref(db, 'characters/' + auth.currentUser.uid + '/' + localCharID))
            }
        }
    }, [localCharID])

    // Compares the UIDs on the readyList with the list of players in the game
    // The next player in the playerList who isn't on the readyList is set as the activePlayer
    // If no players are left, clears the readyList array
    // and updates the cloud with Ready state True, 
    useEffect(() => {
        const remainingPlayers = []
        gameState.playerList.forEach(player => {
            if (!gameState.readyList.includes(player.uid)) {
                remainingPlayers.push(player)
            }
        })
        if (remainingPlayers.length > 0) {
            dispatchGameState(setActivePlayer(remainingPlayers[0]))
        }
        if ((gameState.playerList.length !== 0) &&
            (gameState.playerList.length === gameState.readyList.length)
        ) {
            startNewRound(currentGameID.host, currentGameID.key)
            dispatchGameState(updateReadyStatus(true))
        }
    }, [gameState.readyList])

    // Listener for remote activePlayer on gameState
    useEffect(() => {
        if (gameState.activePlayer && gameState.activePlayer.uid !== auth.currentUser.uid) {
            dispatchActiveCharacterObject({})
            // If the current Active Player is not the local player, 
            // establish a listener for the duration of their turn
            onValue(ref(db, 'characters/' + gameState.activePlayer.uid + '/' + gameState.activePlayer.currentCharacterID),
                (snapshot) => {
                    if (snapshot.exists()) {
                        dispatchActiveCharacterObject(snapshot.val())
                    }
                })
        }

        return () => {
            if (gameState.activePlayer && gameState.activePlayer.uid !== auth.currentUser.uid) {
                // console.log('removed listener for ', gameState.activePlayer.uid)
                // off(ref(db, 'characters/' + gameState.activePlayer.uid + '/' + gameState.activePlayer.currentCharacterID))
                gameState.playerList.forEach((player) => {
                    off(ref(db, 'characters/' + player.uid + '/' + player.currentCharacterID))
                })
            }
        }
    }, [gameState.activePlayer])

    // If activePlayer is the local player
    // mirror the localChar state into the activeCharacterObject
    useEffect(() => {
        if (gameState.activePlayer && gameState.activePlayer.currentCharacterID === localCharID) {
            dispatchActiveCharacterObject(localCharObject)
        }

    }, [gameState.activePlayer, localCharObject])

    const incrementGameStage = () => {
        startUpdateGameStage(currentGameID.host, currentGameID.key, incrementStage(gameState.stage))
        dispatchGameState(updateReadyStatus(false))
    }

    // Triggered by Ready state and team health changes
    // evaluate the current stage of the game
    // and advance it when appropriate
    useEffect(() => {
        if (
            (introStages.includes(gameState.stage)) &&
            gameState.ready
        ) {
            incrementGameStage()
        } else if (
            (gameState.teamHealth === 0) &&
            gameState.ready
        ) {
            incrementGameStage()
        } else if (
            ((gameState.progress.relic > 10) &&
                (gameState.progress.villain > 10 || gameState.progress.location > 10))
        ) {
            incrementGameStage()
        }

    }, [gameState.ready, gameState.teamHealth])

    // Navigate to activeGame pages
    // based on game stages completed
    useEffect(() => {
        switch (gameState.stage) {
            case 'INTRO':
                navigate('introductions')
                break;
            case 'BRIEF':
                navigate('missionBriefing')
                break;
            case 'BACKSTORY':
                navigate('backstory')
                break;
            case 'CHALLENGES':
                navigate('playing')
                break;
            case 'END':
                navigate('summary')
                break;
            default:
                break;
        }
    }, [gameState.stage])

    return (
        <div>
            <AuthWrapper />
            <ActiveCharWrapper
                activePlayer={gameState.activePlayer}
            />
            <PassTurn
                gameState={gameState}
                resetStages={resetStages}
            />
            <Routes>
                <Route
                    path="introductions"
                    element={
                        <div>
                            <IntroDescription />
                            <IntroCharacter
                                character={activeCharacterObject}
                                ready={gameState.ready}
                            />
                        </div>
                    }
                />
                <Route
                    path="missionBriefing"
                    element={
                        <div>
                            missionBriefing
                        </div>
                    }
                />
                <Route
                    path="backstory"
                    element={
                        <div>
                            backstory
                        </div>
                    }
                />
                <Route
                    path="playing"
                    element={
                        <div>
                            playing
                        </div>
                    }
                />
                <Route
                    path="summary"
                    element={
                        <div>
                            summary
                        </div>
                    }
                />
            </Routes>
            <div>
                <p> - break - </p>
                <div>Villain Code: {gameState.challengesObject.villainCode}</div>
                <div>Relic Code: {gameState.challengesObject.relicCode}</div>
                <div>Location Code: {gameState.challengesObject.locationCode}</div>
                <div>Stage: {gameState.stage}</div>
                <div>Game ID: {gameState.gameID}</div>
                <div>Host: {gameState.host}</div>
                <div>Key: {gameState.key}</div>
                <div>Surprises: {gameState.surprises}</div>
                <div>Villain Progress: {gameState.progress.villain}</div>
                <div>Relic Progress: {gameState.progress.relic}</div>
                <div>Location Progress: {gameState.progress.location}</div>
                <div>Ready state: {gameState.ready && gameState.ready ? 'true' : 'false'}</div>
                <div>Team Health: {gameState.teamHealth}</div>
                <div>Active Player: {gameState.activePlayer && gameState.activePlayer.currentCharacterID}</div>
            </div>
        </div>
    )
}

export { ActiveGame as default }














// {gameState.classStorage.forEach((classNumber) => {
//     <div>Class Storage: {classNumber} </div>
// })}



            // {gameState.playerList &&
            //     gameState.playerList.forEach((playerObject) => {
            //         return (<div>Team Player Object: {playerObject.currentCharacterID}, {playerObject.uid}</div>)
            //     })
            // }

// {gameState.readyList && playerObject.currentCharacterID}, {gameState.readyList && playerObject.uid}
