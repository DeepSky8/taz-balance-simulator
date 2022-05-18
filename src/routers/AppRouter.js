import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
    get,
    off,
    onValue,
    ref,
    set,
} from "firebase/database";
import { defaultUserProfile, userReducer } from "../reducers/userReducer";
import { defaultGameState, gameReducer } from "../reducers/gameReducer";
// import { defaultNewCharState, newCharReducer } from "../reducers/newCharReducer";
import { defaultCharState, charReducer } from "../reducers/charReducer";
import ActiveGame from "../components/elements/ActiveGame"
import AuthWrapper from "../components/elements/AuthWrapper";
import ChallengeSelect from "../components/elements/ChallengeSelect";
import ChooseMode from "../components/elements/ChooseMode";
import FirebaseSignIn from '../components/elements/FirebaseSignIn';
import GameSetup from "../components/elements/GameSetup";
import JoiningHosting from "../components/elements/JoiningHosting";
import NotFoundPage from "../components/elements/NotFoundPage";
import PrivacyPolicy from "../components/elements/PrivacyPolicy";
import Tos from "../components/elements/Tos";
import Welcome from "../components/elements/Welcome";
import { auth, db } from "../firebase/firebase";
import { setCharacterListArray, updateUserState } from "../actions/userActions";

import PartyMembers from "../components/elements/Party/PartyMembers";
import CharacterSelect from "../components/elements/Party/CharacterSelect";
import CharacterSheet from "../components/elements/Party/CharacterSheet";
import Bard from "../components/classes/Bard";
import Cleric from "../components/classes/Cleric";
import Test from "../components/classes/Test";
import { setCharState, setNoCurrentChar } from "../actions/charActions";
import ViewEditCharacter from "../components/elements/Party/ViewEditCharacter";
import { getAuth } from "firebase/auth";
import { RefreshHelper } from "../components/functions/RefreshHelper";

export const history = createBrowserHistory();


const AppRouter = () => {
    const [gameArray, setGameArray] = useState([])
    const [charArray, setCharArray] = useState([])
    const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    const [userState, dispatchUserState] = useReducer(userReducer, defaultUserProfile)
    const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)



    //user.val().lastActivity < (Date.now() - 86400000) || user.val().lastActivity === null


    // This listener updates the local state to 
    // mirror the user account in the cloud
    useEffect(() => {
        onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            // If there is a user account in the cloud
            if (snapshot.exists()) {
                // console.log('snapshot state from server: ', snapshot.val())
                dispatchUserState(updateUserState(snapshot.val()))

                // const anonymousUID = snapshot.val().anonymousUID
                // // If the user account has an associated anonymous user account
                // // get the data from that account and copy it into the signed-in account
                // // then remove the anonymous account record
                // // then remove the anonymous account association from the user account            
                // if (anonymousUID) {
                //     get(ref(db, 'users/' + anonymousUID), (snapshot) => {
                //         update(ref(db, 'users/' + authUID), { ...snapshot.val() })
                //     })
                //         .then(() => {
                //             remove(ref(db, 'users/' + anonymousUID))
                //         })
                // }
                // update(ref(db, 'users/' + authUID), { anonymousUID: null })
                // Send the cloud data to local SetupState

            }
        })

        // When this element is closed, remove the listener on the user account
        return (() => {
            off(ref(db, 'users/' + auth.currentUser.uid))
        })
    }, [])

    // Listen to the cloud list of characters created by this user
    // When the list changes, set the new list in local storage
    useEffect(() => {
        onValue(ref(db, 'characters/' + auth.currentUser.uid), (snapshot) => {
            const characterArray = [];
            snapshot.forEach(childSnapShot => {
                characterArray.push(childSnapShot.val())
            })

            setCharArray(characterArray)
        })

        return (() => {
            off(ref(db, 'characters/' + auth.currentUser.uid))
        })

    }, [])

    useEffect(() => {
        if (userState.currentCharacterID) {
            let charObject = charArray.find(character =>
                character.charID === userState.currentCharacterID)
            // console.log('charArray: ', charArray)
            // console.log('charObject', charObject)
            // console.log('currentCharacterID', userState.currentCharacterID)
            dispatchCharState(setCharState(charObject))
        } else {
            dispatchCharState(setNoCurrentChar())
        }
    }, [userState.currentCharacterID, charArray])


    // useEffect(() => {
    //     console.log('userState changed: ', userState)
    // }, [userState])

    // useEffect(() => {
    //     console.log('gameState changed: ', gameState)
    // }, [gameState])

    // useEffect(() => {
    //     console.log('new character state changed: ', newCharState)
    // }, [newCharState])

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
                    <Route path='chooseMode' element={<ChooseMode />} />
                    <Route path='gameSetup' element={
                        <GameSetup
                            setGameArray={setGameArray}
                            userState={userState}
                            dispatchGameState={dispatchGameState}
                        >
                            <AuthWrapper />
                            <JoiningHosting
                                userState={userState}
                                gameArray={gameArray}
                            />
                            <CharacterSelect
                                userState={userState}
                                gameState={gameState}
                                charState={charState}
                                dispatchCharState={dispatchCharState}
                                charArray={charArray}
                            />
                            <PartyMembers
                                userState={userState}
                                gameState={gameState}

                            />
                            <ChallengeSelect
                                userState={userState}
                                gameState={gameState}
                            />

                        </GameSetup>

                    } />
                    <Route path="/characterSheet/*"
                        element={
                            <div>
                                <AuthWrapper />
                                <JoiningHosting
                                    userState={userState}
                                    gameArray={gameArray}
                                />
                                <CharacterSheet
                                    charArray={charArray}
                                    charState={charState}
                                    dispatchCharState={dispatchCharState}
                                />

                            </div>
                        }
                    >
                        <Route path='Bard/*'
                            element={<Bard
                                charState={charState}
                                dispatchCharState={dispatchCharState}
                            />}
                        />
                        <Route path='Cleric/*'
                            element={<Cleric
                                charState={charState}
                                dispatchCharState={dispatchCharState}
                            />}
                        />



                    </Route>


                    <Route path={'/refreshHelper'}
                        element={<RefreshHelper
                            userState={userState}
                        />}
                    />
                    <Route path='gameInProcess' element={
                        <AuthWrapper
                            userState={userState}
                            dispatchSetupState={dispatchUserState}>
                            <ActiveGame />
                        </AuthWrapper>
                    }
                    />

                    <Route
                        path="/signIn"
                        element={<FirebaseSignIn />}
                    />
                    <Route
                        path="termsofservice"
                        element={<Tos />}
                    />
                    <Route
                        path="privacypolicy"
                        element={<PrivacyPolicy />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>

        </HistoryRouter>




    )
}

export default AppRouter;

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