const briefingStagesArray = [
    'VILLAIN',
    'RELIC',
    'LOCATION',
    'NEXT'
]

const directionArray = [
    'FORWARD',
    'BACKWARD'
]

const nextDeck = (stage) => {
    const currentStage = briefingStagesArray.indexOf(stage)
    const nextStage = currentStage + 1;
    return briefingStagesArray[nextStage]
}

const prevDeck = (stage) => {
    const currentStage = briefingStagesArray.indexOf(stage)
    const prevStage = currentStage - 1;
    return briefingStagesArray[prevStage]
}

export { briefingStagesArray, directionArray }