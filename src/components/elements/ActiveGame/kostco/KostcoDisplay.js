import React from "react";
import KostcoCard from "./KostcoCard";
import kostcoPairs from "./kostcoPairs";

const KostcoDisplay = ({ canSelect, clickToSelect, kostcoArray, location, verb }) => {

    return (
        <div>
            {
                (
                    location === kostcoPairs.store.location
                )
                &&
                (
                    <span className="kKardDisplay">
                        <KostcoCard
                            kard={kostcoArray[0]}
                            canSelect={canSelect}
                            clickToSelect={clickToSelect}
                            verb={verb}
                        />
                        {
                            canSelect
                            &&
                            <KostcoCard
                                kard={kostcoArray[1]}
                                canSelect={canSelect}
                                clickToSelect={clickToSelect}
                                verb={verb}
                            />
                        }

                    </span>
                )
            }

            {
                (
                    ([kostcoPairs.owned.location, kostcoPairs.available.location].includes(location))
                    &&
                    (kostcoArray.length > 0)
                )
                &&
                (
                    <span className="kKardDisplay">
                        {kostcoArray.map(kard => {
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
                    </span>
                )
            }

        </div>



    )
}

export default KostcoDisplay

// {localState.teamCharArray[localState.activeIndex].classCode === classRogue
//     &&
//     <KostcoCard
//         kard={localState.kostcoOptions[1]}
//     />
// }


//     const filteredArray = kostcoKardArray.filter(kard => { kard.kID !== '0' })

// <div>
// {filteredArray.map(kard => {
//     return (
//         <KostcoCard
//             key={kard.kID}
//             kard={kard}
//             canSelect={canSelect}
//             clickToSelect={clickToSelect}
//             verb={verb}
//         />
//     )
// })}
// </div>