import React, { useState } from "react";
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
  const searchKard = 'search'

  const [flagDisplay, setFlagDisplay] = useState(
    // ((ident === newKard) || (ident === searchKard))
    //   ?
    //   g
    //   :
    //   (reducer.kOngoing.length > 0)
    //     ?
    //     g
    //     :
    //     t
    g
  )

  return (
    <div>
      <span>

        <button
          className='kostcoTabBlue'
          disabled={flagDisplay === g}
          onClick={() => {
            setFlagDisplay(g);
            // setSpecialDisplay(reducer.g.special) 
          }}
        >Ongoing
        </button>

        <button
          className='kostcoTabGreen'
          disabled={flagDisplay === t}
          onClick={() => {
            setFlagDisplay(t);
            // setSpecialDisplay(reducer.t.special) 
          }}
        >Oneshot
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
        <div className="kostcoFlexContainer">

          <div className='kostcoFlagBlue'>
            <FlagFrame

              reducer={reducer.g}
              dispatchReducer={dispatchReducer}
              updateKard={updateKard}
              ident={ident}
              flagType={g}
            />
          </div>

        </div>

      }

      {flagDisplay === t &&
        <div className="kostcoFlexContainer">

          <div className='kostcoFlagGreen'>
            <FlagFrame

              reducer={reducer.t}
              dispatchReducer={dispatchReducer}
              updateKard={updateKard}
              ident={ident}
              flagType={t}
            />
          </div>

        </div>

      }


    </div>
  )
}

export default KostcoSearchFlags


