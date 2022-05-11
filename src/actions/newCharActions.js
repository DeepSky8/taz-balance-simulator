export const setCharClassCode = (charClassCode) => ({
    type: 'SET_CHAR_CLASS_CODE',
    charClassCode
})

export const setCharRaceCode = (charRaceCode) => ({
    type: 'SET_CHAR_RACE_CODE',
    charRaceCode
})

export const setHumanBardBand = (humanBardBand) => ({
    type: 'SET_HUMAN_BARD_BAND',
    humanBardBand
})

export const setRobotBardCreator = (robotBardCreator) => ({
    type: 'SET_ROBOT_BARD_CREATOR',
    robotBardCreator
})

export const setRobotBardVisual = (robotBardVisual) => ({
    type: 'SET_ROBOT_BARD_VISUAL',
    robotBardVisual
})

export const setCharToolCode = (charToolCode) => ({
    type: 'SET_CHAR_TOOL_CODE',
    charToolCode
})

export const setBardSuperGoal = (bardSuperGoal) => ({
    type: 'SET_BARD_SUPER_GOAL',
    bardSuperGoal
})

export const resetDefaultNewChar = () => ({
    type: 'RESET_DEFAULTS'
})