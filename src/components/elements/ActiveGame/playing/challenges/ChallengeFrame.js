import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { startPickActiveChallenge } from "../../../../../actions/cloudActions";
import { auth } from "../../../../../firebase/firebase";
import { cardReducer, defaultCardState } from "../../../../../reducers/cardReducer";
import LocationChallenge from "./LocationChallenge";
import RelicChallenge from "./RelicChallenge";
import VillainChallenge from "./VillainChallenge";

const ChallengeFrame = ({ cloudState, localState }) => {
    const [villain, dispatchVillain] = useReducer(cardReducer, defaultCardState)
    const [villainModifier, setVillainModifier] = useState(0)
    const [relic, dispatchRelic] = useReducer(cardReducer, defaultCardState)
    const [relicModifierVillain, setRelicModifierVillain] = useState(0)
    const [relicModifierLocation, setRelicModifierLocation] = useState(0)
    const [location, dispatchLocation] = useReducer(cardReducer, defaultCardState)
    const [locationModifier, setLocationModifier] = useState(0)

    useEffect(() => {
        const activeCard = cloudState.currentTurn.villain
        const activeSide = activeCard[activeCard.visible]
        dispatchVillain(updateCard(activeSide))
        if (activeSide) {
            setRelicModifierVillain(activeSide.relicModifier)
        }
    }, [cloudState.currentTurn.villain])

    useEffect(() => {
        const activeCard = cloudState.currentTurn.relic
        const activeSide = activeCard[activeCard.visible]
        dispatchRelic(updateCard(activeSide))
        if (activeSide) {
            setVillainModifier(activeSide.villainModifier)
            setLocationModifier(activeSide.locationModifier)
        }
    }, [cloudState.currentTurn.relic])

    useEffect(() => {
        const activeCard = cloudState.currentTurn.location
        const activeSide = activeCard[activeCard.visible]
        dispatchLocation(updateCard(activeSide))
        if (activeSide) {
            setRelicModifierLocation(activeSide.relicModifier)
        }
    }, [cloudState.currentTurn.location])

    // useEffect(()=>{

    // },[cloudState.selectedChallenge])

    const challengePicked = (text) => {
        if (auth.currentUser.uid === cloudState.active.activeUID && cloudState.currentTurn.turnStage === 'CHALLENGE') {
            startPickActiveChallenge(localState.hostKey, text)
        }

    }

    return (
        <div className="container">
            <VillainChallenge
                villain={villain}
                modifier={villainModifier}
                challengePicked={() => { challengePicked('villain') }}
            />
            <RelicChallenge
                relic={relic}
                modifierVillain={relicModifierVillain}
                modifierLocation={relicModifierLocation}
                challengePicked={() => { challengePicked('relic') }}
            />
            <LocationChallenge
                location={location}
                modifier={locationModifier}
                challengePicked={() => { challengePicked('location') }}
            />
        </div>
    )
}

export default ChallengeFrame

