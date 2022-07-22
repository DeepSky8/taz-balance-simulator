import React, { useEffect, useReducer, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { off, onValue, ref } from "firebase/database";
import {
    setActivePlayer,
    startNewRound,
    startUpdateGameStage,
    updateBackstory,
    updateGameActive,
    updateGameStatic,
    updatePlayerList,
    updateReadyList,
    updateReadyStatus,
} from "../../../actions/gameActions";
import { auth, db } from "../../../firebase/firebase";
import { defaultGameState, gameReducer } from "../../../reducers/gameReducer";
import AuthWrapper from "../../Authentication/AuthWrapper";
import ActiveCharWrapper from "./ActiveCharWrapper";
import PassTurn from "./PassTurn";
import IntroDescription from "./introductions/IntroDescription";
import IntroCharacter from './introductions/IntroCharacter';
import incrementStage from "../../functions/incrementStage";
import MissionBriefing from "./missionBriefing/MissionBriefing";

const ActiveGame = ({ }) => {
    let navigate = useNavigate()
    const introStages = ['INTRO', 'BRIEF', 'BACKSTORY']
    const [currentGameID, dispatchCurrentGameID] = useState({})
    const [localCharID, dispatchLocalCharID] = useState('')
    const [activeCharacterObject, dispatchActiveCharacterObject] = useState({})
    const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    const [localCharObject, dispatchLocalCharObject] = useState({})


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
    // Updated a single time: static, playerList
    // Not updated: classList
    useEffect(() => {
        // Single-time Static listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/static'),
            (snapshot) => {
                if (snapshot.exists()) {
                    // If gameState static items exists at this address, sync the local gameState
                    dispatchGameState(updateGameStatic(snapshot.val()))
                } else if (auth.currentUser.uid !== null) {
                    // If a gamestate doesn't exist, but there IS a user signed in
                    // navigate to the gameSetup
                    navigate('/gameSetup')
                } else {
                    // If there is not a user signed in, navigate to the main welcome screen
                    navigate('/')
                }
            }, {
            onlyOnce: true
        })

        // Single-time playerList listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/playerList'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const playerList = [];
                    snapshot.forEach((player) => {
                        playerList.push(player.val())
                    })
                    dispatchGameState(updatePlayerList(playerList))
                } else {

                }
            }, {
            onlyOnce: true
        })

        // Ongoing Active listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/active'),
            (snapshot) => {
                if (snapshot.exists()) {
                    // If gameState progress object exists at this address, sync the local gameState
                    dispatchGameState(updateGameActive(snapshot.val()))
                } else if (auth.currentUser.uid !== null) {
                    // If a gamestate doesn't exist, but there IS a user signed in
                    // navigate to the gameSetup
                    navigate('/gameSetup')
                } else {
                    // If there is not a user signed in, navigate to the main welcome screen
                    navigate('/')
                }
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

        // Ongoing backstory listener
        onValue(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/backstory'),
            (snapshot) => {
                if (snapshot.exists()) {
                    dispatchGameState(updateBackstory(snapshot.val()))
                }

            })

        return () => {
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/static'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/active'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/playerList'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/readyList'))
            off(ref(db, 'savedGames/' + currentGameID.host + '/' + currentGameID.key + '/backstory'))
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
        // console.log('remainingplayers', remainingPlayers)
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
        if (gameState.active.activePlayer && gameState.active.activePlayer.uid !== auth.currentUser.uid) {
            dispatchActiveCharacterObject({})
            // If the current Active Player is not the local player, 
            // establish a listener for the duration of their turn
            onValue(ref(db, 'characters/' + gameState.active.activePlayer.uid + '/' + gameState.active.activePlayer.currentCharacterID),
                (snapshot) => {
                    if (snapshot.exists()) {
                        dispatchActiveCharacterObject(snapshot.val())
                    }
                })
        }

        return () => {
            if (gameState.active.activePlayer && gameState.active.activePlayer.uid !== auth.currentUser.uid) {
                gameState.playerList.forEach((player) => {
                    off(ref(db, 'characters/' + player.uid + '/' + player.currentCharacterID))
                })
            }
        }
    }, [gameState.active.activePlayer])

    // If activePlayer is the local player
    // mirror the localChar state into the activeCharacterObject
    useEffect(() => {
        if (gameState.active.activePlayer && gameState.active.activePlayer.currentCharacterID === localCharID) {
            dispatchActiveCharacterObject(localCharObject)
        }

    }, [gameState.activePlayer, localCharObject])

    const incrementGameStage = () => {
        startUpdateGameStage(currentGameID.host, currentGameID.key, incrementStage(gameState.active.stage))
        dispatchGameState(updateReadyStatus(false))
    }

    // Triggered by Ready state and team health changes
    // evaluate the current stage of the game
    // and advance it when appropriate
    useEffect(() => {
        if (
            (introStages.includes(gameState.active.stage)) &&
            gameState.active.ready
        ) {
            incrementGameStage()
        } else if (
            (gameState.active.teamHealth === 0) &&
            gameState.active.ready
        ) {
            incrementGameStage()
        } else if (
            ((gameState.active.progressRelic > 10) &&
                (gameState.active.progressVillain > 10 || gameState.active.progressLocation > 10))
        ) {
            incrementGameStage()
        }

    }, [gameState.active.ready, gameState.active.teamHealth])

    // Navigate to activeGame pages
    // based on game stages completed
    useEffect(() => {
        switch (gameState.active.stage) {
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
            case 'gameSetup':
                navigate('/gameSetup')
                break;
            default:
                break;
        }
    }, [gameState.active.stage])


    // Testing tools
    const resetStages = () => {
        startUpdateGameStage(currentGameID.host, currentGameID.key, 'INTRO')
    }

    const stepStage = () => {
        startUpdateGameStage(currentGameID.host, currentGameID.key, incrementStage(gameState.active.stage))
    }
    // Testing tools

    return (
        <div>
            <AuthWrapper />
            <ActiveCharWrapper
                gameState={gameState}
                character={activeCharacterObject}
                resetStages={resetStages}
                stepStage={stepStage}
            />

            <Routes>
                <Route
                    path="introductions"
                    element={
                        <div>
                            <PassTurn
                                gameState={gameState}
                            />
                            <IntroDescription />
                            <IntroCharacter
                                character={activeCharacterObject}
                                ready={gameState.ready}
                            />
                        </div>
                    }
                />
                <Route
                    path="missionBriefing/*"
                    element={
                        <MissionBriefing
                            gameState={gameState}
                        />
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
                            <PassTurn
                                gameState={gameState}
                            />
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
                <div>Villain Code: {gameState.static.codeVillain}</div>
                <div>Relic Code: {gameState.static.codeRelic}</div>
                <div>Location Code: {gameState.static.codeLocation}</div>
                <div>Stage: {gameState.active.stage}</div>
                <div>Briefing Stage: {gameState.backstory.briefingStage}</div>
                <div>Host: {gameState.static.host}</div>
                <div>Key: {gameState.static.key}</div>
                <div>Surprises: {gameState.surprises}</div>
                <div>Villain Progress: {gameState.active.progressVillain}</div>
                <div>Relic Progress: {gameState.active.progressRelic}</div>
                <div>Location Progress: {gameState.active.progressLocation}</div>
                <div>Ready state: {gameState.active.ready && gameState.active.ready ? 'true' : 'false'}</div>
                <div>Team Health: {gameState.active.teamHealth}</div>
                <div>Active Character: {gameState.active.activePlayer && gameState.active.activePlayer.currentCharacterID}</div>
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
