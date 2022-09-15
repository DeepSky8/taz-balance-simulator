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
        // lootPoints: 0,
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
    activeCharacterID: '',
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
}

const localStateReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_HOSTKEY':
            return {
                ...state,
                hostKey: action.hostKey.host + '/' + action.hostKey.key
            }
        case 'UPDATE_LOCAL_CHARACTER_ID':
            return {
                ...state,
                localCharacterID: action.localCharacterID
            }
        case 'UPDATE_ACTIVE_CHARACTER_ID':
            return {
                ...state,
                activeCharacterID: action.activeCharacterID
            }
        case 'UPDATE_LOCAL_CHARACTER':
            return {
                ...state,
                localCharacter: { ...action.localCharacter }
            }
        case 'UPDATE_ACTIVE_CHARACTER':
            return {
                ...state,
                activeCharacter: { ...action.activeCharacter }
            }
        case 'CLEAR_ACTIVE_CHARACTER':
            return {
                ...state,
                activeCharacter: {}
            }
        case 'UPDATE_CURRENT_CHALLENGE':
            return {
                ...state,
                currentChallenge: { ...action.currentChallenge }
            }
        case 'CLEAR_CURRENT_CHALLENGE':
            return {
                ...state,
                currentChallenge: {}
            }
        // case 'RESET_REDUCER':
        //     return {

        //     }
        default:
            return {
                ...state
            }
    }
}

export { defaultLocalState, localStateReducer }