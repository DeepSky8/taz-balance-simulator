import { ref, update } from "firebase/database"
import { db } from "../firebase/firebase"


export const toggleVillain = () => ({
   type: 'TOGGLE_VILLAIN'
})

export const toggleRelic = () => ({
   type: 'TOGGLE_RELIC'
})

export const toggleLocation = () => ({
   type: 'TOGGLE_LOCATION'
})

export const startSetVillain = (
   gameID,
   codeVillain
) => {
   
   const updates = {}
   updates['gameSetup/' + gameID + '/static/codeVillain'] = codeVillain;
   update(ref(db), updates)
}

export const startSetRelic = (
   gameID,
   codeRelic
) => {
   
   const updates = {}
   updates['gameSetup/' + gameID + '/static/codeRelic'] = codeRelic;
   update(ref(db), updates)
}

export const startSetLocation = (
   gameID,
   codeLocation
) => {
   
   const updates = {}
   updates['gameSetup/' + gameID + '/static/codeLocation'] = codeLocation;
   update(ref(db), updates)
}

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