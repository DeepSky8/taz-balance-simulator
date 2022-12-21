const kostcoDefaultStrengthObject = {
    kID: '0',
    kTitle: '',
    gMagic: 0,
    gMonster: 0,
    gSpooky: 0,
    gTrap: 0,
    gUndefined: 0,
}

const defaultKostcoStrengthBonuses = {
    kostcoMagic: 0,
    kostcoMonster: 0,
    kostcoSpooky: 0,
    kostcoTrap: 0,
    kostcoUndefined: 0,
    kostcoObjects: [
        kostcoDefaultStrengthObject
    ]
}

const kostcoStrengthBonusesReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_KOSTCO_STRENGTH_BONUSES':
            return {
                ...defaultKostcoStrengthBonuses
            }
        case 'ADD_MAGIC_STRENGTH':
            const magicStrength = parseInt(action.kard.g.strengthValue)
            return {
                ...defaultKostcoStrengthBonuses,
                ...state,
                kostcoMagic: state.kostcoMagic + magicStrength,
                kostcoObjects: state
                    .kostcoObjects
                    .filter(obj => obj.kID !== '0')
                    .concat(
                        {
                            ...kostcoDefaultStrengthObject,
                            kID: action.kard.kID,
                            kTitle: action.kard.kTitle,
                            gMagic: magicStrength
                        }
                    )
            }

        case 'ADD_MONSTER_STRENGTH':
            const monsterStrength = parseInt(action.kard.g.strengthValue)
            return {
                ...defaultKostcoStrengthBonuses,
                ...state,
                kostcoMonster: state.kostcoMonster + monsterStrength,
                kostcoObjects: state
                    .kostcoObjects
                    .filter(obj => obj.kID !== '0')
                    .concat(
                        {
                            ...kostcoDefaultStrengthObject,
                            kID: action.kard.kID,
                            kTitle: action.kard.kTitle,
                            gMonster: monsterStrength
                        }
                    )
            }

        case 'ADD_SPOOKY_STRENGTH':
            const spookyStrength = parseInt(action.kard.g.strengthValue)
            return {
                ...defaultKostcoStrengthBonuses,
                ...state,
                kostcoSpooky: state.kostcoSpooky + spookyStrength,
                kostcoObjects: state
                    .kostcoObjects
                    .filter(obj => obj.kID !== '0')
                    .concat(
                        {
                            ...kostcoDefaultStrengthObject,
                            kID: action.kard.kID,
                            kTitle: action.kard.kTitle,
                            gSpooky: spookyStrength
                        }
                    )
            }

        case 'ADD_TRAP_STRENGTH':
            const trapStrength = parseInt(action.kard.g.strengthValue)
            return {
                ...defaultKostcoStrengthBonuses,
                ...state,
                kostcoTrap: state.kostcoTrap + trapStrength,
                kostcoObjects: state
                    .kostcoObjects
                    .filter(obj => obj.kID !== '0')
                    .concat(
                        {
                            ...kostcoDefaultStrengthObject,
                            kID: action.kard.kID,
                            kTitle: action.kard.kTitle,
                            gTrap: trapStrength
                        }
                    )
            }

        case 'ADD_UNDEFINED_STRENGTH':
            const undefinedStrength = parseInt(action.kard.g.strengthValue)
            return {
                ...defaultKostcoStrengthBonuses,
                ...state,
                kostcoUndefined: state.kostcoUndefined + undefinedStrength,
                kostcoObjects: state
                    .kostcoObjects
                    .filter(obj => obj.kID !== '0')
                    .concat(
                        {
                            ...kostcoDefaultStrengthObject,
                            kID: action.kard.kID,
                            kTitle: action.kard.kTitle,
                            gUndefined: undefinedStrength
                        }
                    )
            }
        case 'EXTRACT_KOSTCO_BONUSES':
            const gMagic = action.kard.g.magic ? parseInt(action.kard.g.strengthValue) : 0
            const gMonster = action.kard.g.monster ? parseInt(action.kard.g.strengthValue) : 0
            const gSpooky = action.kard.g.spooky ? parseInt(action.kard.g.strengthValue) : 0
            const gTrap = action.kard.g.trap ? parseInt(action.kard.g.strengthValue) : 0
            const gUndefined = (
                (
                    action.kard.g.strength &&
                    !action.kard.g.magic &&
                    !action.kard.g.monster &&
                    !action.kard.g.spooky &&
                    !action.kard.g.trap
                ) ? parseInt(action.kard.g.strengthValue) : 0
            )
            return {
                ...defaultKostcoStrengthBonuses,
                ...state,
                kostcoMagic: state.kostcoMagic + gMagic,
                kostcoMonster: state.kostcoMonster + gMonster,
                kostcoSpooky: state.kostcoSpooky + gSpooky,
                kostcoTrap: state.kostcoTrap + gTrap,
                kostcoUndefined: state.kostcoUndefined + gUndefined,
                kostcoObjects: state
                .kostcoObjects
                .filter(obj => obj.kID !== '0')
                .concat(
                    {
                        ...kostcoDefaultStrengthObject,
                        kID:action.kard.kID ,
                        kTitle: action.kard.kTitle,
                    }
                )
            }

        default:
            return state;
    }

}

export {
    //kostcoDefaultStrength, 
    defaultKostcoStrengthBonuses, kostcoStrengthBonusesReducer
}