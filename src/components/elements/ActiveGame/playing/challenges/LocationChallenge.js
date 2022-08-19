import React from "react";
import { images } from "./imageInfo";

const LocationChallenge = ({ location, modifier, challengePicked }) => {
    const difficulty = parseInt(location.difficulty) + parseInt(modifier)

    return (
        <span>

            <span>
                {location.relicModifier > 0 && '   +'}{location.relicModifier > 0 && location.relicModifier}
                <h1>
                    <button
                        onClick={() => { challengePicked() }}
                    >{difficulty}</button>

                </h1>
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
                {location.noAssist && <img src={images.no_assist} alt="No Assist Challenge" />}
                {location.doubleAssist && <img src={images.double_assist} alt="Double Assist Challenge" />}

            </span>

            <div>
                {location.storyBonus && 'Story +1: '}
                {location.storyPrompt && location.storyPrompt}
                {location.effectText && '---'}
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

