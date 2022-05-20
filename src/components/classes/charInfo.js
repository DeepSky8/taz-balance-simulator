import { bardToolTitles } from "./bardInfo"
import { priestToolTitles } from "./priestInfo"
import { rogueToolTitles } from "./rogueInfo"
import { warriorToolTitles } from "./warriorInfo"
import { wizardToolTitles } from "./wizardInfo"

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


export const charBlurb = [
    // Bard
    " bard, you always have an inspiring word or song",
    // Priest
    " priest, you have the power to heal your allies and defeat the restless dead",
    // Rogue
    " rogue, you excel at evading traps and coordinating with your allies",
    // Warrior
    " warrior, you defeat challenges using your strength and skill",
    // Wizard
    " wizard, you're a master of magic and can use spells to defeat monsters"
]

export const toolTitles = [
    bardToolTitles,
    priestToolTitles,
    rogueToolTitles,
    warriorToolTitles,
    wizardToolTitles,
]

export const toolBlurb = [
    // Bard
    "You're an expert on relics, mostly because of your ",
    // Priest
    "You're especially strong against undead, because of your ",
    // Rogue
    "You're especially effective against traps, because of your ",
    // Warrior
    "You're especially effective against monsters, because of your ",
    // Wizard
    "You're especially effective against magical threats, because of your ",
    // default
    ['-select-'],
]




export const charAttributePrompt = [
    // Bard
    "You generally assist your teammates using your ",
    // Priest
    "You generally assist your teamsmates with your ",
    // Rogue
    "You assist your teammates with your ",
    // Warrior
    "You assist your teammates with your ",
    // Wizard
    "You assist your teammates with your "
]

export const charSpecialTitle = [
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

export const charSpecialStinger = [
    // Bard
    "Whenever you spend your action token, reclaim it at the end of the turn.",
    // Priest
    "At the end of your turn, you may spend your action token to restore 1 Health to the party.",
    // Rogue
    "Whenever you draw Fantasky Kostco cards, draw two and immediately discard one of them.",
    // Warrior
    "Before you roll the die to defeat a Challenge, you may spend your action token and suffer 1 damage to add +2 to your Strength.",
    // Wizard
    "Before you roll the die to defeat a Monster Challenge, you may spend your action token to add +3 to  your Strength."
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
    }
]

// export const bardNumbers = {
//     strength: 1,
//     preAssist: 1,
//     postAssist: 1,
//     specialStrength: 4,
//     specialTarget: 'relic'
// }

// bardToolCodes: [
//     'bt0',
//     'bt1',
//     'bt2',
//     'bt3',
//     'bt4',
//     'bt5'
// ],
// bardAttributeCodes: [
//     'ba0',
//     'ba1',
//     'ba2',
//     'ba3',
//     'ba4',
//     'ba5'
// ],
// bardStats: {
//     strength: 1,
//     preAssist: 1,
//     postAssist: 1,
//     specialStrength: 4,
//     specialTarget: 'relic'
// }

// export const raceCodes = [
//     'br0',
//     'br1',
//     'br2',
//     'br3',
//     'br4',
//     'br5',
// ]




// export const bardRaceStingers = [
//     "You're a brooding musician. What's the name of your band?",
//     "You sing the ancient songs of the fey. For money.",
//     "Who said Dwarves couldn't sing? You've got hidden depths, bro.",
//     "You've got an innate talent for magic and a really cool hat.",
//     "You don't actually sing. You're more about the standup.",
//     "Who created you? What do you look like?"
// ]

// export const bardToolCodes = [
//     'bt0',
//     'bt1',
//     'bt2',
//     'bt3',
//     'bt4',
//     'bt5'
// ]



// export const bardToolTitles = [
//     "Arcane Knowledge",
//     "Pub Trivia",
//     "Experience",
//     "Enthusiasm",
//     "Big Dreams",
//     "Bag Of Tricks"
// ]

// export const bardToolStingers = [
//     "You've devoted your life to studying relics and magic.",
//     "You just know a lot of random, stupid things.",
//     "You've been dungeon delving for decades. You're kind of over it, actually.",
//     "You don't actually KNOW anything about relics, but a positive attitude goes a long way!",
//     "After you bag a few relics, you're going to be a superstar! What is it you want to do?",
//     "What have you got in your pocketses? You have a trinket or tool for every occasion."
// ]

// export const bardAttributeCodes = [
//     'ba0',
//     'ba1',
//     'ba2',
//     'ba3',
//     'ba4',
//     'ba5'
// ]



// export const bardAttributeTitles = [
//     "Beautiful Voice",
//     "Clever Limericks",
//     "Awesome Music",
//     "Culinary Genius",
//     "Big Ideas",
//     "Lore"
// ]

// export const bardAttributeStingers = [
//     "As far as you're concerned, life is a musical.",
//     "There once was a wizard from Oz...",
//     "What instrument do you play? Can you shred?",
//     "Well-fed adventurers are effective adventurers. Food comes first!",
//     "Sometimes your ideas are a little over the top, but go big or go home!",
//     "You know a little something about everything. Nerd."
// ]














//00 "Cat Person",
//01 "Centaur",
//02 "Dark Elf",
//03 "Dwarf",
//04 "Elf",
//05 "Gerblin",
//06 "Gnome",
//07 "Halfling",
//08 "Human",
//09 "Lizardborn",
//10 "Lizardfolk",
//11 "Magical Robot",
//12 "Orc",
//13 "Undead"




// Bard
// "Human", 08
// "Elf", 04
// "Dwarf", 03
// "Gnome", 06
// "Halfling", 07
// "Magical Robot" 11
// 08.04.03.06.07.11

// Priest
// "Human", 08
// "Dwarf", 03
// "Elf", 04
// "Halfling", 07
// "Gnome", 06
// "Centaur", 01
// 08.03.04.07.06.01

// Wizard
// "Human", 08
// "Elf", 04
// "Gnome", 06
// "Dark Elf", 02
// "Undead", 13
// "Gerblin", 05
// 08.04.06.02.13.05

// Warrior
// "Human", 08
// "Dwarf", 03
// "Orc", 12
// "Halfling", 07
// "Lizardfolk", 10
// "Elf", 04
// 08.03.12.07.10.04

// Rogue
// "Human", 08
// "Halfling", 07
// "Gerblin", 05
// "Lizardborn", 09
// "Elf", 04
// "Cat Person", 00
// 08.07.05.09.04.00