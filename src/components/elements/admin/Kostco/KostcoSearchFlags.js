import React from "react";
import { useState } from "react";
import {
  kSearchOneshotFlags,
  kSearchOngoingFlags,
  kSpecial
} from "../../../../actions/kostcoActions";
import FlagFrame from "./FlagFrame";

const KostcoSearchFlags = (
  {
    reducer,
    dispatchReducer,
    updateKard,
    ident
  }
) => {
  const ongoing = 'ongoing'
  const oneshot = 'oneshot'
  const g = 'g'
  const t = 't'
  const newKard = 'new'

  const [flagDisplay, setFlagDisplay] = useState(
    (ident !== newKard && reducer.kOngoing.length === 0)
      ?
      oneshot
      :
      ongoing
  )

  const [specialDisplay, setSpecialDisplay] = useState(
    (
      flagDisplay === oneshot
      &&
      reducer.t.special
    )
      ?
      true
      :
      (
        flagDisplay === ongoing
        &&
        reducer.g.special
      )
        ?
        true
        :
        false
  )




  return (
    <div>
      <span>

        <button
          disabled={flagDisplay === ongoing}
          onClick={() => { setFlagDisplay(ongoing) }}
        >View Ongoing
        </button>

        <button
          disabled={flagDisplay === oneshot}
          onClick={() => { setFlagDisplay(oneshot) }}
        >View Oneshot
        </button>

        <input
          id={'special' + flagDisplay + ident}
          type='checkbox'
          value={specialDisplay}
          onChange={() => {
            if (flagDisplay === oneshot) {
              dispatchReducer(kSpecial(t))
            } else if (flagDisplay === ongoing) {
              dispatchReducer(kSpecial(g))
            }
            // dispatchReducer(kSpecial(flagType))
          }}
          onBlur={() => { updateKard() }}
        />
        <label htmlFor={'special' + flagDisplay + ident}>One-off</label>


      </span>

      {flagDisplay === ongoing &&

        <FlagFrame
          reducer={reducer.g}
          dispatchReducer={dispatchReducer}
          updateKard={updateKard}
          ident={ident}
          flagType={g}
        />
      }

      {flagDisplay === oneshot &&

        <FlagFrame
          reducer={reducer.t}
          dispatchReducer={dispatchReducer}
          updateKard={updateKard}
          ident={ident}
          flagType={t}
        />
      }


    </div>
  )
}

export default KostcoSearchFlags


