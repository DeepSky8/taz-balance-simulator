import React from "react";
import challengeTransformer from "../../../functions/challengeTransformer";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";

const SavedGame = ({ savedGame, removeSavedGame, resumeSavedGame, hosting }) => {
    const resumeMission = 'Resume Mission'
    const notHosting = 'Not Hosting'

    const villain = challengeTransformer(villainObjectsArray, savedGame.static.codeVillain)
    const relic = challengeTransformer(relicObjectsArray, savedGame.static.codeRelic)
    const location = challengeTransformer(locationObjectsArray, savedGame.static.codeLocation)
    const inON = location.challengeCode === 'l3' ? 'on' : 'in'

    return (
        <div>
            <div>Battling {villain.challengeName} to reclaim {relic.challengeName} {inON} {location.challengeName}</div>
            <div>Villain challenges completed: {savedGame.active.progressVillain}</div>
            <div>Relic challenges completed: {savedGame.active.progressRelic}</div>
            <div>Location challenges completed: {savedGame.active.progressLocation}</div>
            <div>Team health remaining: {savedGame.active.teamHealth}</div>
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