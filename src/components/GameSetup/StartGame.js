import React, { useEffect, useState } from "react";
import { startReadyCheck, startStopReadyCheck } from "../../actions/gameActions";
import { auth } from "../../firebase/firebase";

const StartGame = ({ userState, gameState }) => {
    const addPartyMembers = 'Please gather like-minded adventurers to join you on this Quest. Mission. Thing.'
    const change2PlayerTeamComp = 'In two-player mode, please only select from the Rogue, Wizard, and Warrior classes.'
    const changeTeamComp = 'Please ensure each party member has a different class.'
    const readyCheck = 'Ready to begin mission?'
    const notReady = "Actually, I'm not ready yet"
    const waitForTeam = 'Party not yet ready'
    const beginMission = 'Begin Mission!'
    const oversizeParty = 'Your party is too big!'
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
            // and the player has indicated that they are ready to begin
            if (gameState.ready) {
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

    }, [gameState.playerList, gameState.readyList, gameState.ready, userState.joiningGame])




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


    const onStartGame = () => {
        const teamChecked = acceptableTeamComp(gameState.classList)

        if ((userState.gameID) &&
            (userState.currentCharacter !== null) &&
            (teamChecked)
        ) {

            if (userState.joiningGame && !gameState.ready) {
                startReadyCheck(auth.currentUser.uid, userState.gameID)
            } else if (userState.joiningGame && gameState.ready) {
                startStopReadyCheck(auth.currentUser.uid, userState.gameID)
            } else if (gameState.readyList.length !== gameState.playerList.length) {
                setStartError(waitForTeam)
            } else if (startGame) {
                console.log('Game has begun')
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