import React from "react";
import turnStage from "../turnStep/turnStepArrays/turnStage";
import KostcoAvailFrame from "./KostcoAvailFrame";
import KostcoStoreFrame from "./KostcoStoreFrame";

const KostcoPool = ({ cloudState, localState }) => {

    return (
        <div>
            {
                (cloudState.currentTurn.turnStage === turnStage.kostcoBuy)
                &&
                <KostcoStoreFrame
                    cloudState={cloudState}
                    localState={localState}
                />
            }

            {
                (cloudState.currentTurn.turnStage === turnStage.kostcoGive)
                &&
                <KostcoAvailFrame
                    localState={localState}
                />
            }
        </div>
    )
}

export default KostcoPool