import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from "../components/elements/Welcome";
import GameSetup from "../components/elements/GameSetup";
import AuthWrapper from "../components/elements/AuthWrapper";
import NotFoundPage from "../components/elements/NotFoundPage";


const AppRouter = () => (
    <BrowserRouter>
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
                            <GameSetup />
                        </AuthWrapper>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>

    </BrowserRouter>
)

export default AppRouter;