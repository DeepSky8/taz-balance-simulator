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
import { clearChallengesObject, clearGameState, updateChallengesObject, updateGameState } from "../../actions/gameActions";
import { startRemoveGameID } from "../../actions/userActions";


export const GameSetup = ({
    dispatchGameState,
    gameState,
    setGameArray,
    userState,
    children
}) => {

    useEffect(() => {

        // Listen to list of activeGame objects in Firebase
        onValue(ref(db, 'activeGames'), (snapshot) => {
            const gameID = userState.gameID;
            const updatedArray = [];
            const activeGameObject = [];
            snapshot.forEach((childSnapShot) => {
                updatedArray.push(childSnapShot.val().gameID)
            })

            // Set a new list of current game codes on GameSetup state
            // when the listener perceives a change
            setGameArray(updatedArray)
        })

        return () => {

            // Remove the listener on Active Games in the cloud
            off(ref(db, 'activeGames'))
        }
    }, [])

    useEffect(() => {
        const gameID = userState.gameID
        if (gameID) {
            onValue(ref(db, 'activeGames/' + gameID), (snapshot) => {
                if (snapshot.exists()) {
                    dispatchGameState(updateChallengesObject(snapshot.val()))
                } else {
                    startRemoveGameID(auth.currentUser.uid)
                }
            })
        } else {
            console.log('dispatching clearChallengesObject')
            dispatchGameState(clearChallengesObject())
        }

        return () => {
            off(ref(db, 'activeGames/' + gameID))
        }

    }, [userState.gameID])


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






    // When gameID is updated, 
    // either (joining) start a listener on the selected challenges
    // or (hosting) register the gameID to share
    // useEffect(() => {
    //     const gameID = setupState.gameID
    //     const uniqueGameID = !gameArray.includes(gameID)

    //     if (setupState.joiningGame && !uniqueGameID) {

    //         // const location = 'activeGames/' + gameObject.host
    //         // onValue(ref(db, location), (snapshot) => {
    //         //     // console.log('onValue AppRouter fired')
    //         //     if (snapshot.exists()) {
    //         //         startUpdateActiveGame(snapshot.val())
    //         //         // dispatchSetupState(updateJoinedActiveGame(snapshot.val()))
    //         //         // dispatchSetupState(updateSelectedChallenges(snapshot.val())
    //         //     }
    //         // })




    //     } else if (!setupState.joiningGame && uniqueGameID) {

    //         // If hosting, and unique game ID is stored locally, 
    //         // startRegisterGameID(setupState.uid, setupState.gameID)
    //     }
    //     // else {
    //     //     dispatchSetupState(removeActiveGameChallengeCodes())
    //     // }

    //     // return () => {
    //     //     if (gameObject) {
    //     //         console.log('currentActiveGame listener removed')
    //     //         off(ref(db, 'users/' + gameObject.host + '/currentActiveGame'))
    //     //     }
    //     // }

    // }, [setupState.gameID])




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



