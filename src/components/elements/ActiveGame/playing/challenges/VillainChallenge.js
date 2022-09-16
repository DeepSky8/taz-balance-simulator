import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { cardReducer, defaultCardState } from "../../../../../reducers/cardReducer";
import { images } from "./imageInfo";

const VillainChallenge = ({ villain, modifier, stage, challengePicked }) => {
    const difficulty = parseInt(villain.difficulty) + parseInt(modifier)

    return (
        <span>

            <span>

                {stage === 'CHALLENGE' && <button
                    onClick={() => { challengePicked() }}
                >{difficulty}</button>}

                {stage !== 'CHALLENGE' && <span>{difficulty + '  '}</span>}


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
                {villain.noAssist && <img src={images.noAssist} alt="No Assist Challenge" />}
                {villain.doubleAssist && <img src={images.doubleAssist} alt="Double Assist Challenge" />}
                {villain.noRoll && <img src={images.noRoll} alt="No Roll Challenge" />}
                {villain.chance && <img src={images.chance} alt="Chance Roll Challenge" />}
            </span>

            <div>
                {villain.storyBonus > 0 && 'Story +1: '}
                {villain.storyPrompt && villain.storyPrompt}
                <p>{(villain.effectText > 0 && villain.storyPrompt.length > 0) && '---'}</p>
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

