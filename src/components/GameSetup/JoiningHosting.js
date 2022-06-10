import React, { useEffect, useReducer, useState } from "react";
import generateGameID from '../functions/generateGameID';
import { defaultJoiningReducer, joiningReducer } from "../../reducers/joiningReducer";
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

const JoiningHosting = ({ userState, dispatchGameState, gameArray }) => {

    const [joinHost, dispatchJoinHost] = useReducer(joiningReducer, defaultJoiningReducer)


    // Monitor local gameID on userState, 
    // and mirror it to the JoiningHosting element
    useEffect(() => {
        if (userState.gameID === '' || userState.gameID === null) {
            dispatchJoinHost(clearGameID())
        } else {
            dispatchJoinHost(
                setGameID(
                    userState.gameID))
        }
    }, [userState.gameID])

    // Monitor local joiningHosting state on userState
    // and mirror it to the JoiningHosting element
    // taking into account whether the current user is logged in or not
    useEffect(() => {
        dispatchJoinHost(
            toggleJoiningGame(
                userState.joiningGame, auth.currentUser.isAnonymous))
    }, [userState.joiningGame])

    // Validate game ID; display error if invalid
    // Dispatch to cloud if valid game ID
    useEffect(() => {

        // Clear the player list whenever the game code changes
        dispatchGameState(clearPlayerList())



        const gameID = parseInt(joinHost.gameID)
        const fourDigits = (joinHost.gameID.toString().length === 4);
        const validGameCode =
            joinHost.gameID.toString().match(/^\d{4}$/) !== null;
        const gameCodeRegistered =
            gameArray.includes(gameID);

        // Exit any active games whenver the game code changes
        if (!fourDigits) {
            console.log('startExit fired')
            startExitActiveGame(auth.currentUser.uid, userState.gameID)
        }

        if (fourDigits &&
            // AND if the game code doesn't match the regex
            (!validGameCode ||
                // OR if the user is joining a game 
                // and the game code isn't in the list of active game codes in the cloud
                (userState.joiningGame && !gameCodeRegistered))) {
            // Set an error that the game code isn't found
            dispatchJoinHost(setGameCodeError())
        } else {
            // Otherwise clear the error
            dispatchJoinHost(clearGameCodeError())
        }
        // IF the game code matches the regex
        if (validGameCode) {
            // IF the user is joining a game AND the game code is in the cloud
            if (userState.joiningGame && gameCodeRegistered) {
                // THEN set the uid, last activity date, host, and gameID
                // on user's profile in cloud
                startSaveGameID(auth.currentUser.uid, gameID)
                // AND ALSO add the UID and current character key to the list of players
                // on the Active Game
                startJoinActiveGame(
                    auth.currentUser.uid,
                    joinHost.gameID,
                    userState.currentCharacterID
                )
            } else if (
                // OTHERWISE if the player is hosting a game
                // AND is not anonymous
                !userState.joiningGame && !userState.isAnonymous
            ) {
                // Create an activeGames entry with gameID
                // then set the uid, last activity date, and gameID
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

        if (userState.joiningGame === true) {
            // Sets the cloud record location under activeGames + gameID to null
            // then sets the gameID and host under the user UID to null
            if (userState.gameID) {
                startRemoveGameCode(auth.currentUser.uid, userState.gameID.toString())
            }
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