import { defaultCardState } from "./cardReducer"
import { defaultCharState } from "./charReducer"

const defaultLocalState = {
    // The hostKey reducer concats two strings with a separating /, which serves as a drop-in
    // when accessing the savedGame in Firebase
    hostKey: '',
    activeCharacterID: '',
    activeIndex: 0,
    localCharacterID: '',
    localIndex: 0,
    teamCharArray: [
        {
            ...defaultCharState,
        }
    ],
    currentChallengeKey: '',
    currentChallenge: {
        ...defaultCardState
        // // deck creation flags
        // cardNumber: 0,
        // cardKey: '',
        // pairedWith: '',
        // randomize: false,
        // faceUp: true,
        // boss: false,
        // finale: false,

        // // card display elements
        // nameFlavor: '',
        // cardName: '',
        // difficulty: 0,
        // villainModifier: 0,
        // relicModifier: 0,
        // locationModifier: 0,
        // loot: 0,
        // health: 0,

        // monster: false,
        // spooky: false,
        // magic: false,
        // trap: false,
        // noAssist: false,
        // doubleAssist: false,
        // noRoll: false,
        // chance: false,
        // storyBonus: 0,
        // storyPrompt: '',
        // italicText: '',
        // effectText: '',

        // // card effect elements
        // hasEffect: false,
        // completed: false,
        // requiresReroll: false,
        // advantage: false,
        // disadvantage: false,

        // discardSurprise: false,
        // requiresToken: false,

        // reencounterGerblin: false,

        // kostCoEffect: false,
        // discardKostCoDefeat: false,
        // discardKostCoDraw: false,
        // discardKostCoStrength: false,
        // discardKostCoStrengthBonus: 0,

        // specialType: false,
        // gerblin: false,
        // crew: false,
        // giant: false,

        // flipEffect: false,
        // flipTarget: '',
        // flipOnDefeat: false,
        // flipOnDiscard: false,
        // flipOnFail: false,
        // flipInsteadOfDefeat: false,
        // flippable: true,

        // autoComplete: false,
        // autoDefeat: false,
        // autoDiscard: true,
        // autoDamage: false,

        // modifyEffect: false,
        // modifyMonster: 0,
        // modifySpooky: 0,
        // modifyMagic: 0,
        // modifyTrap: 0,

        // gainLifeEffect: false,
        // gainLifeDefeat: 0,
        // gainLifeDiscard: 0,
        // gainLifeReveal: 0,

        // loseLootEffect: false,
        // loseLootOnFail: false,
        // loseLootOnReveal: false,
        // loseLootOnDefeat: false,
        // loseLootOnDiscard: false,
        // reduceKostCoCost: false,
        // spendLootForEffect: false,
        // loseLootPoints: 0,

        // counterEffect: false,
        // counters: 0,
        // defeatZeroCounters: false,
        // failingAddsCounters: false,
        // failingRemovesCounters: false,
        // failCounterNumber: 0,
        // failedAttempts: 0,
    },
    completedChallengeArrayVillain: [],
    uncompletedChallengeArrayVillain: [],
    completedChallengeArrayRelic: [],
    uncompletedChallengeArrayRelic: [],
    completedChallengeArrayLocation: [],
    uncompletedChallengeArrayLocation: [],
}

const localStateReducer = (state, action) => {
    const updatedTeamCharArray = [];

    switch (action.type) {
        case 'UPDATE_HOSTKEY':
            return {
                ...defaultLocalState,
                ...state,
                hostKey: action.hostKey.host + '/' + action.hostKey.key
            }
        case 'UPDATE_LOCAL_CHARACTER_ID':
            return {
                ...defaultLocalState,
                ...state,
                localCharacterID: action.localCharacterID
            }
        case 'UPDATE_LOCAL_INDEX':
            return {
                ...defaultLocalState,
                ...state,
                localIndex: action.localIndex
            }
        case 'UPDATE_ACTIVE_CHARACTER_ID':
            return {
                ...defaultLocalState,
                ...state,
                activeCharacterID: action.activeCharacterID
            }
        case 'UPDATE_ACTIVE_INDEX':
            return {
                ...defaultLocalState,
                ...state,
                activeIndex: action.activeIndex
            }
        case 'UPDATE_LOCAL_CHARACTER':
            return {
                ...defaultLocalState,
                ...state,
                localCharacter: {
                    ...defaultLocalState.localCharacter,
                    ...action.localCharacter
                }
            }
        case 'UPDATE_ACTIVE_CHARACTER':
            return {
                ...defaultLocalState,
                ...state,
                activeCharacterID: action.activeCharacter.charID,
                activeCharacter: {
                    ...defaultLocalState.activeCharacter,
                    ...action.activeCharacter
                }
            }
        case 'CLEAR_ACTIVE_CHARACTER':
            return {
                ...defaultLocalState,
                ...state,
                activeCharacter: {
                    ...defaultLocalState.activeCharacter
                }
            }
        case 'UPDATE_CURRENT_CHALLENGE':
            return {
                ...defaultLocalState,
                ...state,
                currentChallenge: {
                    ...defaultLocalState.currentChallenge,
                    ...action.currentChallenge
                }
            }
        case 'CLEAR_CURRENT_CHALLENGE':
            return {
                ...defaultLocalState,
                ...state,
                currentChallenge: { ...defaultLocalState.currentChallenge }
            }
        case 'UPDATE_CURRENT_CHALLENGE_KEY':
            return {
                ...defaultLocalState,
                ...state,
                currentChallengeKey: action.currentChallengeKey
            }
        case 'CLEAR_CURRENT_CHALLENGE_KEY':
            return {
                ...defaultLocalState,
                ...state,
                currentChallengeKey: ''
            }
        // case 'RESET_REDUCER':
        //     return {

        //     }
        case 'UPDATE_COMPLETED_CHALLENGES_VILLAIN':
            return {
                ...defaultLocalState,
                ...state,
                completedChallengeArrayVillain: action.completedChallengeArrayVillain
            }
        case 'UPDATE_UNCOMPLETED_CHALLENGES_VILLAIN':
            return {
                ...defaultLocalState,
                ...state,
                uncompletedChallengeArrayVillain: action.uncompletedChallengeArrayVillain
            }
        case 'UPDATE_COMPLETED_CHALLENGES_RELIC':
            return {
                ...defaultLocalState,
                ...state,
                completedChallengeArrayRelic: action.completedChallengeArrayRelic
            }
        case 'UPDATE_UNCOMPLETED_CHALLENGES_RELIC':
            return {
                ...defaultLocalState,
                ...state,
                uncompletedChallengeArrayRelic: action.uncompletedChallengeArrayRelic
            }
        case 'UPDATE_COMPLETED_CHALLENGES_LOCATION':
            return {
                ...defaultLocalState,
                ...state,
                completedChallengeArrayLocation: action.completedChallengeArrayLocation
            }
        case 'UPDATE_UNCOMPLETED_CHALLENGES_LOCATION':
            return {
                ...defaultLocalState,
                ...state,
                uncompletedChallengeArrayLocation: action.uncompletedChallengeArrayLocation
            }
        case 'UPDATE_TEAM_CHAR':
            const charIndex = state.teamCharArray.findIndex(
                storedCharObject => storedCharObject.charID === action.charObject.charID
            )
            // const updatedTeamCharArray = [];
            if (charIndex === -1) {
                updatedTeamCharArray.push(...state.teamCharArray);
                updatedTeamCharArray.push(action.charObject);
            } else if (charIndex === (state.teamCharArray.length - 1)) {
                (updatedTeamCharArray
                    .push(...state.teamCharArray.slice(0, charIndex)));
                updatedTeamCharArray.push(action.charObject);
            } else {
                (updatedTeamCharArray
                    .push(...state.teamCharArray.slice(0, charIndex)));
                updatedTeamCharArray.push(action.charObject);
                updatedTeamCharArray.push(...state.teamCharArray.slice(charIndex + 1));
            }
            return {
                ...defaultLocalState,
                ...state,
                teamCharArray: updatedTeamCharArray,
            }
        case 'REMOVE_TEAM_CHAR':
            const charIDIndex = state.teamCharArray.findIndex(
                storedCharObject => storedCharObject.charID === action.charID)
            if (charIDIndex !== -1) {
                updatedTeamCharArray.push(...state.teamCharArray.filter(
                    storedCharObject => storedCharObject.charID !== action.charID))
            }
            return {
                ...defaultLocalState,
                ...state,
                teamCharArray: updatedTeamCharArray,
            }
        default:
            return {
                ...defaultLocalState,
                ...state
            }
    }
}

export { defaultLocalState, localStateReducer }