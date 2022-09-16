import React from "react";
import { images } from "./imageInfo";

const RelicChallenge = ({ relic, modifierVillain, modifierLocation, stage, challengePicked }) => {


    const difficulty = parseInt(relic.difficulty) + parseInt(modifierVillain) + parseInt(modifierLocation)

    return (
        <span>

            <span>
                {relic.villainModifier > 0 && '   +'}{relic.villainModifier > 0 && relic.villainModifier}

                {stage === 'CHALLENGE' && <button
                    onClick={() => { challengePicked() }}
                >{difficulty}</button>}

                {stage !== 'CHALLENGE' && <span>{'  ' + difficulty + '  '}</span>}


                {relic.locationModifier > 0 && '   +'}{relic.locationModifier > 0 && relic.locationModifier}
            </span>
            <p>
                {relic.nameFlavor}
            </p>
            <h3>
                {relic.cardName}
            </h3>
            <span>

                {relic.monster && <img src={images.monster} alt="Monster Challenge" />}
                {relic.spooky && <img src={images.spooky} alt="Spooky Challenge" />}
                {relic.magic && <img src={images.magic} alt="Magic Challenge" />}
                {relic.trap && <img src={images.trap} alt="Trap Challenge" />}
                {relic.noAssist && <img src={images.noAssist} alt="No Assist Challenge" />}
                {relic.doubleAssist && <img src={images.doubleAssist} alt="Double Assist Challenge" />}
                {relic.noRoll && <img src={images.noRoll} alt="No Roll Challenge" />}
                {relic.chance && <img src={images.chance} alt="Chance Roll Challenge" />}
            </span>

            <div>
                {relic.storyBonus > 0 && 'Story +1: '}
                {relic.storyPrompt.length > 0 && relic.storyPrompt}
                <p>{(relic.effectText && relic.storyPrompt.length > 0) && '---'}</p>
                {relic.effectText && relic.effectText}
            </div>

            <div>
                {!relic.finale && <img src={images.diamond} alt='Loot points' />} {!relic.finale && ' ' + relic.loot}
                {!relic.finale && <img src={images.heart} alt='Health points' />} {!relic.finale && ' ' + relic.health}
            </div>

        </span>
    )
}

export default RelicChallenge

