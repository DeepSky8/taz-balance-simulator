import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
import DeckUpdates from "../components/elements/admin/Challenge/DeckUpdates";
import DeckDuplicate from "../components/elements/admin/Challenge/DeckDuplicate";
import Home from "../components/elements/Home/Home";


const AppRouter = () => {

    return (

        <BrowserRouter>

            <div>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route index path="/welcome" element={<Welcome />} />
                    <Route path='/chooseMode/' element={<ChooseMode />} />
                    <Route path='/gameSetup/*' element={<GameSetup />} />
                    <Route path="/charactersheet/*" element={<CharacterSheet />} />
                    <Route path="/activeGame/*" element={<ActiveGame />} />
                    <Route path="/signIn" element={<FirebaseSignIn />} />

                    <Route path='/refreshHelper' element={<RefreshHelper />} />
                    <Route path='/deckUpdates' element={<DeckUpdates />} />
                    <Route path='/deckDuplicate' element={<DeckDuplicate />} />

                    <Route path="termsofservice" element={<Tos />} />
                    <Route path="privacypolicy" element={<PrivacyPolicy />} />

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </div>


        </BrowserRouter>
    )
}

export default AppRouter;

