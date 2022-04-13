import React, { useEffect, useReducer } from "react";
import generateGameID from '../functions/generateGameID';
import {
    setGameKey,
    setJoiningState,
    startRemoveGameCode
} from "../../actions/setupActions";
import {
    defaultJoiningReducer,
    joiningReducer
} from "../../reducers/joiningReducer";
import {
    clearGameCodeError,
    setGameCodeError,
    setGameID,
    setGameIDArray,
    toggleJoiningGame
} from '../../actions/joiningActions';

const JoiningHosting = ({ setupState, dispatchSetupState }) => {
    const [joinHost, dispatchJoinHost] = useReducer(joiningReducer, defaultJoiningReducer)

    // Receive game code array from GameSetup, store on joiningReducer
    useEffect(() => {
        dispatchJoinHost(setGameIDArray(setupState.gameIDArray))
    }, [setupState.gameIDArray])

    // Used to register a validated game ID and whether 
    // joining or hosting a game with GameSetup element
    const dispatchJoiningState = () => {
        dispatchJoinHost(
            clearGameCodeError()
        )
        dispatchSetupState(
            setJoiningState(
                parseInt(joinHost.gameID),
                joinHost.joiningGame
            )
        )
    }

    // Validate game ID; display error if invalid
    // Dispatch to GameState with previous function ^^ if valid game ID
    useEffect(() => {
        const validGameCode =
            joinHost.gameID.toString().match(/^\d{4}$/) !== null;
        const gameCodeRegistered =
            joinHost.gameIDArray.includes(parseInt(joinHost.gameID));

        if (validGameCode) {

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
        if (joinHost.joiningGame) {
            // If the toggle is clicked to join a game
            dispatchJoinHost(clearGameCodeError())

            // Remove gameID with current key from game code array
            if (setupState.key) {
                startRemoveGameCode(setupState.key)
                dispatchSetupState(setGameKey(undefined))
            }
        } else {
            // If the toggle is clicked to host a game
            dispatchJoinHost(clearGameCodeError())

            // Generate a short game ID, check it against the current active
            // game IDs, and once it is unique store it locally to be shared with
            // other players joining your game. In addition register it
            // in the cloud for validation.
            dispatchJoinHost(setGameID(generateGameID()))
        }
    }, [joinHost.joiningGame])



    const joiningHostingToggle = () => {
        dispatchJoinHost(toggleJoiningGame())
    }

    // When text is entered into the joinCode input box,
    // clear errors, then if it matches the parameters, 
    // update the gameID state
    const onJoinCodeChange = (e) => {
        setGameCodeError(undefined)
        const joinCode = e.target.value.toString()
        if (joinCode.match(/^\d{0,4}$/) !== null) {
            dispatchJoinHost(setGameID(joinCode))
        }
    }

    // If you are joining a game, this JSX allows you to enter a game code
    // provided by your host
    const EnterGameID = (
        <div>
            <input
                value={joinHost.gameID}
                type='text'
                placeholder='1234'
                onChange={(e) => {
                    onJoinCodeChange(e)
                }}
            />
        </div>
    )

    //If you are hosting a game, this JSX displays the game code to share
    const DisplayGameID = (
        <div>
            <input value={joinHost.gameID} readOnly={true} />
        </div>
    )

    return (
        <div>
            <button onClick={joiningHostingToggle}>{joinHost.joinHostText}</button>
            {joinHost.joiningGame ? EnterGameID : DisplayGameID}
            {joinHost.joiningGame && joinHost.gameCodeError}
        </div>


    )
}

export { JoiningHosting as default }



