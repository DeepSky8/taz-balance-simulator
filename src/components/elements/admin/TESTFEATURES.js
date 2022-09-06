import React from "react"
import { startUpdateTurnStage } from "../../../actions/cloudActions"

const turnStages = [
    'DESCRIBEONE',
    'CHALLENGE',
    'ITEMS',
    'STORY',
    'PREASSIST',
    'SCENE',
    'PRE_ASSIST_SCENE',
    'ROLLONE',
    'ROLLTWO',
    'EVALUATEONE',
    'POSTASSIST',
    'POST_ASSIST_SCENE',
    'EVALUATETWO',
    'DESCRIBE',
    'KOSTCO',
    'PASS'
]

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
                {turnStages.map((stage) => {
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