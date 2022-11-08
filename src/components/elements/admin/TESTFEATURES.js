import React from "react"
import { startUpdateBriefingStage, startUpdateGameStage, startUpdateTurnStage } from "../../../actions/cloudActions"
import { briefingStagesArray, gameStageArray } from "../ActiveGame/stageArrays/stageArrays"
import turnStagesArray from "../ActiveGame/turnStep/turnStepArrays/turnStagesArray"


const TESTFEATURES = ({ currentStage, gameStage, briefingStage, hostKey, resetStages, stepStage, resetTurnStage, resetActionTokens }) => {

    return (
        <div>
            --
            <div>
                <button
                    onClick={() => { resetStages() }}
                >-Reset Stages-</button>
                <button
                    onClick={() => { stepStage() }}
                >-Step Stage-</button>
                <button
                    onClick={() => { resetTurnStage() }}
                >-Reset Turn-</button>
                <button onClick={() => { resetActionTokens() }}>-Reset Action Tokens-</button>
            </div>
            <div>
                SELECT GAME STAGE: <select
                    name="setGameStage"
                    value={gameStage}
                    onChange={(e) => { startUpdateGameStage(hostKey, e.target.value) }}
                >
                    {gameStageArray.map((stage) => {
                        return (
                            <option
                                key={stage}
                                value={stage}
                            >
                                {stage}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div>
                SELECT BRIEFING STAGE: <select
                    name="setBriefingStage"
                    value={briefingStage}
                    onChange={(e) => { startUpdateBriefingStage(hostKey, e.target.value) }}
                >
                    {briefingStagesArray.map((stage) => {
                        return (
                            <option
                                key={stage}
                                value={stage}
                            >
                                {stage}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div>
                SELECT TURN STEP: <select
                    name="setTurnStage"
                    value={currentStage}
                    onChange={(e) => { startUpdateTurnStage(hostKey, e.target.value) }}
                >
                    {turnStagesArray.map((stage) => {
                        return (
                            <option
                                key={stage}
                                value={stage}
                            >
                                {stage}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default TESTFEATURES