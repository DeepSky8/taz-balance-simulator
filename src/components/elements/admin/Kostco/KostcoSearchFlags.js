import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
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
  const g = 'g'
  const t = 't'
  const newKard = 'new'

  const [flagDisplay, setFlagDisplay] = useState(
    // (ident !== newKard && reducer.kOngoing.length === 0)
    //   ?
    //   t
    //   :
      g
  )

  return (
    <div>
      <span>

        <button
          disabled={flagDisplay === g}
          onClick={() => {
            setFlagDisplay(g);
            // setSpecialDisplay(reducer.g.special) 
          }}
        >View Ongoing
        </button>

        <button
          disabled={flagDisplay === t}
          onClick={() => {
            setFlagDisplay(t);
            // setSpecialDisplay(reducer.t.special) 
          }}
        >View Oneshot
        </button>

        {flagDisplay === g &&
          <span>
            <input
              id={'special' + g + ident}
              type='checkbox'
              checked={reducer.g.special}
              onChange={() => {
                // if (flagDisplay === oneshot) {
                //   dispatchReducer(kSpecial(t))
                // } else if (flagDisplay === ongoing) {
                //   dispatchReducer(kSpecial(g))
                // }
                dispatchReducer(kSpecial(g))
              }}
              onBlur={() => { updateKard() }}
            />
            <label htmlFor={'special' + g + ident}>One-off</label>
          </span>
        }

        {flagDisplay === t &&
          <span>
            <input
              id={'special' + t + ident}
              type='checkbox'
              checked={reducer.t.special}
              onChange={() => {
                // if (flagDisplay === oneshot) {
                //   dispatchReducer(kSpecial(t))
                // } else if (flagDisplay === ongoing) {
                //   dispatchReducer(kSpecial(g))
                // }
                dispatchReducer(kSpecial(t))
              }}
              onBlur={() => { updateKard() }}
            />
            <label htmlFor={'special' + t + ident}>One-off</label>
          </span>
        }


      </span>

      {flagDisplay === g &&

        <FlagFrame
          reducer={reducer.g}
          dispatchReducer={dispatchReducer}
          updateKard={updateKard}
          ident={ident}
          flagType={g}
        />
      }

      {flagDisplay === t &&

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


