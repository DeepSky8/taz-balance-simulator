import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import {
  clearKard,
  startNewKard,
} from "../../../../actions/kostcoActions";
import { defaultKostcoCardState, kostcoCardReducer } from "../../../../reducers/kostcoCardReducer";
import KostcoFlags from "./KostcoFlags";
import KostcoText from "./KostcoText";

const NewKostco = () => {
  const [kardState, dispatchKardState] = useReducer(kostcoCardReducer, defaultKostcoCardState)

  const updateKard = () => { }

  const saveKard = () => {
    startNewKard(kardState)
    dispatchKardState(clearKard())
  }

  return (
    <div>
      <Link to='/kostcoUpdates'>Search Kostco cards</Link>
      <div className="kostcoFlexContainer">
        <KostcoText
          reducer={kardState}
          dispatchReducer={dispatchKardState}
          updateKard={updateKard}
          ident={'new'}
        />
        <KostcoFlags
          reducer={kardState}
          dispatchReducer={dispatchKardState}
          updateKard={updateKard}
          ident={'new'}
        />
      </div>



      <button onClick={() => { saveKard() }}>Save Kostco Card</button>
    </div>
  )
}

export default NewKostco
