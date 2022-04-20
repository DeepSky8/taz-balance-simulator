import React, { useContext, useEffect, useReducer, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { FirebaseAppProvider, DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
// import {
//     setActiveGameKeys,
//     setGameIDArray,
//     setGameKey,
//     setHost,
//     setIsAnonymous,
//     setLocalState,
//     setUID,
//     startUpdateCloudState,
//     startRegisterGameID,
//     startRemoveGameCode
// } from "..";
import JoiningHosting from "../components/elements/JoiningHosting";
import Welcome from "../components/elements/Welcome";
import GameSetup from "../components/elements/GameSetup";
import AuthWrapper from "../components/elements/AuthWrapper";
import NotFoundPage from "../components/elements/NotFoundPage";
import FirebaseSignIn from '../components/elements/FirebaseSignIn';
import Tos from "../components/elements/Tos";
import PrivacyPolicy from "../components/elements/PrivacyPolicy";
// import JoiningHosting from "../components/elements/JoiningHosting";
import VillainSelect from "../components/elements/VillainSelect";
import ActiveGame from "../components/elements/ActiveGame"
import { FirebaseAuth } from "react-firebaseui";
import { defaultGameSetup, setupReducer } from "../reducers/setupReducer";
import { uiConfig } from "../firebase/uiConfig";
import ChooseMode from "../components/elements/ChooseMode";


export const history = createBrowserHistory();


const AppRouter = () => {

    const [setupState, dispatchSetupState] = useReducer(setupReducer, defaultGameSetup)

    return (

        <HistoryRouter history={history}>

            <div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path='chooseMode' element={<ChooseMode />} />
                    <Route path='gameSetup' element={
                        <GameSetup
                            setupState={setupState}
                            dispatchSetupState={dispatchSetupState}
                        >
                            <AuthWrapper
                                setupState={setupState}
                                dispatchSetupState={dispatchSetupState}
                            />
                            <JoiningHosting
                                setupState={setupState}
                                dispatchSetupState={dispatchSetupState}
                            />
                            <VillainSelect />
                        </GameSetup>

                    } />


                    <Route path='gameInProcess' element={
                        <AuthWrapper
                            setupState={setupState}
                            dispatchSetupState={dispatchSetupState}>
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