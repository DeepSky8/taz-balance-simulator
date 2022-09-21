import React, { useEffect, useReducer, useState } from "react";
import { updateCard } from "../../../../../actions/cardActions";
import { startPickActiveChallenge, startSetCurrentDifficulty, startUpdateChanceRoll } from "../../../../../actions/cloudActions";
import { auth } from "../../../../../firebase/firebase";
import { cardReducer, defaultCardState } from "../../../../../reducers/cardReducer";
import diceRoll from "../../../../functions/diceRoll";
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
            if (activeSide.chance &&
                cloudState.currentTurn.chanceVillain === 0 &&
                (auth.currentUser.uid === localState.hostKey.split('/', 1).toString())) {
                startUpdateChanceRoll(localState.hostKey, 'chanceVillain', diceRoll('chance'))
            }
        }
    }, [cloudState.currentTurn.villain])

    useEffect(() => {
        const activeCard = cloudState.currentTurn.relic
        const activeSide = activeCard[activeCard.visible]
        dispatchRelic(updateCard(activeSide))
        if (activeSide) {
            setVillainModifier(activeSide.villainModifier)
            setLocationModifier(activeSide.locationModifier)
            if (activeSide.chance &&
                cloudState.currentTurn.chanceRelic === 0 &&
                (auth.currentUser.uid === localState.hostKey.split('/', 1).toString())) {
                startUpdateChanceRoll(localState.hostKey, 'chanceRelic', diceRoll('chance'))
            }
        }
    }, [cloudState.currentTurn.relic])

    useEffect(() => {
        const activeCard = cloudState.currentTurn.location
        const activeSide = activeCard[activeCard.visible]
        dispatchLocation(updateCard(activeSide))
        if (activeSide) {
            setRelicModifierLocation(activeSide.relicModifier)
            if (activeSide.chance &&
                cloudState.currentTurn.chanceLocation === 0 &&
                (auth.currentUser.uid === localState.hostKey.split('/', 1).toString())) {
                startUpdateChanceRoll(localState.hostKey, 'chanceLocation', diceRoll('chance'))
            }
        }
    }, [cloudState.currentTurn.location])

    const challengePicked = (text, difficulty, modifier, chanceRoll) => {
        if (auth.currentUser.uid === cloudState.active.activeUID &&
            cloudState.currentTurn.turnStage === 'CHALLENGE') {
            const totalDifficulty = parseInt(difficulty) + parseInt(modifier) + chanceRoll
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
                challengePicked={() => {
                    challengePicked(
                        'villain',
                        villain.difficulty,
                        villainModifier,
                        cloudState.currentTurn.chanceVillain
                    )
                }}
                chanceRoll={cloudState.currentTurn.chanceVillain}
            />
            <RelicChallenge
                relic={relic}
                modifierVillain={relicModifierVillain}
                modifierLocation={relicModifierLocation}
                stage={cloudState.currentTurn.turnStage}
                challengePicked={() => {
                    challengePicked(
                        'relic',
                        relic.difficulty,
                        (parseInt(relicModifierVillain) + parseInt(relicModifierLocation)),
                        cloudState.currentTurn.chanceRelic
                    )
                }}
                chanceRoll={cloudState.currentTurn.chanceRelic}
            />
            <LocationChallenge
                location={location}
                modifier={locationModifier}
                stage={cloudState.currentTurn.turnStage}
                challengePicked={() => {
                    challengePicked(
                        'location',
                        location.difficulty,
                        locationModifier,
                        cloudState.currentTurn.chanceLocation
                    )
                }}
                chanceRoll={cloudState.currentTurn.chanceLocation}
            />
        </div>
    )
}

export default ChallengeFrame

