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

// turnStage text
const engageChallenge = 'Select a challenge to engage';
const useItems = 'Do you want to use an item?';
const tellStory = 'Complete the story prompt for additional strength';
const askAssist = 'You may request assistance from your team';
const setScene = 'Set the scene; what will you try to do?';
const assistScene = 'How does the assistance help?';
const rollDice = 'Click here to roll the die!';
const describeAction = 'Based on your roll, what happens?';
const kostco = 'Time to shop at Kostco!';
const passTheTurn = 'Click here to pass the turn, ';
const reload = 'Please reload the game';

const turnTextSwitcher = (gameStage, briefingStage, turnStage, character) => {
    // console.log('stages: ', gameStage, briefingStage, turnStage)
    switch (gameStage) {
        case 'INTRO':
            return introChar + character.charName + clickToPassTurn;
        case 'BRIEF':
            switch (briefingStage) {
                case 'VILLAIN':
                    return villainBrief;
                case 'RELIC':
                    return relicBrief;
                case 'LOCATION':
                    return locationBrief;
                default:
                    return missionBriefing;
            }
        case 'CHALLENGES':
            switch (turnStage) {
                case 'CHALLENGE':
                    return engageChallenge;
                case 'ITEMS':
                    return useItems;
                case 'STORY':
                    return tellStory;
                case 'PREASSIST':
                    return askAssist;
                case 'SCENE':
                    return setScene;
                case 'ASSIST_SCENE':
                    return assistScene;
                case 'ROLL':
                    return rollDice;
                case 'POSTASSIST':
                    return askAssist;
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


