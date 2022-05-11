const classTransformer = (classDataArray, classCode) => {
    switch (classCode.split('')[2]) {
        case '0':
            return classDataArray[0]
        case '1':
            return classDataArray[1]
        case '2':
            return classDataArray[2]
        case '3':
            return classDataArray[3]
        case '4':
            return classDataArray[4]
        case '5':
            return classDataArray[5]
        default:
            return '-Select-'
    }
}

export { classTransformer as default }