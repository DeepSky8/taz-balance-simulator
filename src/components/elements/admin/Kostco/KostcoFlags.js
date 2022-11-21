import React from "react";
import { useState } from "react";
import FlagFrame from "./FlagFrame";

const KostcoFlags = (
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

  return (
    <div>
      <span>
        <button
          disabled={flagDisplay === ongoing}
          onClick={() => { setFlagDisplay(ongoing) }}
        >Switch to Ongoing
        </button>
        <button
          disabled={flagDisplay === oneshot}
          onClick={() => { setFlagDisplay(oneshot) }}
        >Switch to Oneshot
        </button>
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

export default KostcoFlags