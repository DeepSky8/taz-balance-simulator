// import React from "react";
// import {
//     bardAttributePrompt,
//     bardAttributeTitles,
//     bardAttributeCodes
// } from "../../../classes/bardInfo";
// import classTransformer from "../../../functions/classTransformer";

// const CharAttributes = ({ charState, toggleAttributeSelections, onClickAttribute }) => (
//     <div className="charAttributes">
//         <div className='pleaseChooseAlert'>
//             {charState.showAlerts &&
//                 !charState.charAttributeCode &&
//                 'Please make a selection'}
//         </div>
//         <div className="dropdown">
//             {bardAttributePrompt}
//             <button
//                 onClick={toggleAttributeSelections}
//                 className="dropbtn"
//             >
//                 {classTransformer(
//                     bardAttributeTitles, charState.charAttributeCode
//                 )}
//             </button>

//             <div id="attribute-selector" className="dropdown-content">
//                 <div className="questionHeader">{bardAttributePrompt + '...'}</div>
//                 {bardAttributeCodes.map((code) => {
//                     return (
//                         <div
//                             key={code}
//                             onClick={() => { onClickAttribute(code) }}
//                         >
//                             {classTransformer(bardAttributeTitles, code)}
//                         </div>)
//                 })}
//             </div>
//         </div>
//     </div>
// )

// export default CharAttributes