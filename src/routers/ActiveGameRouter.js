import React from "react";
import { Routes, Route } from "react-router-dom";
import { startRESETActionTokens, startResetTurnElements, startUpdateGameStage, startUpdateTurnStage } from "../actions/cloudActions";
import AuthWrapper from "../components/Authentication/AuthWrapper";
import ActiveCharWrapper from "../components/elements/ActiveGame/ActiveCharWrapper";
import IntroCharacter from "../components/elements/ActiveGame/introductions/IntroCharacter";
import IntroDescription from "../components/elements/ActiveGame/introductions/IntroDescription";
import BriefingComplete from "../components/elements/ActiveGame/missionBriefing/BriefingComplete";
import MissionBriefing from "../components/elements/ActiveGame/missionBriefing/MissionBriefing";
import ActionTokens from "../components/elements/ActiveGame/playing/actionTokens/ActionTokens";
import ChallengeFrame from "../components/elements/ActiveGame/playing/challenges/ChallengeFrame";
import Playing from "../components/elements/ActiveGame/playing/Playing";
import RollDiceAnimation from "../components/elements/ActiveGame/playing/rollDice/RollDiceAnimation";
import RollDiceButton from "../components/elements/ActiveGame/playing/rollDice/RollDiceButton";
import StrengthFrame from "../components/elements/ActiveGame/playing/StrengthFrame";
import TeamHealth from "../components/elements/ActiveGame/playing/TeamHealth";
import TurnStep from "../components/elements/ActiveGame/turnStep/TurnStep";
import incrementStage from "../components/functions/incrementStage";
import incrementTurn from "../components/functions/incrementTurn";

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
            <AuthWrapper />
            <ActiveCharWrapper
                cloudState={cloudState}
                activeCharacter={localState.activeCharacter}
                localCharacter={localState.localCharacter}
                resetStages={resetStages}
                stepStage={stepStage}
                resetTurnStage={resetTurnStage}
                resetActionTokens={resetActionTokens}
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
                    path="playing"
                    element={
                        <Playing
                        >
                            <TeamHealth
                                teamHealth={cloudState.active.teamHealth}
                            />
                            <ActionTokens
                                cloudState={cloudState}
                            />
                            <RollDiceAnimation
                                visible={cloudState.currentTurn.showRoll}
                            />
                            <ChallengeFrame
                                cloudState={cloudState}
                                localState={localState}
                            />
                            <StrengthFrame
                                cloudState={cloudState}
                            />
                        </Playing>
                    }
                />
                <Route
                    path="summary"
                    element={
                        <div>
                            summary
                        </div>
                    }
                />
            </Routes>

        </div>
    )
}

export default ActiveGameRouter

