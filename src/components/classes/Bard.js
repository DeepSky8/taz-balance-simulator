// import React, { useEffect } from "react";
// import {
//     setBardInstrument,
//     setBardMusicSkill,
//     setBardSuperGoal,
//     setCharAttributeCode,
//     setCharClassCode,
//     setCharName,
//     setCharRaceCode,
//     setCharSpecialCode,
//     setCharToolCode,
//     setHumanBardBand,
//     setRobotBardCreator,
//     setRobotBardVisual,
//     setNoCurrentChar
// } from "../../actions/charActions";
// import {
//     bardBlurb,

//     bardRaceCodes,
//     bardRaceRegTitles,
//     bardRaceStingers,
//     bardToolCodes,
//     bardToolPrompt,
//     bardToolTitles,
//     bardToolStingers,
//     bardAttributeCodes,
//     bardAttributePrompt,
//     bardAttributeStingers,
//     bardAttributeTitles,
//     bardSpecialTitle,
//     bardSpecialStinger,
//     bardNumbers
// } from './bardInfo'
// import classTransformer from "../functions/classTransformer";
// import { charClasses, charClassCodes } from "./default";
// import { asA, asAn } from "./default";


// const Bard = ({ charState, dispatchCharState }) => {

//     // If the page is being refreshed or a character is being edited, 
//     // maintain the data stored in the character state
//     // Otherwise treat this as a brand new character (possibly due to 
//     // switching from a different character class sheet)
//     // and set the character state back to blank
//     // before automatically setting the current class code
//     useEffect(() => {
//         if (charState.charClassCode !== 'cc0' && charState.changeClass) {
//             dispatchCharState(setNoCurrentChar())
//             dispatchCharState(setCharClassCode('cc0'))
//             dispatchCharState(setCharSpecialCode('bs0'))
//         }
//     }, [])

//     // Use the CSS 'show' feature to toggle the race selector open and closed
//     const toggleRaceSelections = () => {
//         document.getElementById('race-selector').classList.toggle('show')
//     }

//     const toggleToolSelections = () => {
//         document.getElementById('tool-selector').classList.toggle('show')
//     }

//     const toggleAttributeSelections = () => {
//         document.getElementById('attribute-selector').classList.toggle('show')
//     }

//     // Close the race selector dropdown if the user clicks outside of it
//     window.onclick = function (event) {
//         if (!event.target.matches('.dropbtn')) {
//             var dropdowns = document.getElementsByClassName("dropdown-content");
//             var i;
//             for (i = 0; i < dropdowns.length; i++) {
//                 var openDropdown = dropdowns[i];
//                 if (openDropdown.classList.contains('show')) {
//                     openDropdown.classList.remove('show');
//                 }
//             }
//         }
//     }

//     // When the user clicks on one of the available races
//     // send that code to the new character reducer for storage
//     const onClickRace = (charRaceCode) => {
//         dispatchCharState(
//             setCharRaceCode(
//                 charRaceCode
//             )
//         )
//     }

//     // When the user clicks on one of the available tools
//     // send that code to the new character reducer for storage
//     const onClickTool = (charToolCode) => {
//         dispatchCharState(
//             setCharToolCode(
//                 charToolCode
//             )
//         )
//     }

//     // When the user clicks on one of the available attributes
//     // send that code to the new character reducer for storage
//     const onClickAttribute = (charAttributeCode) => {
//         dispatchCharState(
//             setCharAttributeCode(
//                 charAttributeCode
//             )
//         )
//     }



//     return (
//         <div>
//             <div className="nameDisplay">
//                 {!charState.changeClass &&
//                     <h4>{charState.charName}, {charState.charTitle}</h4>
//                 }
//             </div>
//             <div className="raceSelection">
//                 <div className='pleaseChooseAlert'>
//                     {charState.showAlerts &&
//                         !charState.charRaceCode &&
//                         'Please make a selection'}
//                 </div>
//                 <div className="dropdown">
//                     {charState.charRaceCode === 'br1' ?
//                         asAn
//                         :
//                         asA
//                     }
//                     <button
//                         onClick={toggleRaceSelections}
//                         className="dropbtn"
//                     >
//                         {classTransformer(bardRaceRegTitles, charState.charRaceCode)}
//                     </button>
//                     {bardBlurb}

//                     <div className="contentWrapper">
//                         <div id="race-selector" className="dropdown-content">
//                             <div className="questionHeader">{asA + '...' + bardBlurb}
//                                 <div className="reminderText">{'(choose one)'}</div>

//                             </div>

//                             {bardRaceCodes.map((code) => {
//                                 return (
//                                     <div
//                                         key={code}
//                                         onClick={() => { onClickRace(code) }}
//                                     >
//                                         {classTransformer(bardRaceRegTitles, code)}
//                                     </div>)
//                             })}
//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <div className="bardRaceStingers">
//                 {charState.charRaceCode &&
//                     classTransformer(bardRaceStingers, charState.charRaceCode)}

//                 {charState.charRaceCode === 'br0' ?
//                     <input
//                         value={charState.humanBardBand}
//                         type='text'
//                         placeholder='My band is named:'
//                         maxLength={30}
//                         onChange={(e) => {
//                             dispatchCharState(
//                                 setHumanBardBand(
//                                     e.target.value.toString()
//                                 )
//                             )
//                         }}
//                     />
//                     :
//                     ''
//                 }
//                 {charState.charRaceCode === 'br5' ?
//                     <div>
//                         <input
//                             value={charState.robotBardCreator}
//                             type="text"
//                             placeholder='Created by:'
//                             maxLength={30}
//                             onChange={(e) => {
//                                 dispatchCharState(
//                                     setRobotBardCreator(
//                                         e.target.value.toString()))
//                             }}
//                         />
//                         <input
//                             value={charState.robotBardVisual}
//                             type="text"
//                             placeholder='I look like:'
//                             maxLength={30}
//                             onChange={(e) => {
//                                 dispatchCharState(
//                                     setRobotBardVisual(
//                                         e.target.value.toString()
//                                     )
//                                 )
//                             }}
//                         />
//                     </div>
//                     :
//                     ''
//                 }
//             </div>

//             <div className="bardTools">
//                 <div className='pleaseChooseAlert'>
//                     {charState.showAlerts &&
//                         !charState.charToolCode &&
//                         'Please make a selection'
//                     }
//                 </div>
//                 <div className="dropdown">
//                     {bardToolPrompt}
//                     <button
//                         onClick={toggleToolSelections}
//                         className="dropbtn"
//                     >
//                         {classTransformer(bardToolTitles, charState.charToolCode)}
//                     </button>

//                     <div id="tool-selector" className="dropdown-content">
//                         <div className="questionHeader">{bardToolPrompt + '...'}</div>
//                         {bardToolCodes.map((code) => {
//                             return (
//                                 <div
//                                     key={code}
//                                     onClick={() => { onClickTool(code) }}
//                                 >
//                                     {classTransformer(bardToolTitles, code)}
//                                 </div>)
//                         })}
//                     </div>
//                 </div>
//             </div>

//             <div className="bardToolStingers">
//                 {charState.charToolCode &&
//                     classTransformer(bardToolStingers, charState.charToolCode)}

//                 {charState.charToolCode === 'bt4' ?
//                     <input
//                         value={charState.bardSuperGoal}
//                         type="text"
//                         placeholder="Your big goal"
//                         maxLength={30}
//                         onChange={(e) => {
//                             dispatchCharState(
//                                 setBardSuperGoal(
//                                     e.target.value.toString()))
//                         }}
//                     />
//                     :
//                     ''}
//             </div>

//             <div className="bardAttributes">
//                 <div className='pleaseChooseAlert'>
//                     {charState.showAlerts &&
//                         !charState.charAttributeCode &&
//                         'Please make a selection'}
//                 </div>
//                 <div className="dropdown">
//                     {bardAttributePrompt}
//                     <button
//                         onClick={toggleAttributeSelections}
//                         className="dropbtn"
//                     >
//                         {classTransformer(
//                             bardAttributeTitles, charState.charAttributeCode
//                         )}
//                     </button>

//                     <div id="attribute-selector" className="dropdown-content">
//                         <div className="questionHeader">{bardAttributePrompt + '...'}</div>
//                         {bardAttributeCodes.map((code) => {
//                             return (
//                                 <div
//                                     key={code}
//                                     onClick={() => { onClickAttribute(code) }}
//                                 >
//                                     {classTransformer(bardAttributeTitles, code)}
//                                 </div>)
//                         })}
//                     </div>
//                 </div>
//             </div>

//             <div className="bardAttributeStingers">
//                 {charState.charAttributeCode &&
//                     classTransformer(bardAttributeStingers, charState.charAttributeCode)}

//                 <div>
//                     {charState.charAttributeCode === 'ba2' ?
//                         <input
//                             value={charState.bardInstrument}
//                             type="text"
//                             placeholder="What do you play?"
//                             maxLength={30}
//                             onChange={(e) => {
//                                 dispatchCharState(
//                                     setBardInstrument(
//                                         e.target.value.toString())
//                                 )
//                             }}
//                         />
//                         :
//                         ''}
//                     {charState.charAttributeCode === 'ba2' ?
//                         <input
//                             value={charState.bardMusicSkill}
//                             type="text"
//                             placeholder="Scale of 1-10"
//                             maxLength={30}
//                             onChange={(e) => {
//                                 dispatchCharState(
//                                     setBardMusicSkill(
//                                         e.target.value.toString()
//                                     )
//                                 )
//                             }}
//                         />
//                         :
//                         ''}
//                 </div>
//             </div>

//             <div className="enterName">
//                 <label>Character Name: </label>
//                 <input
//                     value={charState.charName}
//                     type='text'
//                     placeholder='My character is named'
//                     maxLength={15}
//                     onChange={(e) => {
//                         dispatchCharState(
//                             setCharName(
//                                 e.target.value.toString()
//                             )
//                         )
//                     }}
//                 />
//             </div>

//             <div className="specialAbility">
//                 <div>{bardSpecialTitle + ':'}</div>
//                 <div>{bardSpecialStinger}</div>
//             </div>

//             <div className="stats">
//                 <div>{'Strength against Challenges: ' + bardNumbers.strength}</div>
//                 <div>{'Strength against Relic Challenges: ' + bardNumbers.specialStrength}</div>
//                 <div>{'Assist BEFORE die roll: ' + bardNumbers.preAssist}</div>
//                 <div>{'Assist AFTER die roll: ' + bardNumbers.postAssist}</div>
//             </div>


//         </div>)
// }

// export { Bard as default }


// // <form id='race-select'>
// // <label>{bardRacePrompt}</label>
// // <select
// //     name='race'
// //     id='race-select'
// //     required
// // >
// //     <option value=''>--Select one--</option>
// //     <option value='human'>Human</option>
// //     <option value='elf'>Elf</option>
// //     <option value='dwarf'>Dwarf</option>
// //     <option value='gnome'>Gnome</option>
// //     <option value='halfling'>Halfling</option>
// //     <option value='robot'>Maagical Robot</option>
// // </select>
// // </form>

// // bardBlurb, asA as bardRacePrompt, bardRaceCapTitles, bardRaceRegTitles, bardRaceStingers, bardToolPrompt, bardToolTitles, bardToolStingers, bardAttributePrompt, bardAttributeTitles, bardAttributeStingers, bardSpecialTitle, bardSpecialStinger, bardNumbers,