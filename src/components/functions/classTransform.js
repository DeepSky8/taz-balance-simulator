import { charClassCodes } from "../classes/default"

const classTransform = (classCode) => {
    if (classCode) {
        switch (classCode.split('')[2]) {
            case '0':
                return charClassCodes[0]
            case '1':
                return charClassCodes[1]
            case '2':
                return charClassCodes[2]
            case '3':
                return charClassCodes[3]
            case '4':
                return charClassCodes[4]
            case '5':
                return charClassCodes[5]
            default:
                return '-Select-'
        }
    } else {
        return '-select-'
    }
}

export { classTransform as default }