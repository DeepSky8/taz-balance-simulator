import React, { useEffect } from "react";
import { auth } from "../../../../firebase/firebase";
import kostcoPairs from "./kostcoPairs";
import KostcoDisplay from "./KostcoDisplay";
import { startUpdateKostcoSelected } from "../../../../actions/cloudActions";
import { classRogue } from "../../CharacterSheet/classes/charInfo";
import turnStage from "../turnStep/turnStepArrays/turnStage";

const KostcoStoreFrame = ({ cloudState, localState }) => {
    const { location, verb, tag, title } = kostcoPairs.store

    useEffect(() => {
        if (
            (localState.kostcoOptions.length > 0)
            &&
            (
                [
                    turnStage.describeSceneTwo,
                    turnStage.kostcoBuy
                ]
                    .includes(cloudState.currentTurn.turnStage)
            )
            &&
            (localState.teamCharArray[localState.activeIndex].classCode !== classRogue)

        ) {
            startUpdateKostcoSelected(localState.hostKey, localState.kostcoOptions[0])

        }
    },
        [
            // cloudState.currentTurn.turnStage,
            localState.kostcoOptions
        ]
    )

    const clickToSelect = (selectedKard) => {

        if (
            // If KOSTCO_SELECT phase, the active Rogue player 
            // may select one of the available Kostco options,
            // and store the kard object in the cloud as the selected object.
            (auth.currentUser.uid === cloudState.active.activeUID)
            &&
            (turnStage.kostcoBuy === cloudState.currentTurn.turnStage)
            &&
            (localState.teamCharArray[localState.activeIndex].classCode === classRogue)
        ) {
            startUpdateKostcoSelected(localState.hostKey, selectedKard)
        }
    }

    return (
        <div>
            {
                (
                    turnStage.kostcoBuy === cloudState.currentTurn.turnStage
                    &&
                    localState
                        .kostcoOptions
                        //.filter(kard => kard.kID !== '0')
                        .length > 0
                )
                &&
                (
                    <div className="kostcoStoreBorder">
                        <h2 className="kStoreTitle">{title}</h2>
                        <span className="kStoreTag">{tag}</span>
                        <KostcoDisplay
                            location={location}
                            verb={verb}
                            clickToSelect={clickToSelect}
                            canSelect={localState.teamCharArray[localState.activeIndex].classCode === classRogue}
                            kostcoArray={
                                localState
                                    .kostcoOptions
                                // .filter(kard => kard.kID !== '0')
                            }
                            selected={cloudState.kostco.selected}
                        />
                    </div>
                )
            }
        </div>

    )
}

export default KostcoStoreFrame