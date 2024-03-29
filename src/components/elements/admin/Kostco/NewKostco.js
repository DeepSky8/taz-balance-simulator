import React, { useReducer } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  clearKard,
  startNewKard,
} from "../../../../actions/kostcoActions";
import { defaultKostcoCardState, kostcoCardReducer } from "../../../../reducers/kostcoCardReducer";
import KostcoSearchFlags from "./KostcoSearchFlags";
import KostcoText from "./KostcoText";

const NewKostco = () => {
  const [kardState, dispatchKardState] = useReducer(kostcoCardReducer, defaultKostcoCardState)
  const [textEffect, setTextEffect] = useState(false)
  const ident = 'new'
  const updateKard = () => { }

  const saveKard = () => {
    startNewKard(kardState)
    dispatchKardState(clearKard())
    setTextEffect(!textEffect)
    document.getElementById('kTitlenew').focus({ focusVisible: true })
  }

  return (
    <div>
      <Link to='/kostcoUpdates'>Search Kostco cards</Link>
      <div className="kostcoFlexContainer">
        <KostcoText
          reducer={kardState}
          dispatchReducer={dispatchKardState}
          updateKard={updateKard}
          ident={ident}
          textReset={textEffect}
        />
        <KostcoSearchFlags
          reducer={kardState}
          dispatchReducer={dispatchKardState}
          updateKard={updateKard}
          ident={ident}
        />
      </div>



      <button onClick={() => { saveKard() }}>Save Kostco Card</button>
    </div>
  )
}

export default NewKostco
