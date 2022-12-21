import turnStage from "./turnStage"

const challengeItemStages = [
  turnStage.pickChallenge,
  turnStage.prerollItems,
  turnStage.actionTokenOne,
  turnStage.actionTokenTwo
]

export default challengeItemStages

// When can one-shot items be used?
// own turn
// other turn
// combat
// - preroll
// - postroll
// turn end
// Any step