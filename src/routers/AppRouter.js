import React, { useContext, useEffect, useReducer, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { FirebaseAppProvider, DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
    child,
    get,
    off,
    onValue,
    push,
    ref,
    remove,
    set,
    update
} from "firebase/database";
import { defaultUserProfile, userReducer } from "../reducers/userReducer";

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
import { updateUserState } from "../actions/userActions";
import { defaultGameState, gameReducer } from "../reducers/gameReducer";

export const history = createBrowserHistory();


const AppRouter = () => {
    const [gameArray, setGameArray] = useState([])
    // const [gameObjectsArray, setGameObjectsArray] = useState([])
    const [gameState, dispatchGameState] = useReducer(gameReducer, defaultGameState)
    const [userState, dispatchUserState] = useReducer(userReducer, defaultUserProfile)


    // This listener updates the local state to 
    // mirror the user account in the cloud
    useEffect(() => {
        const authUID = auth.currentUser.uid
        onValue(ref(db, 'users/' + authUID), (snapshot) => {
            // If there is a user account in the cloud
            if (snapshot.exists()) {

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
                dispatchUserState(updateUserState(snapshot.val()))
            }
        })

        // When this element is closed, remove the listener on the user account
        return (() => {
            off(ref(db, 'users/' + authUID))
        })
    }, [])





    useEffect(() => {
        console.log('userState changed: ', userState)
    }, [userState])

    useEffect(() => {
        console.log('gameState changed: ', gameState)
    }, [gameState])

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
                            <ChallengeSelect
                                userState={userState}
                                gameState={gameState}
                            />
                        </GameSetup>

                    } />


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