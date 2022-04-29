import React, { useEffect, useReducer, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
    child,
    get,
    off,
    onValue,
    push,
    ref,
    remove,
    set,
    update
} from "firebase/database";
import {
    setActiveGameKeys,
    setGameIDArray,
    setGameKey,
    setHost,
    setIsAnonymous,
    setLocalState,
    setState,
    setUID,
    startUpdateCloudState,
    startRegisterGameID,
    startRemoveGameCode,

} from "../../actions/setupActions";

export const GameSetup = ({ setupState, gameArray, setGameArray, gameObjectsArray, setGameObjectsArray, children }) => {

    // useEffect(() => {
    //     // set(ref(db, 'users/' + '1OSZ2h38hvW7NJQ8jbMFsHhUMxJ3'), {
    //     //     gameID: 1111,
    //     //     joiningGame: true,
    //     //     host: "Peter",
    //     //     key: null,
    //     //     gameKeys: [],
    //     //     gameIDArray: [],
    //     //     villain: "steve",
    //     //     relic: "accursed tree",
    //     //     location: "woodland realm"
    //     // })
    //     // get(ref(db, 'users/' + auth.currentUser.uid))
    //     //     .then((snapshot) => {
    //     //         console.log({ ...snapshot.val() })
    //     //         setLocalState({ ...snapshot.val() })
    //     //     })
    //     onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {
    //         setLocalState({ ...snapshot.val() })
    //         console.log('local state updated to be: ', setupState)
    //     })


    //     return () => {
    //         off(ref(db, 'users'))
    //         if (auth.currentUser.isAnonymous) {
    //             auth.currentUser.delete()
    //         }
    //     }
    // }, [])




    useEffect(() => {
        const authUID = auth.currentUser.uid
        // Listen to list of current game codes in Firebase
        onValue(ref(db, 'activeGames'), (snapshot) => {
            const updatedArray = [];
            const updatedObjects = [];
            snapshot.forEach((childSnapShot) => {
                updatedArray.push(childSnapShot.val().gameID)
                updatedObjects.push(childSnapShot.val())
            })
            // Set a new list of current game codes on GameSetup state
            // when the listener perceives a change
            setGameArray(updatedArray)
            setGameObjectsArray(updatedObjects)
        })

        return () => {
            // When this element closes, remove the game code 
            // associated with this user ID from the cloud
            startRemoveGameCode(authUID)
            // Remove the listener on Active Games in the cloud
            off(ref(db, 'activeGames'))
        }
    }, [])

    // When gameID is updated, either start a listener 
    // or register the gameID to share
    useEffect(() => {
        const gameID = setupState.gameID
        const uniqueGameID = !gameArray.includes(gameID)
        if (setupState.joiningGame) {

            // const gameObject = gameObjectsArray.find(object => object.gameID === gameID)

            // if (gameObject) {
            //     const location = 'users/' + gameObject.host + '/currentGames' + gameID
            //     onValue(ref(db, location), (snapshot) => {

            //     })
            // }


        } else if (!setupState.joiningGame && uniqueGameID) {

            // If hosting, and unique game ID is stored locally, 
            startRegisterGameID(auth.currentUser.uid, setupState.gameID, setupState)
        }

    }, [setupState.gameID])


    return (
        <div>
            <p>Game Setup page</p>
            {children}
        </div>
    )

}

export { GameSetup as default }

// {gameOptions && <p>{gameOptions}</p>}
// setupState={setupState}
// dispatchSetupState={dispatchSetupState}