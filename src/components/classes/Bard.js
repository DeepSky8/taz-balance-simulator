import React, { useEffect } from "react";
import { resetDefaultNewChar, setBardSuperGoal, setCharClassCode, setCharRaceCode, setCharToolCode, setHumanBardBand, setRobotBardCreator, setRobotBardVisual } from "../../actions/newCharActions";
import classTransformer from "../functions/classTransformer";
import { charClasses, charClassCodes } from "./default";



const bardBlurb = " bard, you always have an inspiring word or song."

const asA = "As a "
const asAn = "As an "

const bardRaceCodes = [
    'br0',
    'br1',
    'br2',
    'br3',
    'br4',
    'br5',
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

const bardToolCodes = [
    'bt0',
    'bt1',
    'bt2',
    'bt3',
    'bt4',
    'bt5'
]

const bardToolPrompt = "You're an expert on relics, mostly because of your "

const bardToolTitles = [
    "Arcane Knowledge",
    "Pub Trivia",
    "Experience",
    "Enthusiasm",
    "Big Dreams",
    "Bag Of Tricks"
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

const Bard = ({ newCharState, dispatchNewCharState }) => {

    // If the page is being refreshed, 
    // maintain the data stored in the new character state
    // Otherwise treat this as a brand new character (possibly due to 
    // switching from a different character class sheet)
    // and set the character state back to blank
    // before automatically setting the current class code
    useEffect(() => {
        if (newCharState.charClassCode !== 'cc0') {
            dispatchNewCharState(resetDefaultNewChar())
            dispatchNewCharState(setCharClassCode('cc0'))
        }
    }, [])

    // Use the CSS 'show' feature to toggle the race selector open and closed
    const toggleRaceSelections = () => {
        document.getElementById('race-selector').classList.toggle('show')
    }

    const toggleToolSelections = () => {
        document.getElementById('tool-selector').classList.toggle('show')
    }

    // Close the race selector dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    // When the user clicks on one of the available races
    // send that race code to the new character reducer for storage
    const onClickRace = (charRaceCode) => {
        dispatchNewCharState(
            setCharRaceCode(
                charRaceCode
            )
        )
    }

    // When the user clicks on one of the available tools
    // send that tole code to the new character reducer for storage
    const onClickTool = (charToolCode) => {
        dispatchNewCharState(
            setCharToolCode(
                charToolCode
            )
        )
    }



    return (
        <div>
            <div className="dropdown">
                {newCharState.charRaceCode === 'br1' ?
                    asAn
                    :
                    asA
                }
                <button
                    onClick={toggleRaceSelections}
                    className="dropbtn"
                >
                    {classTransformer(bardRaceRegTitles, newCharState.charRaceCode)}
                </button>
                {bardBlurb}

                <div id="race-selector" className="dropdown-content">
                    {bardRaceCodes.map((code) => {
                        return (
                            <div
                                key={code}
                                onClick={() => { onClickRace(code) }}
                            >
                                {classTransformer(bardRaceRegTitles, code)}
                            </div>)
                    })}
                </div>
            </div>


            <div className="bardRaceStingers">
                {newCharState.charRaceCode &&
                    classTransformer(bardRaceStingers, newCharState.charRaceCode)}

                {newCharState.charRaceCode === 'br0' ?
                    <input
                        value={newCharState.humanBardBand}
                        type='text'
                        placeholder='My band is named:'
                        maxLength={30}
                        onChange={(e) => {
                            dispatchNewCharState(
                                setHumanBardBand(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                    :
                    ''
                }
                {newCharState.charRaceCode === 'br5' ?
                    <div>
                        <input
                            value={newCharState.robotBardCreator}
                            type="text"
                            placeholder='Created by:'
                            maxLength={30}
                            onChange={(e) => {
                                dispatchNewCharState(
                                    setRobotBardCreator(
                                        e.target.value.toString()))
                            }}
                        />
                        <input
                            value={newCharState.robotBardVisual}
                            type="text"
                            placeholder='I look like:'
                            maxLength={30}
                            onChange={(e) => {
                                dispatchNewCharState(
                                    setRobotBardVisual(
                                        e.target.value.toString()
                                    )
                                )
                            }}
                        />
                    </div>
                    :
                    ''
                }
            </div>


            <div className="bardTools">
                <div className="dropdown">
                    {bardToolPrompt}
                    <button
                        onClick={toggleToolSelections}
                        className="dropbtn"
                    >
                        {classTransformer(bardToolTitles, newCharState.charToolCode)}
                    </button>

                    <div id="tool-selector" className="dropdown-content">
                        {bardToolCodes.map((code) => {
                            return (
                                <div
                                    key={code}
                                    onClick={() => { onClickTool(code) }}
                                >
                                    {classTransformer(bardToolTitles, code)}
                                </div>)
                        })}
                    </div>
                </div>

            </div>


            <div className="bardToolStingers">
                {newCharState.charToolCode &&
                    classTransformer(bardToolStingers, newCharState.charToolCode)}

                {newCharState.charToolCode === 'bt4' ?
                    <input
                        value={newCharState.bardSuperGoal}
                        type="text"
                        placeholder="Your big goal"
                        maxLength={30}
                        onChange={(e) => {
                            dispatchNewCharState(
                                setBardSuperGoal(
                                    e.target.value.toString()))
                        }}
                    />
                    :
                    ''}
            </div>






        </div>)
}

export { Bard as default }


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