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

export const startSetChallenges = (
   challengeCodes,
   uid
) => {
   const updates = {}
   updates['users/' + uid + '/currentActiveGame'] = challengeCodes;
   // updates['users/' + uid + '/currentGames/' + gameID] = challengeCodes;
   update(ref(db), updates)
}



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