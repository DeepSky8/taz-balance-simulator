import React, { useState } from "react"

const useFlavorTransformer = (villainObject, relicObject, locationObject) => {
    const [villainFlavor, setVillainFlavor] = useState('')
    const [relicFlavor, setRelicFlavor] = useState('')
    const [locationFlavor, setLocationFlavor] = useState('')

    switch (villainObject.challengeCode) {
        case 'v0':
            setVillainFlavor(villainObject.challengeFlavor)
            break;
        case 'v1':
            setVillainFlavor(villainObject.challengeFlavor)
            break;
        case 'v2':
            setVillainFlavor(villainObject.promptFlavor1 + relicObject.challengeName + villainObject.promptFlavor2)
            break;
        case 'v3':
            setVillainFlavor(villainObject.challengeFlavor)
            break;
        case 'v4':
            setVillainFlavor(villainObject.promptFlavor1 + relicObject.challengeName + villainObject.promptFlavor2)
            break;
        default:
            setVillainFlavor(villainObject.challengeFlavor)
            break;
    }

    switch (relicObject.challengeCode) {
        case 'r0':
            if (villainObject.challengeCode === 'v2') {
                setRelicFlavor(villainObject.challengeName + relicObject.promptFlavor1)
            } else {
                setRelicFlavor(villainObject.challengeName + relicObject.promptFlavor2)
            }
            break;
        case 'r1':
            setRelicFlavor(relicObject.challengeFlavor)
            break;
        case 'r2':
            setRelicFlavor(relicObject.challengeFlavor)
            break;
        case 'r3':
            if (villainObject.challengeCode === 'v2') {
                setRelicFlavor(villainObject.challengeName + relicObject.promptFlavor3)
            } else {
                setRelicFlavor(relicObject.promptFlavor1 + villainObject.challengeName + relicObject.promptFlavor2)
            }
            break;
        default:
            setRelicFlavor(relicObject.challengeFlavor)
            break;
    }

    switch (locationObject.challengeCode) {
        case 'l0':
            setLocationFlavor(locationObject.challengeFlavor)
            break;
        case 'l1':
            setLocationFlavor(locationObject.challengeFlavor)
            break;
        case 'l2':
            setLocationFlavor(locationObject.challengeFlavor)
            break;
        case 'l3':
            if (villainObject.challengeCode === 'v2') {
                setLocationFlavor(villainObject.challengeName + locationObject.promptFlavor3 + relicObject.challengeName + locationObject.promptFlavor4)
            } else {
                setLocationFlavor(villainObject.challengeName + locationObject.promptFlavor1 + relicObject.challengeName + locationObject.promptFlavor2)
            }
            break;
        default:
            setLocationFlavor(locationObject.challengeFlavor)
            break;
    }

    return {
        villainFlavor,
        relicFlavor,
        locationFlavor
    }
}

export default useFlavorTransformer