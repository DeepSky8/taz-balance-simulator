import React from "react"
import { startUpdateGameStage, startUpdateTurnStage } from "../../../actions/cloudActions"
import { gameStageArray } from "../ActiveGame/stageArrays/stageArrays"
import turnStagesArray from "../ActiveGame/turnStep/turnStepArrays/turnStagesArray"


const TESTFEATURES = ({ currentStage, gameStage, hostKey, resetStages, stepStage, resetTurnStage, resetActionTokens }) => {

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
                SELECT STAGE: <select
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
                SELECT STEP: <select
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