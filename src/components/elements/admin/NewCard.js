import React, { useReducer } from "react";
import {
    defeatZeroCounters,
    failingAddsCounters,
    failingRemovesCounters,
    resetCard,
    updateAdvantage,
    updateAutoComplete,
    updateAutoDamage,
    updateAutoDefeat,
    updateAutoDiscard,
    updateBoss,
    updateCardName,
    updateCardNumber,
    updateChance,
    updateCounterEffect,
    updateCounters,
    updateCrew,
    updateDifficulty,
    updateDisadvantage,
    updateDiscardKostCoDefeat,
    updateDiscardKostCoDraw,
    updateDiscardKostCoStrength,
    updateDiscardKostCoStrengthBonus,
    updateDiscardSurprise,
    updateDoubleAssist,
    updateEffectText,
    updateFaceUp,
    updateFailCounterNumber,
    updateFinale,
    updateFlipEffect,
    updateFlipInsteadDefeat,
    updateFlipOnDefeat,
    updateFlipOnDiscard,
    updateFlipOnFail,
    updateFlippable,
    updateFlipTarget,
    updateGainLifeDefeat,
    updateGainLifeDiscard,
    updateGainLifeEffect,
    updateGainLifeReveal,
    updateGerblin,
    updateGiant,
    updateHasEffect,
    updateHealth,
    updateItalicText,
    updateKostCoEffect,
    updateLocationModifier,
    updateLoot,
    updateLoseLootEffect,
    updateLoseLootOnDefeat,
    updateLoseLootOnDiscard,
    updateLoseLootOnFail,
    updateLoseLootOnReveal,
    updateLoseLootPoints,
    updateMagic,
    updateModifyEffect,
    updateModifyMagic,
    updateModifyMonster,
    updateModifySpooky,
    updateModifyTrap,
    updateMonster,
    updateNameFlavor,
    updateNoAssist,
    updateNoRoll,
    updatePairedWith,
    updateRandomize,
    updateReduceKostCoCost,
    updateReencounterGerblin,
    updateRelicModifier,
    updateRequiresReroll,
    updateRequiresToken,
    updateSpecialType,
    updateSpendLootForEffect,
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

                <label htmlFor="randomize">  Randomize: </label>
                <select
                    name="randomize"
                    id="randomize"
                    value={cardState.randomize}
                    onChange={(e) => { dispatchCardState(updateRandomize(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

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

                <label htmlFor="noRoll">  No Roll: </label>
                <select
                    name="noRoll"
                    id="noRoll"
                    value={cardState.noRoll}
                    onChange={(e) => { dispatchCardState(updateNoRoll(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <label htmlFor="chance">  Chance: </label>
                <select
                    name="chance"
                    id="chance"
                    value={cardState.chance}
                    onChange={(e) => { dispatchCardState(updateChance(e.target.value)) }}
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
                    style={{ width: 3 + 'em' }}
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

                <label htmlFor="italicText">    Italic Text: </label>
                <input
                    id="italicText"
                    name="italicText"
                    type='text'
                    placeholder="It's incredibly cutting"
                    value={cardState.italicText}
                    onChange={(e) => {
                        dispatchCardState(updateItalicText(e.target.value))
                    }}
                />

            </div>

            <div>
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


                {!cardState.hasEffect &&
                    <span>
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
                    </span>
                }

                {cardState.hasEffect &&
                    <span>
                        <label htmlFor="effectText">Effect Text: </label>
                        <textarea
                            id="effectText"
                            name="effectText"
                            type='text'
                            placeholder="Effect text goes here"
                            rows="4"
                            cols="40"
                            value={cardState.effectText}
                            onChange={(e) => {
                                dispatchCardState(updateEffectText(e.target.value))
                            }}

                        />
                    </span>
                }



            </div>

            <div>

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

                {cardState.requiresReroll &&
                    <span>
                        <label htmlFor="advantage">   Advantage: </label>
                        <select
                            name="advantage"
                            id="advantage"
                            value={cardState.advantage}
                            onChange={(e) => { dispatchCardState(updateAdvantage(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="disadvantage">   Disadvantage: </label>
                        <select
                            name="disadvantage"
                            id="disadvantage"
                            value={cardState.disadvantage}
                            onChange={(e) => { dispatchCardState(updateDisadvantage(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                    </span>
                }
            </div>

            <div>
                <label htmlFor="discardSurprise">    Discard Surprise card to defeat: </label>
                <select
                    name="discardSurprise"
                    id="discardSurprise"
                    value={cardState.discardSurprise}
                    onChange={(e) => { dispatchCardState(updateDiscardSurprise(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
            </div>

            <div>
                <label htmlFor="reencounterGerblin">    Reencounter Gerblin: </label>
                <select
                    name="reencounterGerblin"
                    id="reencounterGerblin"
                    value={cardState.reencounterGerblin}
                    onChange={(e) => { dispatchCardState(updateReencounterGerblin(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
            </div>

            <div>

                <label htmlFor="kostCoEffect">    KostCo Effect: </label>
                <select
                    name="kostCoEffect"
                    id="kostCoEffect"
                    value={cardState.kostCoEffect}
                    onChange={(e) => { dispatchCardState(updateKostCoEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.kostCoEffect &&
                    <span>
                        <label htmlFor="discardKostCoDefeat">    Discard Kostco card to defeat: </label>
                        <select
                            name="discardKostCoDefeat"
                            id="discardKostCoDefeat"
                            value={cardState.discardKostCoDefeat}
                            onChange={(e) => { dispatchCardState(updateDiscardKostCoDefeat(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="discardKostCoDraw">    On Defeat, Discard Kostco card to draw: </label>
                        <select
                            name="discardKostCoDraw"
                            id="discardKostCoDraw"
                            value={cardState.discardKostCoDraw}
                            onChange={(e) => { dispatchCardState(updateDiscardKostCoDraw(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                        <div>

                            <label htmlFor="discardKostCoStrength">    Pre Roll, Discard KostCo card to add Strength: </label>
                            <select
                                name="discardKostCoStrength"
                                id="discardKostCoStrength"
                                value={cardState.discardKostCoStrength}
                                onChange={(e) => { dispatchCardState(updateDiscardKostCoStrength(e.target.value)) }}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>

                            <label htmlFor="discardKostCoStrengthBonus">    Add Strength: </label>
                            <input
                                id="discardKostCoStrengthBonus"
                                name="discardKostCoStrengthBonus"
                                type='number'
                                style={{ width: 3 + 'em' }}
                                value={cardState.discardKostCoStrengthBonus}
                                onChange={(e) => {
                                    dispatchCardState(updateDiscardKostCoStrengthBonus(e.target.value))
                                }}
                            />
                        </div>
                    </span>
                }

            </div>

            <div>

                <label htmlFor="specialType">   Special Type: </label>
                <select
                    name="specialType"
                    id="specialType"
                    value={cardState.specialType}
                    onChange={(e) => { dispatchCardState(updateSpecialType(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.specialType &&
                    <span>

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

                        <label htmlFor="crew">   Crew: </label>
                        <select
                            name="crew"
                            id="crew"
                            value={cardState.crew}
                            onChange={(e) => { dispatchCardState(updateCrew(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="giant">   Giant: </label>
                        <select
                            name="giant"
                            id="giant"
                            value={cardState.giant}
                            onChange={(e) => { dispatchCardState(updateGiant(e.target.value)) }}
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
                    </span>
                }


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

                {cardState.autoComplete &&
                    <span>
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
                    </span>
                }
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

                        <label htmlFor="flipInsteadOfDefeat">    Flip instead of defeat: </label>
                        <select
                            name="flipInsteadOfDefeat"
                            id="flipInsteadOfDefeat"
                            value={cardState.flipInsteadOfDefeat}
                            onChange={(e) => { dispatchCardState(updateFlipInsteadDefeat(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                    </span>
                }

            </div>

            <div>
                <label htmlFor="modifyEffect">Modify Effect: </label>
                <select
                    name="modifyEffect"
                    id="modifyEffect"
                    value={cardState.modifyEffect}
                    onChange={(e) => { dispatchCardState(updateModifyEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.modifyEffect &&
                    <span>
                        <label htmlFor="modifyMonster">Modify Monster: </label>
                        <input
                            id="modifyMonster"
                            name="modifyMonster"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.modifyMonster}
                            onChange={(e) => {
                                dispatchCardState(updateModifyMonster(e.target.value))
                            }}
                        />

                        <label htmlFor="modifySpooky">Modify Spooky: </label>
                        <input
                            id="modifySpooky"
                            name="modifySpooky"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.modifySpooky}
                            onChange={(e) => {
                                dispatchCardState(updateModifySpooky(e.target.value))
                            }}
                        />

                        <label htmlFor="modifyMagic">Modify Magic: </label>
                        <input
                            id="modifyMagic"
                            name="modifyMagic"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.modifyMagic}
                            onChange={(e) => {
                                dispatchCardState(updateModifyMagic(e.target.value))
                            }}
                        />

                        <label htmlFor="modifyTrap">Modify Trap: </label>
                        <input
                            id="modifyTrap"
                            name="modifyTrap"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.modifyTrap}
                            onChange={(e) => {
                                dispatchCardState(updateModifyTrap(e.target.value))
                            }}
                        />

                    </span>
                }
            </div>

            <div>
                <label htmlFor="gainLifeEffect">Gain Life Effect: </label>
                <select
                    name="gainLifeEffect"
                    id="gainLifeEffect"
                    value={cardState.gainLifeEffect}
                    onChange={(e) => { dispatchCardState(updateGainLifeEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.gainLifeEffect &&
                    <span>
                        <label htmlFor="gainLifeDefeat">Gain Life on Defeat: </label>
                        <input
                            id="gainLifeDefeat"
                            name="gainLifeDefeat"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.gainLifeDefeat}
                            onChange={(e) => {
                                dispatchCardState(updateGainLifeDefeat(e.target.value))
                            }}
                        />

                        <label htmlFor="gainLifeDiscard">Gain Life on Discard: </label>
                        <input
                            id="gainLifeDiscard"
                            name="gainLifeDiscard"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.gainLifeDiscard}
                            onChange={(e) => {
                                dispatchCardState(updateGainLifeDiscard(e.target.value))
                            }}
                        />

                        <label htmlFor="gainLifeReveal">Gain Life on Reveal: </label>
                        <input
                            id="gainLifeReveal"
                            name="gainLifeReveal"
                            type='number'
                            style={{ width: 3 + 'em' }}
                            value={cardState.gainLifeReveal}
                            onChange={(e) => {
                                dispatchCardState(updateGainLifeReveal(e.target.value))
                            }}
                        />
                    </span>
                }
            </div>

            <div>
                <label htmlFor="loseLootEffect">    Loot Effect: </label>
                <select
                    name="loseLootEffect"
                    id="loseLootEffect"
                    value={cardState.loseLootEffect}
                    onChange={(e) => { dispatchCardState(updateLoseLootEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.loseLootEffect &&

                    <span>

                        <label htmlFor="loseLootOnFail">    On Fail: </label>
                        <select
                            name="loseLootOnFail"
                            id="loseLootOnFail"
                            value={cardState.loseLootOnFail}
                            onChange={(e) => { dispatchCardState(updateLoseLootOnFail(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="loseLootOnReveal">    On Reveal: </label>
                        <select
                            name="loseLootOnReveal"
                            id="loseLootOnReveal"
                            value={cardState.loseLootOnReveal}
                            onChange={(e) => { dispatchCardState(updateLoseLootOnReveal(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="loseLootOnDefeat">    On Defeat: </label>
                        <select
                            name="loseLootOnDefeat"
                            id="loseLootOnDefeat"
                            value={cardState.loseLootOnDefeat}
                            onChange={(e) => { dispatchCardState(updateLoseLootOnDefeat(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="loseLootOnDiscard">    On Discard: </label>
                        <select
                            name="loseLootOnDiscard"
                            id="loseLootOnDiscard"
                            value={cardState.loseLootOnDiscard}
                            onChange={(e) => { dispatchCardState(updateLoseLootOnDiscard(e.target.value)) }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <div>

                            <label htmlFor="reduceKostCoCost">    Reduce KostCo Cost: </label>
                            <select
                                name="reduceKostCoCost"
                                id="reduceKostCoCost"
                                value={cardState.reduceKostCoCost}
                                onChange={(e) => { dispatchCardState(updateReduceKostCoCost(e.target.value)) }}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>

                            <label htmlFor="spendLootForEffect">    Spend Loot for Effect: </label>
                            <select
                                name="spendLootForEffect"
                                id="spendLootForEffect"
                                value={cardState.spendLootForEffect}
                                onChange={(e) => { dispatchCardState(updateSpendLootForEffect(e.target.value)) }}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>

                            <label htmlFor="loseLootPoints">    Loot points to lose/spend/discount: </label>
                            <input
                                id="loseLootPoints"
                                name="loseLootPoints"
                                type='number'
                                style={{ width: 3 + 'em' }}
                                value={cardState.loseLootPoints}
                                onChange={(e) => {
                                    dispatchCardState(updateLoseLootPoints(e.target.value))
                                }}
                            />
                        </div>
                    </span>}


            </div>

            <div>
                <label htmlFor="counterEffect">Counter Effect: </label>
                <select
                    name="counterEffect"
                    id="counterEffect"
                    value={cardState.counterEffect}
                    onChange={(e) => { dispatchCardState(updateCounterEffect(e.target.value)) }}
                >
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                {cardState.counterEffect &&
                    <span>
                        <span>

                            <label htmlFor="defeatZeroCounters">  Defeating removes a counter: </label>
                            <select
                                name="defeatZeroCounters"
                                id="defeatZeroCounters"
                                value={cardState.defeatZeroCounters}
                                onChange={(e) => {
                                    dispatchCardState(defeatZeroCounters(e.target.value))
                                }}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>

                            <label htmlFor="counters">  Counters initially present: </label>
                            <input
                                id="counters"
                                name="counters"
                                type='number'
                                style={{ width: 3 + 'em' }}
                                value={cardState.counters}
                                onChange={(e) => {
                                    dispatchCardState(updateCounters(e.target.value))
                                }}
                            />


                        </span>

                        <div>

                            <label htmlFor="failingAddsCounters">  Failing Adds Counters: </label>
                            <select
                                name="failingAddsCounters"
                                id="failingAddsCounters"
                                value={cardState.failingAddsCounters}
                                onChange={(e) => { dispatchCardState(failingAddsCounters(e.target.value)) }}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>

                            <label htmlFor="failingRemovesCounters">  Failing Removes Counters: </label>
                            <select
                                name="failingRemovesCounters"
                                id="failingRemovesCounters"
                                value={cardState.failingRemovesCounters}
                                onChange={(e) => { dispatchCardState(failingRemovesCounters(e.target.value)) }}
                            >
                                <option value={true}>true</option>
                                <option value={false}>false</option>
                            </select>

                            <label htmlFor="failCounterNumber">  Number of counters to add/remove on fail: </label>
                            <input
                                id="failCounterNumber"
                                name="failCounterNumber"
                                type='number'
                                style={{ width: 3 + 'em' }}
                                value={cardState.failCounterNumber}
                                onChange={(e) => {
                                    dispatchCardState(updateFailCounterNumber(e.target.value))
                                }}
                            />
                        </div>
                    </span>
                }

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