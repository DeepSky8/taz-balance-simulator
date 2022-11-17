

const defaultKostcoCardState = {
  // elements beginning with 'k' are reserved
  // for text-searchable strings
  kID: '0',
  kTitle: '',
  kOngoing: '',
  // searchOngoing: false,
  kOneshot: '',
  // searchOneshot: false,
  kFlavor: '',
  // searchFlavor: false,

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
  assist: false,

  // Changes numbers
  health: false,
  healthValue: 0,
  addStrength: false,
  strengthValue: 0,

}

const kostcoCardReducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_KARD':
      return {
        ...defaultKostcoCardState,
        ...action.kard
      }
    case 'CLEAR_KARD':
      return {
        ...defaultKostcoCardState
      }
    case 'KTITLE':
      return {
        ...state,
        kTitle: action.kTitle
      }
    case 'KONGOING':
      // const boolOngoing = action.kOngoing.length > 0
      return {
        ...state,
        kOngoing: action.kOngoing,
        // searchOngoing: boolOngoing
      }
    case 'KONESHOT':
      // const boolOneshot = action.kOneshot.length > 0
      return {
        ...state,
        kOneshot: action.kOneshot,
        // searchOneshot: boolOneshot
      }
    case 'KFLAVOR':
      // const boolFlavor = action.kFlavor.length > 0
      return {
        ...state,
        kFlavor: action.kFlavor,
        // searchFlavor: boolFlavor
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
        combat: !state.combat,
        turnEnd: !state.combat ? false : state.turnEnd,
        anyTime: !state.combat ? false : state.anyTime
      }
    case 'COMBAT_PREROLL':
      return {
        ...state,
        combatPreroll: !state.combatPreroll,
        combat: !state.combatPreroll ? true : state.combat,
        turnEnd: !state.combatPreroll ? false : state.turnEnd,
        combatPostroll: !state.combatPreroll ? false: state.turnEnd
      }
    case 'COMBAT_POSTROLL':
      return{
        ...state,
        combatPostroll: !state.combatPostroll,
        combat: !state.combatPostroll ? true: state.combat,
        turnEnd: !state.combatPostroll ? false: state.turnEnd,
        combatPreroll: !state.combatPostroll ? false : state.combatPreroll
      }
    case 'KOSTCO_TURN_END':
      return {
        ...state,
        turnEnd: !state.turnEnd,
        combat: !state.turnEnd ? false : state.combat,
        anyTime: !state.turnEnd ? false : state.anyTime
      }
    case 'KOSTCO_ANY_TIME':
      return {
        ...state,
        anyTime: !state.anyTime,
        combat: !state.anyTime ? false : state.combat,
        turnEnd: !state.anyTime ? false : state.turnEnd
      }
    case 'KOSTCO_ACTION_TOKEN':
      return {
        ...state,
        actionToken: !state.actionToken
      }
    case 'KOSTCO_ASSIST':
      return {
        ...state,
        assist: !state.assist
      }
    case 'KOSTCO_HEALTH':
      const healthVal = state.health ? 0 : state.healthValue
      return {
        ...state,
        health: !state.health,
        healthValue: healthVal
      }
    case 'HEALTH_VALUE':
      return {
        ...state,
        healthValue: action.healthValue,
        health: action.healthValue === 0 ? false : true
      }
    case 'KOSTCO_ADD_STRENGTH':
      const strengthVal = state.addStrength ? 0 : state.strengthValue
      return {
        ...state,
        addStrength: !state.addStrength,
        strengthValue: strengthVal
      }
    case 'STRENGTH_VALUE':
      return {
        ...state,
        strengthValue: action.strengthValue,
        strength: action.strengthValue === 0 ? false : true
      }
    default:
      return state
  }
}

export { defaultKostcoCardState, kostcoCardReducer }