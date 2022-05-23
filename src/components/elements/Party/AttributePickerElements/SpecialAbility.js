import React from "react";
import { specialStinger, specialTitle } from "../../../classes/charInfo";

const SpecialAbility = ({ charState }) => (
    <div id="specialAbility">
        <div>
            <div>
                <div className="titleText">
                    {specialTitle[charState.classCode] + ': '}
                </div>

                {specialStinger[charState.classCode]}
                <br />
            </div>
        </div>
    </div>
)

export default SpecialAbility