import React from "react";
import classTransformer from "../../../functions/classTransformer";
import { bardRaceStingers } from "../../../classes/bardInfo";
import {
    setHumanBardBand,
    setRobotBardCreator,
    setRobotBardVisual
} from "../../../../actions/charActions";

const RaceStingers = ({ charState, dispatchCharState }) => (
    <div className="bardRaceStingers">
        {charState.charRaceCode &&
            classTransformer(bardRaceStingers, charState.charRaceCode)}

        {charState.charRaceCode === 'br0' ?
            <input
                value={charState.humanBardBand}
                type='text'
                placeholder='My band is named:'
                maxLength={30}
                onChange={(e) => {
                    dispatchCharState(
                        setHumanBardBand(
                            e.target.value.toString()
                        )
                    )
                }}
            />
            :
            ''
        }
        {charState.charRaceCode === 'br5' ?
            <div>
                <input
                    value={charState.robotBardCreator}
                    type="text"
                    placeholder='Created by:'
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setRobotBardCreator(
                                e.target.value.toString()))
                    }}
                />
                <input
                    value={charState.robotBardVisual}
                    type="text"
                    placeholder='I look like:'
                    maxLength={30}
                    onChange={(e) => {
                        dispatchCharState(
                            setRobotBardVisual(
                                e.target.value.toString()
                            )
                        )
                    }}
                />
            </div>
            :
            ''
        }
    </div>
)

export default RaceStingers