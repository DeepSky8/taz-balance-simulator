import React, { useEffect } from "react";
import { startUpdateGameStage, startUpdatePrompt } from "../../../../actions/cloudActions";
import challengeTransformer from "../../../functions/challengeTransformer";
import flavorTransformer from "../../../functions/flavorTransformer";
import incrementStage from "../../../functions/incrementStage";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";
import DeckBriefing from "./DeckBriefing";

const MissionBriefing = ({ cloudState }) => {
    const villain = (challengeTransformer(villainObjectsArray, cloudState.static.codeVillain))
    const relic = (challengeTransformer(relicObjectsArray, cloudState.static.codeRelic))
    const location = (challengeTransformer(locationObjectsArray, cloudState.static.codeLocation))
    const villainIntro = "Today you're up against a dangerous foe:"
    const relicIntro = `It is vital that your team secure ${relic.challengeName}:`
    const locationIntro = "Don't let appearances fool you; this location is extremly dangerous:"
    const { villainFlavor, relicFlavor, locationFlavor } = flavorTransformer(villain, relic, location)


    // Monitor the briefingStage, and update the 
    // gameStage stage when the briefing is complete
    useEffect(() => {
        if (cloudState.backstory.briefingStage === 'NEXT') {
            startUpdateGameStage(
                cloudState.static.host,
                cloudState.static.key,
                incrementStage(cloudState.active.gameStage)
            )
        }
    }, [cloudState.backstory.briefingStage])

    const updatePromptOne = (updateText) => {

        // const updateText = e.nativeEvent.data
        // console.log('updateText', updateText)
        startUpdatePrompt(
            cloudState.static.host,
            cloudState.static.key,
            cloudState.backstory.briefingStage.toLowerCase(),
            'One',
            updateText
        )
    }

    const updatePromptTwo = (updateText) => {
        startUpdatePrompt(
            cloudState.static.host,
            cloudState.static.key,
            cloudState.backstory.briefingStage.toLowerCase(),
            'Two',
            updateText
        )
    }


    return (
        <div>
            <h3>Mission Briefing</h3>
            {cloudState.backstory.briefingStage === 'VILLAIN' &&
                <DeckBriefing
                    intro={villainIntro}
                    flavor={villainFlavor}
                    p1={villain.prompt1}
                    a1={cloudState.backstory.villainOne}
                    u1={(update) => { updatePromptOne(update) }}
                    p2={villain.prompt2}
                    a2={cloudState.backstory.villainTwo}
                    u2={(update) => { updatePromptTwo(update) }}
                />
            }
            {cloudState.backstory.briefingStage === 'RELIC' &&
                <DeckBriefing
                    intro={relicIntro}
                    flavor={relicFlavor}
                    p1={relic.prompt1}
                    a1={cloudState.backstory.relicOne}
                    u1={(update) => { updatePromptOne(update) }}
                    p2={relic.prompt2}
                    a2={cloudState.backstory.relicTwo}
                    u2={(update) => { updatePromptTwo(update) }}
                />
            }
            {cloudState.backstory.briefingStage === 'LOCATION' &&
                <DeckBriefing
                    intro={locationIntro}
                    flavor={locationFlavor}
                    p1={location.prompt1}
                    a1={cloudState.backstory.locationOne}
                    u1={(update) => { updatePromptOne(update) }}
                    p2={location.prompt2}
                    a2={cloudState.backstory.locationTwo}
                    u2={(update) => { updatePromptTwo(update) }}
                />
            }
        </div>
    )
}

export default MissionBriefing

// + (challengeTransformer(relicObjectsArray, gameState.static.codeRelic)).challengeName + `