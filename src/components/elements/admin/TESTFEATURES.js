import React from "react"
import {
    startUpdateBriefingStage,
    startUpdateGameStage,
    startUpdateTurnStage
} from "../../../actions/cloudActions"
import turnStage from "../ActiveGame/turnStep/turnStepArrays/turnStage"
import {
    gameStage as gameStageObject,
    briefingStage as briefingStageObject
} from "../ActiveGame/stageObjects/stageObjects"


const TESTFEATURES = ({ currentStage, gameStage, briefingStage, hostKey, resetStages, resetTurnStage, resetActionTokens }) => {
    const turnStageEntries = Object.entries(turnStage)
    const gameStageEntries = Object.entries(gameStageObject)
    const briefingStageEntries = Object.entries(briefingStageObject)

    return (
        <div>
            --
            <div>
                <button
                    onClick={() => { resetStages() }}
                >-Reset Stages-</button>
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
                    {gameStageEntries.map(([key, value]) => {
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
            <div>
                SELECT BRIEFING STAGE: <select
                    name="setBriefingStage"
                    value={briefingStage}
                    onChange={(e) => { startUpdateBriefingStage(hostKey, e.target.value) }}
                >
                    {briefingStageEntries.map(([key, value]) => {
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