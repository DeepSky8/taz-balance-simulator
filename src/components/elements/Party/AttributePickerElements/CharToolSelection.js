// import React from "react";
// import classTransformer from "../../../functions/classTransformer";
// import {     
//     bardToolCodes,
//     bardToolPrompt,
//     bardToolTitles 
// } from "../../../classes/bardInfo";

// const CharToolsSelection = ({ charState, toggleToolSelections, onClickTool}) => (
//     <div className="bardTools">
//     <div className='pleaseChooseAlert'>
//         {charState.showAlerts &&
//             !charState.charToolCode &&
//             'Please make a selection'
//         }
//     </div>
//     <div className="dropdown">
//         {bardToolPrompt}
//         <button
//             onClick={toggleToolSelections}
//             className="dropbtn"
//         >
//             {classTransformer(bardToolTitles, charState.charToolCode)}
//         </button>

//         <div id="tool-selector" className="dropdown-content">
//             <div className="questionHeader">{bardToolPrompt + '...'}</div>
//             {bardToolCodes.map((code) => {
//                 return (
//                     <div
//                         key={code}
//                         onClick={() => { onClickTool(code) }}
//                     >
//                         {classTransformer(bardToolTitles, code)}
//                     </div>)
//             })}
//         </div>
//     </div>
// </div>

// )

// export default CharToolsSelection