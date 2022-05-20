import React from "react";
import { setHumanBardBand, setRobotBardCreator, setRobotBardVisual } from "../../../../../../actions/charActions";
import { bardRaceStingerLines } from "../../../../../classes/bardInfo";
import { raceCodes } from "../../../../../classes/charInfo";

const BardRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        {bardRaceStingerLines[raceCodes[charState.classCode].indexOf(charState.raceCode)]}
        <div id="humanBard">
            {charState.raceCode === 8 &&
                <div>
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
                </div>
            }
        </div>

        <div id="magicalRobotBard">
            {charState.raceCode === 11 &&
                (<div>
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
                </div>)
            }
        </div>
    </div>
)

export default BardRaceStingers