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

const setVillainObject = (selectedVillainObject) => ({
   type: 'SET_VILLAIN',
   selectedVillainObject
})

const setRelicObject = (selectedRelicObject) => ({
   type: 'SET_RELIC',
   selectedRelicObject
})

const setLocationObject = (selectedLocationObject) => ({
   type: 'SET_LOCATION',
   selectedLocationObject
})

export const startSetVillain = (
   gameID,
   villainCode
) => {
   
   const updates = {}
   updates['activeGames/' + gameID + '/challengesObject/villainCode'] = villainCode;
   // updates['users/' + uid + '/currentGames/' + gameID] = challengeCodes;
   update(ref(db), updates)
}

export const startSetRelic = (
   gameID,
   relicCode
) => {
   
   const updates = {}
   updates['activeGames/' + gameID + '/challengesObject/relicCode'] = relicCode;
   // updates['users/' + uid + '/currentGames/' + gameID] = challengeCodes;
   update(ref(db), updates)
}

export const startSetLocation = (
   gameID,
   locationCode
) => {
   
   const updates = {}
   updates['activeGames/' + gameID + '/challengesObject/locationCode'] = locationCode;
   // updates['users/' + uid + '/currentGames/' + gameID] = challengeCodes;
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


// const challengeCodeParser = (challengeCode) => {
//     const codeType = challengeCode.split('')[0]
//     switch (codeType) {
//         case 'v':
//             return { villainCode: challengeCode }
//         case 'r':
//             return { relicCode: challengeCode }
//         case 'l':
//             return { locationCode: challengeCode }
//         default:
//             return {}
//     }
// }