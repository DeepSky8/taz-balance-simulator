export const clearKostcoStrengthBonuses = () => ({
    type: 'CLEAR_KOSTCO_STRENGTH_BONUSES'
})

const addKostcoMagicStrength = (kard) => ({
    type: 'ADD_MAGIC_STRENGTH',
    kard
})

const addKostcoMonsterStrength = (kard) => ({
    type: 'ADD_MONSTER_STRENGTH',
    kard
})

const addKostcoSpookyStrength = (kard) => ({
    type: 'ADD_SPOOKY_STRENGTH',
    kard
})

const addKostcoTrapStrength = (kard) => ({
    type: 'ADD_TRAP_STRENGTH',
    kard
})

const addKostcoUndefinedStrength = (kard) => ({
    type: 'ADD_UNDEFINED_STRENGTH',
    kard
})

export const extractKostcoBonuses = (kard) => ({
    type: 'EXTRACT_KOSTCO_BONUSES',
    kard
})