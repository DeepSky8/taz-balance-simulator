import React from "react";
import { setDwarfWarriorBeard, setHumanWarriorOrigin1, setHumanWarriorOrigin2, setHumanWarriorOrigin3, } from "../../../../../../actions/charActions";
import { raceCodes } from "../../../../../classes/charInfo";
import { warriorRaceStingerLines } from "../../../../../classes/warriorInfo";

const imA = "I'm a "
const iWasRaisedBy = "       I was raised by "
const i = '     I '
const lift = ' lift'

const WarriorRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="humanWarrior">
            {charState.raceCode === 9 &&
                <div>
                    {imA}
                    <input
                        value={charState.humanWarriorOrigin1}
                        type='text'
                        placeholder="knight, actually..."
                        maxLength={10}
                        onChange={(e) => {
                            dispatchCharState(
                                setHumanWarriorOrigin1(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                    {iWasRaisedBy}
                    <input
                        value={charState.humanWarriorOrigin2}
                        type='text'
                        placeholder="my parents, chill"
                        maxLength={10}
                        onChange={(e) => {
                            dispatchCharState(
                                setHumanWarriorOrigin2(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                    {i}
                    <input
                        value={charState.humanWarriorOrigin3}
                        type='text'
                        placeholder="there is no 'try'"
                        maxLength={8}
                        onChange={(e) => {
                            dispatchCharState(
                                setHumanWarriorOrigin2(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                    {lift}
                </div>
            }
        </div>

        <div id="dwarfWarrior">
            {charState.raceCode === 3 &&
                <div>
                    <input
                        value={charState.dwarfWarriorBeard}
                        type='text'
                        placeholder="My beard ... "
                        maxLength={30}
                        onChange={(e) => {
                            dispatchCharState(
                                setDwarfWarriorBeard(
                                    e.target.value.toString()
                                )
                            )
                        }}
                    />
                </div>
            }
        </div>
    </div>
)

export default WarriorRaceStingers