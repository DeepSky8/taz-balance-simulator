import React from "react"
import { startUpdateTurnStage } from "../../../actions/cloudActions"
import turnStagesArray from "../ActiveGame/turnStep/turnStepArrays/turnStagesArray"



const TESTFEATURES = ({ currentStage, hostKey, resetStages, stepStage, resetTurnStage, resetActionTokens }) => {


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
    )
}

export default TESTFEATURES