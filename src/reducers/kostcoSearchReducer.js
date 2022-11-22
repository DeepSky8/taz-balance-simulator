
const defaultKostcoSearchState = {
  // Search Parameters
  terms: '',
  kTitle: true,
  kOngoing: true,
  kOneshot: true,
  kFlavor: false,
  fOngoing: true,
  fOneshot: true,

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
    assistExtraValue: 0, // new

    // Changes numbers
    health: false,
    healthValue: 0,
    strength: false,
    strengthValue: 0,
    damage: false, // new abc
    damageValue: 0, // new a

    // Special
    special: false, // new ab
    switcharoo: false, // new
    safetyHarness: false, // new
    giantSlayerBonus: false, // new
    pocketSpa: false, // new
    fannypack: false, // new
    ringGreed: false, // new
    stevenGoldfish: false, // new
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
    special: false, // new
    flaregun: false, // new
    prongles: false, // new
    crit50: false, // new
    ringRecall: false, // new

  }

}

const kostcoSearchReducer = (state, action) => {
  const CHECKG = action.flagType === 'g'
  const CHECKT = action.flagType === 't'

  let currentG = false
  let currentT = false

  let leaveAlone1G = false
  let leaveAlone1T = false

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
    case 'SEARCH_ONGOING_FLAGS':
      return {
        ...state,
        fOngoing: !state.fOngoing
      }
    case 'SEARCH_ONESHOT_FLAGS':
      return {
        ...state,
        fOneshot: !state.fOneshot
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
      currentT = state.t.combat
      return {
        ...state,
        g: {
          ...state.g,
          combat: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          combat: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'COMBAT_PREROLL':
      currentG = state.g.combatPreroll
      currentT = state.t.combatPreroll
      return {
        ...state,
        g: {
          ...state.g,
          combatPreroll: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          combatPreroll: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'COMBAT_POSTROLL':
      currentG = state.g.combatPostroll
      currentT = state.t.combatPostroll
      return {
        ...state,
        g: {
          ...state.g,
          combatPostroll: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          combatPostroll: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_TURN_END':
      currentG = state.g.turnEnd
      currentT = state.t.turnEnd
      return {
        ...state,
        g: {
          ...state.g,
          turnEnd: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          turnEnd: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    case 'KOSTCO_ANY_TIME':
      currentG = state.g.anyTime
      currentT = state.t.anyTime
      return {
        ...state,
        g: {
          ...state.g,
          anyTime: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          anyTime: CHECKT
            ?
            !currentT
            :
            currentT
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
    // case 'REQUIRE_SPEND_TOKEN':
    //   currentG = state.g.requireSpendToken
    //   currentT = state.t.requireSpendToken
    //   return {
    //     ...state,
    //     g: {
    //       ...state.g,
    //       requireSpendToken: (CHECKG
    //         ?
    //         !currentG
    //         :
    //         currentG
    //       )
    //     },
    //     t: {
    //       ...state.t,
    //       requireSpendToken: (CHECKT
    //         ?
    //         !currentT
    //         :
    //         currentT
    //       )
    //     }
    //   }
    case 'KOSTCO_STRENGTH':
      currentG = state.g.strength
      currentT = state.t.strength
      return {
        ...state,
        g: {
          ...state.g,
          strength: (CHECKG
            ?
            !currentG
            :
            currentG),
        },
        t: {
          ...state.t,
          strength: (CHECKT
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
            leaveAlone1G)
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
      return {
        ...state,
        g: {
          ...state.g,
          assistExtra: (CHECKG
            ?
            !currentG
            :
            currentG
          ),
          assist: (CHECKG && !currentG
            ?
            true
            :
            leaveAlone1G),
        }
      }
    case 'KOSTCO_HEALTH':
      currentG = state.g.health
      currentT = state.t.health
      return {
        ...state,
        g: {
          ...state.g,
          health: (CHECKG
            ?
            !currentG
            :
            currentG),
        },
        t: {
          ...state.t,
          health: (CHECKT
            ?
            !currentT
            :
            currentT),
        }
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

    case 'TOGGLE_ALL':
      const toggleTO = !state.g.magic
      return {
        ...state,
        g: {
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
          combatPostroll: toggleTO,
          turnEnd: toggleTO,
          anyTime: toggleTO,

          // Others
          actionToken: toggleTO,
          addStrength: toggleTO,
          assist: toggleTO,
          health: toggleTO,
        },
        t: {
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
          combatPostroll: toggleTO,
          turnEnd: toggleTO,
          anyTime: toggleTO,

          // Others
          actionToken: toggleTO,
          addStrength: toggleTO,
          assist: toggleTO,
          health: toggleTO,
        }
      }
    case 'KOSTCO_SPECIAL':
      currentG = state.g.special
      currentT = state.t.special
      return {
        ...state,
        g: {
          ...state.g,
          special: CHECKG
            ?
            !currentG
            :
            currentG
        },
        t: {
          ...state.t,
          special: CHECKT
            ?
            !currentT
            :
            currentT
        },
      }
    default:
      return state
  }
}

export { defaultKostcoSearchState, kostcoSearchReducer }