import React, { useEffect, useState } from "react";
import {
    startSavedGame,
    startReadyCheck,
    startNewGame,
    startStopReadyCheck,
    updateReadyStatus
} from "../../actions/gameActions";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const StartGame = ({ userState, gameState, dispatchGameState }) => {
    let navigate = useNavigate()
    const addPartyMembers = 'Please gather like-minded adventurers to join you on this ... quest ... mission ... thing.'
    const dangerousAlone = "It's dangerous to go alone!"
    const change2PlayerTeamComp = 'In two-player mode, please only select from the Rogue, Wizard, and Warrior classes.'
    const changeTeamComp = 'Please ensure each party member has a different class.'
    const readyCheck = 'Ready to begin mission?'
    const notReady = "Actually, I'm not ready yet"
    const waitForTeam = 'Party not yet ready'
    const beginMission = 'Begin Mission!'
    const oversizeParty = 'Your party is too big!'
    const selectMission = 'Please select a complete mission (three challenges)'
    const unknownError = 'An unknown error is preventing the mission'
    const [startError, setStartError] = useState('')
    const [startText, setStartText] = useState(readyCheck)
    const [startGame, setStartGame] = useState(false)


    // Clear start error if the userState or gameState changes at all
    useEffect(() => {
        setStartError('')
    }, [userState, gameState])

    // Monitor the list of ready players
    // and compare it to the list of total players
    // If all players are ready, change button text and allow
    // the host to start the game
    useEffect(() => {
        // If player is joining game
        if (userState.joiningGame) {

            if (gameState.playerList.length < 1) {
                // but they're not in a team, the button text
                // reflects that they can't start the game
                setStartText(dangerousAlone)
            } else if (gameState.ready) {
                // and the player has indicated that they are ready to begin
                // set the button text to indicate that the player can click the 
                // button again to 'un-ready'
                setStartText(notReady)
            } else {
                // if the player is not yet ready, the button text
                // indicates that they can click the button to declare they are ready
                setStartText(readyCheck)
            }
        } else {
            // If the player is hosting the game, however
            if (
                // If more than one player is in the party
                (gameState.playerList.length > 1) &&
                // and if the rest of the party has indicated they are ready to play
                (gameState.readyList.length === gameState.playerList.length) &&
                // and if the host has selected a character
                (userState.currentCharacter !== null)
            ) {
                // Change the text on the button to indicate 
                // that the mission can begin
                setStartText(beginMission)
                // And update the state to allow the game to begin
                setStartGame(true)
            } else {
                // Otherwise indicate that the full team hasn't indicated they are ready
                // to begin the game
                setStartText(waitForTeam)
                // The Start state will not allow the game to begin
                setStartGame(false)
            }
        }

    }, [gameState.playerList, gameState.readyList, gameState.ready, userState.joiningGame, userState.gameID])

    // Boolean result indicating whether the list of players includes
    // duplicate classes
    const duplicateClassTypes = (array) => (new Set(array).size !== array.length)

    // Boolean result indicating whether class 0 (Bard) or class 1 (Priest)
    // are in the list of classes slated for this mission
    const teamContainsBardPriest = (array) => {
        return (array.includes(0) || array.includes(1))
    }

    // Verifies unique character classes on team, 
    // and correct team comp for 2-player games
    const acceptableTeamComp = (classList) => {
        let answer = false;
        const partySize = gameState.playerList.length
        switch (partySize) {
            case 0:
                // The party must have more than one member
                setStartError(addPartyMembers)
                break;
            case 1:
                // If only two members are playing
                // the members must not be a bard or a priest
                if (teamContainsBardPriest(classList)) {
                    setStartError(change2PlayerTeamComp)
                    break;
                } else { answer = true; }
            case 2:
            case 3:
            case 4:
                // No team can have duplicate classes
                if (duplicateClassTypes(classList)) {
                    setStartError(changeTeamComp)
                    answer = false;
                    break;
                } else { answer = true; break; }
            case 6: answer = false; setStartError(oversizeParty)
            default: answer = false;
        }
        return answer

    }
    // Generates the error message if the full challenge set
    // is not yet selected
    const missionSelected = (challengesObject) => {
        const villainCode = challengesObject.villainCode
        const relicCode = challengesObject.relicCode
        const locationCode = challengesObject.locationCode

        if (villainCode !== null &&
            relicCode !== null &&
            locationCode !== null) {
            return true
        } else {
            setStartError(selectMission)
            return false
        }
    }

    // Calculates the team starting health based on team size
    const healthCalc = (teamSize) => {
        switch (teamSize) {
            case 5:
                return 10
            case 4:
                return 10
            case 3:
                return 12
            case 2:
                return 14
            default:
                return 10;
        }
    }

    // When the 'Start Game' button is clicked
    const onStartGame = () => {
        // Check if the team comp is correct, based on the updated class list
        const teamChecked = acceptableTeamComp(gameState.classList)
        const missionChecked = missionSelected(gameState.challengesObject)
        // If a gameID exists AND this player has selected a character AND
        // the team comp is acceptable, then proceed
        if ((userState.gameID !== null) &&
            (userState.currentCharacter !== null) &&
            (teamChecked)
        ) {

            if (userState.joiningGame && !gameState.ready) {
                // If this player is joining a game, 
                // and has not yet indicated they are ready to play
                // set their cloud Ready status to 'true'
                startReadyCheck(auth.currentUser.uid, userState.gameID)
            } else if (userState.joiningGame && gameState.ready) {
                // If this player is joining a game, 
                // and has already indicated they are ready to play
                // set their cloud Ready status to 'false'
                startStopReadyCheck(auth.currentUser.uid, userState.gameID)
            } else if (gameState.readyList.length !== gameState.playerList.length) {
                // If the player is hosting (inferred from the previous two options)
                // and if the full team hasn't indicated they are ready yet
                // set an error indicating the full team isn't ready yet
                setStartError(waitForTeam)
            } else if (startGame && missionChecked) {
                // If this player is hosting (inferred)
                // and the full team has indicated they are ready to start
                // set this player's status to ready both locally and in the cloud
                dispatchGameState(updateReadyStatus(true))
                startReadyCheck(auth.currentUser.uid, userState.gameID)
                // then check whether a key exists for this game (previously saved)
                if (gameState.key === null) {
                    // and create a key for a new game
                    // as well as creating the rest of the game data
                    const teamHealth = healthCalc(gameState.playerList.length + 1)


                    startNewGame(
                        auth.currentUser.uid,
                        userState.gameID,
                        [{
                            uid: auth.currentUser.uid,
                            currentCharacterID: userState.currentCharacterID
                        }].concat(gameState.playerList),
                        gameState.challengesObject,
                        teamHealth
                    )

                } else {
                    // If the game was previously saved, join it
                    startSavedGame(
                        auth.currentUser.uid,
                        userState.gameID,
                        gameState.key,
                        [{
                            uid: auth.currentUser.uid,
                            currentCharacterID: userState.currentCharacterID
                        }].concat(gameState.playerList)
                    )
                }
            }
        }
    }

    return (
        <div>
            <div>{startError}</div>
            <button

                onClick={() => { onStartGame() }}
            >
                {startText}
            </button>
        </div>
    )
}

export default StartGame