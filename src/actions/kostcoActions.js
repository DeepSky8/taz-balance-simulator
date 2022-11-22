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



export const kSearchTerms = (terms) => ({
  type: 'KOSTCO_SEARCH_TERMS',
  terms
})

export const kSearchReset = () => ({
  type: 'KOSTCO_SEARCH_RESET'
})


export const kSearchTitle = () => ({
  type: 'SEARCH_TITLE'
})

export const kSearchOngoing = () => ({
  type: 'SEARCH_ONGOING'
})

export const kSearchOneshot = () => ({
  type: 'SEARCH_ONE_SHOT'
})

export const kSearchFlavor = () => ({
  type: 'SEARCH_FLAVOR'
})

export const kSearchOngoingFlags = () => ({
  type: 'SEARCH_ONGOING_FLAGS'
})

export const kSearchOneshotFlags = () => ({
  type: 'SEARCH_ONESHOT_FLAGS'
})

export const kMagic = (flagType) => ({
  type: 'KOSTCO_MAGIC',
  flagType
})

export const kMonster = (flagType) => ({
  type: 'KOSTCO_MONSTER',
  flagType
})

export const kSpooky = (flagType) => ({
  type: 'KOSTCO_SPOOKY',
  flagType
})

export const kTrap = (flagType) => ({
  type: 'KOSTCO_TRAP',
  flagType
})


export const kReroll = (flagType) => ({
  type: 'KOSTCO_REROLL',
  flagType
})

export const kCritRoll = (flagType) => ({
  type: 'KOSTCO_CRIT_ROLL',
  flagType
})

export const kTargetSelf = (flagType) => ({
  type: 'KOSTCO_TARGET_SELF',
  flagType
})

export const kTargetOther = (flagType) => ({
  type: 'KOSTCO_TARGET_OTHER',
  flagType
})


export const kCombat = (flagType) => ({
  type: 'KOSTCO_COMBAT',
  flagType
})

export const kTurnEnd = (flagType) => ({
  type: 'KOSTCO_TURN_END',
  flagType
})

export const kAnyTime = (flagType) => ({
  type: 'KOSTCO_ANY_TIME',
  flagType
})


export const kActionToken = (flagType) => ({
  type: 'KOSTCO_ACTION_TOKEN',
  flagType
})


export const kAssist = (flagType) => ({
  type: 'KOSTCO_ASSIST',
  flagType
})

export const kAssistExtra = (flagType) => ({
  type: 'ASSIST_EXTRA',
  flagType
})

export const kAssistValue = (assistValue, flagType) => ({
  type: 'ASSIST_VALUE',
  assistValue,
  flagType,
})

export const kHealth = (flagType) => ({
  type: 'KOSTCO_HEALTH',
  flagType
})

export const kHealthValue = (healthValue, flagType) => ({
  type: 'HEALTH_VALUE',
  healthValue,
  flagType
})

export const kStrength = (flagType) => ({
  type: 'KOSTCO_STRENGTH',
  flagType
})

export const kStrengthValue = (strengthValue, flagType) => ({
  type: 'STRENGTH_VALUE',
  strengthValue,
  flagType
})

export const kDamage = (flagType) => ({
  type: 'KOSTCO_DAMAGE',
  flagType
})

export const kDamageValue = (damageValue, flagType) => ({
  type: 'DAMAGE_VALUE',
  damageValue,
  flagType
})

export const kToggleAll = () => ({
  type: 'TOGGLE_ALL'
})

export const kSpecial = (flagType) => ({
  type: 'KOSTCO_SPECIAL',
  flagType
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