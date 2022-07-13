import { off, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    clearReadyList,
    setActivePlayer,
    startNewRound,
    startSetReadyFalse,
    startSetReadyTrue,
    updateGameState,
    updatePlayerList,
    updateReadyList,
    updateReadyStatus
} from "../../../actions/gameActions";
import { auth, db } from "../../../firebase/firebase";

const ActiveGame = ({ userState, gameState, dispatchGameState }) => {
    let navigate = useNavigate()

    // Listeners monitor most game elements and updates local gameState
    // Updated a single time: playerList
    // Not updated: classList
    useEffect(() => {
        // Overall ongoing saved game state monitor
        onValue(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key), (snapshot) => {
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

        // Single-time player list monitor
        onValue(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key + '/playerList'), (snapshot) => {
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

        // Ongoing readyList monitor
        onValue(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key + '/readyList'), (snapshot) => {
            const readyList = []
            if (snapshot.exists()) {
                snapshot.forEach((readyPlayer) => {
                    readyList.push(readyPlayer.val())
                })
                dispatchGameState(updateReadyList(readyList))
            } else {
                dispatchGameState(clearReadyList())
            }
        })

        // Ongoing ready (gameState) monitor
        onValue(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key + '/ready'), (snapshot) => {
            if (snapshot.exists()) {
                // console.log('ready status in cloud: ', snapshot.val())
                dispatchGameState(updateReadyStatus(snapshot.val()))
            }
        })

        return () => {
            off(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key))
            off(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key + '/playerList'))
            off(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key + '/readyList'))
            off(ref(db, 'savedGames/' + userState.currentGame.host + '/' + userState.currentGame.key + '/ready'))
        }

    }, [userState.currentGame])

    // Compares the UIDs on the readyList with the list of players in the game
    // The next player in the playerList who isn't on the readyList is set as the activePlayer
    // If no players are left, updates the cloud with Ready state True, meaning it's time to 
    // start the next round
    useEffect(() => {
        const remainingPlayers = []
        gameState.playerList.forEach(player => {
            if (!gameState.readyList.includes(player.uid)) {
                remainingPlayers.push(player)
            }
        })

        if (remainingPlayers.length > 0) {

            dispatchGameState(setActivePlayer(remainingPlayers[0]))
        } else {
            startNewRound(userState.currentGame.host, userState.currentGame.key)
            startSetReadyTrue(userState.currentGame.host, userState.currentGame.key)
        }

    }, [gameState.readyList])

    // console.log('gameState: ', gameState)
    return (
        <div>
            This is the active game screen
            <Outlet />

            <div>Villain Code: {gameState.challengesObject.villainCode}</div>
            <div>Relic Code: {gameState.challengesObject.relicCode}</div>
            <div>Location Code: {gameState.challengesObject.locationCode}</div>
            <div>Class List: {gameState.classList}</div>

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

            {gameState.readyList &&
                gameState.readyList.forEach((remainingPlayer) => {
                    // return (<div>Ready Player Object: {playerObject} </div>)
                    <div>Object</div>
                    // console.log('remainingPlayer', remainingPlayer)
                    // console.log('readyList on page: ', gameState.readyList)
                })
            }


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
