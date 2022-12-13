import React, { useEffect } from "react";
import { auth } from "../../../../firebase/firebase";
import turnStagesArray from "../turnStep/turnStepArrays/turnStagesArray";
import kostcoPairs from "./kostcoPairs";
import KostcoDisplay from "./KostcoDisplay";
import { startUpdateKostcoSelected } from "../../../../actions/cloudActions";
import { classRogue } from "../../CharacterSheet/classes/charInfo";

const KostcoStoreFrame = ({ cloudState, localState }) => {
    const { location, verb, tag, title } = kostcoPairs.store
    // let isRogue = localState.teamCharArray[localState.activeIndex].classCode === classRogue

    useEffect(() => {
        if (
            (localState.kostcoOptions.length > 0)
            &&
            (cloudState.currentTurn.turnStage === turnStagesArray[15])
            &&
            (!localState.teamCharArray[localState.activeIndex].classCode === classRogue)

        ) {
            startUpdateKostcoSelected(localState.hostKey, localState.kostcoOptions[0])
        }
    }, [localState.kostcoOptions])



    const clickToSelect = (selectedKard) => {

        if (
            // If KOSTCO_SELECT phase, the active Rogue player 
            // may select one of the available Kostco options,
            // and store the kard object in the cloud as the selected object.
            (auth.currentUser.uid === cloudState.active.activeUID)
            &&
            (cloudState.currentTurn.turnStage === turnStagesArray[15])
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
                    cloudState.currentTurn.turnStage === turnStagesArray[15]
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
                        />
                    </div>
                )
            }
        </div>

    )
}

export default KostcoStoreFrame