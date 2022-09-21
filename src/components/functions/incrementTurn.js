
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
            return 'EVALUATEONE';
        case 'EVALUATEONE':
            return 'POSTASSIST';
        case 'POSTASSIST':
            return 'POST_ASSIST_SCENE';
        case 'POST_ASSIST_SCENE':
            return 'EVALUATETWO';
        case 'EVALUATETWO':
            return 'DESCRIBETWO';
        case 'DESCRIBETWO':
            return 'KOSTCO';
        case 'KOSTCO':
            return 'PASS';
        case 'PASS':
            return 'DESCRIBEONE'
        default:
            return 'DESCRIBEONE';
    }
}

export default incrementTurn