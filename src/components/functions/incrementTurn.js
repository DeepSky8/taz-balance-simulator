import turnStagesArray from "../elements/ActiveGame/turnStep/turnStepArrays/turnStagesArray"

const incrementTurn = (stage) => {
    const nextStageIndex = (turnStagesArray.indexOf(stage)) + parseInt(1)
    return ((nextStageIndex >= turnStagesArray.length) ? turnStagesArray[0] : turnStagesArray[nextStageIndex])
}

// export default incrementTurn


// switch (stage) {
//     case 'DESCRIBEONE':
//         return 'CHALLENGE'
//     case 'CHALLENGE':
//         return 'ITEMS';
//     case 'ITEMS':
//         return 'STORY';
//     case 'STORY':
//         return 'PREASSIST';
//     case 'PREASSIST':
//         return 'SCENE';
//     case 'SCENE':
//         return 'PRE_ASSIST_SCENE';
//     case 'PRE_ASSIST_SCENE':
//         return 'ACTIONONE';
//     case 'ACTIONONE':
//         return 'ROLLONE';
//     case 'ROLLONE':
//         return 'ROLLTWO';
//     case 'ROLLTWO':
//         return 'EVALUATEONE';
//     case 'EVALUATEONE':
//         return 'POSTASSIST';
//     case 'POSTASSIST':
//         return 'POST_ASSIST_SCENE';
//     case 'POST_ASSIST_SCENE':
//         return 'EVALUATETWO';
//     case 'EVALUATETWO':
//         return 'DESCRIBETWO';
//     case 'DESCRIBETWO':
//         return 'KOSTCO';
//     case 'KOSTCO':
//         return 'ACTIONTWO'
//     case 'ACTIONTWO':
//         return 'PASS';
//     case 'PASS':
//         return 'DESCRIBEONE'
//     default:
//         return 'DESCRIBEONE';
// }