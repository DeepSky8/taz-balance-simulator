import React from "react";
import challengeTransformer from "../../../functions/challengeTransformer";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";

const SavedGame = ({ savedGame, removeSavedGame, resumeSavedGame, hosting }) => {
    const resumeMission = 'Resume Mission'
    const notHosting = 'Not Hosting'

    const villain = challengeTransformer(villainObjectsArray, savedGame.challengesObject.villainCode)
    const relic = challengeTransformer(relicObjectsArray, savedGame.challengesObject.relicCode)
    const location = challengeTransformer(locationObjectsArray, savedGame.challengesObject.locationCode)
    const inON = location.challengeCode === 'l3' ? 'on' : 'in'

    return (
        <div>
            <div>Battling {villain.challengeName} to reclaim {relic.challengeName} {inON} {location.challengeName}</div>
            <div>Villain challenges completed: {savedGame.progress.villain}</div>
            <div>Relic challenges completed: {savedGame.progress.relic}</div>
            <div>Location challenges completed: {savedGame.progress.location}</div>
            <div>Team health remaining: {savedGame.teamHealth}</div>
            <button
                onClick={resumeSavedGame}
                disabled={!hosting}
            >
                {hosting ?
                    resumeMission
                    :
                    notHosting
                }
            </button>
            <button onClick={removeSavedGame}>Abandon Mission Forever</button>
        </div>
    )
}

export default SavedGame