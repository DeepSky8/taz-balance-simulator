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
const challengeSelected = " is engaging "
const useItems = 'Do you want to use an item?';
const tellStory = 'Complete the story prompt for additional strength';
const askAssist = 'You may request assistance from your team';
const describeScene = `Based on the three active Challenges, what's happening right now?`
const setScene1 = 'Set the scene; what will ';
const setScene2 = ' try to do?';
const assistScene = `, how do you help?`;
const rollDice = 'Click here to roll the die!';
const rollAgain = 'Roll again; you have '
const clickProceed = 'Click to proceed'
const describeSuccess = 'Describe your success!'
const describeFailure = 'Describe how this attempt failed.'
const kostco = 'Click to purchase ';
const kostcoRogue = 'Select an item to purchase'
const kostcoGive = 'Give and accept Fantasy Kostco items to and from your team (click here when finished)'
const kostcoDiscard = 'Discard down to two Kostco items'
const passTheTurn = 'Click here to pass the turn, ';
const reload = 'Please reload the game';
const spendActionToken = 'You may spend your action token '
const actionOneWizard = 'to increase your strength by 3'
const actionOneWarrior = 'and one health point to increase your strength by 2'
const actionTwoPriest = 'to restore one health point to the team'
const rollingDice = 'Rolling the Dice'

const turnTextSwitcher = (cloudState, localState, activeAssistPlayer) => {

    let activeChar = localState.teamCharArray[localState.activeIndex]

    switch (cloudState.active.gameStage) {
        case 'INTRO':
            return introChar + activeChar.charName + clickToPassTurn;
        case 'BRIEF':
            switch (cloudState.backstory.briefingStage) {
                case 'VILLAIN':
                    return villainBrief + clickForNext;
                case 'RELIC':
                    return relicBrief + clickForNext;
                case 'LOCATION':
                    return locationBrief + clickForNext;
                default:
                    return missionBriefing;
            }
        case 'TRANSPORT':
            return transportBrief;
        case 'CHALLENGES':
            switch (cloudState.currentTurn.turnStage) {
                case 'DESCRIBEONE':
                    return describeScene
                case 'CHALLENGE':
                    const selector = cloudState.currentTurn.selectedChallenge
                    if (selector === '') {
                        return engageChallenge;
                    } else if (selector !== '') {
                        const cardName = localState.currentChallenge.cardName
                        return activeChar.charName + challengeSelected + cardName;
                    }
                    break;
                case 'ITEMS':
                    return useItems;

                case 'STORY':
                    return tellStory;
                case 'PREASSIST':
                    return askAssist;
                case 'SCENE':
                    return setScene1 + activeChar.charName + setScene2;
                case 'PRE_ASSIST_SCENE':
                    return activeAssistPlayer + assistScene;
                case 'ADD_ASSIST':
                    return activeAssistPlayer + assistScene;

                case 'ACTIONONE':
                    const tokenAction = () => {
                        if (activeChar.classCode === 3) {
                            return actionOneWarrior
                        } else if (activeChar.classCode === 4) {
                            return actionOneWizard
                        }
                    }

                    return spendActionToken + tokenAction()

                case 'ROLLONE':
                    return rollDice
                case 'ROLLTWO':
                    if (localState.currentChallenge.advantage ||
                        localState.currentChallenge.disadvantage) {
                        const disAdvan = localState.currentChallenge.advantage ? 'advantage!' : 'disadvantage.'
                        return rollAgain + disAdvan
                    }
                    break;
                case 'ROLLING':
                    return rollingDice
                case 'EVALUATEONE':
                    return clickProceed
                case 'POSTASSIST':
                    return askAssist;
                case 'POST_ASSIST_SCENE':
                    return activeAssistPlayer + assistScene;
                case 'EVALUATETWO':
                    return clickProceed
                case 'DESCRIBETWO':
                    if (cloudState.strength.total >= cloudState.currentTurn.difficulty) {
                        return describeSuccess
                    } else {
                        return describeFailure
                    }
                case 'ACTIONTWO':
                    return spendActionToken + actionTwoPriest
                case 'KOSTCO_BUY':
                    if (cloudState.kostco.selected.kID === '0') {
                        return kostcoRogue
                    } else {
                        return kostco + cloudState.kostco.selected.kTitle
                    }
                case 'KOSTCO_GIVE':
                    return kostcoGive
                case 'KOSTCO_DISCARD':
                    return kostcoDiscard
                case 'PASS':
                    return passTheTurn + activeChar.charName;
                case 'default':
                    return 'uh oh, broked again'
            }
            break;
        case 'END':
            return thanksPlaying;
        default:
            return reload;
    }
}

export default turnTextSwitcher;


