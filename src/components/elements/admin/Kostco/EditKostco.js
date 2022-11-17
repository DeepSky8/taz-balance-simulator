import React, { useEffect, useReducer } from "react";
import {
  receiveKard,
  startRemoveKard,
  startUpdateKard
} from "../../../../actions/kostcoActions";
import { defaultKostcoCardState, kostcoCardReducer } from "../../../../reducers/kostcoCardReducer";
import KostcoFlags from "./KostcoFlags";
import KostcoText from "./KostcoText";

const EditKostco = ({ kard }) => {
  const [kardState, dispatchKardState] = useReducer(kostcoCardReducer, defaultKostcoCardState)

  useEffect(() => {
    dispatchKardState(receiveKard(kard))
  }, [kard])

  const updateKard = () => {
    startUpdateKard(kardState, kardState.kID)
  }

  const removeKard = () => {
    startRemoveKard(kardState.kID)
  }

  return (
    <div className="kostcoEditBorder">
      <div>
        Card ID: {kardState.kID}
        <div className="kostcoFlexContainer">
          <KostcoText
            // className="kostcoFlexContainer"
            reducer={kardState}
            dispatchReducer={dispatchKardState}
            updateKard={updateKard}
            ident={kardState.kID}
          />

          <KostcoFlags
            // className="kostcoFlexContainer"
            reducer={kardState}
            dispatchReducer={dispatchKardState}
            updateKard={updateKard}
            ident={kardState.kID}
          />
        </div>

        <button onClick={() => { removeKard() }}>Remove Kostco card</button>
      </div>


    </div>
  )
}

export default EditKostco



// <div>
// <label htmlFor="kTitle">Title: </label>
// <div>
//   <input
//     type='text'
//     id="kTitle"
//     placeholder="Kostco card title"
//     size={
//       kardState.kTitle.length > 20
//         ?
//         kardState.kTitle.length
//         :
//         20
//     }
//     value={kardState.kTitle}
//     onChange={(e) => {
//       dispatchKardState(kTitle(e.target.value))
//     }}
//     onBlur={() => { updateKard() }}
//   />
// </div>

// {(activeTextBox === 'kOngoing' || kardState.kOngoing.length > lengthCompare) &&
// <span>
//   <label htmlFor="kOngoingBig">Ongoing: </label>
//   <div>
//     <textarea
//       type='text'
//       id="kOngoingBig"
//       placeholder="Ongoing Effect"
//       rows='4'
//       cols='40'
//       value={kardState.kOngoing}
//       onChange={(e) => {
//         dispatchKardState(kOngoing(e.target.value))
//       }}
//       onBlur={() => { setActiveTextBox(''); updateKard() }}
//     />
//   </div>

// </span>
// }

// {(activeTextBox !== 'kOngoing' && kardState.kOngoing.length <= lengthCompare) &&
// <span>
//   <label htmlFor="kOngoingSmall">Ongoing: </label>
//   <div>
//     <input
//       type='text'
//       id="kOngoingSmall"
//       placeholder="Ongoing Effect"
//       value={kardState.kOngoing}
//       onChange={(e) => {
//         dispatchKardState(kOngoing(e.target.value))
//       }}
//       onBlur={() => { setActiveTextBox(''); updateKard() }}
//     />
//   </div>

// </span>
// }


//   <label htmlFor="kOneshot">Oneshot: </label>
//   <input
//     type='text'
//     id="kOneshot"
//     placeholder="Oneshot Effect"
//     value={kardState.kOneshot}
//     onChange={(e) => {
//       dispatchKardState(kOneshot(e.target.value))
//     }}
//     onBlur={() => { updateKard() }}
//   />

//   <label htmlFor="kFlavor">Flavor: </label>
//   <input
//     type='text'
//     id="kFlavor"
//     placeholder="Flavor Text"
//     value={kardState.kFlavor}
//     onChange={(e) => {
//       dispatchKardState(kFlavor(e.target.value))
//     }}
//     onBlur={() => { updateKard() }}
//   />

// </div>