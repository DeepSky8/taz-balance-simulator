import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startNewCard, startRemoveCard, startUpdateCard } from "../../../../actions/cardActions";
import { auth, db } from "../../../../firebase/firebase";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";
import EditCard from "./EditCard";
import { adminAccess } from "../lincolnLogs";
import NewCard from "./NewCard";

const DeckUpdates = () => {
    let navigate = useNavigate()
    useEffect(() => {
        if (auth.currentUser.uid !== adminAccess) {
            navigate('/')
        }
    })
    const [activeDeckCode, setActiveDeckCode] = useState('')
    const [activeDeck, setActiveDeck] = useState([])
    const [effectDeck, setEffectDeck] = useState([])
    const [displayDeck, setDisplayDeck] = useState([])
    const [cardKeyIndex, setCardKeyIndex] = useState([])
    const [newCardDisplay, setNewCardDisplay] = useState(false)
    const [hasEffectDisplay, setHasEffectDisplay] = useState(false)

    const saveNewCard = (cardData) => {
        startNewCard(activeDeckCode, cardData)
    }

    const updateCardCloud = (cardData) => {
        startUpdateCard(activeDeckCode, cardData, cardData.cardKey)
    }

    const removeCard = (cardData) => {
        startRemoveCard(activeDeckCode, cardData.cardKey)
    }

    const toggleEffectDisplay = () => {
        if (!hasEffectDisplay) {
            setDisplayDeck(effectDeck)
        } else {
            setDisplayDeck(activeDeck)
        }

        setHasEffectDisplay(!hasEffectDisplay)
    }

    const toggleNewCardDisplay = () => {
        setNewCardDisplay(!newCardDisplay)
    }

    // Listener on the selected deck
    useEffect(() => {

        if (activeDeckCode.length > 0) {
            onValue(ref(db, `challenges/${activeDeckCode}`),
                (snapshot) => {
                    const deckArray = [];
                    const effectArray = [];
                    const cardKeyArray = [];
                    if (snapshot.exists()) {
                        snapshot.forEach((deckSnapshot) => {

                            deckArray.push(deckSnapshot.val())

                            if (deckSnapshot.val().hasEffect) {
                                effectArray.push(deckSnapshot.val())
                            }
                        })
                    }
                    // After getting the list of cards from the server
                    // sort them by current cardNumber
                    deckArray.sort((a, b) => { return a.cardNumber - b.cardNumber })
                    // Create a corresponding list of cardKeys to use in 
                    // re-generating cardNumbers in the event that you need to
                    // remove or manually renumber the cards
                    deckArray.forEach((card) => { cardKeyArray.push(card.cardKey) })

                    setActiveDeck(deckArray)
                    setEffectDeck(effectArray)
                    setDisplayDeck(deckArray)
                    setHasEffectDisplay(false)
                    setCardKeyIndex(cardKeyArray)
                })
        }

        return (() => {
            off(ref(db, `challenges/${activeDeckCode}`))
        })

    }, [activeDeckCode])

    return (
        <div>
            <label htmlFor="challengeDeckMenu">Select a deck to edit:</label>
            <select
                name="challengeDeckMenu"
                id="challengeDeckMenu"
                defaultValue='--Please select a challenge--'
                onChange={(e) => { setActiveDeckCode(e.target.value) }}
            >
                <option
                    key={'pleaseSelect'}
                    disabled
                >
                    --Please select a challenge--
                </option>

                <optgroup label="Villains">
                    {villainObjectsArray.map((headerObject) => {
                        return (
                            <option
                                key={headerObject.challengeCode}
                                value={headerObject.challengeCode}
                            >
                                {headerObject.challengeName}
                            </option>
                        )
                    })}
                </optgroup>
                <optgroup label="Relics">
                    {relicObjectsArray.map((headerObject) => {
                        return (
                            <option
                                key={headerObject.challengeCode}
                                value={headerObject.challengeCode}
                            >
                                {headerObject.challengeName}
                            </option>
                        )
                    })}
                </optgroup>
                <optgroup label="Locations">
                    {locationObjectsArray.map((headerObject) => {
                        return (
                            <option
                                key={headerObject.challengeCode}
                                value={headerObject.challengeCode}
                            >
                                {headerObject.challengeName}
                            </option>
                        )
                    })}
                </optgroup>
            </select>

            <div>
                <button
                    onClick={() => { toggleNewCardDisplay() }}
                >
                    Toggle New Card interface
                </button>

                <button
                    onClick={() => { toggleEffectDisplay() }}
                >
                    Show only cards with effects: {hasEffectDisplay.toString()}
                </button>
            </div>


            {(activeDeckCode.length > 0 && newCardDisplay) &&
                <NewCard
                    saveNewCard={saveNewCard}
                    cardNumber={activeDeck.length + 1}
                />
            }

            {displayDeck.length > 0 &&
                displayDeck.map((deckCard) => {
                    return (
                        <EditCard
                            key={deckCard.cardKey}
                            deckCard={deckCard}
                            updateCardCloud={updateCardCloud}
                            currentCardNumber={(cardKeyIndex.indexOf(deckCard.cardKey) + 1)}
                            removeCard={removeCard}
                            cardKeyIndex={cardKeyIndex}
                        />
                    )
                })



            }




        </div>
    )
}

export default DeckUpdates



        // onValue(ref(db, 'decks/villainHeaders'),
        //     (snapshot) => {
        //         const deckArray = [];
        //         if (snapshot.exists()) {
        //             snapshot.forEach((deckSnapshot) => {
        //                 deckArray.push(deckSnapshot.val())
        //             })
        //         }
        //         setVillainHeaderArray(deckArray)
        //     })

        // onValue(ref(db, 'decks/relicHeaders'),
        //     (snapshot) => {
        //         const deckArray = [];
        //         if (snapshot.exists()) {
        //             snapshot.forEach((deckSnapshot) => {
        //                 deckArray.push(deckSnapshot.val())
        //             })
        //         }
        //         setRelicHeaderArray(deckArray)
        //     })

        // onValue(ref(db, 'decks/locationHeaders'),
        //     (snapshot) => {
        //         const deckArray = [];
        //         if (snapshot.exists()) {
        //             snapshot.forEach((deckSnapshot) => {
        //                 deckArray.push(deckSnapshot.val())
        //             })
        //         }
        //         setLocationHeaderArray(deckArray)
        //     })