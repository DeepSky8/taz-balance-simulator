import React, { useReducer } from "react";
import {
    setVillainObject,
    setRelicObject,
    setLocationObject,
    toggleLocation,
    toggleRelic,
    toggleVillain
} from "../../actions/challengeSelectActions";
import { challengeSelectReducer, defaultChallengeState } from "../../reducers/challengeSelectReducer";
import ChallengeOptions from "./ChallengeOptions";
import { villainObjectsArray } from "../mission-elements/m-villain";
import { relicObjectsArray } from "../mission-elements/m-relic";
import { locationObjectsArray } from "../mission-elements/m-location";

const ChallengeSelect = ({ setupState, dispatchSetupState }) => {
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

    const villainDispatch = (challengeObject) => {
        dispatchChallengeState(setVillainObject(challengeObject))
    }

    const relicDispatch = (challengeObject) => {
        dispatchChallengeState(setRelicObject(challengeObject))
    }

    const locationDispatch = (challengeObject) => {
        dispatchChallengeState(setLocationObject(challengeObject))
    }

    return (
        <div>
            Battle
            <button onClick={toggleVillainDisplay}>{challengeState.selectedVillainObject.challengeName}</button>
            wielding
            <button onClick={toggleRelicDisplay}>{challengeState.selectedRelicObject.challengeName}</button>
            in
            <button onClick={toggleLocationDisplay}>{challengeState.selectedLocationObject.challengeName}</button>
            {challengeState.villainDisplayed && <ChallengeOptions
                challengeObjectArray={villainObjectsArray}
                challengeDispatch={villainDispatch}
            />}
            {challengeState.relicDisplayed && <ChallengeOptions
                challengeObjectArray={relicObjectsArray}
                challengeDispatch={relicDispatch}
            />}
            {challengeState.locationDisplayed && <ChallengeOptions
                challengeObjectArray={locationObjectsArray}
                challengeDispatch={locationDispatch}
            />}
        </div>
    )
}

export { ChallengeSelect as default }