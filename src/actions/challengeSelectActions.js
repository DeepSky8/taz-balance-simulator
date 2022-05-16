import { ref, update } from "firebase/database"
import { db } from "../firebase/firebase"

// Local Actions
export const toggleVillain = () => ({
   type: 'TOGGLE_VILLAIN'
})

export const toggleRelic = () => ({
   type: 'TOGGLE_RELIC'
})

export const toggleLocation = () => ({
   type: 'TOGGLE_LOCATION'
})

export const setReceivedVillainObject = (receivedVillainObject) => ({
   type: 'RECEIVE_VILLAIN',
   receivedVillainObject
})

export const setReceivedRelicObject = (receivedRelicObject) => ({
   type: 'RECEIVE_RELIC',
   receivedRelicObject
})

export const setReceivedLocationObject = (receivedLocationObject) => ({
   type: 'RECEIVE_LOCATION',
   receivedLocationObject
})


// Cloud Actions

export const startSetVillain = (gameID, villainCode) => {
   const updates = {}
   updates['activeGames/' + gameID + '/challengesObject/villainCode'] = villainCode;
   update(ref(db), updates)
}

export const startSetRelic = (gameID, relicCode) => {
   const updates = {}
   updates['activeGames/' + gameID + '/challengesObject/relicCode'] = relicCode;
   update(ref(db), updates)
}

export const startSetLocation = (gameID, locationCode) => {
   const updates = {}
   updates['activeGames/' + gameID + '/challengesObject/locationCode'] = locationCode;
   update(ref(db), updates)
}