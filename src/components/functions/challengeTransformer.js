


const challengeTransformer = (challengeArray, challengeCode) => {
    if (challengeCode) {
        switch (challengeCode.split('')[1]) {
            case '0':
                return challengeArray[0]
            case '1':
                return challengeArray[1]
            case '2':
                return challengeArray[2]
            case '3':
                return challengeArray[3]
            case '4':
                return challengeArray[4]
            case '5':
                return challengeArray[5]
            case '6':
                return challengeArray[6]
            case '7':
                return challengeArray[7]
            case '99':
                return challengeArray[7]
            case '9':
                return challengeArray[7]
            default:
                return {
                    challengeName: null,
                    challengeCode: null,
                    challengeFlavor: null,
                    promptFlavor1: null,
                    promptFlavor2: null,
                    prompt1: null,
                    prompt2: null
                }
        }
    } else {
        return {
            challengeName: null,
            challengeCode: null,
            challengeFlavor: null,
            promptFlavor1: null,
            promptFlavor2: null,
            prompt1: null,
            prompt2: null
        }
    }

}

export { challengeTransformer as default }

