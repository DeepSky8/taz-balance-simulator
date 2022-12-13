import React from "react";
import turnStagesArray from "../turnStep/turnStepArrays/turnStagesArray";
import KostcoAvailFrame from "./KostcoAvailFrame";
import KostcoStoreFrame from "./KostcoStoreFrame";

const KostcoPool = ({ cloudState, localState }) => {

    return (
        <div>
            {
                (cloudState.currentTurn.turnStage === turnStagesArray[15])
                &&
                <KostcoStoreFrame
                    cloudState={cloudState}
                    localState={localState}
                />
            }

            {
                (cloudState.currentTurn.turnStage === turnStagesArray[16])
                &&
                <KostcoAvailFrame
                    localState={localState}
                />
            }
        </div>
    )
}

export default KostcoPool