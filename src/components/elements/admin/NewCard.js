import React, { useReducer } from "react";
import {
    resetCard,
    updateAutoComplete,
    updateAutoDamage,
    updateAutoDefeat,
    updateAutoDiscard,
    updateBoss,
    updateCardName,
    updateCardNumber,
    updateCounters,
    updateDifficulty,
    updateDoubleAssist,
    updateEffectText,
    updateFaceUp,
    updateFinale,
    updateFlipEffect,
    updateFlipOnDefeat,
    updateFlipOnDiscard,
    updateFlipOnFail,
    updateFlippable,
    updateFlipTarget,
    updateGerblin,
    updateHasEffect,
    updateHealth,
    updateLocationModifier,
    updateLoot,
    updateMagic,
    updateMonster,
    updateNameFlavor,
    updateNoAssist,
    updatePairedWith,
    updateRelicModifier,
    updateRequiresReroll,
    updateRequiresToken,
    updateSpooky,
    updateStoryBonus,
    updateStoryPrompt,
    updateTrap,
    updateVillainModifier
} from "../../../actions/cardActions";
import { cardReducer, defaultCardState } from "../../../reducers/cardReducer";

const NewCard = ({ saveNewCard, cardNumber }) => {
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    return (
        <div>
            <div>
                Card Number: {cardNumber}
                <label htmlFor="pairedWith">    ||    Paired With: </label>
                <input
                    id="pairedWith"
                    name="pairedWith"
                    type='text'
                    placeholder="enter Card Key"
                    value={cardState.pairedWith}
                    onChange={(e) => {
                        dispatchCardState(updatePairedWith(e.target.value))
                    }}
                />
            </div>

            <div>

                <label htmlFor="nameFlavor">Name Flavor: </label>
                <input
                    id="nameFlavor"
                    name="nameFlavor"
                    type='text'
                    placeholder="You're arguing with a"
                    value={cardState.nameFlavor}
                    onChange={(e) => {
                        dispatchCardState(updateNameFlavor(e.target.value))
                        dispatchCardState(updateCardNumber(cardNumber))
                    }}
                />

                <label htmlFor="cardName">Card Name: </label>
                <input
                    id="cardName"
                    name="cardName"
                    type='text'
                    placeholder="Smack-Talking Skull"
                    value={cardState.cardName}
                    onChange={(e) => {
                        dispatchCardState(updateCardName(e.target.value))
                    }}
                />

                <label htmlFor="difficulty">Difficulty: </label>
                <input
                    id="difficulty"
                    name="difficulty"
                    type='number'

                    value={cardState.difficulty}
                    onChange={(e) => {
                        dispatchCardState(updateDifficulty(e.target.value))
                    }}
                />
            </div>

            <div>
                <label htmlFor="villainModifier">Villain Modifier: </label>
                <input
                    id="villainModifier"
                    name="villainModifier"
                    type='number'

                    value={cardState.villainModifier}
                    onChange={(e) => {
                        dispatchCardState(updateVillainModifier(e.target.value))
                    }}
                />

                <label htmlFor="relicModifier">Relic Modifier: </label>
                <input
                    id="relicModifier"
                    name="relicModifier"
                    type='number'

                    value={cardState.relicModifier}
                    onChange={(e) => {
                        dispatchCardState(updateRelicModifier(e.target.value))
                    }}
                />

                <label htmlFor="locationModifier">Location Modifier: </label>
                <input
                    id="locationModifier"
                    name="locationModifier"
                    type='number'

                    value={cardState.locationModifier}
                    onChange={(e) => {
                        dispatchCardState(updateLocationModifier(e.target.value))
                    }}
                />
            </div>

            <div>
                <label htmlFor="loot">Loot Points: </label>
                <input
                    id="loot"
                    name="loot"
                    type='number'

                    value={cardState.loot}
                    onChange={(e) => {
                        dispatchCardState(updateLoot(e.target.value))
                    }}
                />

                <label htmlFor="health">Health Points: </label>
                <input
                    id="health"
                    name="health"
                    type='number'

                    value={cardState.health}
                    onChange={(e) => {
                        dispatchCardState(updateHealth(e.target.value))
                    }}
                />

                <label htmlFor="faceUp">Can start face up: </label>
                <select
                    name="faceUp"
                    id="faceUp"
                    value={cardState.faceUp}
                    onChange={(e) => { dispatchCardState(updateFaceUp(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

            </div>

            <div>
                <label htmlFor="monster">Monster: </label>
                <select
                    name="monster"
                    id="monster"
                    value={cardState.monster}
                    onChange={(e) => { dispatchCardState(updateMonster(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="spooky">    Spooky: </label>
                <select
                    name="spooky"
                    id="spooky"
                    value={cardState.spooky}
                    onChange={(e) => { dispatchCardState(updateSpooky(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="magic"> Magic: </label>
                <select
                    name="magic"
                    id="magic"
                    value={cardState.magic}
                    onChange={(e) => { dispatchCardState(updateMagic(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="trap">  Trap: </label>
                <select
                    name="trap"
                    id="trap"
                    value={cardState.trap}
                    onChange={(e) => { dispatchCardState(updateTrap(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="noAssist">  No Assist: </label>
                <select
                    name="noAssist"
                    id="noAssist"
                    value={cardState.noAssist}
                    onChange={(e) => { dispatchCardState(updateNoAssist(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="doubleAssist">  Double Assist: </label>
                <select
                    name="doubleAssist"
                    id="doubleAssist"
                    value={cardState.doubleAssist}
                    onChange={(e) => { dispatchCardState(updateDoubleAssist(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

            </div>

            <div>
                <label htmlFor="storyBonus">Story Bonus: </label>
                <input
                    id="storyBonus"
                    name="storyBonus"
                    type='number'

                    value={cardState.storyBonus}
                    onChange={(e) => {
                        dispatchCardState(updateStoryBonus(e.target.value))
                    }}
                />

                <label htmlFor="storyPrompt">Story Prompt: </label>
                <input
                    id="storyPrompt"
                    name="storyPrompt"
                    type='text'
                    placeholder="What's this haunted skull's cruelest insult?"
                    value={cardState.storyPrompt}
                    onChange={(e) => {
                        dispatchCardState(updateStoryPrompt(e.target.value))
                    }}
                />

                <label htmlFor="effectText">Effect Text: </label>
                <input
                    id="effectText"
                    name="effectText"
                    type='text'
                    placeholder="Effect text goes here"
                    value={cardState.effectText}
                    onChange={(e) => {
                        dispatchCardState(updateEffectText(e.target.value))
                    }}
                />
                <label htmlFor="hasEffect"> Has Effect: </label>
                <select
                    name="hasEffect"
                    id="hasEffect"
                    value={cardState.hasEffect}
                    onChange={(e) => { dispatchCardState(updateHasEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
            </div>

            <div>
                <label htmlFor="autoComplete">Auto Complete: </label>
                <select
                    name="autoComplete"
                    id="autoComplete"
                    value={cardState.autoComplete}
                    onChange={(e) => { dispatchCardState(updateAutoComplete(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="autoDefeat">Auto Defeat: </label>
                <select
                    name="autoDefeat"
                    id="autoDefeat"
                    value={cardState.autoDefeat}
                    onChange={(e) => { dispatchCardState(updateAutoDefeat(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="autoDiscard">Auto Discard: </label>
                <select
                    name="autoDiscard"
                    id="autoDiscard"
                    value={cardState.autoDiscard}
                    onChange={(e) => { dispatchCardState(updateAutoDiscard(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="autoDamage">    Auto Damage: </label>
                <select
                    name="autoDamage"
                    id="autoDamage"
                    value={cardState.autoDamage}
                    onChange={(e) => { dispatchCardState(updateAutoDamage(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="requiresToken"> Req Token: </label>
                <select
                    name="requiresToken"
                    id="requiresToken"
                    value={cardState.requiresToken}
                    onChange={(e) => { dispatchCardState(updateRequiresToken(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="requiresReroll">    Req Reroll: </label>
                <select
                    name="requiresReroll"
                    id="requiresReroll"
                    value={cardState.requiresReroll}
                    onChange={(e) => { dispatchCardState(updateRequiresReroll(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

            </div>

            <div>
                <label htmlFor="flipEffect">Flip Effect: </label>
                <select
                    name="flipEffect"
                    id="flipEffect"
                    value={cardState.flipEffect}
                    onChange={(e) => { dispatchCardState(updateFlipEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.flipEffect &&
                    <span>

                        <label htmlFor="flipTarget">    Flip Target: </label>
                        <select
                            name="flipTarget"
                            id="flipTarget"
                            value={cardState.flipTarget}
                            onChange={(e) => { dispatchCardState(updateFlipTarget(e.target.value)) }}
                        >
                            <option value={''}>--none--</option>
                            <option value={'villain'}>Villain</option>
                            <option value={'relic'}>Relic</option>
                            <option value={'location'}>Location</option>
                        </select>

                        <label htmlFor="flipOnDefeat">  Flip on defeat: </label>
                        <select
                            name="flipOnDefeat"
                            id="flipOnDefeat"
                            value={cardState.flipOnDefeat}
                            onChange={(e) => { dispatchCardState(updateFlipOnDefeat(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="flipOnDiscard"> Flip on discard: </label>
                        <select
                            name="flipOnDiscard"
                            id="flipOnDiscard"
                            value={cardState.flipOnDiscard}
                            onChange={(e) => { dispatchCardState(updateFlipOnDiscard(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="flipOnFail">    Flip on fail: </label>
                        <select
                            name="flipOnFail"
                            id="flipOnFail"
                            value={cardState.flipOnFail}
                            onChange={(e) => { dispatchCardState(updateFlipOnFail(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>


                    </span>
                }

            </div>

            <div>

                <label htmlFor="gerblin">   Gerblin: </label>
                <select
                    name="gerblin"
                    id="gerblin"
                    value={cardState.gerblin}
                    onChange={(e) => { dispatchCardState(updateGerblin(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="flippable">   Flippable: </label>
                <select
                    name="flippable"
                    id="flippable"
                    value={cardState.flippable}
                    onChange={(e) => { dispatchCardState(updateFlippable(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="boss">   Boss: </label>
                <select
                    name="boss"
                    id="boss"
                    value={cardState.boss}
                    onChange={(e) => { dispatchCardState(updateBoss(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="finale">   Finale: </label>
                <select
                    name="finale"
                    id="finale"
                    value={cardState.finale}
                    onChange={(e) => { dispatchCardState(updateFinale(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="counters">  Counters: </label>
                <input
                    id="counters"
                    name="counters"
                    type='number'

                    value={cardState.counters}
                    onChange={(e) => {
                        dispatchCardState(updateCounters(e.target.value))
                    }}
                />

            </div>
            <button
                onClick={() => {
                    saveNewCard(cardState);
                    dispatchCardState(resetCard())
                }}
            >
                Save Card
            </button>
            <div>
                ------------------------------------------------------------
            </div>
        </div>
    )
}

export default NewCard