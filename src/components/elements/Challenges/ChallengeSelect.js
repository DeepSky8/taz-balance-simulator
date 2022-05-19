import React, { useEffect, useReducer} from "react";
import {
    setReceivedVillainObject,
    setReceivedRelicObject,
    setReceivedLocationObject,
    toggleLocation,
    toggleRelic,
    toggleVillain,
    startSetLocation,
    startSetRelic,
    startSetVillain
} from "../../../actions/challengeSelectActions";
import { challengeSelectReducer, defaultChallengeState } from "../../../reducers/challengeSelectReducer";
import ChallengeOptionsList from "./ChallengeOptionsList";
import { villainObjectsArray } from "./mission-elements/m-villain";
import { relicObjectsArray } from "./mission-elements/m-relic";
import { locationObjectsArray } from "./mission-elements/m-location";
import challengeTransformer from "../../functions/challengeTransformer";

const ChallengeSelect = ({ gameState, userState }) => {
    const [challengeState, dispatchChallengeState] = useReducer(challengeSelectReducer, defaultChallengeState)

    const toggleVillainDisplay = () => {
        dispatchChallengeState(toggleVillain())
    }
    const toggleRelicDisplay = () => {
        dispatchChallengeState(toggleRelic())
    }
    const toggleLocationDisplay = () => {
        dispatchChallengeState(toggleLocation())
    }

    const villainDispatch = (challengeCode) => {
        if (!userState.joiningGame) {
            startSetVillain(userState.gameID, challengeCode)
        }
    }

    const relicDispatch = (challengeCode) => {
        if (!userState.joiningGame) {
            startSetRelic(userState.gameID, challengeCode)
        }
    }

    const locationDispatch = (challengeCode) => {
        if (!userState.joiningGame) {
            startSetLocation(userState.gameID, challengeCode)
        }
    }

    // This useEffect monitors the gameState and the gameID on the user
    // When updated (via listener) with challenge codes
    // this useEffect updates challengeState to display
    useEffect(() => {
        dispatchChallengeState(
            setReceivedVillainObject(
                challengeTransformer(
                    villainObjectsArray,
                    gameState.challengesObject.villainCode
                )))
        dispatchChallengeState(
            setReceivedRelicObject(
                challengeTransformer(
                    relicObjectsArray,
                    gameState.challengesObject.relicCode
                )))
        dispatchChallengeState(
            setReceivedLocationObject(
                challengeTransformer(
                    locationObjectsArray,
                    gameState.challengesObject.locationCode
                )))
    }, [gameState, userState.gameID])



    return (
        <div>
            {!userState.joiningGame &&
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

            {userState.joiningGame &&
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
                        joining={userState.joiningGame}
                    />}

                {challengeState.relicDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={relicObjectsArray}
                        challengeDispatch={relicDispatch}
                        joining={userState.joiningGame}
                    />}

                {challengeState.locationDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={locationObjectsArray}
                        challengeDispatch={locationDispatch}
                        joining={userState.joiningGame}
                    />}
            </div>
        </div>
    )
}

export { ChallengeSelect as default }

// startSetChallenges(challengeCode, auth.currentUser.uid, )

