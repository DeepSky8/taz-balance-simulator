import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { startPickActiveChallenge } from "../../../../../actions/cloudActions";
import { cardReducer, defaultCardState } from "../../../../../reducers/cardReducer";
import LocationChallenge from "./LocationChallenge";
import RelicChallenge from "./RelicChallenge";
import VillainChallenge from "./VillainChallenge";

const ChallengeFrame = ({ cloudState, challengeState }) => {
    const [villain, dispatchVillain] = useReducer(cardReducer, defaultCardState)
    const [villainModifier, setVillainModifier] = useState(0)
    const [relic, dispatchRelic] = useReducer(cardReducer, defaultCardState)
    const [relicModifierVillain, setRelicModifierVillain] = useState(0)
    const [relicModifierLocation, setRelicModifierLocation] = useState(0)
    const [location, dispatchLocation] = useReducer(cardReducer, defaultCardState)
    const [locationModifier, setLocationModifier] = useState(0)

    useEffect(() => {
        const activeCard = challengeState.deckVillain.uncompleted[0]
        if (activeCard) {
            const activeSide = activeCard[activeCard.visible]
            dispatchVillain(updateCard(activeSide))
            setRelicModifierVillain(activeSide.relicModifier)
        }
    }, [challengeState.deckVillain])

    useEffect(() => {
        const activeCard = challengeState.deckRelic.uncompleted[0]
        if (activeCard) {
            const activeSide = activeCard[activeCard.visible]
            dispatchRelic(updateCard(activeSide))
            setVillainModifier(activeSide.villainModifier)
            setLocationModifier(activeSide.locationModifier)
        }
    }, [challengeState.deckRelic])

    useEffect(() => {
        const activeCard = challengeState.deckLocation.uncompleted[0]
        if (activeCard) {
            const activeSide = activeCard[activeCard.visible]
            dispatchLocation(updateCard(activeSide))
            setRelicModifierLocation(activeSide.relicModifier)
        }
    }, [challengeState.deckLocation])

    useEffect(()=>{

    },[cloudState.selectedChallenge])

    const challengePicked = (cardKey) => { 
        startPickActiveChallenge(challengeState.hostKey, cardKey)
    }

    return (
        <div className="container">
            <VillainChallenge
                villain={villain}
                modifier={villainModifier}
                challengePicked={()=>{challengePicked(villain.cardKey)}}
            />
            <RelicChallenge
                relic={relic}
                modifierVillain={relicModifierVillain}
                modifierLocation={relicModifierLocation}
                challengePicked={()=>{challengePicked(relic.cardKey)}}
            />
            <LocationChallenge
                location={location}
                modifier={locationModifier}
                challengePicked={()=>{challengePicked(location.cardKey)}}
            />
        </div>
    )
}

export default ChallengeFrame

            // deckUncompletedRelic={deckUncompletedRelic}
            // deckUncompletedLocation={deckUncompletedLocation}


            // <VillainChallenge 
            // gameState={gameState} 
            // deckUncompletedVillain={deckUncompletedVillain}
            // />