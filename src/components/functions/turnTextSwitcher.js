// gameStage text
const introChar = 'Introduce '
const clickToPassTurn = ' (click to pass turn)'
const clickForNext = ' (click for next)'
const missionBriefing = 'Mission Briefing'
const thanksPlaying = 'Thanks for playing!'
// briefingStage text
const villainBrief = 'Villain Briefing';
const relicBrief = 'Relic Briefing';
const locationBrief = 'Location Briefing';
const transportBrief = 'Please keep your arms and legs inside the cannon at all times'

// turnStage text
const engageChallenge = "Select a challenge";
const challengeSelected = " is challenging "
const useItems = 'Do you want to use an item?';
const tellStory = 'Complete the story prompt for additional strength';
const askAssist = 'You may request assistance from your team';
const describeScene = `Based on the three active Challenges, what's happening right now?`
const setScene = 'Set the scene; what will you try to do?';
const assistScene = `, how do you help?`;
const rollDice = 'Click here to roll the die!';
const describeAction = 'Based on your roll, what happens?';
const kostco = 'Time to shop at Fantasy Kostco!';
const passTheTurn = 'Click here to pass the turn, ';
const reload = 'Please reload the game';

const turnTextSwitcher = (cloudState, localState, character, activeAssistPlayer) => {

    // console.log('stages: ', gameStage, briefingStage, turnStage)
    switch (cloudState.active.gameStage) {
        case 'INTRO':
            return introChar + character.charName + clickToPassTurn;
        case 'BRIEF':
            switch (cloudState.backstory.briefingStage) {
                case 'VILLAIN':
                    return villainBrief;
                case 'RELIC':
                    return relicBrief;
                case 'LOCATION':
                    return locationBrief;
                default:
                    return missionBriefing;
            }
        case 'TRANSPORT':
            return transportBrief;
        case 'CHALLENGES':
            switch (cloudState.currentTurn.turnStage) {
                case 'DESCRIBE':
                    return describeScene
                case 'CHALLENGE':
                    const selector = cloudState.currentTurn.selectedChallenge
                    if (selector === '') {
                        return engageChallenge;
                    } else if (selector !== '') {
                        // const cardName = cloudState.currentTurn[selector][cloudState.currentTurn[selector].visible].cardName
                        const cardName = localState.currentChallenge.cardName
                        return character.charName + challengeSelected + cardName;
                    }
                case 'ITEMS':
                    return useItems;
                case 'STORY':
                    return tellStory;
                case 'PREASSIST':
                    return askAssist;
                case 'SCENE':
                    return setScene;
                case 'PRE_ASSIST_SCENE':
                    return activeAssistPlayer + assistScene;
                case 'ROLL':
                    return rollDice;
                case 'POSTASSIST':
                    return askAssist;
                case 'POST_ASSIST_SCENE':
                    return activeAssistPlayer + assistScene;
                case 'DESCRIBE':
                    return describeAction;
                case 'KOSTCO':
                    return kostco;
                case 'PASS':
                    return passTheTurn + character.charName;
            }
            break;
        case 'END':
            return thanksPlaying;
        default:
            return reload;
    }
}

export default turnTextSwitcher;


