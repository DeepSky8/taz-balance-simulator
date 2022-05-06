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
    startSetLocation,
    startSetRelic,
    startSetVillain
} from "../../actions/challengeSelectActions";
import { challengeSelectReducer, defaultChallengeState } from "../../reducers/challengeSelectReducer";
import ChallengeOptionsList from "./ChallengeOptionsList";
import { villainObjectsArray } from "./Challenges/mission-elements/m-villain";
import { relicObjectsArray } from "./Challenges/mission-elements/m-relic";
import { locationObjectsArray } from "./Challenges/mission-elements/m-location";
import challengeTransformer from "../../reducers/challengeTransformer";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../firebase/firebase";

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

    // const sendChallengeUpdates = () => {
    //     startSetChallenges(
    //         uid,
    //         challengeState.selectedVillainObject.challengeCode,
    //         challengeState.selectedRelicObject.challengeCode,
    //         challengeState.selectedLocationObject.challengeCode
    //     )
    // }

    const villainDispatch = (challengeCode) => {
        console.log('villainDispatch clicked, challenge code is: ', challengeCode)
        if (!userState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(villainObjectsArray, challengeCode)
            // dispatchChallengeState(setVillainObject(challengeObject))
            // sendChallengeUpdates()
            startSetVillain(userState.gameID, challengeCode)
        }
    }

    const relicDispatch = (challengeCode) => {
        if (!userState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(relicObjectsArray, challengeCode)
            // dispatchChallengeState(setRelicObject(challengeObject))
            // sendChallengeUpdates()
            startSetRelic(userState.gameID, challengeCode)
        }
    }

    const locationDispatch = (challengeCode) => {
        if (!userState.joiningGame) {

            // const challengeObject =
            //     challengeTransformer(locationObjectsArray, challengeCode)
            // dispatchChallengeState(setLocationObject(challengeObject))
            // sendChallengeUpdates()
            startSetLocation(userState.gameID, challengeCode)
        }
    }

    // useEffect(() => { }, [challengeState.selectedVillainObject])


    // This useEffect monitors the setupState challengesObject
    // When setupState is updated (via listener) with challenge codes
    // this useEffect updates challengeState to display
    useEffect(() => {
        // console.log(
        //     'useEffect setupState challenge codes fired',
        //     setupState.currentActiveGame.challengesObject
        // )

        // console.log('setupState.joining game is ', setupState.joiningGame, 'gameID is ', gameID)
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

