import React from "react";
import { defaultKostcoCardState } from "../../../../reducers/kostcoCardReducer";

const KostcoCard = ({
    kard = defaultKostcoCardState,
    canSelect,
    clickToSelect,
    verb,
    selectedKard = defaultKostcoCardState
}) => {
    const noText = '-none-'
    const clickToSelectText = `Click to ${verb} ${kard.kTitle}`
    const kardSelected = selectedKard.kID === kard.kID
    const kardSelectedText = `${selectedKard.kTitle} selected`


    return (
        <div className="kKardBorder">
            <div className="kGrid">

                {
                    canSelect
                    &&
                    <button
                        className="kTitle"
                        onClick={() => { clickToSelect(kard) }}
                    >
                        {kardSelected ? kardSelectedText : clickToSelectText}
                    </button>
                }

                {
                    !canSelect
                    &&
                    <h3 className="kTitle">{kard.kTitle}</h3>
                }

                <p className="kKardOngoingTitle">Ongoing Effect: </p>
                {(kard.kOngoing.length > 0)
                    ?
                    (<p className="kKardOngoingEffect">{kard.kOngoing}</p>)
                    :
                    (<p className="kNoOngoingEffect">{noText}</p>)
                }


                <p className="kKardOneshotTitle">Discard for effect: </p>
                {(kard.kOneshot.length > 0)
                    ?
                    (<p className="kKardOneshotEffect">{kard.kOneshot}</p>)
                    :
                    (<p className="kNoOneshotEffect">{noText}</p>)
                }

                <p className="kFlavor">{kard.kFlavor}</p>

            </div>
        </div>

    )
}

export default KostcoCard

// <h3 className="kTitle">{kard.kTitle}</h3>