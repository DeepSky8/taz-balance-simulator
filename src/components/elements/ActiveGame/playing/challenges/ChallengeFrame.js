import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { startPickActiveChallenge, startSetCurrentDifficulty } from "../../../../../actions/cloudActions";
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

    const challengePicked = (text, difficulty, modifier) => {
        if (auth.currentUser.uid === cloudState.active.activeUID &&
            cloudState.currentTurn.turnStage === 'CHALLENGE') {
            const totalDifficulty = parseInt(difficulty) + parseInt(modifier)
            startPickActiveChallenge(localState.hostKey, text)
            startSetCurrentDifficulty(localState.hostKey, totalDifficulty)
        }

    }

    return (
        <div className="container">
            <VillainChallenge
                villain={villain}
                modifier={villainModifier}
                stage={cloudState.currentTurn.turnStage}
                challengePicked={() => { challengePicked('villain', villain.difficulty, villainModifier) }}
            />
            <RelicChallenge
                relic={relic}
                modifierVillain={relicModifierVillain}
                modifierLocation={relicModifierLocation}
                stage={cloudState.currentTurn.turnStage}
                challengePicked={() => { challengePicked('relic', relic.difficulty, (relicModifierVillain + relicModifierLocation)) }}
            />
            <LocationChallenge
                location={location}
                modifier={locationModifier}
                stage={cloudState.currentTurn.turnStage}
                challengePicked={() => { challengePicked('location', location.difficulty, locationModifier) }}
            />
        </div>
    )
}

export default ChallengeFrame

