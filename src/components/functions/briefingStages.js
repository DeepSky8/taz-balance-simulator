const briefingStages = [
    'VILLAIN',
    'RELIC',
    'LOCATION',
    'NEXT'
]

const nextDeck = (stage) => {
    const currentStage = briefingStages.indexOf(stage)
    const nextStage = currentStage + 1;
    return briefingStages[nextStage]
}

const prevDeck = (stage) => { 
    const currentStage = briefingStages.indexOf(stage)
    const prevStage = currentStage - 1;
    return briefingStages[prevStage]
}

export { nextDeck, prevDeck, briefingStages }