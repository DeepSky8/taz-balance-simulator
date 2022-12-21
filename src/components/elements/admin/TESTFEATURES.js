import React from "react"
import { startUpdateBriefingStage, startUpdateGameStage, startUpdateTurnStage } from "../../../actions/cloudActions"
import { briefingStagesArray, gameStageArray } from "../ActiveGame/stageArrays/stageArrays"
import turnStage from "../ActiveGame/turnStep/turnStepArrays/turnStage"


const TESTFEATURES = ({ currentStage, gameStage, briefingStage, hostKey, resetStages, stepStage, resetTurnStage, resetActionTokens }) => {
    const turnStageEntries = Object.entries(turnStage)
    console.log('turnStageArrayEntries', turnStageEntries)

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
                    {turnStageEntries.map(([key, value]) => {
                        return (
                            <option
                                key={key}
                                value={value}
                            >
                                {value}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default TESTFEATURES

// need to update the stage arrays to use the objects, and then create object entries here and other places the stage arrays would normally be used
// also need to delete stage incrementor functions