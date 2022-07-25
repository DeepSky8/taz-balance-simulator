
const flavorTransformer = (villainObject, relicObject, locationObject) => {
    let villainFlavor = '';
    let relicFlavor = '';
    let locationFlavor = '';

    switch (villainObject.challengeCode) {
        case 'v0':
            villainFlavor = villainObject.challengeFlavor
            break;
        case 'v1':
            villainFlavor = villainObject.challengeFlavor
            break;
        case 'v2':
            villainFlavor = villainObject.promptFlavor1 + relicObject.challengeName + villainObject.promptFlavor2
            break;
        case 'v3':
            villainFlavor = villainObject.challengeFlavor
            break;
        case 'v4':
            villainFlavor = villainObject.promptFlavor1 + relicObject.challengeName + villainObject.promptFlavor2
            break;
        default:
            villainFlavor = villainObject.challengeFlavor
            break;

    }

    switch (relicObject.challengeCode) {
        case 'r0':
            if (villainObject.challengeCode === 'v2') {
                relicFlavor = villainObject.challengeName + relicObject.promptFlavor1
            } else {
                relicFlavor = villainObject.challengeName + relicObject.promptFlavor2
            }
            break;
        case 'r1':
            relicFlavor = relicObject.challengeFlavor
            break;
        case 'r2':
            relicFlavor = relicObject.challengeFlavor
            break;
        case 'r3':
            if (villainObject.challengeCode === 'v2') {
                relicFlavor = villainObject.challengeName + relicObject.promptFlavor3
            } else {
                relicFlavor = relicObject.promptFlavor1 + villainObject.challengeName + relicObject.promptFlavor2
            }
            break;
        default:
            relicFlavor = relicObject.challengeFlavor
            break;
    }

    switch (locationObject.challengeCode) {
        case 'l0':
            locationFlavor = locationObject.challengeFlavor
            break;
        case 'l1':
            locationFlavor = locationObject.challengeFlavor
            break;
        case 'l2':
            locationFlavor = locationObject.challengeFlavor
            break;
        case 'l3':
            if (villainObject.challengeCode === 'v2') {
                locationFlavor = villainObject.challengeName + locationObject.promptFlavor3 + relicObject.challengeName + locationObject.promptFlavor4
            } else {
                locationFlavor = villainObject.challengeName + locationObject.promptFlavor1 + relicObject.challengeName + locationObject.promptFlavor2
            }
            break;
        default:
            locationFlavor = locationObject.challengeFlavor
            break;
    }

    return {
        villainFlavor,
        relicFlavor,
        locationFlavor
    }
}

export default flavorTransformer