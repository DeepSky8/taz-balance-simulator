import React, { useEffect, useReducer, useState } from "react";
import {
    setVillainObject,
    setRelicObject,
    setLocationObject,
    toggleLocation,
    toggleRelic,
    toggleVillain,
    startSetChallenges
} from "../../actions/challengeSelectActions";
import { challengeSelectReducer, defaultChallengeState } from "../../reducers/challengeSelectReducer";
import ChallengeOptionsList from "./ChallengeOptionsList";
import { villainObjectsArray } from "./Challenges/mission-elements/m-villain";
import { relicObjectsArray } from "./Challenges/mission-elements/m-relic";
import { locationObjectsArray } from "./Challenges/mission-elements/m-location";

const ChallengeSelect = ({ setupState, dispatchSetupState }) => {
    const [challengeState, dispatchChallengeState] = useReducer(challengeSelectReducer, defaultChallengeState)
    const [challengesUpdated, updateChallenge] = useState(0)
    const dispatchedChallengeCode = () => {
        updateChallenge(challengesUpdated + 1)
    }
    const uid = setupState.uid
    const gameID = setupState.gameID

    const toggleVillainDisplay = () => {
        dispatchChallengeState(toggleVillain())
    }
    const toggleRelicDisplay = () => {
        dispatchChallengeState(toggleRelic())
    }
    const toggleLocationDisplay = () => {
        dispatchChallengeState(toggleLocation())
    }

    const villainDispatch = (challengeObject) => {
        if (!setupState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(villainObjectsArray, challengeCode)
            dispatchChallengeState(setVillainObject(challengeObject))
            dispatchedChallengeCode()
        }
    }

    const relicDispatch = (challengeObject) => {
        if (!setupState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(relicObjectsArray, challengeCode)
            dispatchChallengeState(setRelicObject(challengeObject))
            dispatchedChallengeCode()
        }
    }

    const locationDispatch = (challengeObject) => {
        if (!setupState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(locationObjectsArray, challengeCode)
            dispatchChallengeState(setLocationObject(challengeObject))
            dispatchedChallengeCode()
        }
    }

    useEffect(() => {
        startSetChallenges(
            {
                villainCode: challengeState.selectedVillainObject.challengeCode,
                relicCode: challengeState.selectedRelicObject.challengeCode,
                locationCode: challengeState.selectedLocationObject.challengeCode
            },
            uid
        )
    }, [challengesUpdated])

    return (
        <div>
            {!setupState.joiningGame &&
                <div>
                    Battle
                    <button onClick={toggleVillainDisplay}>
                        {challengeState.selectedVillainObject.challengeName}
                    </button>
                    to reclaim
                    <button onClick={toggleRelicDisplay}>
                        {challengeState.selectedRelicObject.challengeName}
                    </button>

                    {challengeState.selectedLocationObject.challengeCode === 'l3'
                        ?
                        'on'
                        :
                        'in'
                    }

                    <button onClick={toggleLocationDisplay}>
                        {challengeState.selectedLocationObject.challengeName}
                    </button>
                </div>
            }

            {setupState.joiningGame &&
                <div>
                    Your party will battle
                    <button onClick={toggleVillainDisplay}>
                        {challengeState.selectedVillainObject.challengeName}
                    </button>
                    to reclaim
                    <button onClick={toggleRelicDisplay}>
                        {challengeState.selectedRelicObject.challengeName}
                    </button>

                    {challengeState.selectedLocationObject.challengeCode === 'l3' ?
                        'on'
                        :
                        'in'
                    }

                    <button onClick={toggleLocationDisplay}>
                        {challengeState.selectedLocationObject.challengeName}
                    </button>
                </div>
            }


            <div>
                {challengeState.villainDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={villainObjectsArray}
                        challengeDispatch={villainDispatch}
                        joining={setupState.joiningGame}
                    />}

                {challengeState.relicDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={relicObjectsArray}
                        challengeDispatch={relicDispatch}
                        joining={setupState.joiningGame}
                    />}

                {challengeState.locationDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={locationObjectsArray}
                        challengeDispatch={locationDispatch}
                        joining={setupState.joiningGame}
                    />}
            </div>
        </div>
    )
}

export { ChallengeSelect as default }

// startSetChallenges(challengeCode, auth.currentUser.uid, )

