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

export const kCombatPreroll = () => ({
  type: 'COMBAT_PREROLL'
})

export const kCombatPostroll = () => ({
  type: 'COMBAT_POSTROLL'
})

export const kHealthValue = (healthValue) => ({
  type: 'HEALTH_VALUE',
  healthValue
})

export const kStrengthValue = (strengthValue) => ({
  type: 'STRENGTH_VALUE',
  strengthValue
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


export const kostcoMagic = () => ({
  type: 'KOSTCO_MAGIC'
})

export const kostcoMonster = () => ({
  type: 'KOSTCO_MONSTER'
})

export const kostcoSpooky = () => ({
  type: 'KOSTCO_SPOOKY'
})

export const kostcoTrap = () => ({
  type: 'KOSTCO_TRAP'
})


export const kostcoReroll = () => ({
  type: 'KOSTCO_REROLL'
})

export const kostcoCritRoll = () => ({
  type: 'KOSTCO_CRIT_ROLL'
})

export const kostcoTargetSelf = () => ({
  type: 'KOSTCO_TARGET_SELF'
})

export const kostcoTargetOther = () => ({
  type: 'KOSTCO_TARGET_OTHER'
})


export const kostcoCombat = () => ({
  type: 'KOSTCO_COMBAT'
})

export const kostcoTurnEnd = () => ({
  type: 'KOSTCO_TURN_END'
})

export const kostcoAnyTime = () => ({
  type: 'KOSTCO_ANY_TIME'
})


export const kostcoActionToken = () => ({
  type: 'KOSTCO_ACTION_TOKEN'
})

export const kostcoAddStrength = () => ({
  type: 'KOSTCO_ADD_STRENGTH'
})

export const kostcoAssist = () => ({
  type: 'KOSTCO_ASSIST'
})

export const kostcoHealth = () => ({
  type: 'KOSTCO_HEALTH'
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