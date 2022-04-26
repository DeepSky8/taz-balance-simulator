


const challengeTransformer = (challengeArray, challengeCode) => {
    switch (challengeCode.split('')[1]) {
        case '0':
            return challengeArray[0]
        case 'r0':
            return challengeArray[0]
        case 'l0':
            return challengeArray[0]
        case '1':
            return challengeArray[1]
        case 'r1':
            return challengeArray[1]
        case 'l1':
            return challengeArray[1]
        case '2':
            return challengeArray[2]
        case '3':
            return challengeArray[3]
        case '4':
            return challengeArray[4]
        default:
            console.log('challengeCode received', challengeCode)
            return {}
    }
}

export { challengeTransformer as default }