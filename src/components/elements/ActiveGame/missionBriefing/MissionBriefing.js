import React, { useEffect } from "react";
import { startUpdateGameStage, startUpdatePrompt } from "../../../../actions/gameActions";
import challengeTransformer from "../../../functions/challengeTransformer";
import useFlavorTransformer from "../../../functions/useFlavorTransformer";
import { locationObjectsArray } from "../../Challenges/mission-elements/m-location";
import { relicObjectsArray } from "../../Challenges/mission-elements/m-relic";
import { villainObjectsArray } from "../../Challenges/mission-elements/m-villain";
import DeckBriefing from "./DeckBriefing";

const MissionBriefing = ({ gameState }) => {
    const villain = (challengeTransformer(villainObjectsArray, gameState.static.codeVillain))
    const relic = (challengeTransformer(relicObjectsArray, gameState.static.codeRelic))
    const location = (challengeTransformer(locationObjectsArray, gameState.static.codeLocation))
    const villainIntro = "Today you're up against a dangerous foe."
    const relicIntro = `It is vital that your team secure ${relic.challengeName}.`
    const locationIntro = "Don't let appearances fool you; this location is extremely dangerous."
    const flavor = useFlavorTransformer(villain, relic, location)
    const villainFlavor = flavor.villainFlavor;
    const relicFlavor = flavor.relicFlavor;
    const locationFlavor = flavor.locationFlavor;


    // Monitor the briefingStage, and update the 
    // gameStage stage when the backstory
    useEffect(() => {
        if (gameState.backstory.briefingStage === 'NEXT') {
            startUpdateGameStage(
                gameState.static.host,
                gameState.static.key,
                'BACKSTORY'
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
                    u1={updatePromptOne}
                    p2={villain.prompt2}
                    a2={gameState.backstory.villainTwo}
                    u2={updatePromptTwo}
                />
            }
            {gameState.backstory.briefingStage === 'RELIC' &&
                <DeckBriefing
                    intro={relicIntro}
                    flavor={relicFlavor}
                    p1={relic.prompt1}
                    a1={gameState.backstory.relicOne}
                    u1={updatePromptOne}
                    p2={relic.prompt2}
                    a2={gameState.backstory.relicTwo}
                    u2={updatePromptTwo}
                />
            }
            {gameState.backstory.briefingStage === 'LOCATION' &&
                <DeckBriefing
                    intro={locationIntro}
                    flavor={locationFlavor}
                    p1={location.prompt1}
                    a1={gameState.backstory.locationOne}
                    u1={updatePromptOne}
                    p2={location.prompt2}
                    a2={gameState.backstory.locationTwo}
                    u2={updatePromptTwo}
                />
            }
        </div>
    )
}

export default MissionBriefing

// + (challengeTransformer(relicObjectsArray, gameState.static.codeRelic)).challengeName + `