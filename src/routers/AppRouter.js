import React from "react";
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Welcome from "../components/elements/Welcome";
import GameSetup from "../components/elements/GameSetup";
import AuthWrapper from "../components/elements/AuthWrapper";
import NotFoundPage from "../components/elements/NotFoundPage";
import FirebaseSignIn from '../components/elements/FirebaseSignIn';
import Tos from "../components/elements/Tos";
import PrivacyPolicy from "../components/elements/PrivacyPolicy";
// import JoiningHosting from "../components/elements/JoiningHosting";
import VillainSelect from "../components/elements/VillainSelect";


export const history = createBrowserHistory();


const AppRouter = () => {
    return (
        <HistoryRouter history={history}>

            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Welcome />
                        }
                    />
                    <Route
                        path="gameSetup"
                        element={
                            <AuthWrapper>
                                <GameSetup>

                                </GameSetup>
                            </AuthWrapper>
                        }
                    >
                        <Route path=':villain' element={<VillainSelect />} />
                    </Route>
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

// <SetupContext.Provider
// value={{
//     authUID,
//     dispatchAuthUID
// }}>
// </SetupContext.Provider>