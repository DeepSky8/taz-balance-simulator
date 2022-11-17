

const defaultKostcoSearchState = {
  // Search Parameters
  terms: '',
  kTitle: true,
  kOngoing: true,
  kOneshot: true,
  kFlavor: false,

  // Effects
  ongoing: false,
  oneshot: false,


  // Challenge types
  magic: false,
  monster: false,
  spooky: false,
  trap: false,

  // Rolls
  reroll: false,
  critRoll: false,

  // Targets
  targetSelf: false,
  targetOther: false,

  // Timing
  combat: false,
  combatPreroll: false,
  combatPostroll: false,
  turnEnd: false,
  anyTime: false,

  // Others
  actionToken: false,
  addStrength: false,
  assist: false,
  health: false,
}

const kostcoSearchReducer = (state, action) => {
  switch (action.type) {
    case 'KOSTCO_SEARCH_RESET':
      return {
        ...defaultKostcoSearchState
      }
    case 'KOSTCO_SEARCH_TERMS':
      return {
        ...state,
        terms: action.terms
      }
    case 'SEARCH_TITLE':
      return {
        ...state,
        kTitle: !state.kTitle
      }
    case 'SEARCH_ONGOING':
      return {
        ...state,
        kOngoing: !state.kOngoing
      }
    case 'SEARCH_ONE_SHOT':
      return {
        ...state,
        kOneshot: !state.kOneshot
      }
    case 'SEARCH_FLAVOR':
      return {
        ...state,
        kFlavor: !state.kFlavor
      }
    case 'KOSTCO_MAGIC':
      return {
        ...state,
        magic: !state.magic
      }
    case 'KOSTCO_MONSTER':
      return {
        ...state,
        monster: !state.monster
      }
    case 'KOSTCO_SPOOKY':
      return {
        ...state,
        spooky: !state.spooky
      }
    case 'KOSTCO_TRAP':
      return {
        ...state,
        trap: !state.trap
      }
    case 'KOSTCO_REROLL':
      return {
        ...state,
        reroll: !state.reroll
      }
    case 'KOSTCO_CRIT_ROLL':
      return {
        ...state,
        critRoll: !state.critRoll
      }
    case 'KOSTCO_TARGET_SELF':
      return {
        ...state,
        targetSelf: !state.targetSelf
      }
    case 'KOSTCO_TARGET_OTHER':
      return {
        ...state,
        targetOther: !state.targetOther
      }
    case 'KOSTCO_COMBAT':
      return {
        ...state,
        combat: !state.combat
      }
    case 'COMBAT_PREROLL':
      return {
        ...state,
        combatPreroll: !state.combatPreroll
      }
    case 'COMBAT_POSTROLL':
      return {
        ...state,
        combatPostroll: !state.combatPostroll,
      }
    case 'KOSTCO_TURN_END':
      return {
        ...state,
        turnEnd: !state.turnEnd
      }
    case 'KOSTCO_ANY_TIME':
      return {
        ...state,
        anyTime: !state.anyTime,
      }
    case 'KOSTCO_ACTION_TOKEN':
      return {
        ...state,
        actionToken: !state.actionToken
      }
    case 'KOSTCO_ADD_STRENGTH':
      return {
        ...state,
        addStrength: !state.addStrength
      }
    case 'KOSTCO_ASSIST':
      return {
        ...state,
        assist: !state.assist
      }
    case 'KOSTCO_HEALTH':
      return {
        ...state,
        health: !state.health
      }
    case 'TOGGLE_ALL':
      const toggleTO = !state.magic
      return {
        ...state,
        // Challenge types
        magic: toggleTO,
        monster: toggleTO,
        spooky: toggleTO,
        trap: toggleTO,

        // Rolls
        reroll: toggleTO,
        critRoll: toggleTO,

        // Targets
        targetSelf: toggleTO,
        targetOther: toggleTO,

        // Timing
        combat: toggleTO,
        combatPreroll: toggleTO,
        turnEnd: toggleTO,
        anyTime: toggleTO,

        // Others
        actionToken: toggleTO,
        addStrength: toggleTO,
        assist: toggleTO,
        health: toggleTO,
      }
    default:
      return state
  }
}

export { defaultKostcoSearchState, kostcoSearchReducer }