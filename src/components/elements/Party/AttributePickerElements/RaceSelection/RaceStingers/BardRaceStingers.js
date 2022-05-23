import React from "react";
import { setHumanBardBand, setRobotBardCreator, setRobotBardVisual } from "../../../../../../actions/charActions";
import { longDescription } from "../../../../../classes/charInfo";

const BardRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="humanBard">
            {charState.raceCode === 9 &&
                <div>
                    <input
                        value={charState.humanBardBand}
                        type='text'
                        placeholder='My band is named:'
                        maxLength={longDescription}
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
            {charState.raceCode === 12 &&
                (<div>
                    <input
                        value={charState.robotBardCreator}
                        type="text"
                        placeholder='Created by:'
                        maxLength={longDescription}
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
                        maxLength={longDescription}
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

//{bardRaceStingerLines[raceCodes[charState.classCode].indexOf(charState.raceCode)]}