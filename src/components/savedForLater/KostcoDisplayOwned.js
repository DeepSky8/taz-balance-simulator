import React from "react";
import KostcoCard from "../elements/ActiveGame/kostco/KostcoCard";

const KostcoDisplayOwned = ({ kostcoKardArray, canSelect, clickToSelect }) => {
    const verb = `give away`
    const filteredArray = kostcoKardArray.filter(kard => kard.kID !== '0')

    return (
        <div>
            {filteredArray.map(kard => {
                return (
                    <KostcoCard
                        key={kard.kID}
                        kard={kard}
                        canSelect={canSelect}
                        clickToSelect={clickToSelect}
                        verb={verb}
                    />
                )
            })}
        </div>
    )
}

export default KostcoDisplayOwned