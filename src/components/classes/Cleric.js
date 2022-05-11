import React, { useEffect } from "react"
import { resetDefaultNewChar, setCharClassCode, setCharRace } from "../../actions/newCharActions"



const bardBlurb = " bard, you're an expert on Relics and always have an inspiring word."

const asA = "As a "
const asAn = "As an "
const charClass = ' bard'

const bardRaceCapTitles = [
    "HUMAN",
    "ELF",
    "DWARF",
    "GNOME",
    "HAFLING",
    "MAGICAL ROBOT"
]
const bardRaceRegTitles = [
    "Human",
    "Elf",
    "Dwarf",
    "Gnome",
    "Halfling",
    "Magical Robot"
]

const bardRaceStingers = [
    "You're a brooding musician. What's the name of your band?",
    "You sing the ancient songs of the fey. For money.",
    "Who said Dwarves couldn't sing? You've got hidden depths, bro.",
    "You've got an innate talent for magic and a really cool hat.",
    "You don't actually sing. You're more about the standup.",
    "Who created you? What do you look like?"
]

const bardToolPrompt = "You're an expert on relics, mostly because of your "

const bardToolTitles = [
    "ARCANE KNOWLEDGE",
    "PUB TRIVIA",
    "EXPERIENCE",
    "ENTHUSIASM",
    "BIG DREAMS",
    "BAG OF TRICKS"
]

const bardToolStingers = [
    "You've devoted your life to studying relics and magic.",
    "You just know a lot of random, stupid things.",
    "You've been dungeon delving for decades. You're kind of over it, actually.",
    "You don't actually KNOW anything about relics, but a positive attitude goes a long way!",
    "After you bag a few relics, you're going to be a superstar! What is it you want to do?",
    "What have you got in your pocketses? You have a trinket or tool for every occasion."
]

const bardAttributePrompt = "You generally assist your teammates using your "

const bardAttributeTitles = [
    "BEAUTIFUL VOICE",
    "CLEVER LIMERICKS",
    "AWESOME MUSIC",
    "CULINARY GENIUS",
    "BIG IDEAS",
    "LORE"
]

const bardAttributeStingers = [
    "As far as you're concerned, life is a musical.",
    "There once was a wizard from Oz...",
    "What instrument do you play? Can you shred?",
    "Well-fed adventurers are effective adventurers. Food comes first!",
    "Sometimes your ideas are a little over the top, but go big or go home!",
    "You know a little something about everything. Nerd."
]

const bardSpecialTitle = "INSPIRATION"

const bardSpecialStinger = "Whenever you spend your action token, reclaim it at the end of the turn."

const bardNumbers = {
    strength: 1,
    preAssist: 1,
    postAssist: 1,
    specialStrength: 4,
    specialTarget: 'relic'
}

const Cleric = ({ newCharState, dispatchNewCharState }) => {

    useEffect(() => {
        if (newCharState.charClassCode !== 'cc1') {
            dispatchNewCharState(resetDefaultNewChar())
            dispatchNewCharState(setCharClassCode('cc1'))
        }
    }, [])

    // const toggleRaceSelections = () => {
    //     document.getElementById('race-selector').classList.toggle('show')
    // }

    // // Close the dropdown if the user clicks outside of it
    // window.onclick = function (event) {
    //     if (!event.target.matches('.dropbtn')) {
    //         var dropdowns = document.getElementsByClassName("dropdown-content");
    //         var i;
    //         for (i = 0; i < dropdowns.length; i++) {
    //             var openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) {
    //                 openDropdown.classList.remove('show');
    //             }
    //         }
    //     }
    //     if (event.target.matches('.raceName')) {
    //         console.log('clicked on race: ', event.target.innerText)
    //         const charRace = event.target.innerText
    //         dispatchNewCharState(
    //             setCharRace(
    //                 charRace
    //             )
    //         )
    //     }
    // }

    return (
        <div>
            CLERIC TEST PAGE
            


        </div>
    )
}

export { Cleric as default }


// <form id='race-select'>
// <label>{bardRacePrompt}</label>
// <select
//     name='race'
//     id='race-select'
//     required
// >
//     <option value=''>--Select one--</option>
//     <option value='human'>Human</option>
//     <option value='elf'>Elf</option>
//     <option value='dwarf'>Dwarf</option>
//     <option value='gnome'>Gnome</option>
//     <option value='halfling'>Halfling</option>
//     <option value='robot'>Maagical Robot</option>
// </select>
// </form>

// bardBlurb, asA as bardRacePrompt, bardRaceCapTitles, bardRaceRegTitles, bardRaceStingers, bardToolPrompt, bardToolTitles, bardToolStingers, bardAttributePrompt, bardAttributeTitles, bardAttributeStingers, bardSpecialTitle, bardSpecialStinger, bardNumbers, 

// <div className="dropdown">
//                 {newCharState.charRace === 'Elf' ?
//                     asAn
//                     :
//                     asA
//                 }
//                 <button onClick={toggleRaceSelections} className="dropbtn">{newCharState.charRace}</button>
//                 {bardBlurb}

//                 <div id="race-selector" className="dropdown-content">
//                     {bardRaceRegTitles.map((race) => {
//                         return <div className="raceName" key={race}>{race}</div>
//                     })}
//                 </div>
//             </div>