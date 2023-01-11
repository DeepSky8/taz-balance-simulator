import { briefingStage, gameStage } from "../elements/ActiveGame/stageObjects/stageObjects"
import turnStage from "../elements/ActiveGame/turnStep/turnStepItems/turnStage"

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
const useItems = 'You may use an item (click when finished)';
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
        case gameStage.intro:
            return introChar + activeChar.charName + clickToPassTurn;
        case gameStage.briefing:
            switch (cloudState.backstory.briefingStage) {
                case briefingStage.villain:
                    return villainBrief + clickForNext;
                case briefingStage.relic:
                    return relicBrief + clickForNext;
                case briefingStage.location:
                    return locationBrief + clickForNext;
                default:
                    return missionBriefing;
            }
        case gameStage.transport:
            return transportBrief;
        case gameStage.challenges:
            switch (cloudState.currentTurn.turnStage) {
                case turnStage.describeSceneOne:
                    return describeScene
                case turnStage.pickChallenge:
                    const selector = cloudState.currentTurn.selectedChallenge
                    if (selector === '') {
                        return engageChallenge;
                    } else if (selector !== '') {
                        const cardName = localState.currentChallenge.cardName
                        return activeChar.charName + challengeSelected + cardName;
                    }
                    break;
                case turnStage.prerollItems:
                    return useItems;
                case turnStage.storyBonus:
                    return tellStory;
                case turnStage.prerollAssist:
                    return askAssist;
                case turnStage.challengeScene:
                    return setScene1 + activeChar.charName + setScene2;
                case turnStage.prerollAssistScene:
                    return activeAssistPlayer + assistScene;
                case turnStage.actionTokenOne:
                    const tokenAction = () => {
                        if (activeChar.classCode === 3) {
                            return actionOneWarrior
                        } else if (activeChar.classCode === 4) {
                            return actionOneWizard
                        }
                    }

                    return spendActionToken + tokenAction()

                case turnStage.rollOne:
                    return rollDice
                case turnStage.rollTwo:
                    if (localState.currentChallenge.advantage ||
                        localState.currentChallenge.disadvantage) {
                        const disAdvan = localState.currentChallenge.advantage ? 'advantage!' : 'disadvantage.'
                        return rollAgain + disAdvan
                    }
                    break;
                case turnStage.rolling:
                    return rollingDice
                case turnStage.evaluateOne:
                    return clickProceed
                case turnStage.postrollAssist:
                    return askAssist;
                case turnStage.postrollAssistScene:
                    return activeAssistPlayer + assistScene;
                case turnStage.evaluateTwo:
                    return clickProceed
                case turnStage.describeSceneTwo:
                    if (cloudState.strength.total >= cloudState.currentTurn.difficulty) {
                        return describeSuccess
                    } else {
                        return describeFailure
                    }
                case turnStage.actionTokenTwo:
                    return spendActionToken + actionTwoPriest
                case turnStage.kostcoBuy:
                    if (cloudState.kostco.selected.kID === '0') {
                        return kostcoRogue
                    } else {
                        return kostco + cloudState.kostco.selected.kTitle
                    }
                case turnStage.kostcoGive:
                    return kostcoGive
                case turnStage.kostcoDiscard:
                    return kostcoDiscard
                case turnStage.passTurn:
                    return passTheTurn + activeChar.charName;
                case turnStage.default:
                    return 'uh oh, broked again'
            }
            break;
        case gameStage.victory:
            return 'victory page'
        case gameStage.failure:
            return 'failure page'
        case 'END':
            return thanksPlaying;
        default:
            return reload;
    }
}

export default turnTextSwitcher;


