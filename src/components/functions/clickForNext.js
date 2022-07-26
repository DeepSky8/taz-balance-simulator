import { startMarkTurnComplete, startUpdateTurnStage } from "../../actions/gameActions"
import { auth } from "../../firebase/firebase";
import incrementTurn from "./incrementTurn";



const clickForNext = ({ gameState }) => {

    const passTheTurn = () => {
        startMarkTurnComplete(
            gameState.static.host,
            gameState.static.key,
            [gameState.active.activeUID].concat(
                gameState.readyList
            ))
        startUpdateTurnStage(
            gameState.static.host,
            gameState.static.key,
            incrementTurn(gameState.currentTurn.turnStage)
        )
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
                    // case 'CHALLENGE':
                    //     return engageChallenge;
                    // case 'ITEMS':
                    //     return useItems;
                    // case 'STORY':
                    //     return tellStory;
                    // case 'PREASSIST':
                    //     return askAssist;
                    // case 'SCENE':
                    //     return setScene;
                    // case 'ASSIST_SCENE':
                    //     return assistScene;
                    // case 'ROLL':
                    //     return rollDice;
                    // case 'POSTASSIST':
                    //     return askAssist;
                    // case 'DESCRIBE':
                    //     return describeAction;
                    // case 'KOSTCO':
                    //     return kostco;
                    case 'PASS':
                        passTheTurn()
                }
                break;
            case 'END':
                break;
            default:
                console.log('hit default on clickForNext, pls fix');
        }
    }





}

export default clickForNext