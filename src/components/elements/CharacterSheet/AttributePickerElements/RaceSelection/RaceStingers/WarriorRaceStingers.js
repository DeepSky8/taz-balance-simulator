import React from "react";
import { setDwarfWarriorBeard, setHumanWarriorOrigin1, setHumanWarriorOrigin2, setHumanWarriorOrigin3, } from "../../../../../../actions/charActions";
import { raceTitles, shortDescription } from "../../../classes/charInfo";
const imA = "I'm a "
const iWasRaisedBy = "       I was raised by "
const i = '     I '
const lift = ' lift'
const myBeard = 'My beard '

const WarriorRaceStingers = ({ charState, dispatchCharState }) => (
    <div>
        <div id="humanWarrior">
            {charState.raceCode === raceTitles.indexOf('Human') &&
                <div>
                    {imA}
                    <input
                        value={charState.humanWarriorOrigin1}
                        type='text'
                        placeholder="knight, actually..."
                        maxLength={shortDescription}
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
                        maxLength={shortDescription}
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
                        maxLength={shortDescription}
                        onChange={(e) => {
                            dispatchCharState(
                                setHumanWarriorOrigin3(
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
            {charState.raceCode === raceTitles.indexOf('Dwarf') &&
                <div>
                    {myBeard}
                    <input
                        value={charState.dwarfWarriorBeard}
                        type='text'
                        placeholder="is/can/has ... "
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