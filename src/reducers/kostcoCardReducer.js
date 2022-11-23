
const defaultKostcoCardState = {
  // elements beginning with 'k' are reserved
  // for text-searchable strings
  kID: '0',
  kTitle: '',
  kOngoing: '',
  kOneshot: '',
  kFlavor: '',

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

    // Action Token
    actionToken: false,

    // Assist
    assist: false,
    assistExtra: false, // new abc
    assistValue: 0, // new abc

    // Changes numbers
    health: false,
    healthValue: 0,
    strength: false,
    strengthValue: 0,
    damage: false, // new abc
    damageValue: -1, // new abc

    // Special
    special: false, // new abc
    switcharoo: false, // new abc
    safetyHarness: false, // new abc
    giantSlayer: false, // new abc
    pocketSpa: false, // new abc
    fannypack: false, // new abc
    ringGreed: false, // new abc
    stevenGoldfish: false, // new abc
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

    // Action Token
    actionToken: false,
    // requireSpendToken: false, // new a

    // Assist
    assist: false,

    // Changes numbers
    health: false,
    healthValue: 0,
    strength: false,
    strengthValue: 0,
    damage: false, // new
    damageValue: 0, // new

    // Special
    special: false, // new abc
    flaregun: false, // new abc
    prongles: false, // new abc
    crit50: false, // new abc
    ringRecall: false, // new abc
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
  let leaveAlone5G = false
  let leaveAlone6G = false
  let leaveAlone7G = false


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
      leaveAlone1G = state.g.assistExtra
      leaveAlone2G = state.g.assistValue
      return {
        ...state,
        g: {
          ...state.g,
          assist: (CHECKG
            ?
            !currentG
            :
            currentG),
          assistExtra: (CHECKG && currentG
            ?
            false
            :
            leaveAlone1G
          ),
          assistValue: (CHECKG && currentG
            ?
            0
            :
            leaveAlone2G),
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
    case 'ASSIST_EXTRA':
      currentG = state.g.assistExtra
      leaveAlone1G = state.g.assist
      leaveAlone2G = state.g.assistValue
      return {
        ...state,
        g: {
          ...state.g,
          assistExtra: (CHECKG
            ?
            !currentG
            :
            currentG),
          assist: (CHECKG && !currentG
            ?
            true
            :
            leaveAlone1G),
          assistValue: (CHECKG && !currentG
            ?
            leaveAlone2G
            :
            0
          )
        },

      }
    case 'ASSIST_VALUE':
      leaveAlone1G = state.g.assistValue
      leaveAlone2G = state.g.assist
      return {
        ...state,
        g: {
          ...state.g,
          assistValue: (CHECKG
            ?
            action.assistValue
            :
            leaveAlone1G),
          assist: (
            (CHECKG && action.assistValue !== 0)
              ?
              true
              :
              leaveAlone2G),
          assistExtra: (
            (CHECKG && action.assistValue !== 0)
              ?
              true
              :
              false
          )
        },
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
    case 'KOSTCO_DAMAGE':
      currentG = state.g.damage
      currentT = state.t.damage
      return {
        ...state,
        g: {
          ...state.g,
          damage: (CHECKG
            ?
            !currentG
            :
            currentG),
        },
        t: {
          ...state.t,
          damage: (CHECKT
            ?
            !currentT
            :
            currentT),
        }
      }
    case 'DAMAGE_VALUE':
      leaveAlone1G = state.g.damageValue
      leaveAlone1T = state.t.damageValue
      return {
        ...state,

        g: {
          ...state.g,
          damageValue: (
            CHECKG
              ?
              action.damageValue
              :
              leaveAlone1G),
          damage: (
            (CHECKG && action.damageValue !== 0)
              ?
              true
              :
              false)
        },
        t: {
          ...state.t,
          damageValue: (
            CHECKT
              ?
              action.damageValue
              :
              leaveAlone1T),
          damage: (
            (CHECKT && action.damageValue !== 0)
              ?
              true
              :
              false)
        },
      }
    case 'KOSTCO_SPECIAL':
      currentG = state.g.special
      currentT = state.t.special
      leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish

      leaveAlone1T = state.t.flaregun
      leaveAlone2T = state.t.prongles
      leaveAlone3T = state.t.crit50
      leaveAlone4T = state.t.ringRecall
      return {
        ...state,
        g: {
          ...state.g,
          special: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && currentG
            ?
            false
            :
            leaveAlone1G),
          safetyHarness: (CHECKG && currentG
            ?
            false
            :
            leaveAlone2G),
          giantSlayer: (CHECKG && currentG
            ?
            false
            :
            leaveAlone3G),
          pocketSpa: (CHECKG && currentG
            ?
            false
            :
            leaveAlone4G),
          fannypack: (CHECKG && currentG
            ?
            false
            :
            leaveAlone5G),
          ringGreed: (CHECKG && currentG
            ?
            false
            :
            leaveAlone6G),
          stevenGoldfish: (CHECKG && currentG
            ?
            false
            :
            leaveAlone7G),
        },
        t: {
          ...state.t,
          special: (CHECKT
            ?
            !currentT
            :
            currentT),
          flaregun: (CHECKT && currentT
            ?
            false
            :
            leaveAlone1T),
          prongles: (CHECKT && currentT
            ?
            false
            :
            leaveAlone2T),
          crit50: (CHECKT && currentT
            ?
            false
            :
            leaveAlone3T),
          ringRecall: (CHECKT && currentT
            ?
            false
            :
            leaveAlone4T),
        },
      }
    case 'SPECIAL_SWITCHAROO':
      currentG = state.g.switcharoo
      // leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          switcharoo: (CHECKG
            ?
            !currentG
            :
            currentG),
          safetyHarness: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          giantSlayer: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          pocketSpa: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
          fannypack: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone5G),
          ringGreed: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone6G),
          stevenGoldfish: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone7G),
        }
      }
    case 'SPECIAL_HARNESS':
      currentG = state.g.safetyHarness
      leaveAlone1G = state.g.switcharoo
      // leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          safetyHarness: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          giantSlayer: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          pocketSpa: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
          fannypack: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone5G),
          ringGreed: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone6G),
          stevenGoldfish: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone7G),
        }
      }
    case 'SPECIAL_SLAYER':
      currentG = state.g.giantSlayer
      leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      // leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          giantSlayer: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          safetyHarness: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          pocketSpa: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
          fannypack: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone5G),
          ringGreed: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone6G),
          stevenGoldfish: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone7G),
        }
      }
    case 'SPECIAL_SPA':
      currentG = state.g.pocketSpa
      leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      // leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          pocketSpa: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          safetyHarness: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          giantSlayer: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          fannypack: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone5G),
          ringGreed: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone6G),
          stevenGoldfish: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone7G),
        }
      }
    case 'SPECIAL_FANNYPACK':
      currentG = state.g.fannypack
      leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      // leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          fannypack: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          safetyHarness: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          giantSlayer: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          pocketSpa: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
          ringGreed: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone6G),
          stevenGoldfish: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone7G),
        }
      }
    case 'SPECIAL_GREED':
      currentG = state.g.ringGreed
      leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      // leaveAlone6G = state.g.ringGreed
      leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          ringGreed: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          safetyHarness: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          giantSlayer: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          pocketSpa: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
          fannypack: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone5G),
          stevenGoldfish: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone7G),
        }
      }
    case 'SPECIAL_STEVEN':
      currentG = state.g.stevenGoldfish
      leaveAlone1G = state.g.switcharoo
      leaveAlone2G = state.g.safetyHarness
      leaveAlone3G = state.g.giantSlayer
      leaveAlone4G = state.g.pocketSpa
      leaveAlone5G = state.g.fannypack
      leaveAlone6G = state.g.ringGreed
      // leaveAlone7G = state.g.stevenGoldfish
      return {
        ...state,
        g: {
          ...state.g,
          stevenGoldfish: (CHECKG
            ?
            !currentG
            :
            currentG),
          switcharoo: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone1G),
          safetyHarness: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone2G),
          giantSlayer: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone3G),
          pocketSpa: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone4G),
          fannypack: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone5G),
          ringGreed: (CHECKG && !currentG
            ?
            false
            :
            leaveAlone6G),
        }
      }
    case 'SPECIAL_FLAREGUN':
      currentT = state.g.flaregun
      // leaveAlone1T = state.t.flaregun
      leaveAlone2T = state.t.prongles
      leaveAlone3T = state.t.crit50
      leaveAlone4T = state.t.ringRecall
      return {
        ...state,
        t: {
          ...state.t,
          flaregun: (CHECKT
            ?
            !currentT
            :
            currentT),
          // flaregun: (CHECKT && !currentT
          //   ?
          //   false
          //   :
          //   leaveAlone1T),
          prongles: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          crit50: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          ringRecall: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        }
      }
    case 'SPECIAL_PRONGLES':
      currentT = state.g.prongles
      leaveAlone1T = state.t.flaregun
      // leaveAlone2T = state.t.prongles
      leaveAlone3T = state.t.crit50
      leaveAlone4T = state.t.ringRecall
      return {
        ...state,
        t: {
          ...state.t,
          prongles: (CHECKT
            ?
            !currentT
            :
            currentT),
          flaregun: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone1T),
          // prongles: (CHECKT && !currentT
          //   ?
          //   false
          //   :
          //   leaveAlone2T),
          crit50: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          ringRecall: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        }
      }
    case 'SPECIAL_CRIT50':
      currentT = state.g.crit50
      leaveAlone1T = state.t.flaregun
      leaveAlone2T = state.t.prongles
      // leaveAlone3T = state.t.crit50
      leaveAlone4T = state.t.ringRecall
      return {
        ...state,
        t: {
          ...state.t,
          crit50: (CHECKT
            ?
            !currentT
            :
            currentT),
          flaregun: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone1T),
          prongles: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          // crit50: (CHECKT && !currentT
          //   ?
          //   false
          //   :
          //   leaveAlone3T),
          ringRecall: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone4T),
        }
      }
    case 'SPECIAL_RECALL':
      currentT = state.g.ringRecall
      leaveAlone1T = state.t.flaregun
      leaveAlone2T = state.t.prongles
      leaveAlone3T = state.t.crit50
      // leaveAlone4T = state.t.ringRecall
      return {
        ...state,
        t: {
          ...state.t,
          ringRecall: (CHECKT
            ?
            !currentT
            :
            currentT),
          flaregun: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone1T),
          prongles: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone2T),
          crit50: (CHECKT && !currentT
            ?
            false
            :
            leaveAlone3T),
          // ringRecall: (CHECKT && !currentT
          //   ?
          //   false
          //   :
          //   leaveAlone4T),
        }
      }


    default:
      return state
  }
}

export { defaultKostcoCardState, kostcoCardReducer }