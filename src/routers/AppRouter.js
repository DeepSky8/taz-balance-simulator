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
import { RefreshHelper } from "../components/elements/admin/RefreshHelper";
import GameSetup from "../components/elements/GameSetup/GameSetup";
import CharacterSheet from "../components/elements/CharacterSheet/CharacterSheet";
import ActiveGame from "../components/elements/ActiveGame/ActiveGame";
import DeckUpdates from "../components/elements/admin/DeckUpdates";
export const history = createBrowserHistory();


const AppRouter = () => {

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
                    <Route path='/deckUpdates/*' element={<DeckUpdates />} />
                    <Route path="termsofservice" element={<Tos />} />
                    <Route path="privacypolicy" element={<PrivacyPolicy />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>

        </HistoryRouter>




    )
}

export default AppRouter;