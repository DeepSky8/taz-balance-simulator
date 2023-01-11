import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import {
    startRESETActionTokens,
    startResetTurnElements,
    startUpdateGameStage,
    startUpdateTurnStage
} from "../actions/cloudActions";
import ActiveCharWrapper from "../components/elements/ActiveGame/ActiveCharWrapper";
import IntroCharacter from "../components/elements/ActiveGame/introductions/IntroCharacter";
import IntroDescription from "../components/elements/ActiveGame/introductions/IntroDescription";
import BriefingComplete from "../components/elements/ActiveGame/missionBriefing/BriefingComplete";
import MissionBriefing from "../components/elements/ActiveGame/missionBriefing/MissionBriefing";
import Playing from "../components/elements/ActiveGame/playing/Playing";
import TurnStep from "../components/elements/ActiveGame/turnStep/TurnStep";
import TESTFEATURES from "../components/elements/admin/TESTFEATURES";
import CharNav from "../components/elements/ActiveGame/playing/CharacterOverview/CharNav";
import PlayingSheet from "../components/elements/ActiveGame/playing/PlayingSheets/PlayingSheet";
import NotFoundPage from "../components/Authentication/NotFoundPage";
import Gameboard from "../components/elements/ActiveGame/playing/Gameboard";
import KostcoPool from "../components/elements/ActiveGame/kostco/KostcoPool";
import turnStage from "../components/elements/ActiveGame/turnStep/turnStepItems/turnStage";
import { gameStage } from "../components/elements/ActiveGame/stageObjects/stageObjects";

const ActiveGameRouter = ({
    cloudState,
    localState,
}) => {

    // Testing tools
    const resetStages = () => {
        startUpdateGameStage(localState.hostKey, gameStage.intro)
    }

    const resetTurnStage = () => {
        startUpdateTurnStage(localState.hostKey, turnStage.describeSceneOne)
        startResetTurnElements(localState.hostKey)

    }

    const resetActionTokens = () => {
        startRESETActionTokens(localState.hostKey, cloudState.playerList)
    }
    // Testing tools

    return (
        <div>
            <ActiveCharWrapper
                gameStage={cloudState.active.gameStage}
                localState={localState}
            />
            <TurnStep
                cloudState={cloudState}
                localState={localState}
            />

            <Routes>
                <Route
                    path="introductions"
                    element={
                        <div>
                            <IntroDescription />
                            <IntroCharacter
                                localState={localState}
                            />
                        </div>
                    }
                />
                <Route
                    path="missionBriefing/*"
                    element={
                        <MissionBriefing
                            cloudState={cloudState}
                        />
                    }
                />
                <Route
                    path="backstory"
                    element={
                        <div>
                            backstory
                        </div>
                    }
                />
                <Route
                    path="transport"
                    element={
                        <BriefingComplete />
                    }
                />
                <Route
                    path="playing/*"
                    element={

                        <Playing>
                            <CharNav
                                cloudState={cloudState}
                                localState={localState}
                            />
                            <Outlet />

                        </Playing>


                    }
                >
                    <Route
                        path="Gameboard"
                        index={true}
                        errorElement={<NotFoundPage />}

                        element={
                            <Gameboard
                                cloudState={cloudState}
                                localState={localState}
                            />
                        }
                    />
                    <Route
                        path=":charName/:charID"
                        errorElement={<NotFoundPage />}
                        element={
                            <PlayingSheet
                                cloudState={cloudState}
                                localState={localState}
                            />
                        }
                    />
                    <Route
                        path="Mission/"
                        errorElement={<NotFoundPage />}
                        element={
                            <MissionBriefing
                                cloudState={cloudState}
                            />
                        }
                    />
                </Route>


                <Route
                    path="summary"
                    element={
                        <div>
                            summary
                        </div>
                    }
                />
            </Routes>

            <KostcoPool
                cloudState={cloudState}
                localState={localState}
            />

            <TESTFEATURES
                resetStages={resetStages}
                gameStage={cloudState.active.gameStage}
                resetTurnStage={resetTurnStage}
                resetActionTokens={resetActionTokens}
                hostKey={localState.hostKey}
                currentStage={cloudState.currentTurn.turnStage}
                briefingStage={cloudState.backstory.briefingStage}
            />
        </div>
    )
}

export default ActiveGameRouter

