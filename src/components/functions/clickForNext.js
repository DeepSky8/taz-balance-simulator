import { startMarkTurnComplete, startUpdateAssistTokens, startUpdateTurnStage } from "../../actions/gameActions"
import { auth } from "../../firebase/firebase";
import incrementTurn from "./incrementTurn";



const clickForNext = ({ gameState, character }) => {
    const assistScenes = ['PRE_ASSIST_SCENE', 'POST_ASSIST_SCENE']

    const turnIncrement = (stage = incrementTurn(gameState.currentTurn.turnStage)) => {
        startUpdateTurnStage(
            gameState.static.host,
            gameState.static.key,
            stage
        )
    }

    const passTheTurn = () => {
        startMarkTurnComplete(
            gameState.static.host,
            gameState.static.key,
            [gameState.active.activeUID].concat(
                gameState.readyList
            ))
        turnIncrement()
    }


    if (auth.currentUser.uid === gameState.active.activeUID) {
        switch (gameState.active.gameStage) {
            case 'INTRO':
                passTheTurn()
                break;
            case 'BRIEF':
                break;
            case 'CHALLENGES':
                switch (gameState.currentTurn.turnStage) {
                    case 'CHALLENGE':
                        if (character.charKostco && character.charKostco.length > 0) {
                            turnIncrement()
                        } else if (gameState.currentTurn.storyPrompt) {
                            turnIncrement('STORY')
                        } else {
                            turnIncrement('PREASSIST')
                        }
                        break;
                    case 'ITEMS':
                        console.log('did things with items')
                        console.log('did the selected challenge have a story prompt?')
                        console.log('if yes, turnIncrement()')
                        console.log("if no, turnIncrement('PREASSIST')")
                        turnIncrement()
                        break;
                    case 'STORY':
                        console.log('told the story')
                        turnIncrement()
                        break;
                    case 'PREASSIST':
                        console.log('someone may have spent action token')
                        console.log('need to know if yes, so that player tells PRE_ASSIST_SCENE')
                        turnIncrement()
                        break;
                    case 'SCENE':
                        if (gameState.activeAssistTokens.length > 0) {
                            turnIncrement()
                        } else {
                            turnIncrement('ROLL')
                        }
                        console.log('Player set the scene')
                        break;
                    case 'PRE_ASSIST_SCENE':
                        if (gameState.activeAssistTokens.length === 0) {
                            turnIncrement()
                        }

                        break;
                    case 'ROLL':
                        console.log('really need to find a rolling dice animation')
                        console.log('add roll to strength')
                        console.log('if strength is lower than challenge number, turnIncrement()')
                        console.log("otherwise turnIncrement('DESCRIBE')")
                        turnIncrement()
                        break;
                    case 'POSTASSIST':
                        console.log('someone may have spent action token')
                        console.log('need to know if yes, so that player tells POST_ASSIST_SCENE')
                        turnIncrement()
                        break;
                    case 'POST_ASSIST_SCENE':
                        console.log('Assist player(s) tell how they helped')
                        console.log('need an array of assist players, cycle through them')
                        console.log('this onClick event should display the next player name')
                        console.log('until there are no further assist players in the array')
                        console.log('then go to the next stage')
                        turnIncrement()
                        break;
                    case 'DESCRIBE':
                        console.log('triumph or failure was described')
                        console.log('if loot points for this character are higher than 3')
                        console.log("then incrementTurn(), otherwise incrementTurn('PASS')")
                        turnIncrement()
                        break;
                    case 'KOSTCO':
                        console.log('received KOSTCO card (two cards if Rogue)')
                        console.log('discarded one if Rogue, then decided whether to hold it or give it')
                        console.log('if this results in more than two items, decide which one to discard')
                        turnIncrement()
                        break;
                    case 'PASS':
                        passTheTurn()
                }
                break;
            case 'END':
                break;
            default:
                console.log('hit default on clickForNext, pls fix');
        }
    } else if (
        // If the game is on pre or post assist scene stage
        // and at least one player is left in the assist token array
        // the player at the beginning of the assist token array
        // can click the button to indicate that they have told
        // how they are attempting to assist the current active player
        assistScenes.includes(gameState.currentTurn.turnStage) &&
        gameState.activeAssistTokens.length > 0) {

        console.log('Assist player(s) tell how they helped')
        const updatedActiveAssistTokens = gameState.activeAssistTokens.slice(1)
        startUpdateAssistTokens(
            gameState.static.host,
            gameState.static.key,
            updatedActiveAssistTokens
        )
        if (updatedActiveAssistTokens.length === 0) {
            turnIncrement()
        }
    }





}

export default clickForNext