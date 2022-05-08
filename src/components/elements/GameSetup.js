import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import {
    off,
    onValue,
    ref,
} from "firebase/database";
import {
    clearChallengesObject,
    updateChallengesObject
} from "../../actions/gameActions";
import { startRemoveGameID } from "../../actions/userActions";


export const GameSetup = ({
    dispatchGameState,
    setGameArray,
    userState,
    children
}) => {

    useEffect(() => {

        // Listen to list of activeGame objects in Firebase
        onValue(ref(db, 'activeGames'), (snapshot) => {
            const updatedArray = [];
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

    return (
        <div>
            <p>Game Setup page</p>
            {children}
        </div>
    )

}

export { GameSetup as default }



