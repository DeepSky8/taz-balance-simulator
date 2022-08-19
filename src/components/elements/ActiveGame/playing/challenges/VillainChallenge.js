import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { cardReducer, defaultCardState } from "../../../../../reducers/cardReducer";
import { images } from "./imageInfo";

const VillainChallenge = ({ villain, modifier, challengePicked }) => {
    const difficulty = parseInt(villain.difficulty) + parseInt(modifier)

    return (
        <span>

            <span>
                <h1>
                    <button
                        onClick={() => { challengePicked() }}
                    >{difficulty}</button>

                </h1>
                {villain.relicModifier > 0 && '   +'}{villain.relicModifier > 0 && villain.relicModifier}
            </span>
            <p>
                {villain.nameFlavor}
            </p>
            <h3>
                {villain.cardName}
            </h3>
            <span>

                {villain.monster && <img src={images.monster} alt="Monster Challenge" />}
                {villain.spooky && <img src={images.spooky} alt="Spooky Challenge" />}
                {villain.magic && <img src={images.magic} alt="Magic Challenge" />}
                {villain.trap && <img src={images.trap} alt="Trap Challenge" />}
                {villain.noAssist && <img src={images.no_assist} alt="No Assist Challenge" />}
                {villain.doubleAssist && <img src={images.double_assist} alt="Double Assist Challenge" />}

            </span>

            <div>
                {villain.storyBonus && 'Story +1:'}
                {villain.storyPrompt && villain.storyPrompt}
                {villain.effectText && '---'}
                {villain.effectText && villain.effectText}
            </div>

            <div>
                {!villain.finale && <img src={images.diamond} alt='Loot points' />} {!villain.finale && ' ' + villain.loot}
                {!villain.finale && <img src={images.heart} alt='Health points' />} {!villain.finale && ' ' + villain.health}
            </div>

        </span>
    )
}

export default VillainChallenge

