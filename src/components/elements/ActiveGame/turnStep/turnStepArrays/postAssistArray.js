import kostcoStages from "./kostcoStages"
import turnStage from "./turnStage"

const postAssistArray = [
  turnStage.postrollAssist,
  turnStage.postrollAssistScene,
  turnStage.evaluateTwo,
  turnStage.describeSceneTwo,
  ...kostcoStages,
  turnStage.passTurn
]

export default postAssistArray