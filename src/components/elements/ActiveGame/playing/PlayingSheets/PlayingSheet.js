import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { charReducer, defaultCharState } from "../../../../../reducers/charReducer";
import CharStats from "../../../CharacterSheet/AttributePickerElements/CharStats";
import { useReducer } from "react";
import { setCharState } from "../../../../../actions/charActions";
import SpecialAbility from "../../../CharacterSheet/AttributePickerElements/SpecialAbility";
import ClassDisplay from "./AttributeDisplay/ClassDisplay/ClassDisplay";
import { charTitles } from "../../../CharacterSheet/classes/charInfo";
import AssistDisplay from "./AttributeDisplay/AssistDisplay/AssistDisplay";
import ToolDisplay from "./AttributeDisplay/ToolDisplay/ToolDisplay";
import Note from "./Notes/Note";
import { auth } from "../../../../../firebase/firebase";
import { startUpdateMissionNoteArray } from "../../../../../actions/cloudActions";
import MissionNotes from "./Notes/MissionNotes";


const PlayingSheet = ({ cloudState, localState }) => {
  const tokenAvailable = 'Action Token available'
  const tokenSpent = 'Action Token spent'
  const charNotePlaceholder = 'Character-specific notes (accessible on all missions)'
  const missionNotePlaceholder = 'Mission-specific notes (accessible only on this mission)'
  const [charState, dispatchCharState] = useReducer(charReducer, defaultCharState)
  const [hasToken, setHasToken] = useState(false)
  const [charNote, setCharNote] = useState('')
  const [playerMissionNoteArray, setLocalMissionNoteArray] = useState(
    [{
      uid: auth.currentUser.uid,
      currentCharacterID: localState.localCharacterID,
      charName: localState.localCharacter.charName,
      notes: ''
    }]
  )
  let location = useLocation()
  let pageCharID = location.pathname.split("/")[4]
  const charIndex = localState.teamCharArray.findIndex((char) => {
    return char.charID === pageCharID
  })


  const updateMissionNote = (text, charID) => {
    // Save all mission notes made when playing other characters
    // removing the single note made while playing this character
    // then concat a new note onto the array
    // containing the new text of the note

    if (localState.localCharacterID === charID) {
      const removedOldNote = playerMissionNoteArray.filter((note) => {
        return note.currentCharacterID !== localState.localCharacterID
      })

      setLocalMissionNoteArray([{
        uid: auth.currentUser.uid,
        currentCharacterID: localState.localCharacterID,
        charName: localState.localCharacter.charName,
        notes: text
      }].concat(removedOldNote))
    }


  }

  const saveMissionNote = () => {
    const otherMissionNotes = cloudState.missionNoteArray.filter((note) => {
      return note.uid !== auth.currentUser.uid
    })
    const newNoteArray = otherMissionNotes.concat(playerMissionNoteArray)
    startUpdateMissionNoteArray(localState.hostKey, newNoteArray)
  }

  // Set localMissionNoteArray with all notes that match player uid
  useEffect(() => {
    const receivedMissionNoteArray = cloudState.missionNoteArray.filter((note) => {
      return note.uid === auth.currentUser.uid
    })
    if (receivedMissionNoteArray.length > 0) {
      setLocalMissionNoteArray(receivedMissionNoteArray)
    }
  }, [cloudState.missionNoteArray])

  // set local character state
  useEffect(() => {
    if (charIndex >= 0) {
      dispatchCharState(setCharState(localState.teamCharArray[charIndex]))
    }
  }, [localState.teamCharArray, charIndex])

  // set token status
  useEffect(() => {
    const hasActionToken = (
      cloudState.hasActionToken.filter(
        character => character.currentCharacterID === pageCharID
      ).length > 0)
    setHasToken(hasActionToken)
  }, [cloudState.hasActionToken])

  return (
    <span>
      <span>
        <h2>{charState.charName}{charTitles[charState.questCount]}</h2>
        <p>
          {
            localState.activeCharacterID === pageCharID
              ?
              `It's ${charState.charName}'s turn!`
              :
              ''
          }
        </p>
        <p>
          {hasToken ? tokenAvailable : tokenSpent}
        </p>
      </span>

      <SpecialAbility charState={charState} />
      <CharStats charState={charState} />
      <ClassDisplay charState={charState} />
      <ToolDisplay charState={charState} />
      <AssistDisplay charState={charState} />
      <MissionNotes
        playerMissionNoteArray={playerMissionNoteArray}
        setNote={updateMissionNote}
        saveNote={saveMissionNote}
        placeholderText={missionNotePlaceholder}
        type={'Mission'}
      />

    </span>
  )
}

export default PlayingSheet

// <Note
// note={localMissionNoteArray.notes}
// setNote={updateMissionNote}
// saveNote={saveMissionNote}
// placeholderText={missionNotePlaceholder}
// id={localMissionNoteArray.uid}
// type={'Mission'}
// />