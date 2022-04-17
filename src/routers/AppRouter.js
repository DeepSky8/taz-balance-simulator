import React, { useContext, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

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




export const history = createBrowserHistory();


const AppRouter = () => {
    const [uidState, setUidState] = useState('')

    onAuthStateChanged(auth, (user) => {

        if (user) {
            console.log('should set state fired with: ', user.uid)
            setUidState(user.uid)
        } else {
            console.log('no uid available, setting state to empty string: ', user)
            setUidState('')
        }
    })

    return (
        <HistoryRouter history={history}>

            <div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path='gameSetup' element={
                        <AuthWrapper uidState={uidState}>
                            <GameSetup>
                                <VillainSelect />
                            </GameSetup>
                        </AuthWrapper>}
                    />


                    <Route path='gameInProcess' element={
                        <AuthWrapper uidState={uidState}>
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

        </HistoryRouter >
    )
}

export default AppRouter;

// <SetupContext.Provider
// value={{
//     authUID,
//     dispatchAuthUID
// }}>
// </SetupContext.Provider>