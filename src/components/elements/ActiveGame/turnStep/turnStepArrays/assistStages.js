import turnStagesArray from "./turnStagesArray"

const assistStages = [
  ...turnStagesArray.slice(4, 5),
  ...turnStagesArray.slice(11, 12)
  // 'PREASSIST',
  // 'POSTASSIST'
]

export default assistStages