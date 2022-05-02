import React, { useEffect, useReducer, useState } from "react";
import {
    setVillainObject,
    setReceivedVillainObject,
    setRelicObject,
    setReceivedRelicObject,
    setLocationObject,
    setReceivedLocationObject,
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
import challengeTransformer from "../../reducers/challengeTransformer";

const ChallengeSelect = ({ setupState }) => {
    const [challengeState, dispatchChallengeState] = useReducer(challengeSelectReducer, defaultChallengeState)

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

    const sendChallengeUpdates = () => {
        startSetChallenges(
            {
                villainCode: challengeState.selectedVillainObject.challengeCode,
                relicCode: challengeState.selectedRelicObject.challengeCode,
                locationCode: challengeState.selectedLocationObject.challengeCode
            },
            uid
        )
    }

    const villainDispatch = (challengeObject) => {
        if (!setupState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(villainObjectsArray, challengeCode)
            dispatchChallengeState(setVillainObject(challengeObject))
            sendChallengeUpdates()
        }
    }

    const relicDispatch = (challengeObject) => {
        if (!setupState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(relicObjectsArray, challengeCode)
            dispatchChallengeState(setRelicObject(challengeObject))
            sendChallengeUpdates()
        }
    }

    const locationDispatch = (challengeObject) => {
        if (!setupState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(locationObjectsArray, challengeCode)
            dispatchChallengeState(setLocationObject(challengeObject))
            sendChallengeUpdates()
        }
    }

    useEffect(() => {
        console.log(
            'useEffect setupState challenge codes fired',
            setupState.currentActiveGame.challengesObject
        )
        if (setupState.joiningGame && gameID) {
            console.log('setupState.joining game is ', setupState.joiningGame, 'gameID is ', gameID)
            dispatchChallengeState(
                setReceivedVillainObject(
                    challengeTransformer(
                        villainObjectsArray, setupState.currentActiveGame.challengesObject.villainCode)))
            dispatchChallengeState(
                setReceivedRelicObject(
                    challengeTransformer(
                        relicObjectsArray, setupState.currentActiveGame.challengesObject.relicCode)))
            dispatchChallengeState(
                setReceivedLocationObject(
                    challengeTransformer(
                        locationObjectsArray, setupState.currentActiveGame.challengesObject.locationCode)))
        }
    }, [setupState.currentActiveGame.challengesObject])

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

