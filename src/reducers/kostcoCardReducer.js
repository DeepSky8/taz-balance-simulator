
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

  g: {
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
    strength: false,
    strengthValue: 0,
  },

  t: {
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
    strength: false,
    strengthValue: 0,
  }

}

const kostcoCardReducer = (state, action) => {

  const CHECKG = action.flagType === 'g'
  const CHECKT = action.flagType === 't'

  let currentG = false
  let leaveAlone1G = false
  let leaveAlone2G = false
  let leaveAlone3G = false
  let leaveAlone4G = false


  let currentT = false
  let leaveAlone1T = false
  let leaveAlone2T = false
  let leaveAlone3T = false
  let leaveAlone4T = false



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
      currentG = state.g.magic
      currentT = state.t.magic
      return {
        ...state,
        g: {
          ...state.g,
          magic: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          magic: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_MONSTER':
      currentG = state.g.monster
      currentT = state.t.monster
      return {
        ...state,
        g: {
          ...state.g,
          monster: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          monster: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_SPOOKY':
      currentG = state.g.spooky
      currentT = state.t.spooky
      return {
        ...state,
        g: {
          ...state.g,
          spooky: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          spooky: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_TRAP':
      currentG = state.g.trap
      currentT = state.t.trap
      return {
        ...state,
        g: {
          ...state.g,
          trap: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          trap: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_REROLL':
      currentG = state.g.reroll
      currentT = state.t.reroll
      return {
        ...state,
        g: {
          ...state.g,
          reroll: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          reroll: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_CRIT_ROLL':
      currentG = state.g.critRoll
      currentT = state.t.critRoll
      return {
        ...state,
        g: {
          ...state.g,
          critRoll: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          critRoll: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_TARGET_SELF':
      currentG = state.g.targetSelf
      currentT = state.t.targetSelf
      return {
        ...state,
        g: {
          ...state.g,
          targetSelf: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          targetSelf: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_TARGET_OTHER':
      currentG = state.g.targetOther
      currentT = state.t.targetOther
      return {
        ...state,
        g: {
          ...state.g,
          targetOther: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          targetOther: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_COMBAT':
      currentG = state.g.combat
      leaveAlone1G = state.g.turnEnd
      leaveAlone3G = state.g.anyTime
      leaveAlone2G = state.g.combatPreroll

      currentT = state.t.combat
      leaveAlone1T = state.t.turnEnd
      leaveAlone3T = state.t.anyTime
      leaveAlone2T = state.t.combatPreroll
      return {
        ...state,
        // combat: !state.combat,
        // turnEnd: !state.combat ? false : state.turnEnd,
        // anyTime: !state.combat ? false : state.anyTime
        g: {
          ...state.g,
          combat: (
            CHECKG
              ?
              !currentG
              :
              currentG),

          turnEnd: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),

          anyTime: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),

          combatPreroll: (CHECKG && currentG
            ?
            false
            :
            leaveAlone2G)
        },
        t: {
          ...state.t,
          combat: (
            CHECKT
              ?
              !currentT
              :
              currentT),

          turnEnd: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone1T),

          anyTime: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),

          combatPreroll: (CHECKT && currentT
            ?
            false
            :
            leaveAlone2T
          )
        }
      }
    case 'COMBAT_PREROLL':
      currentG = state.g.combatPreroll
      currentT = state.t.combatPreroll
      leaveAlone1G = state.g.combat
      leaveAlone2G = state.g.turnEnd
      leaveAlone3G = state.g.combatPostroll
      leaveAlone4G = state.g.anyTime
      leaveAlone1T = state.t.combat
      leaveAlone2T = state.t.turnEnd
      leaveAlone3T = state.t.combatPostroll
      leaveAlone4T = state.t.anyTime
      return {
        // ...state,
        // combatPreroll: !state.combatPreroll,
        // combat: !state.combatPreroll ? true : state.combat,
        // turnEnd: !state.combatPreroll ? false : state.turnEnd,
        // combatPostroll: !state.combatPreroll ? false : state.turnEnd
        ...state,
        g: {
          ...state.g,
          combatPreroll: (CHECKG
            ?
            !currentG
            :
            currentG),
          combat: (CHECKG && !currentG
            ?
            true
            :
            leaveAlone1G),
          turnEnd: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          combatPostroll: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          anyTime: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
        },
        t: {
          ...state.t,
          combatPreroll: (CHECKT
            ?
            !currentT
            :
            currentT),
          combat: (CHECKT && !currentT
            ?
            true
            :
            leaveAlone1T),
          turnEnd: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          combatPostroll: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          anyTime: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        },
      }
    case 'COMBAT_POSTROLL':
      currentG = state.g.combatPostroll
      currentT = state.t.combatPostroll
      leaveAlone1G = state.g.combat
      leaveAlone2G = state.g.turnEnd
      leaveAlone3G = state.g.combatPreroll
      leaveAlone4G = state.g.anyTime
      leaveAlone1T = state.t.combat
      leaveAlone2T = state.t.turnEnd
      leaveAlone3T = state.t.combatPreroll
      leaveAlone4T = state.t.anyTime
      return {
        ...state,
        g: {
          ...state.g,
          combatPostroll: (CHECKG
            ?
            !currentG
            :
            currentG),
          combat: (CHECKG && !currentG
            ?
            true
            :
            leaveAlone1G),
          turnEnd: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          combatPreroll: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          anyTime: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
        },
        t: {
          ...state.t,
          combatPostroll: (CHECKT
            ?
            !currentT
            :
            currentT),
          combat: (CHECKT && !currentT
            ?
            true
            :
            leaveAlone1T),
          turnEnd: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          combatPreroll: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          anyTime: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        },
      }
    case 'KOSTCO_TURN_END':
      currentG = state.g.turnEnd
      currentT = state.t.turnEnd
      leaveAlone1G = state.g.combat
      leaveAlone2G = state.g.anyTime
      leaveAlone3G = state.g.combatPreroll
      leaveAlone4G = state.g.combatPostroll
      leaveAlone1T = state.t.combat
      leaveAlone2T = state.t.anyTime
      leaveAlone3T = state.t.combatPreroll
      leaveAlone4T = state.t.combatPostroll
      return {
        ...state,
        g: {
          ...state.g,
          turnEnd: CHECKG
            ?
            !currentG
            :
            currentG,
          combat: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          anyTime: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          combatPreroll: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          combatPostroll: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
        },
        t: {
          ...state.t,
          turnEnd: CHECKT
            ?
            !currentT
            :
            currentT,
          combat: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone1T),
          anyTime: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          combatPreroll: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          combatPostroll: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        },
      }
    case 'KOSTCO_ANY_TIME':
      currentG = state.g.anyTime
      currentT = state.t.anyTime
      leaveAlone1G = state.g.combat
      leaveAlone2G = state.g.combatPreroll
      leaveAlone3G = state.g.combatPostroll
      leaveAlone4G = state.g.turnEnd
      leaveAlone1T = state.t.combat
      leaveAlone2T = state.t.combatPreroll
      leaveAlone3T = state.t.combatPostroll
      leaveAlone4T = state.t.turnEnd
      return {
        ...state,
        // anyTime: !state.anyTime,
        // combat: !state.anyTime ? false : state.combat,
        // turnEnd: !state.anyTime ? false : state.turnEnd
        g: {
          ...state.g,
          anyTime: CHECKG
            ?
            !currentG
            :
            currentG,
          combat: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          combatPreroll: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          combatPostroll: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          turnEnd: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
        },
        t: {
          ...state.t,
          anyTime: CHECKT
            ?
            !currentT
            :
            currentT,
          combat: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone1T),
          combatPreroll: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          combatPostroll: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          turnEnd: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        },
      }
    case 'KOSTCO_ACTION_TOKEN':
      currentG = state.g.actionToken
      currentT = state.t.actionToken
      return {
        ...state,
        g: {
          ...state.g,
          actionToken: (CHECKG
            ?
            !currentG
            :
            currentG),
        },
        t: {
          ...state.t,
          actionToken: (CHECKT
            ?
            !currentT
            :
            currentT),
        }
      }
    case 'KOSTCO_ASSIST':
      currentG = state.g.assist
      currentT = state.t.assist
      return {
        ...state,
        g: {
          ...state.g,
          assist: (CHECKG
            ?
            !currentG
            :
            currentG),
        },
        t: {
          ...state.t,
          assist: (CHECKT
            ?
            !currentT
            :
            currentT),
        }
      }
    case 'KOSTCO_HEALTH':
      currentG = state.g.health
      currentT = state.t.health
      const healthValG = (CHECKG && state.g.health) ? 0 : state.g.healthValue
      const healthValT = (CHECKT && state.t.health) ? 0 : state.t.healthValue
      return {
        ...state,
        g: {
          ...state.g,
          health: (CHECKG
            ?
            !currentG
            :
            currentG),
          healthValue: healthValG
        },
        t: {
          ...state.t,
          health: (CHECKT
            ?
            !currentT
            :
            currentT),
          healthValue: healthValT
        }
      }
    case 'HEALTH_VALUE':
      leaveAlone1G = state.g.healthValue
      leaveAlone1T = state.t.healthValue
      return {
        ...state,
        // healthValue: action.healthValue,
        // health: action.healthValue === 0 ? false : true
        g: {
          ...state.g,
          healthValue: (
            CHECKG
              ?
              action.healthValue
              :
              leaveAlone1G),
          health: (
            (CHECKG && action.healthValue !== 0)
              ?
              true
              :
              false)
        },
        t: {
          ...state.t,
          healthValue: (
            CHECKT
              ?
              action.healthValue
              :
              leaveAlone1T),
          health: (
            (CHECKT && action.healthValue !== 0)
              ?
              true
              :
              false)
        },
      }
    case 'KOSTCO_STRENGTH':
      currentG = state.g.strength
      currentT = state.t.strength
      const strengthValG = state.g.strength ? 0 : state.g.strengthValue
      const strengthValT = state.t.strength ? 0 : state.t.strengthValue
      return {
        ...state,
        g: {
          ...state.g,
          strength: (
            CHECKG
              ?
              !currentG
              :
              currentG),
          strengthValue: strengthValG
        },
        t: {
          ...state.t,
          strength: (
            CHECKT
              ?
              !currentT
              :
              currentT),
          strengthValue: strengthValT
        },
      }
    case 'STRENGTH_VALUE':
      leaveAlone1G = state.g.strengthValue
      leaveAlone1T = state.t.strengthValue
      return {
        ...state,
        // strengthValue: action.strengthValue,
        // strength: action.strengthValue === 0 ? false : true
        g: {
          ...state.g,
          strengthValue: (
            CHECKG
              ?
              action.strengthValue
              :
              leaveAlone1G),
          strength: (
            (CHECKG && action.strengthValue !== 0)
              ?
              true
              :
              false)
        },
        t: {
          ...state.t,
          strengthValue: (
            CHECKT
              ?
              action.strengthValue
              :
              leaveAlone1T),
          strength: (
            (CHECKT && action.strengthValue !== 0)
              ?
              true
              :
              false)
        },
      }
    default:
      return state
  }
}

export { defaultKostcoCardState, kostcoCardReducer }