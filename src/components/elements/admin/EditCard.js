import React, { useEffect, useReducer, useState } from "react";
import {
    updateAutoComplete,
    updateBoss,
    updateCard,
    updateCardName,
    updateCardNumber,
    updateCounters,
    updateDifficulty,
    updateDoubleAssist,
    updateEffectText,
    updateFaceUp,
    updateFinale,
    updateFlippable,
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

const EditCard = ({ deckCard, updateCardCloud, currentCardNumber, removeCard, cardKeyIndex }) => {
    const [cardState, dispatchCardState] = useReducer(cardReducer, defaultCardState)
    const [showCard, setShowCard] = useState(false)
    const [pairedKeyMessage, setPairedKeyMessage] = useState('')

    const saveChange = () => {
        updateCardCloud(cardState)
    }

    useEffect(() => {
        // When the card information changes in the cloud (received by the listener
        // in DeckUpdates), mirror that information into the local cardState.
        // Local cardState must exist to serve as the intermediary when making edits 
        // to the card information locally
        dispatchCardState(updateCard(deckCard))
    }, [deckCard])

    useEffect(() => {
        // When this element is passed a card number, update the local state
        dispatchCardState(updateCardNumber(currentCardNumber))
    }, [currentCardNumber])

    useEffect(() => {
        if (deckCard.pairedWith.length > 0 && !cardKeyIndex.includes(deckCard.pairedWith)) {
            setPairedKeyMessage('Please re-pair')
        } else if (deckCard.pairedWith.length > 0 && cardKeyIndex.includes(deckCard.pairedWith)) {
            setPairedKeyMessage('Paired')
        }
    }, [cardKeyIndex])


    return (
        <div>
            <div>
                <label htmlFor="cardNumber">Card Number: </label>
                <input
                    id="cardNumber"
                    name="cardNumber"
                    type='number'
                    value={cardState.cardNumber}
                    onChange={(e) => {
                        dispatchCardState(updateCardNumber(e.target.value))
                    }}
                    onBlur={() => { saveChange() }}
                />

                Card Key: {deckCard.cardKey}

                <button
                    onClick={() => { navigator.clipboard.writeText(deckCard.cardKey) }}
                >Copy</button>

                <label htmlFor="pairedWith">    Paired With: </label>
                <input
                    id="pairedWith"
                    name="pairedWith"
                    type='text'
                    placeholder="enter Card Key"
                    value={cardState.pairedWith}
                    onChange={(e) => {
                        dispatchCardState(updatePairedWith(e.target.value))
                    }}
                    onBlur={() => { saveChange() }}
                />

                {pairedKeyMessage}

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
                    }}
                    onBlur={() => { saveChange() }}
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
                    onBlur={() => { saveChange() }}
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
                    onBlur={() => { saveChange() }}
                />

                <button
                    onClick={() => { setShowCard(!showCard) }}
                >toggle</button>
            </div>

            {showCard &&
                <div>
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
                        />

                        <label htmlFor="faceUp">Can start face up: </label>
                        <select
                            name="faceUp"
                            id="faceUp"
                            value={cardState.faceUp}
                            onChange={(e) => { dispatchCardState(updateFaceUp(e.target.value)) }}
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
                        />

                        <label htmlFor="hasEffect"> Has Effect: </label>
                        <select
                            name="hasEffect"
                            id="hasEffect"
                            value={cardState.hasEffect}
                            onChange={(e) => { dispatchCardState(updateHasEffect(e.target.value)) }}
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="requiresToken"> Requires Token: </label>
                        <select
                            name="requiresToken"
                            id="requiresToken"
                            value={cardState.requiresToken}
                            onChange={(e) => { dispatchCardState(updateRequiresToken(e.target.value)) }}
                            onBlur={() => { saveChange() }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="requiresReroll">    Requires Reroll: </label>
                        <select
                            name="requiresReroll"
                            id="requiresReroll"
                            value={cardState.requiresReroll}
                            onChange={(e) => { dispatchCardState(updateRequiresReroll(e.target.value)) }}
                            onBlur={() => { saveChange() }}
                        >
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>

                        <label htmlFor="gerblin">   Gerblin: </label>
                        <select
                            name="gerblin"
                            id="gerblin"
                            value={cardState.gerblin}
                            onChange={(e) => { dispatchCardState(updateGerblin(e.target.value)) }}
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
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
                            onBlur={() => { saveChange() }}
                        />

                    </div>
                    <button
                        onClick={() => { removeCard(cardState) }}
                    >Remove Card</button>

                </div>
            }
            <div>------------------------------------------------------------</div>
        </div>
    )

}

export default EditCard


