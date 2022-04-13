import React, { useEffect, useReducer, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { child, off, onValue, push, ref } from "firebase/database";
import { defaultGameSetup, setupReducer } from '../../reducers/setupReducer';
import { setGameIDArray, setGameKey, setHost, setUID, startRegisterGameID, startRemoveGameCode } from "../../actions/setupActions";
import JoiningHosting from "./JoiningHosting";
import VillainSelect from "./VillainSelect";
import { Outlet } from "react-router-dom";



export const GameSetup = () => {

    const [setupState, dispatchSetupState] = useReducer(setupReducer, defaultGameSetup)


    // Listen to the logged-in user (including Anonymous)
    // and update the GameSetup state on changes
    useEffect(() => {
        dispatchSetupState(setUID(auth.currentUser.uid))
    }, [auth.currentUser.uid])

    // Listen to list of current game codes in Firebase
    // Set a new list of current game codes on GameSetup state
    // when the listener perceives a change
    useEffect(() => {
        onValue(ref(db, 'activeGames'), (snapshot) => {
            const updatedArray = [];
            const initialGameObjectsArray = [];
            snapshot.forEach((childSnapShot) => {
                updatedArray.push(childSnapShot.val().gameID)
                initialGameObjectsArray.push(childSnapShot.val())
            })
            dispatchSetupState(setGameIDArray(updatedArray, initialGameObjectsArray))
            // snapshot.forEach((childSnapShot) => {
            //     if (childSnapShot.val().gameID === setupState.gameID) {
            //         console.log('updated array matched on a game ID, updating local key ', childSnapShot.val().key)
            //         dispatchSetupState(setGameKey(childSnapShot.val().key))
            //     }
            // })
        })

        return () => {
            // Add code here to remove the gameID from the active game list when 
            // this JSX is closed. 
            off(ref(db, 'activeGames'))
        }
    }, [])

    // When gameID is updated, either start a listener or register the gameID to share
    useEffect(() => {
        const uniqueGameID = !setupState.gameIDArray.includes(setupState.gameID)
        if (setupState.joiningGame) {

            // If joining game, start listener to sync the rest of the game state

        } else if (!setupState.joiningGame && uniqueGameID) {
            // If hosting and unique game ID is stored locally, 
            // create a key in the activeGames,
            // then register gameID at that key
            const newGameKey = push(ref(db, 'activeGames')).key
            startRegisterGameID(setupState.gameID, setupState.uid, newGameKey)
            dispatchSetupState(setGameKey(newGameKey))
        }

    }, [setupState.gameID])




    // useEffect(() => {
    //     if (setupState.shortGameID === shortGameID) {
    //         // Once the setupState shortGameID matches local shortGameID
    //         // (meaning that the player has entered a shortGameID for a valid game)
    //         // start a listener to sync the rest of the game information
    //         startJoinedGameSetupListener(shortGameID, setupState.uid)
    //     }
    //     // When this JSX unmounts, turn off the current game setup listener
    //     return () => {
    //         off(ref(db, 'activeGames/' + shortGameID))
    //     }
    // }, [setupState.shortGameID])


    return (
        <div>
            <p>Game Setup page</p>
            <JoiningHosting
                setupState={setupState}
                dispatchSetupState={dispatchSetupState}
            />

            <Outlet />
        </div>
    )

}

export { GameSetup as default }

// {gameOptions && <p>{gameOptions}</p>}
// setupState={setupState}
// dispatchSetupState={dispatchSetupState}