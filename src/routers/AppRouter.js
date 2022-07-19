import React from "react";
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import ChooseMode from "../components/Authentication/ChooseMode";
import FirebaseSignIn from '../components/Authentication/FirebaseSignIn';
import NotFoundPage from "../components/Authentication/NotFoundPage";
import PrivacyPolicy from "../components/Authentication/PrivacyPolicy";
import Tos from "../components/Authentication/Tos";
import Welcome from "../components/Authentication/Welcome";
import { RefreshHelper } from "../components/functions/RefreshHelper";
import GameSetup from "../components/elements/GameSetup/GameSetup";
import CharacterSheet from "../components/elements/CharacterSheet/CharacterSheet";
import ActiveGame from "../components/elements/ActiveGame/ActiveGame";
export const history = createBrowserHistory();


const AppRouter = () => {

    // const [charArray, setCharArray] = useState([])
    // const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    // const [userState, dispatchUserState] = useReducer(userReducer, defaultUserProfile)
    // const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)
    // const [savedGameArray, setSavedGameArray] = useState([])

    // This listener updates the local state to 
    // mirror the user account in the cloud
    // useEffect(() => {
    //     onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {
    //         // If there is a user account in the cloud
    //         if (snapshot.exists()) {
    //             // console.log('snapshot state from server: ', snapshot.val())
    //             dispatchUserState(updateUserState(snapshot.val()))

    //             // const anonymousUID = snapshot.val().anonymousUID
    //             // // If the user account has an associated anonymous user account
    //             // // get the data from that account and copy it into the signed-in account
    //             // // then remove the anonymous account record
    //             // // then remove the anonymous account association from the user account            
    //             // if (anonymousUID) {
    //             //     get(ref(db, 'users/' + anonymousUID), (snapshot) => {
    //             //         update(ref(db, 'users/' + authUID), { ...snapshot.val() })
    //             //     })
    //             //         .then(() => {
    //             //             remove(ref(db, 'users/' + anonymousUID))
    //             //         })
    //             // }
    //             // update(ref(db, 'users/' + authUID), { anonymousUID: null })
    //             // Send the cloud data to local SetupState

    //         }
    //     })

    //     // When this element is closed, remove the listener on the user account
    //     return (() => {
    //         off(ref(db, 'users/' + auth.currentUser.uid))
    //     })
    // }, [])


    // // Listen to the cloud list of characters created by this user
    // // When the list changes, set the new list in local storage
    // // if in Active game status, only get the current character
    // useEffect(() => {


    //     if (userState.gameStatus === 'setup') {

    //         // If the game is in Setup mode, get the list of characters
    //         // associated with current user
    //         onValue(ref(db, 'characters/' + auth.currentUser.uid), (snapshot) => {
    //             const characterArray = [];
    //             // Get the list of characters determed by mode
    //             // and store them locally for use by the following useEffect
    //             console.log('gameStatus setup')
    //             if (snapshot.exists()) {
    //                 // characterArray = [];
    //                 snapshot.forEach(childSnapShot => {
    //                     characterArray.push(childSnapShot.val())
    //                 })
    //             }
    //             console.log('character array Setup: ', characterArray)
    //             setCharArray(characterArray)
    //         })
    //     } else if (gameState.activePlayer && userState.gameStatus === 'active') {

    //         // If the game is in Active mode and also has an active player
    //         // get the character information for the current character
    //         console.log('gameStatus active')
    //         onValue(ref(db, 'characters/' + gameState.activePlayer.uid + '/' + gameState.activePlayer.currentCharacterID), (snapshot) => {
    //             const characterArray = [];
    //             if (snapshot.exists()) {
    //                 // characterArray = [];
    //                 snapshot.forEach(childSnapShot => {

    //                     characterArray.push(childSnapShot.val())
    //                 })
    //                 // Should only be one character at this location
    //             }
    //             console.log('character array Active: ', characterArray)
    //             setCharArray(characterArray)
    //         })
    //     }


    //     return (() => {
    //         off(ref(db, 'characters/' + auth.currentUser.uid))
    //         if (gameState.activePlayer !== null) {
    //             off(ref(db, 'characters/' + gameState.activePlayer.uid + '/' + gameState.activePlayer.currentCharacterID))
    //         }
    //     })

    // }, [userState.gameStatus, gameState.activePlayer])



    // // Update the current character state from the array of characters
    // // obtained when userState.gameStatus or gameState.activePlayer
    // // are updated (previous useEffect)
    // useEffect(() => {
    //     if (userState.gameStatus === 'active') {
    //         // If a game is active, reference the gameState.activePlayer
    //         // to pull the correct character sheet
    //         if (gameState.activePlayer) {
    //             let charObject = charArray.find(character =>
    //                 character.charID === gameState.activePlayer.currentCharacterID)
    //             dispatchCharState(setCharState(charObject))
    //         }
    //     } else {
    //         // If a game is not active, default display the 
    //         // current user's current character
    //         if (userState.currentCharacterID) {
    //             let charObject = charArray.find(character =>
    //                 character.charID === userState.currentCharacterID)
    //             dispatchCharState(setCharState(charObject))
    //         } else {
    //             dispatchCharState(setNoCurrentChar())
    //         }
    //     }
    // }, [userState.currentCharacterID, charArray, userState.gameStatus, gameState.activePlayer])

    // useEffect(() => {
    //     console.log('userState changed: ', userState)
    // }, [userState])

    // useEffect(() => {
    //     console.log('gameState changed: ', gameState)
    // }, [gameState])

    // useEffect(() => {
    //     console.log('character state changed: ', charState)
    // }, [charState])

    // useEffect(() => {
    //     console.log('character array changed: ', charArray)
    // }, [charArray])

    return (

        <HistoryRouter history={history}>

            <div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path='/chooseMode/' element={<ChooseMode />} />
                    <Route path='/gameSetup/*' element={<GameSetup />} />
                    <Route path="/charactersheet/*" element={<CharacterSheet />} />
                    <Route path="/activeGame/*" element={<ActiveGame />} />
                    <Route path="/signIn" element={<FirebaseSignIn />} />
                    <Route path='/refreshHelper' element={<RefreshHelper />} />
                    <Route path="termsofservice" element={<Tos />} />
                    <Route path="privacypolicy" element={<PrivacyPolicy />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>

        </HistoryRouter>




    )
}

export default AppRouter;

// userState={userState}
// dispatchGameState={dispatchGameState}
// gameState={gameState}
// charState={charState}
// setSavedGameArray={setSavedGameArray}


// <ChallengeSelect
//     userState={userState}
//     gameState={gameState}
// >
//     <SavedGames
//         gameState={gameState}
//     />
// </ChallengeSelect>


// <JoiningHosting
//     userState={userState}
//     dispatchGameState={dispatchGameState}
// />


// <Route path='Bard/*'
//                             element={<AttributePicker
//                                 charState={charState}
//                                 dispatchCharState={dispatchCharState}
//                             />}
//                         />
//                         <Route path='Priest/*'
//                             element={<AttributePicker
//                                 charState={charState}
//                                 dispatchCharState={dispatchCharState}
//                             />}
//                         />
//                         <Route path='Rogue/*'
//                             element={<AttributePicker
//                                 charState={charState}
//                                 dispatchCharState={dispatchCharState}
//                             />}
//                         />
//                         <Route path='Warrior/*'
//                             element={<AttributePicker
//                                 charState={charState}
//                                 dispatchCharState={dispatchCharState}
//                             />}
//                         />
//                         <Route path='Wizard/*'
//                             element={<AttributePicker
//                                 charState={charState}
//                                 dispatchCharState={dispatchCharState}
//                             />}
//                         />















// <FirebaseAppProvider firebaseConfig={uiConfig}>
// <AuthProvider sdk={auth}>
//     <DatabaseProvider sdk={db}>

//     </DatabaseProvider>
// </AuthProvider>
// </FirebaseAppProvider>

// <ViewEditCharacter
// newCharState={newCharState}
// dispatchNewCharState={dispatchNewCharState}
// charArray={charArray}
// >
// </ViewEditCharacter>

// <Route path='bard/:characterID'
// element={<Bard
//     newCharState={newCharState}
//     dispatchNewCharState={dispatchNewCharState}
// />} />