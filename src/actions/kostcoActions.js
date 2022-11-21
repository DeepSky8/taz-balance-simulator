// Card Actions

import { child, push, ref, update } from "firebase/database"
import { db } from "../firebase/firebase"

export const receiveKard = (kard) => ({
  type: 'RECEIVE_KARD',
  kard
})

export const clearKard = () => ({
  type: 'CLEAR_KARD'
})

export const kTitle = (kTitle) => ({
  type: 'KTITLE',
  kTitle
})

export const kOngoing = (kOngoing) => ({
  type: 'KONGOING',
  kOngoing
})

export const kOneshot = (kOneshot) => ({
  type: 'KONESHOT',
  kOneshot
})

export const kFlavor = (kFlavor) => ({
  type: 'KFLAVOR',
  kFlavor
})

export const kCombatPreroll = (flagType) => ({
  type: 'COMBAT_PREROLL',
  flagType
})

export const kCombatPostroll = (flagType) => ({
  type: 'COMBAT_POSTROLL',
  flagType
})

export const kHealthValue = (healthValue, flagType) => ({
  type: 'HEALTH_VALUE',
  healthValue,
  flagType
})

export const kStrengthValue = (strengthValue, flagType) => ({
  type: 'STRENGTH_VALUE',
  strengthValue,
  flagType
})

// Search Actions

export const kostcoSearchTerms = (terms) => ({
  type: 'KOSTCO_SEARCH_TERMS',
  terms
})

export const kostcoSearchReset = () => ({
  type: 'KOSTCO_SEARCH_RESET'
})


export const kostcoSearchTitle = () => ({
  type: 'SEARCH_TITLE'
})

export const kostcoSearchOngoing = () => ({
  type: 'SEARCH_ONGOING'
})

export const kostcoSearchOneshot = () => ({
  type: 'SEARCH_ONE_SHOT'
})

export const kostcoSearchFlavor = () => ({
  type: 'SEARCH_FLAVOR'
})


export const kostcoMagic = (flagType) => ({
  type: 'KOSTCO_MAGIC',
  flagType
})

export const kostcoMonster = (flagType) => ({
  type: 'KOSTCO_MONSTER',
  flagType
})

export const kostcoSpooky = (flagType) => ({
  type: 'KOSTCO_SPOOKY',
  flagType
})

export const kostcoTrap = (flagType) => ({
  type: 'KOSTCO_TRAP',
  flagType
})


export const kostcoReroll = (flagType) => ({
  type: 'KOSTCO_REROLL',
  flagType
})

export const kostcoCritRoll = (flagType) => ({
  type: 'KOSTCO_CRIT_ROLL',
  flagType
})

export const kostcoTargetSelf = (flagType) => ({
  type: 'KOSTCO_TARGET_SELF',
  flagType
})

export const kostcoTargetOther = (flagType) => ({
  type: 'KOSTCO_TARGET_OTHER',
  flagType
})


export const kostcoCombat = (flagType) => ({
  type: 'KOSTCO_COMBAT',
  flagType
})

export const kostcoTurnEnd = (flagType) => ({
  type: 'KOSTCO_TURN_END',
  flagType
})

export const kostcoAnyTime = (flagType) => ({
  type: 'KOSTCO_ANY_TIME',
  flagType
})


export const kostcoActionToken = (flagType) => ({
  type: 'KOSTCO_ACTION_TOKEN',
  flagType
})

export const kostcoStrength = (flagType) => ({
  type: 'KOSTCO_STRENGTH',
  flagType
})

export const kostcoAssist = (flagType) => ({
  type: 'KOSTCO_ASSIST',
  flagType
})

export const kostcoHealth = (flagType) => ({
  type: 'KOSTCO_HEALTH',
  flagType
})

export const kostcoToggleAll = () => ({
  type: 'TOGGLE_ALL'
})

// Cloud Actions

export const startUpdateKard = (kardData, kardKey) => {
  const updates = {}
  updates['kostco/' + kardKey] = { ...kardData, kID: kardKey }
  update(ref(db), updates)
    .catch((error) => {
      console.log('Did not update kard: ', error)
    })
}

export const startNewKard = (kardData) => {

  const newkardKey = push(child(ref(db), 'kostco')).key
  startUpdateKard(kardData, newkardKey)
}

export const startRemoveKard = (kardKey) => {
  const updates = {}
  updates['kostco/' + kardKey] = null
  update(ref(db), updates)
    .catch((error) => {
      console.log('Did not remove kard: ', error)
    })
}