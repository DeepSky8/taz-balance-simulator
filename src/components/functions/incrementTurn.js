
const incrementTurn = (stage) => {
    switch (stage) {
        case 'DESCRIBEONE':
            return 'CHALLENGE'
        case 'CHALLENGE':
            return 'ITEMS';
        case 'ITEMS':
            return 'STORY';
        case 'STORY':
            return 'PREASSIST';
        case 'PREASSIST':
            return 'SCENE';
        case 'SCENE':
            return 'PRE_ASSIST_SCENE';
        case 'PRE_ASSIST_SCENE':
            return 'ROLLONE';
        case 'ROLLONE':
            return 'ROLLTWO';
        case 'ROLLTWO':
            return 'EVALUATE';
        case 'EVALUATE':
            return 'POSTASSIST';
        case 'POSTASSIST':
            return 'POST_ASSIST_SCENE';
        case 'POST_ASSIST_SCENE':
            return 'DESCRIBE';
        case 'DESCRIBE':
            return 'KOSTCO';
        case 'KOSTCO':
            return 'PASS';
        default:
            return 'DESCRIBE';
    }
}

export default incrementTurn