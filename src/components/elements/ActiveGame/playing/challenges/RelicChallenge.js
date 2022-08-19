import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { cardReducer, defaultCardState } from "../../../../../reducers/cardReducer";
import { images } from "./imageInfo";

const RelicChallenge = ({ relic, modifierVillain, modifierLocation, challengePicked }) => {


    const difficulty = parseInt(relic.difficulty) + parseInt(modifierVillain) + parseInt(modifierLocation)

    return (
        <span>

            <span>
                {relic.villainModifier > 0 && '   +'}{relic.villainModifier > 0 && relic.villainModifier}

                <button
                    onClick={() => { challengePicked() }}
                >{difficulty}</button>


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
                {relic.noAssist && <img src={images.no_assist} alt="No Assist Challenge" />}
                {relic.doubleAssist && <img src={images.double_assist} alt="Double Assist Challenge" />}

            </span>

            <div>
                {relic.storyBonus.length > 0 && 'Story +1: '}
                {relic.storyPrompt.length > 0 && relic.storyPrompt}
                <p>{(relic.effectText.length > 0 && relic.storyPrompt.length > 0) && '---'}</p>
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

