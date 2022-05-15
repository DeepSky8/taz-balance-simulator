import React, { useEffect, useReducer } from "react";
import generateGameID from '../functions/generateGameID';
import {
    defaultJoiningReducer,
    joiningReducer
} from "../../reducers/joiningReducer";
import {
    clearGameCodeError,
    joiningOnly,
    joiningGame,
    hostingGame,
    startRegisterGameID,
    startRemoveGameCode,
    startSaveGameID,
    startSetJoiningGame,
    setGameCodeError,
    setGameID
} from '../../actions/joiningActions';
import { auth } from "../../firebase/firebase";

const JoiningHosting = ({ userState, gameArray }) => {

    const [joinHost, dispatchJoinHost] = useReducer(joiningReducer, defaultJoiningReducer)

    useEffect(() => {

        // Always clear the game error
        dispatchJoinHost(clearGameCodeError())

        // Determine whether the player can only join (if not signed in)
        // of if they can host as well (if signed in)
        if (auth.currentUser.isAnonymous !== false) {
            dispatchJoinHost(joiningOnly())
        } else {
            userState.joiningGame ?
                dispatchJoinHost(joiningGame())
                :
                dispatchJoinHost(hostingGame())
        }

        // auth.currentUser.isAnonymous ?
        //     dispatchJoinHost(joiningOnly())
        //     :
        //     userState.joiningGame ?
        //         dispatchJoinHost(joiningGame())
        //         :
        //         dispatchJoinHost(hostingGame())


        // // If the player is joining a game, clear out the gameID in the cloud
        // if (userState.joiningGame === true) {
        //     // Clears the cloud record location under activeGames 
        //     // that matches the UID
        //     // then sets the gameID and host under the user UID to null
        //     startRemoveGameCode(auth.currentUser.uid, userState.gameID)
        // }

        // // If the player is hosting a game, and there is not yet a gameID saved on userState
        // // generate a new gameID and send it to the cloud
        // if (userState.joiningGame === false && userState.gameID === '') {
        //     // Generate a short game ID, check it against the current active
        //     // game IDs, and once it is unique dispatch it to the cloud
        //     const newGameID = generateGameID(gameArray)
        //     startRegisterGameID(auth.currentUser.uid, newGameID)
        //     dispatchJoinHost(setGameID(newGameID))
        // }
    }, [auth.currentUser.isAnonymous, userState.joiningGame])

    useEffect(() => {
        dispatchJoinHost(
            setGameID(
                userState.gameID))
    }, [userState.gameID])


    // if (
    //     (joinCode.match(/^\d{4}$/) !== null) &&
    //     (userState.gameID === '') &&
    //     (gameArray.includes(parseInt(joinCode)))
    // ) {
    //     startSaveGameID(auth.currentUser.uid, joinCode)
    // } else {
    //     dispatchJoinHost(setGameID(joinCode))
    //     dispatchJoinHost(setGameCodeError())
    // }


    // Validate game ID; display error if invalid
    // Dispatch to cloud if valid game ID
    useEffect(() => {
        const gameIDset = (joinHost.gameID === userState.gameID)
        const gameID = parseInt(joinHost.gameID)
        const fourDigits = (joinHost.gameID.toString().length === 4);
        const validGameCode =
            joinHost.gameID.toString().match(/^\d{4}$/) !== null;
        const gameCodeRegistered =
            gameArray.includes(gameID);

        if (fourDigits &&
            (!validGameCode ||
                userState.joiningGame && !gameCodeRegistered)
        ) {
            dispatchJoinHost(setGameCodeError())
        } else {
            dispatchJoinHost(clearGameCodeError())
        }

        // This section is only supposed to fire if the user 
        // is joining a game and the game ID has not yet been set
        
        // If userState gameID does not equal local gameID
        // and if the game code is in the list of game codes
        // and if the user is in joining status
        if (!gameIDset && gameCodeRegistered && userState.joiningGame) {
            // Set last activity date, host, and gameID
            // on user's profile in cloud
            startSaveGameID(auth.currentUser.uid, gameID)
        }
    }, [joinHost.gameID])

    // if (validGameCode && !gameIDset) {
    //     if (userState.joiningGame &&
    //         gameCodeRegistered &&
    //         joinHost.gameID === '') {

    //     }
    //     // else if (!userState.joiningGame && !userState.gameID) {
    //     //     // If hosting, create an activeGames entry with gameID
    //     //     // then set the uid, last activity date, host, and gameID
    //     //     // on user's profile in cloud
    //     //     startRegisterGameID(auth.currentUser.uid, parseInt(gameID))
    //     // }
    // }


    // Clean up game state locally and in the cloud based on 
    // whether the player is joining or hosting a game.
    // Generate a random gameID if hosting.
    // useEffect(() => {

    //     // If the toggle is clicked clear game code error
    //     dispatchJoinHost(clearGameCodeError())

    //     if (userState.joiningGame === true) {
    //         // Clears the cloud record location under activeGames 
    //         // that matches the UID
    //         // then sets the gameID and host under the user UID to null
    //         startRemoveGameCode(auth.currentUser.uid, userState.gameID)
    //     } else if (userState.joiningGame === false && userState.gameID === '') {
    //         // Generate a short game ID, check it against the current active
    //         // game IDs, and once it is unique store it locally to be shared with
    //         // other players joining your game. 
    //         // A (previous) seperate useEffect (monitoring the local gameID status)
    //         // dispatches the gameID to the cloud.
    //         // dispatchJoinHost(setGameID(generateGameID(gameArray)))
    //         startRegisterGameID(auth.currentUser.uid, generateGameID(gameArray))
    //     }
    // }, [userState.joiningGame])


    // When text (restricted to text digits by regex) 
    // is entered into the joinCode input box,
    // clear errors, then if it matches the regex parameters, 
    // update the gameID state with the text digit entry
    const onJoinCodeChange = (e) => {

        dispatchJoinHost(clearGameCodeError())
        const joinCode = e.target.value.toString()
        // const parsedCode = parseInt(e.target.value)
        if (joinCode.match(/^\d{0,4}$/) !== null) {
            dispatchJoinHost(setGameID(joinCode))
        }

        //     if ((joinCode.match(/^\d{4}$/) !== null) && (parsedCode !== userState.gameID)) {
        //         console.log('onJoinCodeChange, parsedCode is ', parsedCode)
        //         dispatchJoinHost(setGameID(parsedCode))

        //     }
    }

    const joiningOptions = () => {
        if (auth.currentUser.isAnonymous === false) {
            startSetJoiningGame(auth.currentUser.uid, !userState.joiningGame)
        }
    }

    // If you are joining a game, this JSX allows you to enter a game code
    // provided by your host
    const EnterGameID = (
        <input
            readOnly={!userState.joiningGame}
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
        <input value={joinHost.gameID} />
    )

    return (
        <div>
            <div>
                <button
                    onClick={joiningOptions}>
                    {joinHost.joinHostText}
                </button>
                {EnterGameID}
            </div>
            {joinHost.gameCodeError}
        </div>


    )
}

export { JoiningHosting as default }

// {userState.isAnonymous ?
//     EnterGameID
//     :
//     userState.joiningGame ?
//         EnterGameID
//         :
//         DisplayGameID
// }