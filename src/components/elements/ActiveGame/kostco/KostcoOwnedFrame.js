import React from "react";
import { startNullKostcoOnCharacter, startUpdateKostcoOnCharacter } from "../../../../actions/charActions";
import { startUpdateKostcoCardsOptions } from "../../../../actions/cloudActions";
import { auth } from "../../../../firebase/firebase";
import { defaultKostcoCardState } from "../../../../reducers/kostcoCardReducer";
import turnStage from "../turnStep/turnStepArrays/turnStage";
import KostcoDisplay from "./KostcoDisplay";
import kostcoPairs from "./kostcoPairs";

const KostcoOwnedFrame = ({ cloudState, localState, charState }) => {
    const { location, verb, tag, title } = kostcoPairs.owned
    const charPossessive = `${charState.charName}'s `
    const canSelect = (
        (cloudState
            .currentTurn
            .turnStage === turnStage.kostcoGive)
        &&
        (localState.localCharacterID === charState.charID)
    )
    let tempKostcoArray = charState.charKostco.filter(kard => kard.kID !== '0')

    const clickToSelect = (selectedKard) => {
        if (
            cloudState.currentTurn.turnStage === turnStage.kostcoGive
        ) {

            const updatedKostcoOptions = localState
                .kostcoOptions
                .filter(kard => kard.kID !== '0')
                .concat(selectedKard)
                .map(kard => kard.kID)

            const updatedKostcoSet = [...new Set(updatedKostcoOptions)]

            startUpdateKostcoCardsOptions(localState.hostKey, updatedKostcoSet)


            const updatedKostcoArray = tempKostcoArray
                .filter(kard => kard.kID !== selectedKard.kID)

            if (updatedKostcoArray.length > 0) {
                startUpdateKostcoOnCharacter(
                    auth.currentUser.uid,
                    localState.localCharacterID,
                    updatedKostcoArray
                )

            } else {
                startNullKostcoOnCharacter(
                    auth.currentUser.uid,
                    localState.localCharacterID,
                )
            }


        }

    }

    return (
        <div>
            {
                (
                    tempKostcoArray.length > 0
                )
                &&
                (
                    <div className="kostcoStoreBorder">
                        <h2 className="kStoreTitle">{charPossessive + title}</h2>
                        <span className="kStoreTag">{tag}</span>
                        <KostcoDisplay
                            location={location}
                            verb={verb}
                            canSelect={canSelect}
                            clickToSelect={clickToSelect}
                            kostcoArray={tempKostcoArray}
                            selected={defaultKostcoCardState}
                        />
                    </div>
                )
            }

        </div>
    )
}

export default KostcoOwnedFrame

// Loot Points: {charState.lootPoints}