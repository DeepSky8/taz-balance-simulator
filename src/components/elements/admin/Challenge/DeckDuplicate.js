import { off, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { startAddDeckItem } from "../../../../actions/cardActions";
import { db } from "../../../../firebase/firebase";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";

const DeckDuplicate = () => {
    const [activeDeckCode, setActiveDeckCode] = useState('')
    const [newDeckCode, setNewDeckCode] = useState('')
    const [newDeckArray, setNewDeckArray] = useState([])

    useEffect(() => {
        if (activeDeckCode !== '') {
            onValue(ref(db, 'decks/' + activeDeckCode),
                (snapshot) => {
                    const tempDeckStorage = [];
                    if (snapshot.exists()) {
                        snapshot.forEach((card) => {
                            tempDeckStorage.push(card.val())
                        })
                        setNewDeckArray(tempDeckStorage)
                        setNewDeckCode(activeDeckCode.split('-', 1))
                    }
                })

        }

        return () => {
            off(ref(db, 'decks/' + activeDeckCode))
        }
    }, [activeDeckCode])


    useEffect(() => {
        if (newDeckCode !== '') {
            newDeckArray.forEach((card) => {
                startAddDeckItem(newDeckCode, card)
            })

        }
    }, [newDeckCode])

    return (
        <div>
            <label htmlFor="challengeDeckMenu">Select a deck to copy:</label>
            <select
                name="challengeDeckMenu"
                id="challengeDeckMenu"
                defaultValue='--Please select a deck--'
                onChange={(e) => { setActiveDeckCode(e.target.value) }}
            >
                <option disabled>--Please select a deck--</option>
                <optgroup label="Villains">
                    {villainObjectsArray.map((headerObject) => {
                        return (
                            <option
                                key={headerObject.challengeCode}
                                value={headerObject.challengeCode + '-' + headerObject.challengeName}
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
                                value={headerObject.challengeCode + '-' + headerObject.challengeName}
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
                                value={headerObject.challengeCode + '-' + headerObject.challengeName}
                            >
                                {headerObject.challengeName}
                            </option>
                        )
                    })}
                </optgroup>
            </select>
        </div>
    )
}

export default DeckDuplicate

// <label htmlFor="dupDeck">Select a deck to duplicate:</label>
// <select
//     name="dupDeck"
//     id="dupDeck"
//     defaultValue='--Please select a deck--'
//     onChange={(e) => { setDeckToDuplicateCode(e.target.value) }}
// >
//     <option disabled>--Please select a deck--</option>
//     {deckTitles.map((title) => {
//         return (
//             <option
//                 key={title}
//                 value={title}
//             >
//                 {title}
//             </option>
//         )
//     })}
// </select>