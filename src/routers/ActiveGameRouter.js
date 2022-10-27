import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import {
    startRESETActionTokens,
    startResetTurnElements,
    startUpdateGameStage,
    startUpdateTurnStage
} from "../actions/cloudActions";
import AuthWrapper from "../dumpingGround/AuthWrapper";
import ActiveCharWrapper from "../components/elements/ActiveGame/ActiveCharWrapper";
import IntroCharacter from "../components/elements/ActiveGame/introductions/IntroCharacter";
import IntroDescription from "../components/elements/ActiveGame/introductions/IntroDescription";
import BriefingComplete from "../components/elements/ActiveGame/missionBriefing/BriefingComplete";
import MissionBriefing from "../components/elements/ActiveGame/missionBriefing/MissionBriefing";
import ActionTokens from "../components/elements/ActiveGame/playing/actionTokens/ActionTokens";
import ChallengeFrame from "../components/elements/ActiveGame/playing/challenges/ChallengeFrame";
import Playing from "../components/elements/ActiveGame/playing/Playing";
import RollDiceAnimation from "../components/elements/ActiveGame/playing/rollDice/RollDiceAnimation";
import StrengthFrame from "../components/elements/ActiveGame/playing/StrengthFrame";
import TeamHealth from "../components/elements/ActiveGame/playing/TeamHealth";
import TurnStep from "../components/elements/ActiveGame/turnStep/TurnStep";
import TESTFEATURES from "../components/elements/admin/TESTFEATURES";
import incrementStage from "../components/functions/incrementStage";
import incrementTurn from "../components/functions/incrementTurn";
import CharNav from "../components/elements/ActiveGame/playing/CharacterOverview/CharNav";
import PlayingSheet from "../components/elements/ActiveGame/playing/PlayingSheets/PlayingSheet";
import NotFoundPage from "../components/Authentication/NotFoundPage";

const ActiveGameRouter = ({
    cloudState,
    localState,
}) => {

    // Testing tools
    const resetStages = () => {
        startUpdateGameStage(localState.hostKey, 'INTRO')
    }

    const stepStage = () => {
        startUpdateGameStage(localState.hostKey, incrementStage(cloudState.active.gameStage))
    }

    const resetTurnStage = () => {
        startUpdateTurnStage(localState.hostKey, incrementTurn('default'))
        startResetTurnElements(localState.hostKey)

    }

    const resetActionTokens = () => {
        startRESETActionTokens(localState.hostKey, cloudState.playerList)
    }
    // Testing tools

    return (
        <div>
            <ActiveCharWrapper
                cloudState={cloudState}
                activeCharacter={localState.activeCharacter}
                localCharacter={localState.localCharacter}
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
                                character={localState.activeCharacter}
                                ready={cloudState.ready}
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
                            <span>
                                <TeamHealth
                                    teamHealth={cloudState.active.teamHealth}
                                />
                                <ActionTokens
                                    cloudState={cloudState}
                                    localState={localState}
                                />
                                {cloudState.currentTurn.showRoll &&
                                    <RollDiceAnimation />
                                }
                                <ChallengeFrame
                                    cloudState={cloudState}
                                    localState={localState}
                                />
                                <StrengthFrame
                                    cloudState={cloudState}
                                />
                            </span>
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
            <TESTFEATURES
                resetStages={resetStages}
                gameStage={cloudState.active.gameStage}
                stepStage={stepStage}
                resetTurnStage={resetTurnStage}
                resetActionTokens={resetActionTokens}
                hostKey={localState.hostKey}
                currentStage={cloudState.currentTurn.turnStage}
            />
        </div>
    )
}

export default ActiveGameRouter

