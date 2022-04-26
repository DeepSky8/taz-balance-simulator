import React, { useContext, useEffect, useReducer, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { FirebaseAppProvider, DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { defaultGameSetup, setupReducer } from "../reducers/setupReducer";

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
                            <ChallengeSelect
                                setupState={setupState}
                                dispatchSetupState={dispatchSetupState}
                            />
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