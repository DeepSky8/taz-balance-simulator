import React from "react";
import { auth } from "../../../../firebase/firebase";
import kostcoPairs from "./kostcoPairs";
import KostcoDisplay from "./KostcoDisplay";
import { startNullKostcoOnCharacter, startUpdateKostcoOnCharacter } from "../../../../actions/charActions";
import { useState } from "react";
import { defaultKostcoCardState } from "../../../../reducers/kostcoCardReducer";
import { useEffect } from "react";
import { startClearKostcoCardsOptions, startClearKostcoSelected, startUpdateKostcoCardsOptions } from "../../../../actions/cloudActions";


const KostcoAvailFrame = ({ localState }) => {
    const { location, verb, tag, title } = kostcoPairs.available
    const [kostcoAvail, setKostcoAvail] = useState([defaultKostcoCardState])

    useEffect(() => {
        setKostcoAvail(
            localState
                .kostcoOptions
                .filter(
                    kard => kard.kID !== '0'
                ))
    }, [localState.kostcoOptions])




    const clickToSelect = (selectedKard) => {

        const updatedKostcoArray = [selectedKard]
            .concat(
                localState
                    .teamCharArray[localState.localIndex]
                    .charKostco
                    .filter(kard => kard.kID !== '0')
            )

        if (updatedKostcoArray.length === 0) {
            startNullKostcoOnCharacter(
                auth.currentUser.uid,
                localState.localCharacterID
            )
        } else {
            startUpdateKostcoOnCharacter(
                auth.currentUser.uid,
                localState.localCharacterID,
                updatedKostcoArray
            )
        }



        const updatedKostcoOptions = kostcoAvail
            .filter(kard => kard.kID !== selectedKard.kID)
            .map(kard => kard.kID)

        if (updatedKostcoOptions.length === 0) {
            startClearKostcoCardsOptions(localState.hostKey)
        } else {
            startUpdateKostcoCardsOptions(localState.hostKey, updatedKostcoOptions)
        }

        startClearKostcoSelected(localState.hostKey)
    }

    return (
        <div>
            {
                (kostcoAvail.length > 0)
                &&
                (<div className="kostcoStoreBorder">
                    <h2 className="kStoreTitle">{title}</h2>
                    <span className="kStoreTag">{tag}</span>
                    <KostcoDisplay
                        location={location}
                        verb={verb}
                        clickToSelect={clickToSelect}
                        canSelect={true}
                        kostcoArray={
                            kostcoAvail
                        }
                    />
                </div>)

            }
        </div>

    )
}

export default KostcoAvailFrame