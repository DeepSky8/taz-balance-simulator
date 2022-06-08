import React, { useEffect, useReducer, useState } from "react";
import generateGameID from '../functions/generateGameID';
import {
    defaultJoiningReducer,
    joiningReducer
} from "../../reducers/joiningReducer";
import {
    clearGameCodeError,
    startRegisterGameID,
    startRemoveGameCode,
    startSaveGameID,
    startSetJoiningGame,
    setGameCodeError,
    setGameID,
    toggleJoiningGame,
    clearGameID,
    startExitActiveGame,
    startJoinActiveGame,
} from '../../actions/joiningActions';
import { auth, db } from "../../firebase/firebase";
import { off, onValue, ref } from "firebase/database";
import { clearPlayerList } from "../../actions/gameActions";

const JoiningHosting = ({ userState, dispatchGameState }) => {
    const [gameArray, setGameArray] = useState([])
    const [joinHost, dispatchJoinHost] = useReducer(joiningReducer, defaultJoiningReducer)

    useEffect(() => {

        // Listen to list of activeGame objects in Firebase
        onValue(ref(db, 'activeGames'), (snapshot) => {
            const updatedArray = [];
            if (snapshot.exists()) {
                snapshot.forEach((childSnapShot) => {
                    // console.log('forEach childSnapShot', childSnapShot.val())
                    updatedArray.push(childSnapShot.val().gameID)
                })
            }
            // Set a new list of current game codes on GameSetup state
            // when the listener perceives a change
            setGameArray(updatedArray)
            // console.log('gameArray changed: ', updatedArray)
        })

        return () => {
            // Remove the listener on Active Games in the cloud
            off(ref(db, 'activeGames'))
            // console.log('removed activeGame listener')
        }
    }, [joinHost.gameID])

    // // Monitor whether the player is signed in or not
    // // If not signed in, they will only be able to join a game
    // // If signed in they can toggle between joining and hosting a game
    // useEffect(() => {
    //     if (userState.isAnonymous === false) {
    //         dispatchJoinHost(joiningOrHosting())
    //     } else {
    //         dispatchJoinHost(joiningOnly())
    //     }
    // }, [userState.isAnonymous])

    useEffect(() => {
        if (userState.gameID === null) {
            dispatchJoinHost(clearGameID())
        } else {
            dispatchJoinHost(
                setGameID(
                    userState.gameID))
        }
    }, [userState.gameID])

    useEffect(() => {
        dispatchJoinHost(
            toggleJoiningGame(
                userState.joiningGame, auth.currentUser.isAnonymous))
    }, [userState.joiningGame])

    // Validate game ID; display error if invalid
    // Dispatch to cloud if valid game ID
    useEffect(() => {
        const gameID = parseInt(joinHost.gameID)
        const fourDigits = (joinHost.gameID.toString().length === 4);
        const validGameCode =
            joinHost.gameID.toString().match(/^\d{4}$/) !== null;
        const gameCodeRegistered =
            gameArray.includes(gameID);

        if (fourDigits &&
            (!validGameCode ||
                (userState.joiningGame && !gameCodeRegistered))) {

            dispatchJoinHost(setGameCodeError())
        } else {
            dispatchJoinHost(clearGameCodeError())
            dispatchGameState(clearPlayerList())
            startExitActiveGame(auth.currentUser.uid, userState.gameID)
        }

        if (validGameCode) {
            if (userState.joiningGame && gameCodeRegistered) {
                // If joining, set the uid, last activity date, host, and gameID
                // on user's profile in cloud
                startSaveGameID(auth.currentUser.uid, gameID)
                // console.log('startSaveGameID should have fired')
                startJoinActiveGame(
                    auth.currentUser.uid,
                    joinHost.gameID,
                    userState.currentCharacterID
                )
            } else if (
                !userState.joiningGame &&
                // !gameCodeRegistered &&
                !userState.isAnonymous
            ) {
                // If hosting, create an activeGames entry with gameID
                // then set the uid, last activity date, host, and gameID
                // on user's profile in cloud
                startRegisterGameID(auth.currentUser.uid, parseInt(gameID))
            }
        }

        // console.log('joinHost.gameID changed: ', joinHost.gameID)
        // console.log('fourDigits state is: ', fourDigits)
        // console.log('validGameCode state is: ', validGameCode)
        // console.log('gameCodeRegistered state is: ', gameCodeRegistered)


    }, [joinHost.gameID])


    // Clean up game state locally and in the cloud based on 
    // whether the player is joining or hosting a game.
    // Generate a random gameID if hosting.
    useEffect(() => {

        // If the toggle is clicked clear game code error
        dispatchJoinHost(clearGameCodeError())

        // switch (joinHost.joiningGame) {
        //     case true:
        //         return startRemoveGameCode(auth.currentUser.uid, userState.gameID)
        //     case false:
        //         return dispatchJoinHost(setGameID(generateGameID(gameArray)))
        //     default:
        //         { }
        // }

        if (userState.joiningGame === true) {
            // Clears the cloud record location under activeGames 
            // that matches the UID
            // then sets the gameID and host under the user UID to null
            startRemoveGameCode(auth.currentUser.uid, userState.gameID)
            dispatchGameState(clearPlayerList())
        } else if (userState.joiningGame === false) {
            // Generate a short game ID, check it against the current active
            // game IDs, and once it is unique store it locally to be shared with
            // other players joining your game. 
            // A (previous) seperate useEffect (monitoring the local gameID status)
            // dispatches the gameID to the cloud.
            dispatchJoinHost(setGameID(generateGameID(gameArray)))
        }
    }, [userState.joiningGame])

    // When text (restricted to text digits by regex) 
    // is entered into the joinCode input box,
    // clear errors, then if it matches the regex parameters, 
    // update the gameID state with the text digit entry
    const onJoinCodeChange = (e) => {
        dispatchJoinHost(clearGameCodeError())
        const joinCode = e.target.value.toString()
        if (joinCode.match(/^\d{0,4}$/) !== null) {
            dispatchJoinHost(setGameID(joinCode))
        }
    }

    const joiningOptions = () => {
        if (userState.isAnonymous === false) {
            startSetJoiningGame(auth.currentUser.uid, !userState.joiningGame)
        }
    }

    // If you are joining a game, this JSX allows you to enter a game code
    // provided by your host
    const EnterGameID = (
        <input
            value={joinHost.gameID}
            type='text'
            placeholder='1234'
            onChange={(e) => {
                onJoinCodeChange(e)
            }}
        />
    )

    //If you are hosting a game, this JSX displays the game code to share
    const DisplayGameID = (
        <input value={joinHost.gameID} readOnly={true} />
    )

    return (
        <div>
            <div>
                <button
                    onClick={joiningOptions}>
                    {joinHost.joinHostText}
                </button>
                {userState.isAnonymous ?
                    EnterGameID
                    :
                    userState.joiningGame ?
                        EnterGameID
                        :
                        DisplayGameID
                }
            </div>
            {joinHost.gameCodeError}
        </div>


    )
}

export { JoiningHosting as default }