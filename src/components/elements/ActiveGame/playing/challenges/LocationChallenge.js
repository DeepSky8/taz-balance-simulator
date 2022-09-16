import React from "react";
import { images } from "./imageInfo";

const LocationChallenge = ({ location, modifier, stage, challengePicked }) => {
    const difficulty = parseInt(location.difficulty) + parseInt(modifier)

    return (
        <span>

            <span>
                {location.relicModifier > 0 && '   +'}{location.relicModifier > 0 && location.relicModifier}

                {stage === 'CHALLENGE' && <button
                    onClick={() => { challengePicked() }}
                >{difficulty}</button>}

                {stage !== 'CHALLENGE' && <span>{'  ' + difficulty}</span>}


            </span>
            <p>
                {location.nameFlavor}
            </p>
            <h3>
                {location.cardName}
            </h3>
            <span>

                {location.monster && <img src={images.monster} alt="Monster Challenge" />}
                {location.spooky && <img src={images.spooky} alt="Spooky Challenge" />}
                {location.magic && <img src={images.magic} alt="Magic Challenge" />}
                {location.trap && <img src={images.trap} alt="Trap Challenge" />}
                {location.noAssist && <img src={images.noAssist} alt="No Assist Challenge" />}
                {location.doubleAssist && <img src={images.doubleAssist} alt="Double Assist Challenge" />}
                {location.noRoll && <img src={images.noRoll} alt="No Roll Challenge" />}
                {location.chance && <img src={images.chance} alt="Chance Roll Challenge" />}
            </span>

            <div>
                {location.storyBonus > 0 && 'Story +1: '}
                {location.storyPrompt.length > 0 && location.storyPrompt}
                <p>{(location.effectText > 0 && location.storyPrompt.length > 0) && '---'}</p>
                {location.effectText && location.effectText}
            </div>

            <div>
                {!location.finale && <img src={images.diamond} alt='Loot points' />} {!location.finale && ' ' + location.loot}
                {!location.finale && <img src={images.heart} alt='Health points' />} {!location.finale && ' ' + location.health}
            </div>

        </span>
    )
}

export default LocationChallenge
