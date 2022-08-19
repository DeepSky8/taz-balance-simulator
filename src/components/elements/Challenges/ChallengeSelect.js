import React, { useEffect, useReducer } from "react";
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
import ChallengeOptionsList from "./ChallengeOptionsList";
import { villainObjectsArray } from "./mission-elements/m-villain";
import { relicObjectsArray } from "./mission-elements/m-relic";
import { locationObjectsArray } from "./mission-elements/m-location";
import challengeTransformer from "../../functions/challengeTransformer";
import {challengeSelectReducer, defaultChallengeSelectState} from "../../../reducers/challengeSelectReducer";

const ChallengeSelect = ({ gameState, userState, toggleGameType, gameTypeButtonText, savedGameArray }) => {
    const [challengeSelectState, dispatchChallengeSelectState] = useReducer(challengeSelectReducer, defaultChallengeSelectState)

    const toggleVillainDisplay = () => {
        dispatchChallengeSelectState(toggleVillain())
    }
    const toggleRelicDisplay = () => {
        dispatchChallengeSelectState(toggleRelic())
    }
    const toggleLocationDisplay = () => {
        dispatchChallengeSelectState(toggleLocation())
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
        dispatchChallengeSelectState(
            setReceivedVillainObject(
                challengeTransformer(
                    villainObjectsArray,
                    gameState.static.codeVillain
                )))
        dispatchChallengeSelectState(
            setReceivedRelicObject(
                challengeTransformer(
                    relicObjectsArray,
                    gameState.static.codeRelic
                )))
        dispatchChallengeSelectState(
            setReceivedLocationObject(
                challengeTransformer(
                    locationObjectsArray,
                    gameState.static.codeLocation
                )))
    }, [gameState.static, userState.gameID])



    return (
        <div>
            {!userState.joiningGame &&
                <div>
                    Battle
                    <button onClick={toggleVillainDisplay}>
                        {challengeSelectState.selectedVillainObject.challengeName}
                    </button>
                    to reclaim
                    <button onClick={toggleRelicDisplay}>
                        {challengeSelectState.selectedRelicObject.challengeName}
                    </button>

                    {challengeSelectState.selectedLocationObject.challengeCode === 3
                        ?
                        'on'
                        :
                        'in'
                    }

                    <button onClick={toggleLocationDisplay}>
                        {challengeSelectState.selectedLocationObject.challengeName}
                    </button>
                </div>
            }

            {userState.joiningGame &&
                <div>
                    Your party will battle
                    <button onClick={toggleVillainDisplay}>
                        {challengeSelectState.selectedVillainObject.challengeName}
                    </button>
                    to reclaim
                    <button onClick={toggleRelicDisplay}>
                        {challengeSelectState.selectedRelicObject.challengeName}
                    </button>

                    {challengeSelectState.selectedLocationObject.challengeCode === 3 ?
                        'on'
                        :
                        'in'
                    }

                    <button onClick={toggleLocationDisplay}>
                        {challengeSelectState.selectedLocationObject.challengeName}
                    </button>
                </div>
            }


            <div>
                {challengeSelectState.villainDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={villainObjectsArray}
                        challengeDispatch={villainDispatch}
                        joining={userState.joiningGame}
                    />}

                {challengeSelectState.relicDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={relicObjectsArray}
                        challengeDispatch={relicDispatch}
                        joining={userState.joiningGame}
                    />}

                {challengeSelectState.locationDisplayed &&
                    <ChallengeOptionsList
                        challengeObjectArray={locationObjectsArray}
                        challengeDispatch={locationDispatch}
                        joining={userState.joiningGame}
                    />}
            </div>

            {savedGameArray.length > 0 &&
                <button
                    onClick={toggleGameType}
                >
                    {gameTypeButtonText}
                </button>
            }
        </div>
    )
}

export { ChallengeSelect as default }

