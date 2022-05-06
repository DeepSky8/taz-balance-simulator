import React, { useEffect, useReducer } from "react";
import generateGameID from '../functions/generateGameID';
import {
    defaultJoiningReducer,
    joiningReducer
} from "../../reducers/joiningReducer";
import {
    clearGameCodeError,
    joiningOnly,
    joiningOrHosting,
    startRegisterGameID,
    startRemoveGameCode,
    startSaveGameID,
    startSetJoiningGame,
    setGameCodeError,
    setGameID,
    toggleJoiningGame,
    clearGameID,
} from '../../actions/joiningActions';
import { auth } from "../../firebase/firebase";

const JoiningHosting = ({ userState, gameArray }) => {

    const [joinHost, dispatchJoinHost] = useReducer(joiningReducer, defaultJoiningReducer)

    // Monitor whether the player is signed in or not
    // If not signed in, they will only be able to join a game
    // If signed in they can toggle between joining and hosting a game
    useEffect(() => {
        if (userState.isAnonymous === false) {
            dispatchJoinHost(joiningOrHosting())
        } else {
            dispatchJoinHost(joiningOnly())
        }
    }, [userState.isAnonymous])

    useEffect(() => {
        if (userState.gameID === null) {
            dispatchJoinHost(clearGameID())
        }
    }, [userState.gameID])

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
                joinHost.joiningGame && !gameCodeRegistered)) {
            dispatchJoinHost(setGameCodeError())
        } else {
            dispatchJoinHost(clearGameCodeError())
        }

        if (validGameCode) {
            if (joinHost.joiningGame && gameCodeRegistered) {
                // If joining, set the uid, last activity date, host, and gameID
                // on user's profile in cloud
                startSaveGameID(auth.currentUser.uid, gameID)
            } else if (!joinHost.joiningGame && !gameCodeRegistered) {
                // If hosting, create an activeGames entry with gameID
                // then set the uid, last activity date, host, and gameID
                // on user's profile in cloud
                startRegisterGameID(auth.currentUser.uid, parseInt(gameID))
            }
        }

    }, [joinHost.gameID])


    // Clean up game state locally and in the cloud based on 
    // whether the player is joining or hosting a game.
    // Generate a random gameID if hosting.
    useEffect(() => {

        // If the toggle is clicked clear game code error
        dispatchJoinHost(clearGameCodeError())
        // then pass the current joining state to the cloud
        startSetJoiningGame(auth.currentUser.uid, joinHost.joiningGame)


        if (joinHost.joiningGame) {
            // Clears the cloud record location under activeGames 
            // that matches the UID
            // then sets the gameID and host under the user UID to null
            startRemoveGameCode(auth.currentUser.uid, userState.gameID)
        } else {
            // Generate a short game ID, check it against the current active
            // game IDs, and once it is unique store it locally to be shared with
            // other players joining your game. 
            // A (previous) seperate useEffect (monitoring the local gameID status)
            // dispatches the gameID to the cloud.
            dispatchJoinHost(setGameID(generateGameID(gameArray)))
        }
    }, [joinHost.joiningGame])

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
            dispatchJoinHost(toggleJoiningGame())
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
                {joinHost.isAnonymous ?
                    EnterGameID
                    :
                    joinHost.joiningGame ?
                        EnterGameID
                        :
                        DisplayGameID
                }
            </div>
            {joinHost.joiningGame && joinHost.gameCodeError}
        </div>


    )
}

export { JoiningHosting as default }