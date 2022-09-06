import React, { useEffect } from "react";
import { images } from "../challenges/imageInfo";


const RollDiceAnimation = ({ visible }) => {

    // useEffect(() => {
    //     document.getElementById('dice_roll_animation').classList.toggle('show')

    // }, [visible])

    return (

        <div>
            <div id="dice_roll_animation" className="diceroll">
                {visible && <img src={images.dice_roll} alt="Dice Rolling animation" />}
            </div>
        </div>

    )
}

export default RollDiceAnimation