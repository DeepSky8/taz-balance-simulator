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

const gameStageArray = [
  'INTRO',
  'BRIEF',
  'TRANSPORT',
  'CHALLENGES',
  'END',
  'default'
]

const introStages = [
  ...gameStageArray.slice(0, 3)
  // INTRO, BRIEF, TRANSPORT
]

export {briefingStagesArray, directionArray, gameStageArray, introStages}