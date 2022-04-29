import React, { useEffect, useReducer } from "react";
import generateGameID from '../functions/generateGameID';
import {
    setJoiningState,
    setSetupJoiningGame,
    startRemoveGameCode,
    startSetJoiningGame,
    startSetJoiningState
} from "../../actions/setupActions";
import {
    defaultJoiningReducer,
    joiningReducer
} from "../../reducers/joiningReducer";
import {
    clearGameCodeError,
    joiningOnly,
    joiningOrHosting,
    setGameCodeError,
    setGameID,
    toggleJoiningGame
} from '../../actions/joiningActions';
import { auth } from "../../firebase/firebase";

const JoiningHosting = ({ setupState, gameArray }) => {
    const authUID = auth.currentUser.uid
    const [joinHost, dispatchJoinHost] = useReducer(joiningReducer, defaultJoiningReducer)

    // Monitor whether the player is signed in or not
    // If not signed in, they will only be able to join a game
    // If signed in they can toggle between joining and hosting a game
    useEffect(() => {
        if (setupState.isAnonymous === false) {
            dispatchJoinHost(joiningOrHosting())
        } else {
            dispatchJoinHost(joiningOnly())
        }
    }, [setupState.isAnonymous])

    // Used to send joining/hosting status and a 
    // validated game ID to GameSetup element 
    // when fired by following useEffect
    const dispatchJoiningState = () => {
        dispatchJoinHost(
            clearGameCodeError()
        )
        startSetJoiningState(
            parseInt(joinHost.gameID),
            joinHost.joiningGame,
            auth.currentUser.uid
        )
    }

    // Validate game ID; display error if invalid
    // Dispatch to GameState with previous function ^^ if valid game ID
    useEffect(() => {
        const validGameCode =
            joinHost.gameID.toString().match(/^\d{4}$/) !== null;
        const gameCodeRegistered =
            gameArray.includes(parseInt(joinHost.gameID));

        if (validGameCode) {
            // If joining and the game code exists in the cloud OR if hosting
            // send the game information to setupState
            // otherwise set the error on the screen
            joinHost.joiningGame && gameCodeRegistered || !joinHost.joiningGame ?
                dispatchJoiningState()
                :
                dispatchJoinHost(setGameCodeError())
        }
    }, [joinHost.gameID])


    // Clean up game state locally and in the cloud based on 
    // whether the player is joining or hosting a game.
    // Generate a random gameID if hosting.
    useEffect(() => {

        // If the toggle is clicked clear game code error
        dispatchJoinHost(clearGameCodeError())

        if (joinHost.joiningGame) {
            // Clears the cloud record location under activeGames 
            // that matches the UID
            // then sets the gameID under the user UID to null
            startRemoveGameCode(authUID)
            // dispatchJoiningState()
            startSetJoiningGame(joinHost.joiningGame, authUID)
        } else {
            // Generate a short game ID, check it against the current active
            // game IDs, and once it is unique store it locally to be shared with
            // other players joining your game. 
            // A (previous) seperate useEffect (monitoring the local gameID status)
            // dispatches the gameID to GameState and then to the cloud.
            dispatchJoinHost(setGameID(generateGameID(setupState.gameIDArray)))
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
        if (!setupState.isAnonymous) {
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
                {setupState.isAnonymous ?
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



