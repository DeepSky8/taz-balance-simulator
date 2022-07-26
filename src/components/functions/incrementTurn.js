
const incrementTurn = (stage) => {
    switch (stage) {
        case 'CHALLENGE':
            return 'ITEMS';
        case 'ITEMS':
            return 'STORY';
        case 'STORY':
            return 'PREASSIST';
        case 'PREASSIST':
            return 'SCENE';
        case 'SCENE':
            return 'ASSIST_SCENE';
        case 'ASSIST_SCENE':
            return 'ROLL';
        case 'ROLL':
            return 'POSTASSIST';
        case 'POSTASSIST':
            return 'DESCRIBE';
        case 'DESCRIBE':
            return 'KOSTCO';
        case 'KOSTCO':
            return 'PASS';
        default:
            return 'CHALLENGE';
    }
}

export default incrementTurn