import {
    bardAssistMusic,
    bardAssistStingerLines,
    bardAssistTitles,
    bardRaceStingerLines,
    bardToolBigGoal,
    bardToolStingerLines,
    bardToolTitles
} from "./bardInfo"
import {
    priestAssistFame,
    priestAssistHobby,
    priestAssistStingerLines,
    priestAssistTitles,
    priestRaceStingerLines,
    priestToolHolySymbol,
    priestToolMantra,
    priestToolStingerLines,
    priestToolTitles
} from "./priestInfo"
import {
    rogueAssistStingerLines,
    rogueAssistTitles,
    rogueRaceStingerLines,
    rogueToolCatchphrase,
    rogueToolStingerLines,
    rogueToolTitles
} from "./rogueInfo"
import {
    warriorAssistFame,
    warriorAssistStingerLines,
    warriorAssistTitles,
    warriorRaceStingerLines,
    warriorToolArmor,
    warriorToolBattlecry,
    warriorToolStingerLines,
    warriorToolTitles
} from "./warriorInfo"
import {
    wizardAssistFame,
    wizardAssistStingerLines,
    wizardAssistTitles,
    wizardRaceStingerLines,
    wizardToolCatchphrase,
    wizardToolStingerLines,
    wizardToolTitles
} from "./wizardInfo"

export const shortDescription = 10
export const mediumDescription = 20
export const longDescription = 35
export const extraLongDescription = 50

export const asA = "As a "
export const asAn = "As an "

export const charTitles = [
    ', New Adventurer',
    ', Adventurer of some experience',
    ', Seen a thing or two',
    ', Bought the T-Shirt',
    ', Experienced Adventurer',
    ', Professor of Archeology',
    ', Guide to Monsters',
    ', Advisor to Nations',
    ', the Undying',
    ' (may actually be a zombie)',
    ', Legend'
]

export const charClassTitles = [
    'Bard',
    'Priest',
    'Rogue',
    'Warrior',
    'Wizard',
]

export const classBard = 0
export const classPriest = 1
export const classRogue = 2
export const classWarrior = 3
export const classWizard = 4
export const unselectedClass = 5


export const raceCodes = [
    // bard
    [9, 5, 4, 7, 8, 12],
    // priest
    [9, 4, 5, 8, 7, 2],
    // rogue
    [9, 8, 6, 10, 5, 1],
    // warrior
    [9, 4, 13, 8, 11, 5],
    // wizard
    [9, 5, 7, 3, 14, 6],
    // default
    [0]
]

export const unselectedRace = 0

export const raceStingers = [
    bardRaceStingerLines,
    priestRaceStingerLines,
    rogueRaceStingerLines,
    warriorRaceStingerLines,
    wizardRaceStingerLines
]


export const raceTitles = [
    "-select-",
    "Cat Person",
    "Centaur",
    "Dark Elf",
    "Dwarf",
    "Elf",
    // Elf is 5
    "Gerblin",
    "Gnome",
    "Halfling",
    "Human",
    "Lizardborn",
    // Lizardborn is 10
    "Lizardfolk",
    "Magical Robot",
    "Orc",
    "Undead",
]

export const modifiedByAn = [5, 13, 14]



export const charBlurb = [
    // Bard
    " bard, I always have an inspiring word or song",
    // Priest
    " priest, I have the power to heal my allies and defeat the restless dead",
    // Rogue
    " rogue, I excel at evading traps and coordinating with my allies",
    // Warrior
    " warrior, I defeat challenges using my strength and skill",
    // Wizard
    " wizard, I'm a master of magic and can use spells to defeat monsters"
]

export const unselectedAttribute = 7

export const toolTitles = [
    bardToolTitles,
    priestToolTitles,
    rogueToolTitles,
    warriorToolTitles,
    wizardToolTitles,
]

export const toolStingers = [
    bardToolStingerLines,
    priestToolStingerLines,
    rogueToolStingerLines,
    warriorToolStingerLines,
    wizardToolStingerLines
]

export const toolBlurb = [
    // Bard
    "I'm an expert on relics, mostly because of my ",
    // Priest
    "I'm especially strong against undead, because of my ",
    // Rogue
    "I'm especially effective against traps, because of my ",
    // Warrior
    "I'm especially effective against monsters, because of my ",
    // Wizard
    "I'm especially effective against magical threats, because of my ",
    // default
    ['-select-'],
]

export const assistPrompt = [
    // Bard
    "I generally assist my teammates using my ",
    // Priest
    "I generally assist my teamsmates with my ",
    // Rogue
    "I assist my teammates with my ",
    // Warrior
    "I assist my teammates with my ",
    // Wizard
    "I assist my teammates with my ",
]

export const assistTitles = [
    bardAssistTitles,
    priestAssistTitles,
    rogueAssistTitles,
    warriorAssistTitles,
    wizardAssistTitles
]

export const assistStingers = [
    bardAssistStingerLines,
    priestAssistStingerLines,
    rogueAssistStingerLines,
    warriorAssistStingerLines,
    wizardAssistStingerLines
]

export const specialTitle = [
    // Bard
    "Inspiration",
    // Priest
    "Healing",
    // Rogue
    "Treasure Hunter",
    // Warrior
    "Reckless Charge",
    // Wizard
    "Battle Magic"
]

export const specialStinger = [
    // Bard
    "Whenever you spend your action token, reclaim it at the end of the turn.",
    // Priest
    "At the end of your turn, you may spend your action token to restore 1 Health to the party.",
    // Rogue
    "If you would draw a Fantasy KostCo card, draw two instead and immediately discard one of them.",
    // Warrior
    "Before you roll the die to defeat a Challenge, you may spend your action token and suffer 1 team damage to add +2 to your Strength.",
    // Wizard
    "Before you roll the die to defeat a Monster Challenge, you may spend your action token to add +3 to your Strength."
]

export const tokenClassesActionOne = [
    // Warrior
    3,
    // Wizard
    4
]

export const tokenClassesActionTwo = [
    // Priest
    1
]

export const tokenClassesKostCo = [
    // Rogue
    2
]

export const tokenClassesReclaim = [
    // Bard
    0
]


export const stats = [
    // bard: 
    {
        strength: 1,
        preAssist: 1,
        postAssist: 1,
        specialStrength: 4,
        specialTarget: 'Relic'
    },
    // priest: 
    {
        strength: 2,
        preAssist: 2,
        postAssist: 2,
        specialStrength: 4,
        specialTarget: 'Spooky'
    },
    // rogue
    {
        strength: 2,
        preAssist: 3,
        postAssist: 1,
        specialStrength: 4,
        specialTarget: 'Trap'
    },
    // warrior
    {
        strength: 2,
        preAssist: 2,
        postAssist: 1,
        specialStrength: 4,
        specialTarget: 'Monster'
    },
    // wizard
    {
        strength: 1,
        preAssist: 2,
        postAssist: 1,
        specialStrength: 4,
        specialTarget: 'Magic'
    },
    // default
    {
        strength: 0,
        preAssist: 0,
        postAssist: 0,
        specialStrength: 0,
        specialTarget: 'Your mom'
    }
]

export const specialTargetArray = [
    // bard
    'Relic',
    //priest
    'Spooky',
    // rogue
    'Trap',
    // warrior
    'Monster',
    // wizard
    'Magic',
]

export const stingerQuestions = [
    {
        tool: [bardToolBigGoal],
        assist: [bardAssistMusic],
    },
    {
        tool: [
            priestToolHolySymbol,
            priestToolMantra
        ],
        assist: [
            priestAssistFame,
            priestAssistHobby
        ],
    },
    {
        tool: [rogueToolCatchphrase],
        assist: []
    },
    {
        tool: [
            warriorToolArmor,
            warriorToolBattlecry
        ],
        assist: [warriorAssistFame],
    },
    {
        tool: [wizardToolCatchphrase],
        assist: [wizardAssistFame]
    }
]