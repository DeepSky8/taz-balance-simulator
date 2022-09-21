import React from "react";
import { images } from "./imageInfo";

const RelicChallenge = ({ challenge, modifierVillain, modifierLocation, stage, challengePicked, chanceRoll, activePlayerHasToken }) => {
    const difficulty = parseInt(challenge.difficulty) + parseInt(modifierVillain) + parseInt(modifierLocation) + chanceRoll
    const requiresToken = ((challenge.requiresToken && activePlayerHasToken))

    return (
        <span>

            <span>
                {challenge.villainModifier > 0 && '   +'}{challenge.villainModifier > 0 && challenge.villainModifier}

                {stage === 'CHALLENGE' && <button
                    disabled={requiresToken}
                    onClick={() => { challengePicked() }}
                >{difficulty}</button>}

                {stage !== 'CHALLENGE' && <span>{'  ' + difficulty + '  '}</span>}


                {challenge.locationModifier > 0 && '   +'}{challenge.locationModifier > 0 && challenge.locationModifier}
            </span>
            <p>
                {challenge.nameFlavor}
            </p>
            <h3>
                {challenge.cardName}
            </h3>
            <span>

                {challenge.monster && <img src={images.monster} alt="Monster Challenge" />}
                {challenge.spooky && <img src={images.spooky} alt="Spooky Challenge" />}
                {challenge.magic && <img src={images.magic} alt="Magic Challenge" />}
                {challenge.trap && <img src={images.trap} alt="Trap Challenge" />}
                {challenge.noAssist && <img src={images.noAssist} alt="No Assist Challenge" />}
                {challenge.doubleAssist && <img src={images.doubleAssist} alt="Double Assist Challenge" />}
                {challenge.noRoll && <img src={images.noRoll} alt="No Roll Challenge" />}
                {challenge.chance && <img src={images.chance} alt="Chance Roll Challenge" />}
            </span>

            <div>
                {challenge.storyBonus > 0 && 'Story +1: '}
                {challenge.storyPrompt.length > 0 && challenge.storyPrompt}
                <p>{(challenge.effectText && challenge.storyPrompt.length > 0) && '---'}</p>
                {challenge.effectText && challenge.effectText}
            </div>

            <div>
                {!challenge.finale && <img src={images.diamond} alt='Loot points' />} {!challenge.finale && ' ' + challenge.loot}
                {!challenge.finale && <img src={images.heart} alt='Health points' />} {!challenge.finale && ' ' + challenge.health}
            </div>

        </span>
    )
}

export default RelicChallenge

