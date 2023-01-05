
const briefingStage = {
    villain: 'VILLAIN',
    relic: 'RELIC',
    location: 'LOCATION',
    transport: 'TRANSPORT',
    display: 'DISPLAY'
}

const direction = {
    forward: 'FORWARD',
    backward: 'BACKWARD'
}

const gameStage = {
    intro: 'INTRO',
    briefing: 'BRIEFING',
    transport: 'TRANSPORT',
    challenges: 'CHALLENGES',
    victory: 'VICTORY',
    failure: 'FAILURE',
    end: 'END',
    default: 'default'
}

const introStages = [
    gameStage.intro,
    gameStage.briefing,
    gameStage.transport,
]

export {briefingStage, direction, gameStage, introStages}