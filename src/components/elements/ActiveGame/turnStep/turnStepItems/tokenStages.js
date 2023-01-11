import actionStages from "./actionStages"
import assistStages from "./assistStages"
import challengeItemStages from "./challengeItemStages"


const tokenStages = [
  // These stages allow nonActive players to assist
  ...assistStages,
  // These stages allow active player to spend token
  // either to engage the challenge
  // or to activate a power
  ...challengeItemStages,
  // These stages allow appropriate classes to spend
  // their action token for specific effects
  ...actionStages,
]

export default tokenStages