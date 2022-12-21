import React, { useEffect, useState, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { charReducer, defaultCharState } from "../../../../../reducers/charReducer";
import CharStats from "../../../CharacterSheet/AttributePickerElements/CharStats";
import {
  setCharState,
  setNoCurrentChar,
} from "../../../../../actions/charActions";
import SpecialAbility from "../../../CharacterSheet/AttributePickerElements/SpecialAbility";
import ClassDisplay from "./AttributeDisplay/ClassDisplay/ClassDisplay";
import { charClassTitles, charTitles } from "../../../CharacterSheet/classes/charInfo";
import AssistDisplay from "./AttributeDisplay/AssistDisplay/AssistDisplay";
import ToolDisplay from "./AttributeDisplay/ToolDisplay/ToolDisplay";
import NotesFrameFull from "./Notes/NotesFrameFull";
import KostcoOwnedFrame from "../../kostco/KostcoOwnedFrame";



const PlayingSheet = ({ cloudState, localState }) => {
  const spacer = ' '
  let location = useLocation()
  const pageData = {
    charName: location.pathname.split("/")[3],
    charID: location.pathname.split("/")[4],
  }
  const charIndex = localState.teamCharArray.findIndex(
    char => char.charID === pageData.charID
  )
  const tokenAvailable = 'Action Token available'
  const tokenSpent = 'Action Token spent'
  const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)
  const [hasToken, setHasToken] = useState(false)

  // set local character state
  useEffect(() => {
    dispatchCharState(setNoCurrentChar())
    if (charIndex >= 0) {
      dispatchCharState(setCharState(localState.teamCharArray[charIndex]))

    }

  }, [localState.teamCharArray[charIndex], charIndex, pageData.charID])

  // set token status
  useEffect(() => {
    const hasActionToken = (
      cloudState.hasActionToken.filter(
        character => character.currentCharacterID === pageData.charID
      ).length > 0)
    setHasToken(hasActionToken)
  }, [cloudState.hasActionToken])



  return (
    <span>
      <span>
        <h2>{charClassTitles[charState.classCode]}{spacer}{charState.charName}{charTitles[charState.questCount]}</h2>
        <p>
          {
            localState.activeCharacterID === pageData.charID
              ?
              `It's ${charState.charName}'s turn!`
              :
              ''
          }
        </p>
        <p>
          {hasToken ? tokenAvailable : tokenSpent}
        </p>
        <p>
          Loot Points: {charState.lootPoints}
        </p>
      </span>

      <SpecialAbility charState={charState} />
      <CharStats charState={charState} />
      <ClassDisplay charState={charState} />
      <ToolDisplay charState={charState} />
      <AssistDisplay charState={charState} />

      <KostcoOwnedFrame
        cloudState={cloudState}
        localState={localState}
        charState={charState}
      />

      <NotesFrameFull
        cloudState={cloudState}
        localState={localState}
        charState={charState}
        pageData={pageData}

      />
    </span>
  )
}

export default PlayingSheet