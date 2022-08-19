import React from "react";
import { Routes, Route } from "react-router-dom";
import { startRESETActionTokens, startUpdateGameStage, startUpdateTurnStage } from "../actions/cloudActions";
import AuthWrapper from "../components/Authentication/AuthWrapper";
import ActiveCharWrapper from "../components/elements/ActiveGame/ActiveCharWrapper";
import IntroCharacter from "../components/elements/ActiveGame/introductions/IntroCharacter";
import IntroDescription from "../components/elements/ActiveGame/introductions/IntroDescription";
import BriefingComplete from "../components/elements/ActiveGame/missionBriefing/BriefingComplete";
import MissionBriefing from "../components/elements/ActiveGame/missionBriefing/MissionBriefing";
import ChallengeFrame from "../components/elements/ActiveGame/playing/challenges/ChallengeFrame";
import Playing from "../components/elements/ActiveGame/playing/Playing";
import PassTurn from "../components/elements/ActiveGame/turnStep/PassTurn";
import incrementStage from "../components/functions/incrementStage";
import incrementTurn from "../components/functions/incrementTurn";

const ActiveGameRouter = ({
    cloudState,
    challengeState,
    localCharObject,
    activeCharacterObject
}) => {

    // Testing tools
    const resetStages = () => {
        startUpdateGameStage(challengeState.hostKey, 'INTRO')
    }

    const stepStage = () => {
        startUpdateGameStage(challengeState.hostKey, incrementStage(cloudState.active.gameStage))
    }

    const resetTurnStage = () => {
        startUpdateTurnStage(challengeState.hostKey, incrementTurn('default'))
    }

    const resetActionTokens = () => {
        startRESETActionTokens(challengeState.hostKey, cloudState.playerList)
    }
    // Testing tools
    return (
        <div>
            <AuthWrapper />
            <ActiveCharWrapper
                cloudState={cloudState}
                activeCharacter={activeCharacterObject}
                localCharacter={localCharObject}
                resetStages={resetStages}
                stepStage={stepStage}
                resetTurnStage={resetTurnStage}
                resetActionTokens={resetActionTokens}
            />
            <PassTurn
                cloudState={cloudState}
                character={activeCharacterObject}
            />

            <Routes>
                <Route
                    path="introductions"
                    element={
                        <div>
                            <IntroDescription />
                            <IntroCharacter
                                character={activeCharacterObject}
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
                            cloudState={cloudState}

                        >
                            <ChallengeFrame
                                cloudState={cloudState}
                                challengeState={challengeState}
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