import assistStages from "./assistStages"
import challengeItemStages from "./challengeItemStages"


const tokenStages = [
  // These stages allow nonActive players to assist
  ...assistStages,
  // These stages allow active player to spend token
  // either to engage the challenge
  // or to activate a power
  ...challengeItemStages,

]

export default tokenStages