import React, { useEffect, useReducer, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { child, get, off, onValue, push, ref, set, update } from "firebase/database";
import { defaultGameSetup, setupReducer } from '../../reducers/setupReducer';
import {
    setActiveGameKeys,
    setGameIDArray,
    setGameKey,
    setHost,
    setLocalState,
    setUID,
    startUpdateCloudState,
    startRegisterGameID,
    startRemoveGameCode
} from "../../actions/setupActions";
import JoiningHosting from "./JoiningHosting";
import VillainSelect from "./VillainSelect";
import { Outlet } from "react-router-dom";
import userEvent from "@testing-library/user-event";

export const GameSetup = () => {
    const [setupState, dispatchSetupState] = useReducer(setupReducer, defaultGameSetup)

    useEffect(() => {
        // set(ref(db, 'users/' + '1OSZ2h38hvW7NJQ8jbMFsHhUMxJ3'), {
        //     gameID: 1111,
        //     joiningGame: true,
        //     host: "Peter",
        //     key: null,
        //     gameKeys: [],
        //     gameIDArray: [],
        //     villain: "steve",
        //     relic: "accursed tree",
        //     location: "woodland realm"
        // })
        // get(ref(db, 'users/' + auth.currentUser.uid))
        //     .then((snapshot) => {
        //         console.log({ ...snapshot.val() })
        //         setLocalState({ ...snapshot.val() })
        //     })
        onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            setLocalState({ ...snapshot.val() })
            console.log('local state updated to be: ', setupState)
        })


        return () => {
            off(ref(db, 'users'))
            if (auth.currentUser.isAnonymous) {
                auth.currentUser.delete()
            }
        }
    }, [])




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
            const matchingKeys = [];
            snapshot.forEach((childSnapShot) => {
                updatedArray.push(childSnapShot.val().gameID)
                if (childSnapShot.val().host === auth.currentUser.uid) {
                    matchingKeys.push(childSnapShot.val().key)
                }
            })
            dispatchSetupState(setActiveGameKeys(matchingKeys))
            dispatchSetupState(setGameIDArray(updatedArray))

            // snapshot.forEach((childSnapShot) => {
            //     if (childSnapShot.val().host === setupState.uid) {

            //         dispatchSetupState(setActiveGameKeys(childSnapShot.val().key))
            //     }
            // })
        })

        return () => {
            // Add code here to remove the gameID from the active game list when 
            // this JSX is closed. 

            // const activeKeysRegistered = [];
            // setupState.gameObjectsArray.forEach((gameObject) => {
            //     if (gameObject.host === setupState.uid) {
            //         activeKeysRegistered.push(gameObject.key)
            //     }
            // })
            // const deleteRecords = {};
            // activeKeysRegistered.forEach((key) => {
            //     deleteRecords['/' + key] = {}
            // })

            // update(ref(db, 'activeGames'), deleteRecords)
            off(ref(db, 'activeGames'))
            setupState.gameKeys.forEach((key) => {
                dispatchSetupState(startRemoveGameCode(key))
            })



        }
    }, [])

    // When gameID is updated, either start a listener or register the gameID to share
    useEffect(() => {



        const uniqueGameID = !setupState.gameIDArray.includes(setupState.gameID)
        if (setupState.joiningGame) {

            // If joining game, start listener to sync the rest of the game state

        } else if (!setupState.joiningGame && uniqueGameID) {
            // If hosting, and unique game ID is stored locally, 
            // create a key in the activeGames,
            // then register gameID at that key
            const newGameKey = push(ref(db, 'activeGames')).key
            startRegisterGameID(setupState.gameID, setupState.uid, newGameKey)
            // dispatchSetupState(setGameKey(newGameKey))
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