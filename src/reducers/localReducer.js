import { defaultCardState } from "./cardReducer"
import { defaultCharState } from "./charReducer"

const defaultLocalState = {
    // The hostKey reducer concats two strings with a separating /, which serves as a drop-in
    // when accessing the savedGame in Firebase
    hostKey: '',
    localCharacterID: '',
    localCharacter: {
        ...defaultCharState
        // showAlerts: false,
        // changeClass: true,
        // charID: undefined,
        // charName: '',
        // classCode: 5,
        // raceCode: 0,
        // toolCode: 7,
        // assistCode: 7,
        // charNotes: '',
        // charKostco: [{}],
        // displayChars: true,
        // questCount: 0,
        // humanBardBand: '',
        // robotBardCreator: '',
        // robotBardVisual: '',
        // bardSuperGoal: '',
        // bardInstrument: '',
        // bardMusicSkill: '',
        // dwarfPriestOrigin: '',
        // gerblinRogueOrigin: '',
        // humanWarriorOrigin1: '',
        // humanWarriorOrigin2: '',
        // humanWarriorOrigin3: '',
        // dwarfWarriorBeard: '',
        // undeadWizardOrigin1: '',
        // undeadWizardOrigin2: '',
        // undeadWizardOrigin3: '',
        // priestToolHolySymbol: '',
        // priestToolMantra: '',
        // rogueToolCatchphrase: '',
        // warriorToolArmor: '',
        // warriorToolBattlecry: '',
        // wizardToolCatchphrase: '',
        // priestAssistFame: '',
        // priestAssistFameHelps: '',
        // priestAssistHobby: '',
        // warriorAssistFame: '',
        // warriorAssistFameHelps: '',
        // wizardAssistFame: '',
        // wizardAssistFameHelps: '',
    },
    activeCharacter: {
        ...defaultCharState
    },
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
        // storyBonus: 0,
        // storyPrompt: '',
        // effectText: '',

        // // card effect elements
        // hasEffect: false,
        // completed: false,
        // autoComplete: false,
        // autoDefeat: false,
        // autoDiscard: false,
        // autoDamage: false,

        // kostcoDiscard: false,
        // requiresToken: false,
        // requiresReroll: false,
        // gerblin: false,

        // flipEffect: false,
        // flipTarget: '',
        // flipOnDefeat: false,
        // flipOnDiscard: false,
        // flipOnFail: false,

        // failedAttempts: 0,
        // counters: 0,
        // advantage: false,
        // disadvantage: false,
        // flippable: true,
    },
}

const localStateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_HOSTKEY':
            return {
                ...state,
                hostKey: action.hostKey.host + '/' + action.hostKey.key
            }
        case 'UPDATE_CURRENT_CHARACTER_ID':
            return {
                ...state,
                currentCharacterID: action.currentCharacterID
            }
        case 'UPDATE_LOCAL_CHARACTER':
            return {
                ...state,
                localCharacter: action.localCharacter
            }
        case 'UPDATE_ACTIVE_CHARACTER':
            return {
                ...state,
                activeCharacter: action.activeCharacter
            }
        case 'CLEAR_ACTIVE_CHARACTER':
            return {
                ...state,
                activeCharacter: {}
            }
        case 'UPDATE_CURRENT_CHALLENGE':
            return {
                ...state,
                currentChallenge: action.currentChallenge
            }
        case 'CLEAR_CURRENT_CHALLENGE':
            return {
                ...state,
                currentChallenge: {}
            }
        default:
            return {
                ...state
            }
    }
}

export { defaultLocalState, localStateReducer }