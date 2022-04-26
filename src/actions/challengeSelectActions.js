export const toggleVillain = () => ({
   type: 'TOGGLE_VILLAIN'
})

export const toggleRelic = () => ({
   type: 'TOGGLE_RELIC'
})

export const toggleLocation = () => ({
   type: 'TOGGLE_LOCATION'
})

export const setVillainObject = (selectedVillainObject) => ({ 
   type: 'SET_VILLAIN', 
   selectedVillainObject
})
export const setRelicObject = (selectedRelicObject) => ({ 
   type: 'SET_RELIC', 
   selectedRelicObject
})
export const setLocationObject = (selectedLocationObject) => ({ 
   type: 'SET_LOCATION', 
   selectedLocationObject
})