import React, { useEffect } from "react";
import { startUpdateGameStage, startUpdatePrompt } from "../../../../actions/gameActions";
import challengeTransformer from "../../../functions/challengeTransformer";
import flavorTransformer from "../../../functions/flavorTransformer";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";
import DeckBriefing from "./DeckBriefing";

const MissionBriefing = ({ gameState }) => {
    const villain = (challengeTransformer(villainObjectsArray, gameState.static.codeVillain))
    const relic = (challengeTransformer(relicObjectsArray, gameState.static.codeRelic))
    const location = (challengeTransformer(locationObjectsArray, gameState.static.codeLocation))
    const villainIntro = "Today you're up against a dangerous foe:"
    const relicIntro = `It is vital that your team secure ${relic.challengeName}:`
    const locationIntro = "Don't let appearances fool you; this location is extremly dangerous:"
    const {villainFlavor, relicFlavor, locationFlavor} = flavorTransformer(villain, relic, location)


    // Monitor the briefingStage, and update the 
    // gameStage stage when the briefing is complete
    useEffect(() => {
        if (gameState.backstory.briefingStage === 'NEXT') {
            startUpdateGameStage(
                gameState.static.host,
                gameState.static.key,
                'CHALLENGES'
            )
        }
    }, [gameState.backstory.briefingStage])

    const updatePromptOne = (updateText) => {

        // const updateText = e.nativeEvent.data
        // console.log('updateText', updateText)
        startUpdatePrompt(
            gameState.static.host,
            gameState.static.key,
            gameState.backstory.briefingStage.toLowerCase(),
            'One',
            updateText
        )
    }

    const updatePromptTwo = (updateText) => {
        startUpdatePrompt(
            gameState.static.host,
            gameState.static.key,
            gameState.backstory.briefingStage.toLowerCase(),
            'Two',
            updateText
        )
    }


    return (
        <div>
            <h3>Mission Briefing</h3>
            {gameState.backstory.briefingStage === 'VILLAIN' &&
                <DeckBriefing
                    intro={villainIntro}
                    flavor={villainFlavor}
                    p1={villain.prompt1}
                    a1={gameState.backstory.villainOne}
                    u1={(update) => { updatePromptOne(update) }}
                    p2={villain.prompt2}
                    a2={gameState.backstory.villainTwo}
                    u2={(update) => { updatePromptTwo(update) }}
                />
            }
            {gameState.backstory.briefingStage === 'RELIC' &&
                <DeckBriefing
                    intro={relicIntro}
                    flavor={relicFlavor}
                    p1={relic.prompt1}
                    a1={gameState.backstory.relicOne}
                    u1={(update) => { updatePromptOne(update) }}
                    p2={relic.prompt2}
                    a2={gameState.backstory.relicTwo}
                    u2={(update) => { updatePromptTwo(update) }}
                />
            }
            {gameState.backstory.briefingStage === 'LOCATION' &&
                <DeckBriefing
                    intro={locationIntro}
                    flavor={locationFlavor}
                    p1={location.prompt1}
                    a1={gameState.backstory.locationOne}
                    u1={(update) => { updatePromptOne(update) }}
                    p2={location.prompt2}
                    a2={gameState.backstory.locationTwo}
                    u2={(update) => { updatePromptTwo(update) }}
                />
            }
        </div>
    )
}

export default MissionBriefing

// + (challengeTransformer(relicObjectsArray, gameState.static.codeRelic)).challengeName + `